
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cursor from './components/Cursor';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen">
      <Cursor />
      <Helmet>
        <title>Karshala Vinit | Senior UI/UX Designer & Mobile Developer</title>
        <meta name="description" content="Portfolio of Karshala Vinit - Senior UI/UX Designer and Mobile Developer specializing in Flutter and modern digital experiences." />
        <link rel="canonical" href="https://ais-dev-eyshe6llxgnjo5b7apxwfr-385159766367.asia-east1.run.app" />
      </Helmet>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 red-wine-bg z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Testimonials />
        <Certificates />
        <Contact />
      </main>

      {/* Decorative side borders for that "newspaper page" feel on large screens */}
      <div className="hidden lg:block fixed top-0 left-0 w-4 h-full bg-[#E8DCC4] border-r border-slate-300 pointer-events-none z-40 opacity-50" />
      <div className="hidden lg:block fixed top-0 right-0 w-4 h-full bg-[#E8DCC4] border-l border-slate-300 pointer-events-none z-40 opacity-50" />
    </div>
  );
};

export default App;
