import React from 'react';
import { motion } from 'framer-motion';

const TechStack = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Tech Stack</h2>
          <p className="text-slate-400 max-w-4xl leading-relaxed mb-12">
            Our tech stack is meticulously chosen to deliver a seamless and responsive user experience. The interface, crafted with React 19 and TypeScript, styled with modern CSS, comes to life with Framer Motion animations. All of this is presented within our signature dark theme. The backend leverages Express.js and Socket.IO for real-time communication, WebRTC for video calls, and Google Gemini AI for intelligent assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* UI */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800"
          >
            <h3 className="text-neon-cyan font-bold text-lg mb-4 uppercase tracking-wider">UI / Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {['React 19', 'TypeScript', 'Vite', 'Framer Motion', 'Tailwind CSS'].map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="p-6 rounded-2xl bg-slate-900 border border-slate-800"
          >
            <h3 className="text-neon-purple font-bold text-lg mb-4 uppercase tracking-wider">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {['Express.js', 'Socket.IO', 'WebRTC', 'PostgreSQL', 'JWT'].map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* AI */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-pink/20 to-transparent rounded-bl-full" />
            <h3 className="text-neon-pink font-bold text-lg mb-4 uppercase tracking-wider">AI Services</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">Google Gemini AI</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">Veo Video</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">Gemini 3 Pro</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;