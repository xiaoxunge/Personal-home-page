import React, { useEffect, useState } from 'react';

interface MainPageProps {
  show: boolean;
  pageIndex: number;
}

const MainPage: React.FC<MainPageProps> = ({ show, pageIndex }) => {
  
  const [introStage, setIntroStage] = useState<'HIDDEN' | 'DRAWING' | 'EXPAND' | 'CONTENT'>('HIDDEN');

  useEffect(() => {
    if (show) {
        setIntroStage('HIDDEN');
        const t1 = setTimeout(() => setIntroStage('DRAWING'), 100);
        const t2 = setTimeout(() => setIntroStage('EXPAND'), 900);
        const t3 = setTimeout(() => setIntroStage('CONTENT'), 1500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    } else {
        setIntroStage('HIDDEN');
    }
  }, [show, pageIndex]);

  const thickPaths = [
    'polygon(0% 0%, 45% 0%, 100% 100%, 55% 100%)', // P0 GitHub
    'polygon(35% 0%, 100% 0%, 65% 100%, 0% 100%)', // P1 Discord
    'polygon(0% 0%, 50% 0%, 100% 100%, 50% 100%)', // P2 Bilibili
    'polygon(50% 0%, 100% 0%, 50% 100%, 0% 100%)'  // P3 QQ
  ];

  const thinPaths = [
    'polygon(22% 0%, 23% 0%, 78% 100%, 77% 100%)',
    'polygon(67% 0%, 68% 0%, 33% 100%, 32% 100%)',
    'polygon(24% 0%, 25% 0%, 76% 100%, 75% 100%)',
    'polygon(74% 0%, 75% 0%, 26% 100%, 25% 100%)'
  ];

  const getClipPath = () => {
      if (introStage === 'HIDDEN' || introStage === 'DRAWING') return thinPaths[pageIndex];
      return thickPaths[pageIndex];
  };

  const getMaskStyle = () => {
      const isReverse = pageIndex % 2 !== 0;
      if (introStage === 'HIDDEN') {
          if (isReverse) return { clipPath: 'circle(0% at 100% 100%)' };
          return { clipPath: 'circle(0% at 0% 0%)' };
      }
      if (isReverse) return { clipPath: 'circle(250% at 100% 100%)' };
      return { clipPath: 'circle(250% at 0% 0%)' };
  };

  const getTransition = () => {
      if (introStage === 'HIDDEN') return 'none';
      if (introStage === 'DRAWING') return 'clip-path 0.8s ease-out';
      if (introStage === 'EXPAND') return 'clip-path 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      return 'none';
  };

  const getContentOpacity = (targetIndex: number) => {
      return (pageIndex === targetIndex && introStage === 'CONTENT') ? 1 : 0;
  };

  const bgTextStyle = "absolute font-bodoni font-bold leading-none tracking-tighter select-none z-10 transition-opacity duration-500";
  const bgTextSolid = "text-white drop-shadow-lg";
  const bgTextOutline = "text-transparent opacity-50 text-stroke-white";

  return (
    <div className="absolute inset-0 z-40 overflow-hidden pointer-events-none">
      
      {/* MIDDLE LAYER: RIBBON */}
      {/* Removed drop-shadow for performance. If needed, simulate with a separate div below */}
      <div 
        className="absolute inset-0 z-20 will-change-[clip-path]"
        style={{
            clipPath: getClipPath(),
            transition: introStage === 'EXPAND' ? getTransition() : 'none',
            backgroundColor: '#FFFFFF'
        }}
      >
         {/* Drawing Mask */}
         <div 
            className="absolute inset-0 w-full h-full bg-white"
            style={{
                ...getMaskStyle(),
                transition: introStage === 'DRAWING' ? getTransition() : 'none'
            }}
         >
             {/* INNER CONTENT CONTAINER */}
             <div className="relative w-full h-full flex items-center justify-center">

                {/* PAGE 0: GITHUB */}
                <div 
                    className={`absolute flex flex-col items-center justify-center transition-opacity duration-700 ${pageIndex === 0 ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    style={{ opacity: getContentOpacity(0) }}
                >
                     {/* Content... (Keeping your original content structure) */}
                     <div className="flex flex-col items-center space-y-4">
                        <a href="https://github.com/xiaoxunge" target="_blank" rel="noopener noreferrer" className="w-32 h-32 md:w-48 md:h-48 rounded-full p-1 border-4 border-blue-50 shadow-2xl bg-white hover:scale-105 transition-transform">
                            <img src="https://github.com/xiaoxunge.png" alt="Avatar" loading="eager" className="w-full h-full object-cover rounded-full" />
                        </a>
                        <div className="text-center text-black">
                            <h1 className="font-noto-serif text-4xl md:text-6xl font-bold tracking-widest mb-2">小讯ge</h1>
                            <a href="https://github.com/xiaoxunge" className="flex items-center justify-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                                <span className="font-noto-sans font-light text-lg">github.com/xiaoxunge</span>
                            </a>
                        </div>
                     </div>
                </div>

                {/* PAGE 1: DISCORD */}
                <div 
                    className={`absolute flex flex-col items-center justify-center transition-opacity duration-700 ${pageIndex === 1 ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    style={{ opacity: getContentOpacity(1) }}
                >
                    <div className="flex flex-col items-center space-y-2 md:space-y-4">
                         <div className="w-32 h-32 md:w-48 md:h-48 rounded-full p-1 border-4 border-purple-100 shadow-2xl bg-white hover:scale-105 transition-transform overflow-hidden">
                            <img src="https://images.steamusercontent.com/ugc/11487257878227797235/2BD07075EC62B62CC0DF649FC23A7B420CDFFB1C/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" alt="Avatar" loading="eager" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col items-center text-center text-black w-full max-w-[90vw]">
                            <div className="flex items-center space-x-2 mb-0">
                                <span className="font-bodoni text-lg md:text-xl font-bold tracking-widest text-gray-500">hinin</span>
                            </div>
                            <h2 className="font-noto-serif text-2xl md:text-3xl font-bold tracking-widest mb-1">使用者名称</h2>
                            <h1 className="font-bodoni text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-black leading-none opacity-90 whitespace-nowrap">XIAOXUNGE</h1>
                        </div>
                    </div>
                </div>

                {/* PAGE 2: BILIBILI */}
                <div 
                    className={`absolute flex flex-col items-center justify-center transition-opacity duration-700 ${pageIndex === 2 ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    style={{ opacity: getContentOpacity(2) }}
                >
                     <div className="flex flex-col items-center space-y-4">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full p-1 border-4 border-pink-100 shadow-2xl bg-white hover:scale-105 transition-transform">
                            <img src="https://image.zeta-ai.io/profile-image/8efca046-e45f-4129-b10d-ccd12ac218cd/c4630277-38c2-4734-8a8f-58d1794d2fd2/6fb5d525-e780-44e4-8802-d0cbc3b1dc2c.jpeg?w=3840&q=90&f=webp" alt="Avatar" loading="eager" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="text-center text-black">
                            <h1 className="font-noto-serif text-3xl md:text-5xl font-bold tracking-widest mb-2">仰望大触的小讯</h1>
                            <p className="font-noto-sans text-gray-400 text-base tracking-[0.2em] mb-3">UID: 275310636</p>
                        </div>
                    </div>
                </div>

                {/* PAGE 3: QQ */}
                <div 
                    className={`absolute flex flex-col items-center justify-center transition-opacity duration-700 ${pageIndex === 3 ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    style={{ opacity: getContentOpacity(3) }}
                >
                     <div className="flex flex-col items-center space-y-4">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full p-1 border-4 border-red-100 shadow-2xl bg-white hover:scale-105 transition-transform">
                            <img src="https://cdn.mmoe.nl/media_attachments/files/112/669/621/336/638/733/original/34fb7e0f4cd14b30.jpg" alt="Avatar" loading="eager" className="w-full h-full object-cover object-[75%_center] rounded-full" />
                        </div>
                        <div className="text-center text-black">
                            <h1 className="font-noto-serif text-4xl md:text-6xl font-bold tracking-widest mb-2">小讯ge</h1>
                            <span className="font-noto-sans font-bold text-2xl tracking-widest text-[#FF4D4D]">QQ</span>
                            <p className="font-mono text-gray-500 text-xl">2097278193</p>
                        </div>
                     </div>
                </div>
             </div>
         </div>
      </div>

      {/* BOTTOM LAYER: PLATFORM TEXT */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${pageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className={`${bgTextStyle} ${bgTextSolid} top-0 right-0 text-[18vw] leading-[0.8]`}>GIT</h1>
          <h1 className={`${bgTextStyle} ${bgTextOutline} bottom-0 left-0 text-[18vw] leading-[0.8]`}>HUB</h1>
      </div>
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${pageIndex === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className={`${bgTextStyle} ${bgTextSolid} top-[5%] left-[5%] text-[16vw]`}>DIS</h1>
          <h1 className={`${bgTextStyle} ${bgTextOutline} bottom-[5%] right-[5%] text-[16vw]`}>CORD</h1>
      </div>
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${pageIndex === 2 ? 'opacity-100' : 'opacity-0'}`}>
           <h1 className={`${bgTextStyle} ${bgTextSolid} top-0 right-[5%] text-[15vw]`}>BILI</h1>
           <h1 className={`${bgTextStyle} ${bgTextOutline} bottom-0 left-[5%] text-[15vw]`}>BILI</h1>
      </div>
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${pageIndex === 3 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className={`${bgTextStyle} ${bgTextSolid} top-0 left-[2%] text-[22vw]`}>QQ</h1>
           <h1 className={`${bgTextStyle} ${bgTextOutline} bottom-0 right-[2%] text-[12vw]`}>TENCENT</h1>
      </div>
    </div>
  );
};

export default MainPage;