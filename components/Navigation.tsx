import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: '01. HOME' },
    { id: ViewState.ABOUT, label: '02. ABOUT' },
    { id: ViewState.PROJECTS, label: '03. WORKS' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 p-8 flex justify-between items-start">
       {/* Logo / Name */}
      <div 
        className="cursor-pointer group"
        onClick={() => setView(ViewState.HOME)}
      >
        <h1 className="text-2xl md:text-4xl font-bold tracking-widest text-anime-white drop-shadow-lg">
          KAITO<span className="text-anime-cyan">.DEV</span>
        </h1>
        <div className="h-1 w-0 bg-anime-cyan transition-all duration-300 group-hover:w-full mt-1"></div>
      </div>

      {/* Menu items */}
      <div className="hidden md:flex flex-col space-y-4 items-end">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`text-lg font-medium tracking-widest transition-all duration-300 hover:text-anime-cyan relative group flex items-center space-x-2 ${
              currentView === item.id ? 'text-anime-cyan' : 'text-anime-white/70'
            }`}
          >
             <span className={`h-[2px] bg-anime-cyan transition-all duration-300 ${currentView === item.id ? 'w-8' : 'w-0 group-hover:w-4'}`}></span>
             <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Simple Menu Indicator */}
      <div className="md:hidden flex space-x-4 text-xs tracking-widest">
         {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)}
              className={currentView === item.id ? 'text-anime-cyan border-b-2 border-anime-cyan' : 'text-white/50'}
            >
                {item.label.split('. ')[1]}
            </button>
         ))}
      </div>
    </nav>
  );
};

export default Navigation;