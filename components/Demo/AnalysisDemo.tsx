import React, { useState } from 'react';
import { Upload, FileVideo, FileImage, Loader2, Play } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { analyzeMedia } from '../../services/geminiService';

const AnalysisDemo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('Analyze this media in detail.');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult('');
    try {
      const analysis = await analyzeMedia(file, prompt);
      setResult(analysis || "No analysis generated.");
    } catch (error) {
      setResult("Error processing media. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isVideo = file?.type.startsWith('video');

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div className="border-2 border-dashed border-slate-700 rounded-2xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-slate-900/50 hover:bg-slate-900 transition-colors">
          {!preview ? (
            <>
              <Upload className="text-slate-500 mb-4" size={32} />
              <p className="text-slate-400 font-medium">Upload Image or Video</p>
              <p className="text-slate-600 text-sm mt-2">Supports Gemini 3 Pro Vision</p>
              <input 
                type="file" 
                accept="image/*,video/*" 
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {isVideo ? (
                <video src={preview} controls className="max-h-full max-w-full" />
              ) : (
                <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
              )}
              <button 
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-red-500/80 transition"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Instructions</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-neon-purple outline-none min-h-[80px]"
            placeholder="What should I look for?"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="w-full py-3 bg-neon-purple hover:bg-neon-purple/90 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <BrainCircuitIcon />}
          {loading ? 'Analyzing...' : 'Analyze with Gemini 3 Pro'}
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 overflow-y-auto max-h-[500px] custom-scrollbar">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FileImage size={20} className="text-neon-cyan" /> Analysis Result
        </h3>
        
        {result ? (
          <div className="prose prose-invert prose-sm">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-2xl opacity-20">AI</span>
            </div>
            <p>Upload media to see Gemini's visual understanding capabilities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BrainCircuitIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current stroke-2">
    <path d="M12 4.5C12 4.5 9 6.5 9 12C9 17.5 12 19.5 12 19.5M12 4.5C12 4.5 15 6.5 15 12C15 17.5 12 19.5 12 19.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12H21" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="9"/>
  </svg>
);

export default AnalysisDemo;