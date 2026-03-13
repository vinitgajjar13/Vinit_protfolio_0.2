
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socials = [
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'Figma', 
      url: 'https://figma.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24c-3.315 0-6-2.685-6-6 0-2.32 1.32-4.322 3.26-5.325-1.94-1.003-3.26-3.005-3.26-5.325 0-3.315 2.685-6 6-6s6 2.685 6 6c0 2.32-1.32 4.322-3.26 5.325 1.94 1.003 3.26 3.005 3.26 5.325 0 3.315-2.685-6-6 6zM9 18c0 1.655 1.345 3 3 3s3-1.345 3-3-1.345-3-3-3-3 1.345-3 3zM9 12.675c0 1.655 1.345 3 3 3s3-1.345 3-3-1.345-3-3-3-3 1.345-3 3zM9 7.35c0 1.655 1.345 3 3 3s3-1.345 3-3-1.345-3-3-3-3 1.345-3 3z"/>
        </svg>
      )
    }
  ];

  return (
    <footer id="contact" className="pt-24 pb-12 px-6 bg-[#F5F5DC]/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter red-wine-text leading-none mb-8 cursor-default"
            style={{ willChange: "transform, opacity, filter" }}
          >
            Let's Talk
          </motion.h2>
          <p className="text-xl italic text-slate-600 max-w-xl mb-12">
            Passionate about bringing ideas to life through code and design. Reach out for collaborations or just a friendly chat.
          </p>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#722F37",
              color: "#FDF5E6",
              boxShadow: "0px 10px 30px rgba(114, 47, 55, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 red-wine-border red-wine-text font-black uppercase tracking-[0.3em] text-[10px] md:text-xs transition-all flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Final Call for Archive: Download CV
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-b-4 red-wine-border py-12 mb-12">
          <motion.div whileHover={{ y: -5 }} className="transition-all">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Location Archive</h4>
            <p className="text-lg font-bold">Ahmedabad, Gujarat, India</p>
            <p className="text-sm text-slate-500">D-201, Kavisha Celebration, South Bopal</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -5 }} className="transition-all">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Direct Wire</h4>
            <p className="text-lg font-bold red-wine-text">+91 8799445757</p>
            <motion.a 
              href="mailto:karshalavinit1289@gmail.com"
              whileHover={{ x: 5 }}
              className="text-lg font-bold block hover:red-wine-text transition-colors"
            >
              karshalavinit1289@gmail.com
            </motion.a>
          </motion.div>

          <div className="flex flex-col justify-end items-end">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Social Archives</h4>
            <div className="flex gap-6">
              {socials.map(social => (
                <motion.a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.2, color: '#722F37' }}
                  whileTap={{ scale: 0.9 }}
                  className="text-slate-600 hover:text-red-wine-text transition-all flex flex-col items-center gap-1 group"
                  aria-label={social.name}
                >
                  {social.icon}
                  <span className="text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 gap-4">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full red-wine-bg" />
             <span>&copy; {currentYear} KARSHALA VINIT PORTFOLIO</span>
          </div>
          <span className="hidden md:block">UI/UX & MOBILE DEVELOPER EDITION — VOL. 2025</span>
          <motion.span 
            whileHover={{ letterSpacing: '0.6em' }}
            className="transition-all cursor-default text-red-wine-text"
          >
            STAMP OF QUALITY
          </motion.span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
