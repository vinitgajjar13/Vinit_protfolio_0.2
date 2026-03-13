import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const Cursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the main dot (fast) and the follower blob (slower for the gooey effect)
  const mainX = useSpring(mouseX, { damping: 25, stiffness: 400, mass: 0.1 });
  const mainY = useSpring(mouseY, { damping: 25, stiffness: 400, mass: 0.1 });
  
  const blobX = useSpring(mouseX, { damping: 15, stiffness: 150, mass: 0.8 });
  const blobY = useSpring(mouseY, { damping: 15, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const updateMousePosition = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      
      document.documentElement.style.cursor = '';
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* SVG gooey filter definition */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" 
              result="goo" 
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <motion.div 
        className="fixed pointer-events-none z-[9999] hidden md:block mix-blend-difference text-white"
        style={{ 
          filter: "url(#goo)",
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: 100,
          height: 100,
          willChange: 'transform'
        }}
      >
        {/* Follower Blob */}
        <motion.div
          className="absolute bg-white rounded-full top-1/2 left-1/2"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            width: 24,
            height: 24,
            opacity: isVisible ? 1 : 0,
            willChange: 'transform, opacity'
          }}
          animate={{
            scale: isHovering ? 2.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Main Dot */}
        <motion.div
          className="absolute bg-white rounded-full top-1/2 left-1/2"
          style={{
            x: useSpring(useMotionValue(0), { damping: 25, stiffness: 400, mass: 0.1 }), // Offset for main dot
            y: useSpring(useMotionValue(0), { damping: 25, stiffness: 400, mass: 0.1 }),
            translateX: '-50%',
            translateY: '-50%',
            width: 12,
            height: 12,
            opacity: isVisible ? 1 : 0,
            willChange: 'transform, opacity'
          }}
          animate={{
            scale: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Explore / View Label - outside filter so text doesn't get gooey/unreadable */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference text-[#FDF5E6] hidden md:flex items-center justify-center font-bold text-[10px] uppercase tracking-wider"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: 60,
          height: 60,
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
             
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Cursor;
