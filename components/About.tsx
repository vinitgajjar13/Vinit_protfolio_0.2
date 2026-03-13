import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-[#F5F5DC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
          
          {/* Left Column - Heading */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-slate-900"></div>
                <span className="text-sm font-black uppercase tracking-[0.3em] red-wine-text">
                  Manifesto
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter text-slate-900 mb-8">
                Passionate about creating intuitive interfaces.
              </h2>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <p className="text-2xl md:text-3xl leading-relaxed text-slate-800 font-light italic mb-16 border-l-4 border-slate-900/20 pl-8">
                "I have a strong foundation in Flutter, HTML, and CSS. My goal is to bridge the gap between aesthetics and functionality, creating collaborative environments where user experience comes first."
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Location', value: 'Ahmedabad' },
                  { label: 'Role', value: 'UI/UX & Mobile' },
                  { label: 'Degree', value: 'B.E in CE' },
                  { label: 'Focus', value: 'User Centric' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.3 + (idx * 0.1), duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col p-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-slate-900/5 hover:bg-white/40 transition-colors group cursor-pointer"
                  >
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 group-hover:text-slate-900 transition-colors">{stat.label}</span>
                    <span className="text-lg font-bold red-wine-text">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Decorative typography background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 opacity-[0.03] pointer-events-none z-0 overflow-hidden select-none">
        <h2 className="text-[20rem] font-black tracking-tighter whitespace-nowrap">
          ABOUT ME
        </h2>
      </div>
    </section>
  );
};

export default About;
