import React from 'react';

const About: React.FC = () => {
  const skills = ["React", "TypeScript", "Tailwind", "Node.js", "Three.js", "Gemini API", "UI/UX"];

  return (
    <div className="h-full flex flex-col justify-center items-center p-6 md:p-20 relative z-10 overflow-y-auto">
       <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center animate-float">
          
          {/* Profile Card / Image Area */}
          <div className="relative group">
             <div className="absolute inset-0 bg-anime-cyan transform translate-x-2 translate-y-2 rounded-lg opacity-50 transition-transform group-hover:translate-x-4 group-hover:translate-y-4"></div>
             <div className="relative bg-anime-deep/60 backdrop-blur-sm border-2 border-anime-sky p-8 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                {/* Abstract representation of user */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-anime-blue to-anime-cyan flex items-center justify-center shadow-[0_0_30px_rgba(79,176,229,0.6)]">
                    <span className="text-4xl font-bold text-anime-abyss">K</span>
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-xs text-anime-cyan">
                   STATUS: ONLINE<br/>
                   DEPTH: 120M
                </div>
             </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-left">
            <h3 className="text-3xl font-bold text-white border-l-4 border-anime-cyan pl-4">
              WHO AM I?
            </h3>
            <p className="text-anime-white/80 leading-relaxed text-justify">
              I am a creative developer obsessed with the intersection of design and code. 
              Like water, I adapt to any container, whether it's a complex enterprise application 
              or a minimalist creative portfolio. I believe in clean code, fluid animations, 
              and interfaces that breathe.
            </p>
            
            <div className="space-y-2">
              <h4 className="text-anime-sky font-bold tracking-widest text-sm uppercase">Tech Stack</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-anime-blue/30 border border-anime-sky/30 rounded text-sm text-anime-cyan hover:bg-anime-sky/20 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

       </div>
    </div>
  );
};

export default About;