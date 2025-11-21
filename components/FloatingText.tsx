import React, { useEffect, useRef, useState } from 'react';

interface FloatingTextProps {
  labelText?: string;
  hideLabel?: boolean;
}

type BubbleSide = 'left' | 'right' | 'top' | 'bottom';

const FloatingText: React.FC<FloatingTextProps> = ({ labelText = "ABOUT ME", hideLabel = false }) => {
  // Ref for the wrapper handling X/Y translation
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Ref for the text handling Rotation
  const textRef = useRef<HTMLHeadingElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const arrowWrapperRef = useRef<HTMLDivElement>(null);
  
  // Bubble State
  const [bubble, setBubble] = useState<{ show: boolean; text: string; side: BubbleSide }>({
    show: false,
    text: '',
    side: 'right'
  });
  const bubbleTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const hasLandedRef = useRef(false);

  // Physics State
  const state = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: -200,
    vx: 0,
    vy: 0, 
    rotation: (Math.random() * 40 - 20),
    vr: 0,
    targetX: 0,
    targetY: 0,
    isDragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    mode: 'SINKING' as 'SINKING' | 'DRAGGING' | 'FREE',
    centerOffset: 0,
    hasLanded: false,
    pauseTimer: 0,
    lastW: typeof window !== 'undefined' ? window.innerWidth : 0,
    lastH: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        state.current.x = cx;
        state.current.targetX = cx;
        state.current.targetY = cy;
        state.current.lastW = window.innerWidth;
        state.current.lastH = window.innerHeight;
        state.current.vy = 12.5; 
    }
    
    let animationFrameId: number;
    let lastX = state.current.x;
    let lastY = state.current.y;
    let bubbleTimer = 0;

    const spawnBubble = (x: number, y: number, velocity: number, spreadX: number = 100, spreadY: number = 40, force: boolean = false) => {
      if (!bubblesRef.current) return;
      if (!force && bubblesRef.current.childElementCount > 60) return;

      const bubble = document.createElement('div');
      const size = Math.random() * 14 + 8; 
      bubble.className = 'absolute rounded-full bg-transparent border-2 border-white bubble-anim pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.8)]';
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${x + (Math.random() - 0.5) * spreadX}px`; 
      bubble.style.top = `${y + (Math.random() - 0.5) * spreadY}px`;
      
      bubblesRef.current.appendChild(bubble);

      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    };

    const updatePhysics = () => {
      const s = state.current;
      const w = window.innerWidth || 800; 
      const h = window.innerHeight || 600; 

      if (w !== s.lastW || h !== s.lastH) {
         s.lastW = w;
         s.lastH = h;
         if (s.mode === 'SINKING') {
            s.targetX = w / 2;
            s.targetY = h / 2;
            s.x = s.targetX;
            if (s.hasLanded) s.y = s.targetY;
            lastX = s.x;
            lastY = s.y;
         }
      }

      if (isNaN(s.x) || isNaN(s.y) || Math.abs(s.x) > w * 2 || Math.abs(s.y) > h * 2) {
         s.x = w / 2;
         s.y = -100;
         s.vx = 0;
         s.vy = 12.5; 
         s.rotation = (Math.random() * 40 - 20);
         s.mode = 'SINKING';
         s.hasLanded = false;
         s.pauseTimer = 0;
         hasLandedRef.current = false;
      }

      if (s.mode === 'SINKING') {
          s.targetX = w / 2;
          s.targetY = h / 2;
          s.x = s.targetX;
          s.vx = 0;

          if (s.hasLanded) {
            s.y = s.targetY;
            s.vy = 0;
            s.rotation = 0;
            s.vr = 0;
            
            // Initial Landing Trigger
            if (!hasLandedRef.current) {
                hasLandedRef.current = true;
                // Use a timeout to escape the render loop for setState
                setTimeout(() => {
                    setBubble({
                        show: true,
                        text: '不要到处拽我',
                        side: Math.random() > 0.5 ? 'right' : 'left'
                    });
                    // Hide initial message after 3s
                    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
                    hideTimerRef.current = window.setTimeout(() => {
                         setBubble(prev => ({ ...prev, show: false }));
                    }, 3000);
                }, 0);
            }

          } else {
            if (s.pauseTimer > 0) {
                s.pauseTimer--;
                s.vy = 0; 
            } else {
                const plungeThreshold = h * 0.2; 
                if (s.y < plungeThreshold) {
                    s.vy = 12.5;
                } else {
                    if (s.vy > 5) {
                         s.pauseTimer = 15; 
                         s.vy = 0; 
                         for(let i = 0; i < 40; i++) {
                             spawnBubble(s.x, s.y, 20, 300, 60, true); 
                         }
                    } else {
                        s.vy = 0.6;
                    }
                }
                
                if (s.y >= s.targetY) {
                    s.y = s.targetY;
                    s.vy = 0;
                    s.vr = 0;
                    s.rotation = 0;
                    s.hasLanded = true;
                }
            }
          }
          s.y += s.vy;
      }

      const dx = s.targetX - s.x;
      const dy = s.targetY - s.y;
      
      let springStrength = 0.002;
      let damping = 0.90;

      if (s.mode === 'DRAGGING') {
        springStrength = 0.08; 
        damping = 0.45;
        s.vx += dx * springStrength;
        s.vy += dy * springStrength;
        s.vx *= damping;
        s.vy *= damping;
        s.x += s.vx;
        s.y += s.vy;
      } else if (s.mode === 'FREE') {
        springStrength = 0;
        damping = 0.85;
        s.vx += dx * springStrength;
        s.vy += dy * springStrength;
        s.vx *= damping;
        s.vy *= damping;
        s.x += s.vx;
        s.y += s.vy;
      } 

      let rotK = 0;
      let rotDamping = 0.65;

      if (s.mode === 'SINKING') {
         if (!s.hasLanded) {
            const verticalDist = Math.abs(s.targetY - s.y);
            if (verticalDist > 180) {
                rotK = 0;
            } else {
                const progress = 1 - (verticalDist / 180); 
                rotK = 0.001 + (progress * 0.009); 
            }
         }
      } else if (s.mode === 'DRAGGING') {
         rotK = 0.02;
         rotDamping = 0.60;
      } else {
         rotK = 0.005;
         rotDamping = 0.90;
      }

      const dR = 0 - s.rotation;
      s.vr += dR * rotK;
      s.vr *= rotDamping; 
      s.rotation += s.vr;

      const padding = 60;
      const bottomLimit = h - padding;

      if (s.y > bottomLimit) { s.y = bottomLimit; s.vy *= -0.5; }
      if (s.x < padding) { s.x = padding; s.vx *= -0.5; }
      if (s.x > w - padding) { s.x = w - padding; s.vx *= -0.5; }
      if (s.mode !== 'SINKING' && s.y < padding) { s.y = padding; s.vy *= -0.5; }

      // Apply transforms independently
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
      if (textRef.current) {
        // Text rotates inside the stable wrapper
        textRef.current.style.transform = `translate(-50%, -50%) rotate(${s.rotation}deg)`;
      }

      const moveSpeed = Math.sqrt((s.x - lastX)**2 + (s.y - lastY)**2);
      bubbleTimer++;
      
      const isSinking = s.mode === 'SINKING' && !s.hasLanded;
      const isSplashPhase = isSinking && moveSpeed > 10; 
      
      let timerThreshold = 10; 
      let spawnCount = 1;

      if (isSplashPhase) {
          timerThreshold = 0; 
          spawnCount = 5;
      } else if (moveSpeed > 40) {
          timerThreshold = 1; 
          spawnCount = 2;
      } else if (moveSpeed > 20) {
          timerThreshold = 2;
          spawnCount = 1;
      } else if (moveSpeed > 3) {
          timerThreshold = 8;
          spawnCount = 1;
      } else {
          timerThreshold = 100; 
      }

      if (moveSpeed > 0.5 && bubbleTimer > timerThreshold) {
         const spreadX = isSplashPhase ? 300 : 60;
         const spreadY = isSplashPhase ? 120 : 20;
         for (let i=0; i<spawnCount; i++) {
             spawnBubble(s.x, s.y, moveSpeed, spreadX, spreadY, isSplashPhase);
         }
         bubbleTimer = 0;
      }

      lastX = s.x;
      lastY = s.y;
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
        cancelAnimationFrame(animationFrameId);
        if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handlePointerDown = (clientX: number, clientY: number) => {
    const s = state.current;
    s.isDragging = true;
    s.mode = 'DRAGGING';
    s.targetX = clientX;
    s.targetY = clientY;

    // Drag Logic: Show "Whaaa!!!" immediately
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    setBubble({
        show: true,
        text: '哇啊啊啊！！！',
        side: 'top' // Keep it out of the way
    });
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    const s = state.current;
    if (s.isDragging) {
      s.targetX = clientX;
      s.targetY = clientY;
    }
  };

  const handlePointerUp = () => {
    const s = state.current;
    if (s.isDragging) {
      s.isDragging = false;
      s.mode = 'FREE'; 
      
      // Release Logic: 1.5s timer to show final text
      bubbleTimerRef.current = window.setTimeout(() => {
          // Smart Positioning
          const w = window.innerWidth;
          const h = window.innerHeight;
          const x = s.x;
          const y = s.y;
          
          let side: BubbleSide = 'top';
          if (x < w * 0.2) side = 'right'; // Too close to left, go right
          else if (x > w * 0.8) side = 'left'; // Too close to right, go left
          else if (y < h * 0.2) side = 'bottom'; // Too close to top, go bottom
          else if (y > h * 0.8) side = 'top'; // Too close to bottom, go top
          else side = Math.random() > 0.5 ? 'right' : 'left'; // Default

          setBubble({
              show: true,
              text: '终于肯放过我了。',
              side: side
          });

          // Auto hide after 1.5s
          hideTimerRef.current = window.setTimeout(() => {
              setBubble(prev => ({ ...prev, show: false }));
          }, 1500);

      }, 1500);
    }
  };

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
       if (wrapperRef.current && wrapperRef.current.contains(e.target as Node)) {
          handlePointerDown(e.clientX, e.clientY);
       }
    };
    const onMouseMove = (e: MouseEvent) => {
       handlePointerMove(e.clientX, e.clientY);
    };
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
       if (wrapperRef.current && wrapperRef.current.contains(e.target as Node)) {
          e.preventDefault(); 
          handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
       }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (state.current.isDragging) {
        e.preventDefault();
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }
    const onTouchEnd = () => handlePointerUp();

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const isDragMeUp = labelText === "DRAG ME UP";

  // Helper for bubble position styles
  // Greatly increased margins to ensure ALL bubbles clear the large "XIAOXUNGE" text
  const getBubbleStyle = (side: BubbleSide) => {
      const base = "absolute bg-white border-2 border-black text-black px-3 py-1 rounded-lg whitespace-nowrap z-50 transition-opacity duration-300";
      
      // Margins calculated based on 6xl text width (~400px) and height (~60px) plus buffers
      // Mobile (md) breakpoint adjusts for smaller text size
      switch(side) {
          case 'right': return `${base} left-0 ml-[150px] md:ml-[230px] top-1/2 -translate-y-1/2`;
          case 'left': return `${base} right-0 mr-[150px] md:mr-[230px] top-1/2 -translate-y-1/2`;
          case 'top': return `${base} bottom-0 mb-[50px] md:mb-[80px] left-1/2 -translate-x-1/2`;
          case 'bottom': return `${base} top-0 mt-[50px] md:mt-[80px] left-1/2 -translate-x-1/2`;
          default: return base;
      }
  };

  const getArrowStyle = (side: BubbleSide) => {
      const base = "absolute w-3 h-3 bg-white border-black rotate-45";
      switch(side) {
          case 'right': return `${base} -left-[7px] top-1/2 -translate-y-1/2 border-l-2 border-b-2`;
          case 'left': return `${base} -right-[7px] top-1/2 -translate-y-1/2 border-r-2 border-t-2`;
          case 'top': return `${base} -bottom-[7px] left-1/2 -translate-x-1/2 border-r-2 border-b-2`;
          case 'bottom': return `${base} -top-[7px] left-1/2 -translate-x-1/2 border-l-2 border-t-2`;
          default: return base;
      }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-[300] overflow-hidden">
      <div ref={bubblesRef} className="absolute inset-0" />

      {/* Wrapper handles X/Y Translation */}
      <div 
        ref={wrapperRef}
        className="absolute top-0 left-0 pointer-events-auto cursor-move active:cursor-grabbing"
        style={{ 
           willChange: 'transform',
           // Initial off-screen position matching state
           transform: `translate3d(${typeof window !== 'undefined' ? window.innerWidth/2 : 0}px, -200px, 0)`
        }}
      >
          {/* Text handles Rotation */}
          <h1
            ref={textRef}
            className={`absolute left-0 top-0 text-4xl md:text-6xl font-pixelify font-normal tracking-widest text-white select-none drop-shadow-[0_0_15px_rgba(45,253,255,0.8)] pl-[0.8em] whitespace-nowrap transition-opacity duration-300 ${hideLabel ? 'opacity-0' : 'opacity-100'}`}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            XIAO<span>X</span>UNGE
          </h1>
          
          {/* Speech Bubble (Does NOT rotate with text, relative to wrapper center) */}
          {bubble.show && !hideLabel && (
             <div className={`${getBubbleStyle(bubble.side)} animate-float font-pixelify text-sm md:text-base shadow-lg`}>
                 {bubble.text}
                 <div className={getArrowStyle(bubble.side)}></div>
             </div>
          )}
      </div>

      {/* Static Arrow Indicator */}
      <div 
        ref={arrowWrapperRef}
        className="absolute bottom-0 left-1/2 pointer-events-none z-50 text-4xl md:text-6xl font-pixelify ml-[0.4em]"
        style={{ transform: 'translateX(-50%)' }} 
      >
         <div className="flex flex-col items-center animate-float">
           <span 
            className={`font-michroma text-white text-[8px] md:text-[10px] mb-3 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pl-[0.1em] transition-opacity duration-300 ${hideLabel ? 'opacity-0' : 'opacity-100'}`}
           >
             {labelText}
           </span>
           <div 
             className={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-transform duration-300 ${isDragMeUp || hideLabel ? 'rotate-180' : ''}`}
           ></div>
         </div>
      </div>
    </div>
  );
};

export default FloatingText;