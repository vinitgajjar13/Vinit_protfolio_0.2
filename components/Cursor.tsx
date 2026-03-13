import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

const Cursor: React.FC = () => {
  const [hoverType, setHoverType] = useState<'none' | 'link' | 'project'>('none');
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity tracking
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);
  
  // Calculate total velocity for stretching
  const combinedVelocity = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    return Math.sqrt(Math.pow(Number(vx), 2) + Math.pow(Number(vy), 2));
  });

  // Transform velocity into scale and rotation
  const stretch = useTransform(combinedVelocity, [0, 3000], [1, 2.5]);
  const angle = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    return Math.atan2(Number(vy), Number(vx)) * (180 / Math.PI);
  });

  // Springs for smooth movement
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const moveMouse = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setHoverType('link');
      } else if (target.closest('.group') || target.closest('[id="projects"]')) {
        setHoverType('project');
      } else {
        setHoverType('none');
      }
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseenter', () => setIsVisible(true));
    window.addEventListener('mouseleave', () => setIsVisible(false));

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.style.cursor = 'auto';
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* Liquid Gooey Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" 
              result="liquid" 
            />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: 'url(#liquid-filter)' }} className="w-full h-full relative">
        {/* Main Trailing Liquid Body */}
        <motion.div
          className="absolute bg-white mix-blend-difference"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            width: 32,
            height: 32,
            borderRadius: '50%',
            opacity: isVisible ? 1 : 0,
            scaleX: stretch,
            rotate: angle,
          }}
          animate={{
            scale: hoverType === 'link' ? 3 : hoverType === 'project' ? 4 : 1,
            backgroundColor: hoverType === 'link' ? '#fff' : '#fff',
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Inner Core Dot (stays more localized) */}
        <motion.div
           className="absolute bg-white mix-blend-difference rounded-full"
           style={{
             x: mouseX,
             y: mouseY,
             translateX: '-50%',
             translateY: '-50%',
             width: 8,
             height: 8,
             opacity: isVisible ? 0.8 : 0,
           }}
           animate={{
             scale: hoverType !== 'none' ? 0 : 1,
           }}
        />
        
        {/* Extra "Drip" for faster movements */}
        <motion.div
           className="absolute bg-white/40 mix-blend-difference rounded-full"
           style={{
              x: useSpring(mouseX, { damping: 45, stiffness: 200, mass: 1 }),
              y: useSpring(mouseY, { damping: 45, stiffness: 200, mass: 1 }),
              translateX: '-50%',
              translateY: '-50%',
              width: 16,
              height: 16,
           }}
        />
      </div>

      {/* Non-Filter Labels (Text and Icons) */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center font-black uppercase text-white mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 80,
          height: 80,
        }}
      >
        <AnimatePresence>
          {hoverType === 'project' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 10 }}
              className="flex flex-col items-center gap-1"
            >
              
              
            </motion.div>
          )}
          {hoverType === 'link' && (
             <motion.div
               initial={{ rotate: -45, scale: 0 }}
               animate={{ rotate: 0, scale: 1 }}
               exit={{ rotate: 45, scale: 0 }}
             >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17l10-10M7 7h10v10" />
                </svg>
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Cursor;
