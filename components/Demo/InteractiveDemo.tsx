import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Image as ImageIcon, Video, Cpu } from 'lucide-react';
import ChatDemo from './ChatDemo';
import AnalysisDemo from './AnalysisDemo';
import GenerationDemo from './GenerationDemo';

type Tab = 'chat' | 'analysis' | 'generation';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  const tabs = [
    { id: 'chat', label: 'Smart Chat', icon: MessageSquare },
    { id: 'analysis', label: 'Media Analysis', icon: Cpu },
    { id: 'generation', label: 'Creative Studio', icon: ImageIcon },
  ];

  return (
    <section id="demo" className="py-24 bg-slate-900 relative">
       <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-neon-cyan font-bold tracking-wider text-sm uppercase">Live Playground</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Experience Clara's Intelligence</h2>
          <p className="text-slate-400">Interact with the actual Gemini models powering Clara.</p>
        </div>

        <div className="max-w-5xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Tab Nav */}
          <div className="flex border-b border-slate-800 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex-1 flex items-center justify-center gap-2 py-6 px-6 text-sm font-medium transition-all min-w-[150px]
                    ${isActive ? 'bg-slate-900 text-white border-b-2 border-neon-cyan' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}`}
                >
                  <Icon size={18} className={isActive ? 'text-neon-cyan' : ''} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-10 min-h-[500px] bg-slate-900/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'chat' && <ChatDemo />}
                {activeTab === 'analysis' && <AnalysisDemo />}
                {activeTab === 'generation' && <GenerationDemo />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;