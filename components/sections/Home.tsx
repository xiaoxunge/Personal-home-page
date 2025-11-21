import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-6 relative z-10">
      <div className="animate-float">
        <h2 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-anime-sky mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
          FLOW STATE
        </h2>
        <p className="text-lg md:text-2xl text-anime-cyan/80 tracking-[0.2em] font-light uppercase bg-anime-abyss/30 p-2 px-6 rounded-full backdrop-blur-sm inline-block border border-anime-sky/20">
          Full Stack Engineer & Designer
        </p>
      </div>
      
      <div className="mt-16 animate-float-delayed opacity-80">
        <p className="text-anime-white/60 max-w-md mx-auto leading-relaxed text-sm md:text-base">
          Crafting digital experiences that feel as natural as water. 
          Specializing in React, TypeScript, and UI/UX Design.
        </p>
      </div>

       {/* Decorative geometric elements for anime tech feel */}
      <div className="absolute top-1/2 left-10 w-[1px] h-32 bg-gradient-to-b from-transparent via-anime-cyan to-transparent opacity-50 hidden md:block"></div>
      <div className="absolute bottom-20 right-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-anime-cyan to-transparent opacity-50 hidden md:block"></div>
      <div className="absolute top-1/3 right-10 w-4 h-4 border border-anime-cyan rotate-45 opacity-40 animate-spin hidden md:block" style={{animationDuration: '10s'}}></div>
    </div>
  );
};

export default Home;