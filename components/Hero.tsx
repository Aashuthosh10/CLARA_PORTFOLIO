import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Scene3D from './Scene3D';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950" />
        <Scene3D />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Clara" className="h-24 md:h-32 object-contain mix-blend-screen" />
          </div>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            AI-powered receptionist that handles inquiries, schedules video calls, and manages staff interactions seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#features"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-medium text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Explore Features
            </a>
            <a
              href="#demo-section"
              className="px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl font-medium text-neon-cyan hover:bg-neon-cyan/20 transition-all backdrop-blur-sm"
            >
              Try Demo
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-slate-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;