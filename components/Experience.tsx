import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Experience: React.FC = () => {
  const experiences = [
    {
      id: 1,
      company: 'INFOLABZ IT SERVICES PVT. LTD.',
      role: 'Flutter Internship',
      duration: 'Jan 2025 – Apr 2025',
      location: 'Ahmedabad',
      points: [
        '3 Month Internship covering fundamentals of Flutter and Dart.',
        'Worked on API integration and Postman testing.',
        'Created diverse Flutter projects during the tenure.',
        'Explored backend technologies like Node.js.'
      ],
      skills: ['Flutter', 'Dart', 'API Integration', 'Postman']
    },
    {
      id: 2,
      company: 'INFOLABZ IT SERVICES PVT. LTD.',
      role: 'Flutter Internship',
      duration: 'Jun 2024 - Jul 2024',
      location: 'Online',
      points: [
        '15 Days intensive Dart programming.',
        'Worked on JSON structures and API fetching.',
        'Participated in code reviews for quality standards.',
        'Gained understanding of mobile lifecycle best practices.'
      ],
      skills: ['Dart', 'JSON', 'Code Review', 'Lifecycle']
    }
  ];

  const [expandedId, setExpandedId] = useState<number | null>(experiences[0].id);

  return (
    <section id="experience" className="py-32 bg-[#E8DCC4] relative overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.04] bg-[#000]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 pb-8 border-b-2 border-slate-900/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-sm font-black uppercase tracking-[0.4em] text-slate-500 mb-4 block">
              Professional Journey
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
              Career <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#722F37] to-[#A0525C]">Archive</span>
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm font-bold max-w-xs text-right hidden md:block text-slate-600 uppercase tracking-widest leading-relaxed mt-8 md:mt-0"
          >
            A chronological record of <br className="hidden lg:block"/>
            <span className="red-wine-text">technical roles</span> & contributions.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline central line */}
          <div className="absolute left-0 md:left-[20%] top-0 bottom-0 w-px bg-slate-900/10 hidden md:block"></div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => {
              const isExpanded = expandedId === exp.id;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 transition-all duration-500 ${isExpanded ? 'bg-white/40 shadow-sm border border-white/50 rounded-2xl p-6 md:p-8' : 'p-6 hover:bg-white/20 rounded-2xl cursor-pointer border border-transparent hover:border-white/30'}`}
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  {/* Timeline dot */}
                  <div className={`hidden md:flex absolute left-[20%] -translate-x-1/2 ${isExpanded ? 'top-10' : 'top-8 md:top-10'} w-4 h-4 rounded-full border-4 border-[#E8DCC4] bg-[#722F37] shadow-sm z-10 transition-all duration-300 ${!isExpanded ? 'group-hover:scale-150' : 'scale-125'} justify-center items-center`}>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>

                  {/* Left col: Date & Location */}
                  <div className="md:col-span-3 md:text-right pt-2 md:pr-12 md:pt-4">
                    <div className="flex flex-col md:items-end gap-1">
                      <span className={`text-base font-black uppercase tracking-widest transition-colors ${isExpanded ? 'text-[#722F37]' : 'text-slate-600 group-hover:text-[#722F37]'}`}>
                        {exp.duration}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center md:justify-end gap-1 mt-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Right col: Content */}
                  <div className="md:col-span-9">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-tight transition-colors duration-300 ${isExpanded ? 'text-[#722F37]' : 'text-slate-900 group-hover:text-[#722F37]'}`}>
                          {exp.role}
                        </h3>
                        <h4 className="text-lg md:text-xl font-bold text-slate-700 italic mt-2">
                          {exp.company}
                        </h4>
                      </div>
                      
                      <motion.div 
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isExpanded ? 'bg-[#722F37] text-white' : 'bg-white/50 text-[#722F37] group-hover:bg-[#722F37] group-hover:text-white'}`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 pb-2">
                            <div className="h-px w-full bg-slate-900/10 mb-6" />
                            <ul className="grid gap-4">
                              {exp.points.map((point, pIdx) => (
                                <motion.li
                                  key={pIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: pIdx * 0.1 }}
                                  className="text-slate-800 md:text-lg flex items-start gap-4 leading-relaxed font-medium"
                                >
                                  <span className="text-[#722F37] font-bold mt-1 shrink-0">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  </span>
                                  {point}
                                </motion.li>
                              ))}
                            </ul>
                            
                            {/* Skills Tag Section */}
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.4 }}
                              className="mt-8 flex flex-wrap gap-2"
                            >
                              {exp.skills.map((skill, sIdx) => (
                                <span key={sIdx} className="px-3 py-1.5 bg-white/60 border border-slate-900/10 rounded-full text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm hover:bg-white transition-colors cursor-default">
                                  {skill}
                                </span>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
