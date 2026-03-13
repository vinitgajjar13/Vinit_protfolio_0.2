
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Skills: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const skillGroups = [
    { 
      category: 'Programming', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
      items: ['HTML', 'CSS', 'Flutter', 'Dart', 'Node.js', 'React.js', 'TypeScript'] 
    },
    { 
      category: 'Design', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>,
      items: ['Figma', 'UI Design', 'UX Research', 'Responsive Design', 'Wireframing'] 
    },
    { 
      category: 'Tools', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>,
      items: ['VS Code', 'Jupyter', 'Android Studio', 'Postman', 'Git & GitHub'] 
    },
    { 
      category: 'Core Skills', 
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      items: ['Leadership', 'Communication', 'Time Management', 'Problem Solving', 'Agile'] 
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-[#FDF5E6] relative border-b-2 border-slate-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b-2 red-wine-border">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 block">capabilities</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter red-wine-text">Expertise Index</h2>
          </div>
          <p className="text-sm font-bold max-w-xs text-right hidden md:block text-slate-500 uppercase tracking-widest leading-tight">
            Comprehensive knowledge in <span className="red-wine-text">mobile ecosystems</span> and modern web standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Interactive Tab List */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {skillGroups.map((group, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={group.category}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left w-full relative overflow-hidden group border-2 transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#722F37] border-[#722F37] text-[#FDF5E6] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] scale-[1.02]' 
                      : 'bg-transparent border-slate-300 text-slate-600 hover:border-[#722F37] hover:bg-[#722F37]/5'
                  }`}
                >
                  <div className="px-6 py-5 flex items-center justify-between relative z-10 text-xl font-black uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                      <motion.span 
                        animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={isActive ? { duration: 0.5 } : {}}
                        className={`transition-colors ${isActive ? 'text-[#FDF5E6]' : 'text-[#722F37] group-hover:text-[#722F37]'}`}
                      >
                        {group.icon}
                      </motion.span>
                      <span>{group.category}</span>
                    </div>
                    {/* Active Indicator Arrow */}
                    <span className={`text-2xl transition-transform duration-500 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                      →
                    </span>
                  </div>
                  
                  {/* Subtle Background pattern for active state */}
                  {isActive && (
                    <div className="absolute inset-0 opacity-10 pointer-events-none newspaper-texture" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Animated Content Panel */}
          <div className="lg:col-span-8 bg-white border-2 red-wine-border rounded-sm p-8 md:p-12 shadow-[15px_15px_0px_0px_rgba(114,47,55,0.05)] relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
                style={{ willChange: "transform, opacity, filter" }}
              >
                
                <div className="flex items-center gap-4 mb-10 border-b border-slate-200 pb-6">
                  <span className="p-3 bg-[#722F37] text-white rounded-md shadow-inner">
                    {skillGroups[activeIndex].icon}
                  </span>
                  <div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Vol. {activeIndex + 1} / 4</span>
                     <h3 className="text-3xl font-black uppercase tracking-tight red-wine-text">{skillGroups[activeIndex].category}</h3>
                  </div>
                </div>

                <motion.ul 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {skillGroups[activeIndex].items.map((skill, idx) => (
                    <motion.li
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-center text-lg font-bold text-slate-700 group cursor-default"
                    >
                      <span className="w-8 flex-shrink-0 text-slate-300 font-mono text-xs hidden sm:inline-block">
                        {(idx + 1).toString().padStart(2, '0')}.
                      </span>
                      <motion.div 
                        whileHover={{ scale: 1.5 }}
                        className="w-2 h-2 red-wine-bg mr-4 transition-colors group-hover:bg-slate-900" 
                      />
                      <span className="group-hover:translate-x-2 group-hover:red-wine-text transition-all duration-300">
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

              </motion.div>
            </AnimatePresence>
            
            {/* Vintage Overlay Noise */}
            <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] bg-[#000]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
