
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text }: { text: string }) => {
  const characters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.01,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
      />
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      headline: "A MASTERCLASS IN UI FIDELITY",
      name: "John Smith",
      position: "Lead Developer @ TechCorp",
      quote: "Karshala's attention to detail in UI design is unparalleled. The way they bridge the gap between Figma and Flutter code is impressive. Every pixel serves a purpose in their work.",
      category: "PUBLIC OPINION",
      sourceIcon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      headline: "COLLABORATION AT ITS FINEST",
      name: "Sarah Jenkins",
      position: "Product Manager",
      quote: "A highly collaborative developer who understands the nuances of user experience. The 'Mentor Website' project was a major success thanks to their proactive approach and technical agility.",
      category: "EDITORIAL",
      sourceIcon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      headline: "THE FUTURE OF MOBILE DESIGN",
      name: "Raj Patel",
      position: "Senior Designer",
      quote: "Reliable, creative, and technically sound. Karshala is definitely one of the most promising junior designers in the Ahmedabad region. Their grasp of Flutter lifecycle is rare for this stage.",
      category: "LETTERS TO THE EDITOR",
      sourceIcon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-[#FDF5E6] relative overflow-hidden border-t-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-16 items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] red-wine-text mb-2">Social Proof</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center">In The Press</h2>
          <div className="h-1 w-24 red-wine-bg mt-6" />
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl mx-auto"
              >
                {/* Vintage Newspaper Card Design */}
                <div className="p-8 md:p-14 border-4 red-wine-border bg-white shadow-[15px_15px_0px_0px_rgba(114,47,55,0.05)] relative overflow-hidden">
                  
                  {/* Category Label - Styled like a corner badge */}
                  <div className="absolute top-0 right-0 p-4 bg-[#722F37] text-[#FDF5E6] text-[9px] font-black uppercase tracking-widest shadow-md">
                    {testimonials[currentIndex].category}
                  </div>
                  
                  {/* Decorative newspaper header details */}
                  <div className="flex justify-between items-center mb-10 border-b-2 border-slate-900/10 pb-4">
                    <span className="text-[11px] font-black tracking-widest text-slate-400">ARCHIVE VOL. 2025</span>
                    <span className="text-[11px] font-black tracking-widest text-slate-400">LATEST DISPATCHES</span>
                  </div>

                  <div className="mb-10">
                    <motion.h3 
                      initial={{ opacity: 0, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 red-wine-text leading-[0.9] border-l-4 red-wine-border pl-6"
                      style={{ willChange: "filter, opacity" }}
                    >
                      {testimonials[currentIndex].headline}
                    </motion.h3>
                    
                    <div className="text-xl md:text-3xl text-slate-800 italic leading-snug font-medium mb-10">
                      <TypewriterText text={testimonials[currentIndex].quote} />
                    </div>
                  </div>

                  <div className="pt-10 border-t-2 border-slate-900/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-[#E8DCC4] flex items-center justify-center red-wine-text border-2 red-wine-border shadow-inner">
                        {testimonials[currentIndex].sourceIcon}
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-tighter text-lg flex items-center gap-3">
                          {testimonials[currentIndex].name}
                          <span className="opacity-30 text-slate-400">/</span>
                          <span className="red-wine-text text-sm tracking-widest">{testimonials[currentIndex].sourceIcon}</span>
                        </h4>
                        <p className="text-xs text-slate-500 font-bold uppercase mt-1 tracking-widest">
                          {testimonials[currentIndex].position}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-sm">
                      <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                      <span className="text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase">Verified Dispatch</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls - Vintage Styling */}
          <div className="flex justify-center items-center mt-14 gap-12">
            <motion.button
              whileHover={{ scale: 1.1, x: -10, backgroundColor: '#722F37', color: '#FDF5E6' }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-14 h-14 border-2 red-wine-border flex items-center justify-center red-wine-text transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <div className="flex gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentIndex === i ? 'bg-[#722F37] w-12' : 'bg-slate-300 w-2 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 10, backgroundColor: '#722F37', color: '#FDF5E6' }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-14 h-14 border-2 red-wine-border flex items-center justify-center red-wine-text transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Newspaper texture overlays for realism */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />
    </section>
  );
};

export default Testimonials;
