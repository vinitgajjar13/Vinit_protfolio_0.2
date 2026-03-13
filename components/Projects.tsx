import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project, index }: { project: any, index: number, key?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define varied grid layouts for a bento box feel
  const gridClasses = [
    'md:col-span-2 md:row-span-2 h-[500px] md:h-auto', // Large primary card
    'md:col-span-1 md:row-span-1 h-[300px]',          // Small card
    'md:col-span-1 md:row-span-1 h-[300px]',          // Small card
    'md:col-span-1 md:row-span-2 h-[500px] md:h-auto', // Tall card
    'md:col-span-2 md:row-span-1 h-[300px]',          // Wide card
  ][index % 5] || 'md:col-span-1 md:row-span-1 h-[300px]';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${gridClasses} relative group overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-sm cursor-pointer`}
    >
      {/* Background Image with Reveal Effect */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={`https://picsum.photos/seed/${project.title}/1200/1200`}
          alt={project.title}
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? 'blur(0px) brightness(0.7)' : 'blur(0px) brightness(1)',
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md rounded-full border border-white/20">
            {project.category}
          </span>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#722F37] rounded-full">
            {project.subcategory}
          </span>
        </div>

        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
          {project.title}
        </h3>

        <p className="text-sm md:text-base text-slate-200 font-medium mb-6 line-clamp-2 md:line-clamp-none">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-bold text-slate-400 bg-white/10 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Mini Title for non-hovered state (Visible on Small Cards) */}
      <div className="absolute top-8 left-8 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <h4 className="text-xl font-black uppercase tracking-tight text-slate-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white shadow-xl">
          {project.title}
        </h4>
      </div>

      {/* Glassmorphic Arrow Icon */}
      <div className="absolute top-8 right-8 z-10 group-hover:bg-white group-hover:text-black w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Flutter', 'UI/UX Design', 'Web'];

  const allProjects = [
    {
      title: 'Mentor Website',
      category: 'Web',
      subcategory: 'Development',
      description: 'Leveraging expertise for a user-friendly online platform. Built from the ground up prioritizing speed and accessibility.',
      tags: ['Responsive', 'Training', 'Modern UI']
    },
    {
      title: 'Gurukrupa',
      category: 'UI/UX Design',
      subcategory: 'Prototyping',
      description: 'Shifting and Storage service website redesign with a primary focus on seamless user experience.',
      tags: ['Typography', 'Color Match', 'UX Research']
    },
    {
      title: 'Live News',
      category: 'Flutter',
      subcategory: 'Mobile App',
      description: 'Real-time information delivery application with categorized streams for crime and politics.',
      tags: ['API Fetch', 'Real-time', 'State Management']
    },
    {
      title: 'Vehicle Rental',
      category: 'Flutter',
      subcategory: 'Full-Stack',
      description: 'End-to-end rental application with secure Firebase data storage and tracking.',
      tags: ['Firebase', 'Auth', 'UI Animation']
    },
    {
      title: 'College Sync',
      category: 'Web',
      subcategory: 'Vue & Ionic',
      description: 'Comprehensive attendance and fee management system designed for academic institutions.',
      tags: ['Ionic Framework', 'VueJS', 'PWA']
    }
  ];

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-32 px-6 bg-[#F5F5F0] relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#722F37]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-black uppercase tracking-[0.4em] red-wine-text bg-[#722F37]/5 px-4 py-2 rounded-full mb-6 block w-fit">
              Selected Portfolio
            </span>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-slate-900">
              Creative <br />
              <span className="italic font-light serif text-[#722F37]">Showcase.</span>
            </h2>
          </motion.div>

          {/* Minimal Filter Toggles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-2xl border transition-all duration-300 ${
                  filter === cat 
                  ? 'bg-[#722F37] text-white border-[#722F37] shadow-xl shadow-[#722F37]/20 scale-105' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[#722F37] hover:text-[#722F37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
