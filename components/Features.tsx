import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, Share2, Bell, LayoutDashboard, Languages } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: "AI Voice & Chat",
    desc: "Intelligent responses using Google Gemini AI with multi-language support and natural flow."
  },
  {
    icon: Video,
    title: "WebRTC Video Calls",
    desc: "Seamless real-time video calling between clients and staff with secure signaling."
  },
  {
    icon: Share2,
    title: "Smart Call Routing",
    desc: "Skills-based routing ensures the right person handles each inquiry efficiently."
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    desc: "Cross-tab sync via Socket.IO for instant alerts on calls and messages."
  },
  {
    icon: LayoutDashboard,
    title: "Staff Dashboard",
    desc: "Timetable management, meeting scheduling, and team collaboration tools."
  },
  {
    icon: Languages,
    title: "Multi-language Support",
    desc: "Native support for multiple languages with automatic detection."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative bg-slate-900">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Features</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover how Clara's features can transform institutional communication and staff management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="text-neon-cyan group-hover:text-neon-purple transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;