import React, { useMemo } from 'react';

const UnderwaterBackground: React.FC = React.memo(() => {
  // Reducing particle counts slightly for performance on mobile
  const shards = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 30, 
    size: Math.random() * 40 + 10,
    rotation: Math.random() * 360,
    duration: Math.random() * 4 + 4,
    opacity: Math.random() * 0.4 + 0.2,
  })), []);

  const smallSquares = useMemo(() => Array.from({ length: 12 }).map((_, i) => {
    const duration = Math.random() * 10 + 15; 
    return {
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 33, 
      size: Math.random() * 10 + 4, 
      duration: duration,
      blinkDuration: Math.random() * 4 + 2, 
      delay: Math.random() * duration,
      spinDuration: Math.random() * 15 + 10,
      spinDelay: Math.random() * 10, 
      spinDirection: Math.random() > 0.5 ? 1 : -1, 
    };
  }), []);

  const foamParticles = useMemo(() => Array.from({ length: 10 }).map((_, i) => {
    const r1 = Math.floor(Math.random() * 40 + 30);
    const r2 = Math.floor(Math.random() * 40 + 30);
    const r3 = Math.floor(Math.random() * 40 + 30);
    const r4 = Math.floor(Math.random() * 40 + 30);
    const borderRadius = `${r1}% ${100-r1}% ${r2}% ${100-r2}% / ${r3}% ${100-r3}% ${r4}% ${100-r4}%`;
    
    return {
      id: i,
      left: Math.random() * 100,
      top: 45 + Math.random() * 20, 
      size: Math.random() * 40 + 10,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      borderRadius: borderRadius,
    };
  }), []);

  const pinkPolygons = useMemo(() => Array.from({ length: 10 }).map((_, i) => {
    const shapes = [
      'polygon(50% 0%, 0% 100%, 100% 100%)', 
      'polygon(0% 0%, 100% 0%, 50% 100%)',   
      'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 
      'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', 
    ];
    
    const baseColors = ['255, 51, 153', '230, 0, 126']; 
    const solidColors = ['#FF3399', '#E6007E']; 

    const typeIndex = Math.floor(Math.random() * baseColors.length);
    const opacity = Math.random() * 0.3 + 0.2; 

    let left = Math.random() * 100;
    let top = 33 + Math.random() * 67; 

    if (left > 25 && left < 75 && top < 75) {
       if (Math.random() > 0.5) {
          left = Math.random() > 0.5 ? Math.random() * 20 : 80 + Math.random() * 20;
       } else {
          top = 75 + Math.random() * 25;
       }
    }

    return {
      id: i,
      left: left,
      top: top,
      size: Math.random() * 15 + 10, 
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: `rgba(${baseColors[typeIndex]}, ${opacity})`,
      shadowColor: solidColors[typeIndex],
      duration: Math.random() * 20 + 20, 
      delay: Math.random() * 10,
    };
  }), []);

  const waveConfig = useMemo(() => {
    const layer1Paths = [
      "M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,181.3C672,181,768,203,864,224C960,245,1056,267,1152,250.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L0,0Z", 
      "M0,192L60,186.7C120,181,240,171,360,176C480,181,600,203,720,208C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,0L0,0Z" 
    ];

    const layer2Paths = [
      "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,122.7C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,0L0,0Z", 
      "M0,64L40,80C80,96,160,128,240,138.7C320,149,400,139,480,122.7C560,107,640,85,720,85.3C800,85,880,107,960,122.7C1040,139,1120,149,1200,138.7C1280,128,1360,96,1400,80L1440,64L1440,0L0,0Z" 
    ];

    const path1 = layer1Paths[Math.floor(Math.random() * layer1Paths.length)];
    const path2 = layer2Paths[Math.floor(Math.random() * layer2Paths.length)];

    const left1 = -50 - Math.random() * 80; 
    const left2 = -50 - Math.random() * 80;

    return { path1, path2, left1, left2 };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#00264D] z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0088FF] via-[#002288] to-[#001E4A]" />
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#2DFDFF]/15 to-transparent mix-blend-screen pointer-events-none" />

      <div 
        className="absolute top-[-10%] h-[50vh] opacity-60 mix-blend-overlay animate-caustic-wave"
        style={{ left: `${waveConfig.left1}%`, width: '300%' }}
      >
         <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-[#2DFDFF]">
            <path fillOpacity="0.4" d={waveConfig.path1}></path>
         </svg>
      </div>

      <div 
        className="absolute top-[-5%] h-[45vh] opacity-50 mix-blend-overlay animate-surface-shimmer"
        style={{ left: `${waveConfig.left2}%`, width: '300%' }}
      >
         <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-white">
            <path fillOpacity="0.3" d={waveConfig.path2}></path>
         </svg>
      </div>
      
      <div className="absolute top-0 w-full h-[30vh] opacity-70 mix-blend-color-dodge">
          <div className="absolute top-10 left-1/4 w-1/2 h-2 bg-[#2DFDFF] blur-md opacity-50 rotate-3 animate-pulse"></div>
          <div className="absolute top-20 left-1/3 w-1/3 h-1 bg-white blur-sm opacity-40 -rotate-2 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Optimized: Removed backdrop-blur, added will-change-transform */}
      {pinkPolygons.map((poly) => (
        <div
          key={`pp-${poly.id}`}
          className="absolute will-change-transform"
          style={{
            left: `${poly.left}%`,
            top: `${poly.top}%`,
            width: `${poly.size}px`,
            height: `${poly.size}px`,
            backgroundColor: poly.color,
            clipPath: poly.shape,
            boxShadow: `0 0 8px ${poly.shadowColor}`,
            animation: `tumble ${poly.duration}s linear infinite`,
            animationDelay: `-${poly.delay}s`,
          }}
        />
      ))}

      {foamParticles.map((foam) => (
        <div
          key={`f-${foam.id}`}
          className="absolute bg-white/10 mix-blend-overlay will-change-transform"
          style={{
            left: `${foam.left}%`,
            top: `${foam.top}%`,
            width: `${foam.size}px`,
            height: `${foam.size}px`,
            borderRadius: foam.borderRadius,
            opacity: 0,
            animation: `foam-rise ${foam.duration}s linear infinite`,
            animationDelay: `-${foam.delay}s`,
          }}
        />
      ))}

      {smallSquares.map((sq) => (
        <div
          key={`sq-${sq.id}`}
          className="absolute will-change-transform"
          style={{
            left: `${sq.left}%`,
            top: `${sq.top}%`,
            width: `${sq.size}px`,
            height: `${sq.size}px`,
            animation: `float ${sq.duration}s linear infinite, blink ${sq.blinkDuration}s ease-in-out infinite`,
            animationDelay: `-${sq.delay}s`,
          }}
        >
          <div 
             className="w-full h-full bg-[#87CEEB] mix-blend-overlay shadow-[0_0_4px_rgba(135,206,235,0.3)]"
             style={{
                animation: `spin ${sq.spinDuration}s linear infinite`,
                animationDirection: sq.spinDirection === 1 ? 'normal' : 'reverse',
                animationDelay: `-${sq.spinDelay}s`
             }}
          />
        </div>
      ))}

      {shards.map((shard) => (
        <div
          key={`s-${shard.id}`}
          className="absolute bg-white/20 will-change-transform"
          style={{
            left: `${shard.left}%`,
            top: `${shard.top}%`,
            width: `${shard.size}px`,
            height: `${shard.size}px`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            transform: `rotate(${shard.rotation}deg)`,
            opacity: shard.opacity,
            animation: `float ${shard.duration}s ease-in-out infinite`,
            animationDelay: `-${shard.id}s`,
          }}
        />
      ))}

      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-[#001E4A] via-[#001E4A]/80 to-transparent pointer-events-none" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
});

export default UnderwaterBackground;