
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`pointer-events-auto flex items-center gap-2 md:gap-8 px-4 md:px-8 py-3 rounded-full border transition-all duration-500 ${
          scrolled 
            ? 'bg-[#FDF5E6]/80 backdrop-blur-xl shadow-2xl border-[#722F37]/20 py-2' 
            : 'bg-[#FDF5E6]/40 backdrop-blur-sm border-transparent'
        }`}
      >
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="text-xl font-black tracking-tighter red-wine-text mr-2 md:mr-4 cursor-default"
        >
          K.V
        </motion.div>
        
        <div className="flex gap-4 md:gap-8 items-center">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-[10px] md:text-xs font-bold tracking-widest uppercase hover:red-wine-text transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 red-wine-bg transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "#5a252c",
            boxShadow: "0px 10px 20px rgba(114, 47, 55, 0.3)" 
          }}
          whileTap={{ scale: 0.98 }}
          className="ml-2 md:ml-4 px-4 md:px-6 py-2 red-wine-bg text-[#FDF5E6] rounded-full text-[10px] md:text-xs font-black tracking-widest shadow-lg transition-colors"
        >
          HIRE
        </motion.a>
      </motion.nav>
    </div>
  );
};

export default Navbar;
