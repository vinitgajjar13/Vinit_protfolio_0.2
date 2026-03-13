import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const menuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -20 },
    open: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="fixed top-4 md:top-6 left-0 w-full z-50 px-4 md:px-6 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`pointer-events-auto flex items-center justify-between md:justify-start gap-2 md:gap-8 px-4 md:px-8 py-3 rounded-full border transition-all duration-500 w-full max-w-4xl ${
          scrolled || isOpen
            ? 'bg-[#FDF5E6]/90 backdrop-blur-xl shadow-2xl border-[#722F37]/20 py-2' 
            : 'bg-[#FDF5E6]/40 backdrop-blur-sm border-transparent'
        }`}
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="text-xl font-black tracking-tighter red-wine-text mr-0 md:mr-4 cursor-default z-50"
        >
          K.V
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center flex-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-xs font-bold tracking-widest uppercase hover:red-wine-text transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 red-wine-bg transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle & Actions */}
        <div className="flex items-center gap-2 md:gap-4 z-50">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: "#5a252c" }}
            whileTap={{ scale: 0.98 }}
            className="px-4 md:px-6 py-2 red-wine-bg text-[#FDF5E6] rounded-full text-[10px] md:text-xs font-black tracking-widest shadow-lg transition-colors"
          >
            HIRE
          </motion.a>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 red-wine-bg rounded-full origin-center transition-transform duration-300"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 red-wine-bg rounded-full transition-opacity duration-300"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 red-wine-bg rounded-full origin-center transition-transform duration-300"
            />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-full left-0 right-0 mt-4 mx-4 p-6 bg-[#FDF5E6] border border-[#722F37]/20 rounded-3xl shadow-2xl md:hidden flex flex-col gap-4 z-40"
            >
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-black uppercase tracking-tighter red-wine-text border-b border-[#722F37]/5 pb-2 hover:pl-2 transition-all"
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
