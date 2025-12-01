import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap } from 'lucide-react';

const DemoSection = () => {
    return (
        <section id="demo-section" className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-medium mb-6">
                        <Zap size={16} />
                        <span>Live Interactive Demo</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Experience Clara in Real-Time
                    </h2>

                    <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                        See how Clara analyzes facial expressions and responds with emotional intelligence. Try the live demo now to witness the next generation of AI interaction.
                    </p>

                    <motion.a
                        href="https://clara-facial-expressions-b3gq.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neon-cyan to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-neon-cyan/20 hover:shadow-neon-cyan/40 transition-all transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Launch Live Demo</span>
                        <ExternalLink size={20} />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default DemoSection;
