import React, { useState } from 'react';
import { Image as ImageIcon, Video, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { generateImage, generateVeoVideo } from '../../services/geminiService';
import { AspectRatio } from '../../types';

type Mode = 'image' | 'video';

const aspectRatios: AspectRatio[] = ['1:1', '3:4', '4:3', '9:16', '16:9'];

const GenerationDemo = () => {
  const [mode, setMode] = useState<Mode>('image');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [loading, setLoading] = useState(false);
  
  // Image Gen State
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  // Video Gen State (Veo)
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateImage(prompt, aspectRatio);
      setGeneratedImg(result);
    } catch (e: any) {
      setError(e.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleVeoKeyCheck = async () => {
    try {
      const win = window as any;
      if (win.aistudio && win.aistudio.openSelectKey) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await win.aistudio.openSelectKey();
          // Assume success after dialog interaction per guidelines
        }
        return true;
      } else {
        setError("AI Studio environment not detected. Cannot use Veo.");
        return false;
      }
    } catch (e) {
      console.error("Key selection failed", e);
      // Try to proceed anyway or reset
      await (window as any).aistudio?.openSelectKey();
      return true;
    }
  };

  const handleGenerateVideo = async () => {
    if (!sourceImage) return;
    setError(null);
    
    // Veo needs paid key check
    const ready = await handleVeoKeyCheck();
    if (!ready) return;

    setLoading(true);
    
    // Strict ratio check for Veo
    const veoRatio = aspectRatio === '9:16' ? '9:16' : '16:9'; 
    // If user selected something else, we default to 16:9 effectively or should warn.
    // The prompt says "must have an aspect ratio of 16:9 or 9:16".
    // We will auto-force it based on current selection orientation.
    const finalRatio = (aspectRatio.includes('9:16') || aspectRatio.includes('3:4') || aspectRatio.includes('2:3')) ? '9:16' : '16:9';

    try {
      const url = await generateVeoVideo(sourceImage, prompt, finalRatio);
      setGeneratedVideoUrl(url);
    } catch (e: any) {
      setError(e.message || "Veo generation failed. Ensure you selected a paid project key.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0];
      setSourceImage(f);
      setSourcePreview(URL.createObjectURL(f));
      setGeneratedVideoUrl(null); // reset result
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Mode Switcher */}
      <div className="flex gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={() => setMode('image')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${mode === 'image' ? 'bg-neon-pink text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <ImageIcon size={18} /> Generate Images
        </button>
        <button
          onClick={() => setMode('video')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${mode === 'video' ? 'bg-neon-pink text-white' : 'text-slate-400 hover:bg-slate-800'}`}
        >
          <Video size={18} /> Animate with Veo
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="md:col-span-4 space-y-6">
          
          {mode === 'video' && (
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Source Image</label>
              <div className="border border-dashed border-slate-600 rounded-lg p-4 text-center hover:bg-slate-800 transition cursor-pointer relative">
                <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
                {sourcePreview ? (
                  <img src={sourcePreview} alt="Source" className="h-32 mx-auto object-contain rounded" />
                ) : (
                  <div className="py-8 text-slate-500">Click to upload photo</div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white h-24 focus:border-neon-pink outline-none"
              placeholder={mode === 'image' ? "A futuristic receptionist desk..." : "Camera pans right, cinematic lighting..."}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Aspect Ratio</label>
            <div className="grid grid-cols-4 gap-2">
              {aspectRatios.map(r => (
                <button
                  key={r}
                  onClick={() => setAspectRatio(r)}
                  className={`text-xs py-2 rounded-lg border ${aspectRatio === r ? 'bg-neon-pink/20 border-neon-pink text-white' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            {mode === 'video' && <p className="text-xs text-orange-400 mt-1">Veo supports 16:9 or 9:16. Your selection will be adapted.</p>}
          </div>

          <button
            onClick={mode === 'image' ? handleGenerateImage : handleGenerateVideo}
            disabled={loading || (mode === 'video' && !sourceImage)}
            className="w-full py-3 bg-neon-pink hover:bg-neon-pink/90 text-white rounded-xl font-bold transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? 'Generating...' : (mode === 'image' ? 'Generate Image' : 'Create Video')}
          </button>
          
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm flex gap-2">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}
          
          {mode === 'video' && (
             <div className="text-xs text-slate-500">
                <p>Powered by Veo 3.1 Fast.</p>
                <p>Requires a paid project key. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-white">Learn more</a>.</p>
             </div>
          )}
        </div>

        {/* Preview Area */}
        <div className="md:col-span-8 bg-black/40 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[400px] p-4">
          {loading ? (
             <div className="text-center space-y-4">
               <div className="w-16 h-16 border-4 border-neon-pink border-t-transparent rounded-full animate-spin mx-auto" />
               <p className="text-slate-400 animate-pulse">{mode === 'video' ? 'Veo is dreaming up your video (this may take a minute)...' : 'Creating image...'}</p>
             </div>
          ) : (
            <>
              {mode === 'image' && generatedImg && (
                <img src={generatedImg} alt="Generated" className="max-w-full max-h-[500px] rounded shadow-2xl" />
              )}
              {mode === 'video' && generatedVideoUrl && (
                <div className="text-center w-full">
                  <video src={generatedVideoUrl} controls autoPlay loop className="max-w-full max-h-[500px] mx-auto rounded shadow-2xl" />
                  <p className="mt-2 text-green-400 flex items-center justify-center gap-2"><CheckCircle size={14}/> Video Generated Successfully</p>
                </div>
              )}
              {!generatedImg && !generatedVideoUrl && !loading && (
                <div className="text-slate-600 text-center">
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your creation will appear here</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerationDemo;
