import React from 'react';
import { Project } from '../../types';

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'NEURAL.OCEAN',
      description: 'A data visualization dashboard for marine biology research using D3.js and React.',
      tech: ['React', 'D3.js', 'Node'],
    },
    {
      id: '2',
      title: 'SKY_PIERCER',
      description: 'Vertical scrolling game engine built with WebGL and minimal assets.',
      tech: ['WebGL', 'TypeScript', 'Vite'],
    },
    {
      id: '3',
      title: 'GEMINI.CHAT',
      description: 'Custom AI interface leveraging the latest Gemini models for real-time coding assistance.',
      tech: ['Gemini API', 'Next.js', 'Tailwind'],
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center p-6 md:px-20 pt-24 relative z-10 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto w-full">
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tighter opacity-90">
          SELECTED_WORKS <span className="text-anime-cyan text-lg md:text-2xl align-top">03</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className="group relative bg-anime-deep/40 backdrop-blur-md border border-anime-sky/20 p-6 rounded-xl hover:bg-anime-deep/60 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
               {/* Hover Fill Effect */}
               <div className="absolute inset-0 bg-gradient-to-br from-anime-sky/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               {/* Number */}
               <div className="absolute -top-4 -right-4 text-6xl font-black text-white/5 group-hover:text-anime-cyan/10 transition-colors">
                 0{idx + 1}
               </div>

               <div className="relative z-10">
                 <div className="flex flex-wrap gap-2 mb-4">
                   {project.tech.map(t => (
                     <span key={t} className="text-[10px] uppercase tracking-wider bg-anime-abyss/50 text-anime-sky px-2 py-1 rounded">
                       {t}
                     </span>
                   ))}
                 </div>
                 <h4 className="text-xl font-bold text-white mb-3 group-hover:text-anime-cyan transition-colors">
                   {project.title}
                 </h4>
                 <p className="text-sm text-anime-white/70 leading-relaxed">
                   {project.description}
                 </p>
                 
                 <div className="mt-6 flex items-center text-anime-cyan text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    VIEW CASE STUDY <span className="ml-2">→</span>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;