
import React from 'react';
import { motion } from 'framer-motion';

const Certificates: React.FC = () => {
  const certs = [
    { title: 'UI/UX', issuer: 'My GreatLearning' },
    { title: 'Digital Marketing', issuer: 'Google' },
    { title: 'Generative AI', issuer: 'Data bricks Academic' },
    { title: 'Info Security', issuer: 'Infosys | Springboard' },
    { title: 'Azure Administrator', issuer: 'Microsoft Az-104' },
    { title: 'SAP', issuer: 'Machine Learning, AI' }
  ];

  return (
    <section className="py-24 bg-[#E8DCC4] border-t-4 border-b-4 red-wine-border px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Certificates */}
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 border-b-2 border-slate-400 pb-4">
              Credentials
            </h2>
            <div className="space-y-6">
              {certs.map((c, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between items-end border-b border-slate-300 pb-2 hover:red-wine-text transition-colors cursor-default"
                >
                  <span className="text-xl font-bold uppercase">{c.title}</span>
                  <span className="text-xs font-bold text-slate-500 italic uppercase">{c.issuer}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Hobbies */}
          <div className="flex flex-col gap-12">
             <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-2 border-slate-400 pb-4">
                Education
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black">B.E IN CE (2022-2025)</h3>
                  <p className="text-sm font-bold red-wine-text uppercase">Shree Swaminarayan Institute of Technology</p>
                </div>
                <div>
                  <h3 className="text-xl font-black">HSC SCIENCE (2020-2021)</h3>
                  <p className="text-sm font-bold red-wine-text uppercase">A Success English School, Jetpur</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-2 border-slate-400 pb-4">
                Beyond Work
              </h2>
              <div className="flex flex-wrap gap-4">
                {['Reading Books', 'New Skills', 'Traveling', 'Design Exploration'].map(h => (
                  <span key={h} className="px-6 py-2 border-2 red-wine-border font-bold uppercase text-xs">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
