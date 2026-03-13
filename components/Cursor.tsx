import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform, AnimatePresence } from 'framer-motion';

const Cursor: React.FC = () => {
  const [hoverType, setHoverType] = useState<'none' | 'link' | 'project'>('none');
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Velocity for orbital expansion
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);
  const combinedVelocity = useTransform([xVelocity, yVelocity], ([vx, vy]) => {
    return Math.sqrt(Math.pow(Number(vx), 2) + Math.pow(Number(vy), 2));
  });

  // Calculate orbital radius based on speed (max 100px)
  const baseRadius = useTransform(combinedVelocity, [0, 3000], [20, 100]);
  const smoothRadius = useSpring(baseRadius, { damping: 30, stiffness: 200 });

  // Core movement springs
  const coreSpring = { damping: 30, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, coreSpring);
  const smoothY = useSpring(mouseY, coreSpring);

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

  // Render 3 orbiting satellites
  const satellites = [0, 120, 240];

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* The Gravity Core (Singularity) */}
      <motion.div
        className="absolute bg-[#722F37] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 9.1, // Increased by ~13% (from 8 to 9.1)
          height: 9.1,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: hoverType === 'link' ? 0.5 : 1,
        }}
      />

      {/* Orbital Container (Rotates automatically) */}
      <motion.div
        className="absolute"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 200,
          height: 200,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: hoverType === 'project' ? 1.5 : 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {satellites.map((angle) => (
          <motion.div
            key={angle}
            className="absolute top-1/2 left-1/2 bg-[#722F37] rounded-full"
            style={{
              width: 6,
              height: 6,
              opacity: isVisible ? 0.6 : 0,
            }}
            animate={{
              // Orbit radius changes based on context and velocity
              x: hoverType === 'link' ? 12 * Math.cos(angle * (Math.PI / 180)) : 
                 hoverType === 'project' ? 80 * Math.cos(angle * (Math.PI / 180)) : 
                 smoothRadius.get() * Math.cos(angle * (Math.PI / 180)),
              y: hoverType === 'link' ? 12 * Math.sin(angle * (Math.PI / 180)) : 
                 hoverType === 'project' ? 80 * Math.sin(angle * (Math.PI / 180)) : 
                 smoothRadius.get() * Math.sin(angle * (Math.PI / 180)),
              scale: hoverType === 'link' ? 0.8 : 1,
              filter: hoverType === 'project' ? 'blur(2px)' : 'blur(0px)',
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200
            }}
          />
        ))}

        {/* Dynamic Connected Ring for Links */}
        <AnimatePresence>
          {hoverType === 'link' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#722F37] rounded-full"
              style={{ width: 32, height: 32 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Vortex Aura for Projects */}
      <AnimatePresence>
        {hoverType === 'project' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#722F37] rounded-full blur-3xl"
            style={{ x: smoothX, y: smoothY }}
          />
        )}
      </AnimatePresence>
      
      {/* Minimalist Label Offset */}
      <motion.div
        className="absolute top-10 left-10 text-[#722F37] font-black text-[8px] uppercase tracking-[0.5em] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: 40,
        }}
      >
        <AnimatePresence>
          {hoverType === 'project' && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Entering Vertex
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Cursor;
