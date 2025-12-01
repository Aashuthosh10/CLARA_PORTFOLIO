import { GoogleGenAI, Type } from "@google/genai";
import { AspectRatio } from "../types";

// Helper to get fresh client (important for Veo key selection)
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Chat with Clara.
 * Uses Flash-Lite for fast responses, or Pro for thinking tasks.
 */
export const sendChatMessage = async (
  message: string,
  mode: 'fast' | 'thinking',
  history: { role: string; parts: { text: string }[] }[] = []
) => {
  const ai = getAiClient();
  
  const modelName = mode === 'fast' ? 'gemini-flash-lite-latest' : 'gemini-3-pro-preview';
  
  const config: any = {
    systemInstruction: "You are Clara, an intelligent AI receptionist for Sai Vidya Institute of Technology. You are professional, helpful, and concise.",
  };

  if (mode === 'thinking') {
    config.thinkingConfig = { thinkingBudget: 32768 };
  }

  try {
    const chat = ai.chats.create({
      model: modelName,
      config,
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
};

/**
 * Analyze Media (Images or Video).
 * Uses Gemini 3 Pro Preview.
 */
export const analyzeMedia = async (file: File, prompt: string) => {
  const ai = getAiClient();
  const base64Data = await fileToBase64(file);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data
            }
          },
          { text: prompt }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

/**
 * Generate Image.
 * Uses Gemini 3 Pro Image Preview.
 */
export const generateImage = async (prompt: string, aspectRatio: AspectRatio) => {
  const ai = getAiClient();
  
  // Note: SDK might support generateImages for Imagen, but for gemini-3-pro-image-preview
  // we use generateContent and look for inlineData.
  // BUT the prompt says "generate image... using model gemini-3-pro-image-preview".
  // The guide says: "Call generateContent to generate images with nano banana series models"
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: '1K' // Defaulting to 1K
        }
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw error;
  }
};

/**
 * Generate Video (Veo).
 * Uses veo-3.1-fast-generate-preview.
 */
export const generateVeoVideo = async (imageFile: File, prompt: string | undefined, aspectRatio: '16:9' | '9:16') => {
  // Key selection must be handled by UI before calling this if needed, 
  // but we should create a fresh client here.
  const ai = getAiClient();
  const base64Data = await fileToBase64(imageFile);

  try {
    console.log("Starting video generation...");
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || "Animate this image",
      image: {
        imageBytes: base64Data,
        mimeType: imageFile.type
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    console.log("Video operation started, polling...", operation);

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
      operation = await ai.operations.getVideosOperation({ operation });
      console.log("Polling status:", operation.metadata?.state);
    }

    if (operation.error) {
        throw new Error(operation.error.message);
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("No video URI returned");

    // Fetch the actual video bytes using the key
    const videoUrlWithKey = `${videoUri}&key=${process.env.API_KEY}`;
    return videoUrlWithKey;

  } catch (error) {
    console.error("Veo Error:", error);
    throw error;
  }
};


// Utils
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
