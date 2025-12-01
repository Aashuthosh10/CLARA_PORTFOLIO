import React, { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import TechStack from './components/TechStack';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-neon-cyan/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-purple">
            Clara
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        
        {/* About Section - Quick Insert */}
        <section className="py-20 bg-slate-950">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">About Clara</h2>
            <p className="max-w-4xl mx-auto text-slate-400 text-lg leading-relaxed">
              Clara is an innovative AI-powered receptionist system designed to revolutionize institutional communication by providing intelligent voice and chat assistance, seamless video calling, and comprehensive staff management tools for Sai Vidya Institute of Technology.
            </p>
          </div>
        </section>

        <Features />

        <TechStack />

        {/* Video Placeholder */}
        <section className="py-20 bg-slate-900 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-10">See Clara in Action</h2>
            <div className="max-w-4xl mx-auto aspect-video bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-transparent opacity-50 group-hover:opacity-75 transition-opacity" />
               <span className="text-slate-500 font-medium z-10">[Demonstration Video Placeholder]</span>
            </div>
          </div>
        </section>

        {/* GitHub CTA */}
        <section className="py-24 bg-gradient-to-b from-slate-900 to-indigo-950/20">
          <div className="container mx-auto px-6 text-center">
             <h2 className="text-4xl font-bold mb-8">Ready to explore the code?</h2>
             <a 
               href="#" 
               className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-200 transition-all transform hover:scale-105"
             >
               <Github size={24} />
               See the Complete Project
             </a>
          </div>
        </section>

        {/* LinkedIn CTA */}
        <section className="py-24 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-6 text-center">
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Get In Touch</h2>
             <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
               Have a question or want to get in touch? Connect with us on LinkedIn.
             </p>
             <a 
               href="#" 
               className="inline-flex items-center gap-3 px-8 py-4 bg-[#0077b5] text-white rounded-full font-bold hover:bg-[#006396] transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
             >
               <Linkedin size={24} />
               Connect on LinkedIn
             </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-xl font-bold text-white mb-4 md:mb-0">Clara</div>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail /></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between text-sm text-slate-500 pt-8 border-t border-slate-900">
            <div>&copy; 2024 Clara. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;