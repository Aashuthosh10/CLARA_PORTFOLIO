import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, BrainCircuit, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '../../services/geminiService';
import { ChatMessage } from '../../types';

const ChatDemo = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Clara. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'fast' | 'thinking'>('fast');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      // Add current user message to history for the API context if needed, 
      // but usually API client handles history if we pass it, 
      // however our service helper reconstructs chat history.
      // We'll pass previous history + new message to helper conceptually if needed,
      // but our helper takes 'history' as the previous context.
      // Wait, SDK chats.create takes history. We should pass full conversation minus the latest one, 
      // or rely on the fact that sendChatMessage creates a NEW chat every time (stateless for demo simplicity)
      // or we should maintain a chat session.
      // For this demo, let's pass the full accumulated history.
      
      const responseText = await sendChatMessage(input, mode, history);
      
      setMessages(prev => [...prev, { role: 'model', text: responseText, isThinking: mode === 'thinking' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setMode('fast')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
              mode === 'fast' ? 'bg-slate-800 text-neon-cyan shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap size={14} /> Fast (Flash-Lite)
          </button>
          <button
             onClick={() => setMode('thinking')}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
               mode === 'thinking' ? 'bg-slate-800 text-neon-purple shadow-sm' : 'text-slate-400 hover:text-white'
             }`}
          >
            <BrainCircuit size={14} /> Thinking (Pro 3)
          </button>
        </div>
        <span className="text-xs text-slate-500 hidden sm:block">
          {mode === 'fast' ? 'Optimized for speed & efficiency' : 'Deep reasoning with 32k token budget'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-neon-cyan to-blue-600 text-white rounded-br-none' 
                : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
            }`}>
              {msg.isThinking && (
                <div className="flex items-center gap-1 text-xs text-neon-purple mb-2 opacity-80">
                  <BrainCircuit size={12} />
                  <span>Thought deeply about this</span>
                </div>
              )}
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none p-4 flex items-center gap-2 text-slate-400">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-sm">Clara is {mode === 'thinking' ? 'thinking...' : 'typing...'}</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Message Clara (${mode === 'thinking' ? 'Complex queries allowed' : 'Ask something quick'})...`}
          className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-neon-cyan transition-colors"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="absolute right-2 top-2 p-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan rounded-lg transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatDemo;