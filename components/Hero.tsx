import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Typewriter = ({ words, delay = 2000, typeSpeed = 100, deleteSpeed = 50 }: { words: string[], delay?: number, typeSpeed?: number, deleteSpeed?: number }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const word = words[currentWordIndex];
    
    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        timeout = setTimeout(() => {}, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (currentText === word) {
        timeout = setTimeout(() => setIsDeleting(true), delay);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(word.slice(0, currentText.length + 1));
        }, typeSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, delay, typeSpeed, deleteSpeed]);

  return (
    <span className="inline-block relative">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle translate-y-[-1px]"
      />
    </span>
  );
};

const FloatingElement = ({ children, delay = 0, duration = 5, x = 0, y = 0 }: { children: React.ReactNode, delay?: number, duration?: number, x?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.1, 1],
      x: [x, x + 20, x],
      y: [y, y - 20, y],
    }}
    transition={{ 
      duration, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    className="absolute pointer-events-none z-0"
    style={{ willChange: "transform, opacity" }}
  >
    {children}
  </motion.div>
);

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  // Enhanced Parallax setup
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]); // Moved further
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]); // Moved further opposite
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      }
    }
  };

  // Blur-to-focus for the main title
  const titleVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-6 bg-[#FDF5E6]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Floating Decorative UI Elements with Parallax Background Layer */}
      <motion.div style={{ y: useTransform(scrollY, [0, 1000], [0, 200]), willChange: "transform" }} className="absolute inset-0 pointer-events-none z-0">
        <FloatingElement delay={0} duration={6} x={100} y={100}>
          <div className="w-32 h-32 border-2 border-slate-900/10 rounded-2xl rotate-12" />
        </FloatingElement>
        <FloatingElement delay={1} duration={8} x={-200} y={300}>
          <div className="w-20 h-20 bg-[#722F37]/5 rounded-full" />
        </FloatingElement>
        <FloatingElement delay={2} duration={7} x={400} y={-100}>
          <div className="w-40 h-12 border-2 border-slate-900/10 rounded-full -rotate-6" />
        </FloatingElement>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        
        {/* Main Bento Card - Identity */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-8 bg-white border-2 border-slate-900 rounded-[2rem] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(114,47,55,1)] relative overflow-hidden group"
        >
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Available for Jobs</span>
            </motion.div>

            <motion.h1 
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.85] mb-8 uppercase"
              style={{ willChange: "transform, opacity, filter" }}
            >
              Karshala <br />
              <motion.span 
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="red-wine-text bg-gradient-to-r from-[#722F37] via-[#a64450] to-[#722F37] bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                Vinit
              </motion.span>
            </motion.h1>

            <div className="flex flex-wrap gap-4 mb-12 h-10 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="px-5 py-2.5 bg-slate-100/80 backdrop-blur-sm rounded-full text-xs md:text-sm font-bold uppercase tracking-widest text-slate-600 border border-slate-200 cursor-default flex items-center shadow-sm"
              >
                <span className="opacity-50 mr-2">ROLE:</span>
                <span className="red-wine-text min-w-[180px]">
                  <Typewriter words={['UI/UX Designer', 'Flutter Developer', 'Problem Solver']} />
                </span>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-6">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#5a252c" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 red-wine-bg text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl flex items-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="text-lg relative z-10">→</span>
                <motion.div 
                  className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  style={{ skewX: -20 }}
                />
              </motion.button>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, x: 5 }}
                className="px-10 py-5 border-2 border-slate-900 text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl flex items-center gap-3 hover:bg-slate-50 transition-colors"
              >
                View Projects
              </motion.a>
            </div>
          </div>

          {/* Decorative Background Text */}
          <motion.div 
            style={{ y: y1, willChange: "transform" }}
            className="absolute -bottom-10 -right-10 text-[15rem] font-black text-slate-50 opacity-[0.03] select-none pointer-events-none"
          >
            VINIT
          </motion.div>
        </motion.div>

        {/* Side Bento Card - Profile Image */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-4 bg-[#E8DCC4] border-2 border-slate-900 rounded-[2rem] overflow-hidden relative group shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
        >
          <motion.div style={{ y: y2, willChange: "transform" }} className="w-full h-full">
            <img 
              src="assets/vinit.png" 
              alt="Portrait" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/40 backdrop-blur-md border-t border-white/10 ">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-white font-black uppercase tracking-[0.2em] text-[9px] opacity-70">Location</span>
            </div>
            <h4 className="text-white font-bold text-sm mb-1">Ahmedabad, India</h4>
            <p className="text-white/60 text-[10px] italic leading-tight">"Designing the future, one pixel at a time."</p>
          </div>
        </motion.div>

        {/* Bottom Bento Card - Tech Stack / Specs */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-4 bg-slate-900 border-2 border-slate-900 rounded-[2rem] p-8 text-white shadow-[8px_8px_0px_0px_rgba(114,47,55,0.2)]"
        >
          <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Tech Specs</h3>
          <div className="space-y-4">
            {[
              { label: 'Framework', value: 'Flutter / Dart' },
              { label: 'Design', value: 'Figma / Adobe' },
              { label: 'Backend', value: 'Firebase / Node' },
              { label: 'Web', value: 'React / Vue' }
            ].map((spec, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex justify-between items-center border-b border-white/10 pb-2"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{spec.label}</span>
                <span className="text-sm font-bold">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bento Card - Interactive Quote/Mission */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-5 bg-[#722F37] border-2 border-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group"
        >
          <div className="relative z-10">
            <motion.svg 
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-10 h-10 text-white/20 mb-4" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L21.017 3V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C8.56888 16 9.0166 15.5523 9.0166 15V9C9.0166 8.44772 8.56888 8 8.0166 8H5.0166C3.91203 8 3.0166 7.10457 3.0166 6V3L10.0166 3V15C10.0166 18.3137 7.3303 21 4.0166 21H3.0166Z" />
            </motion.svg>
            <p className="text-xl md:text-2xl font-light italic leading-relaxed">
              "Creating digital products that feel as good as they look."
            </p>
          </div>
          <motion.div 
            style={{ rotate, willChange: "transform" }}
            className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" 
          />
        </motion.div>

        {/* Bottom Bento Card - Quick Stats */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-3 bg-white border-2 border-slate-900 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
        >
          <div className="mb-4">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-4xl font-black red-wine-text"
            >
              3+
            </motion.span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Months Experience</span>
          </div>
          <div className="w-full h-px bg-slate-100 my-4" />
          <div>
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-black red-wine-text"
            >
              10+
            </motion.span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Projects Completed</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
