// AnimatedBackground - Nebulosa Realista
// Colores: Rojo dominante, púrpura, azul, amarillo/naranja
// Estrellas y estrellas fugaces ocasionales

import { useEffect, useState, memo } from 'react';

const AnimatedBackground = memo(({ color = 'red', variant = 'full' }) => {
  const [shootingStars, setShootingStars] = useState([]);
  
  // Generar estrellas fugaces ocasionalmente
  useEffect(() => {
    if (variant === 'minimal') return;
    
    const createShootingStar = () => {
      const id = Date.now();
      const star = {
        id,
        left: Math.random() * 60 + 10,
        top: Math.random() * 30,
        duration: 1.5 + Math.random() * 1,
      };
      
      setShootingStars(prev => [...prev, star]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id));
      }, star.duration * 1000 + 500);
    };
    
    const initialTimeout = setTimeout(createShootingStar, 5000);
    
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        createShootingStar();
      }
    }, 8000 + Math.random() * 7000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [variant]);

  // Colores de nebulosa realista
  const nebulaColors = {
    red: {
      // Nebulosa realista con múltiples colores
      primary: 'rgba(220, 38, 38, 0.25)', // Rojo brillante
      secondary: 'rgba(185, 28, 28, 0.18)', // Rojo oscuro
      purple: 'rgba(147, 51, 234, 0.12)', // Púrpura
      blue: 'rgba(59, 130, 246, 0.08)', // Azul
      yellow: 'rgba(250, 204, 21, 0.15)', // Amarillo
      orange: 'rgba(249, 115, 22, 0.12)', // Naranja
      pink: 'rgba(236, 72, 153, 0.08)', // Rosa
      glow: '#dc2626'
    },
    yellow: {
      primary: 'rgba(250, 204, 21, 0.2)',
      secondary: 'rgba(245, 158, 11, 0.15)',
      purple: 'rgba(147, 51, 234, 0.08)',
      blue: 'rgba(59, 130, 246, 0.06)',
      yellow: 'rgba(253, 224, 71, 0.18)',
      orange: 'rgba(249, 115, 22, 0.12)',
      pink: 'rgba(220, 38, 38, 0.08)',
      glow: '#f59e0b'
    }
  };

  const c = nebulaColors[color] || nebulaColors.red;

  if (variant === 'minimal') {
    return (
      <>
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-40 gpu-accelerated"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, ${c.primary}, transparent),
              radial-gradient(ellipse 60% 40% at 80% 60%, ${c.secondary}, transparent),
              radial-gradient(ellipse 40% 30% at 60% 80%, ${c.yellow}, transparent)
            `
          }}
        />
        <div className="fixed inset-0 pointer-events-none z-0 gpu-accelerated">
          <div 
            className="absolute inset-0 animate-twinkle"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.5), transparent),
                radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.4), transparent),
                radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.5), transparent),
                radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,0.4), transparent),
                radial-gradient(1px 1px at 90% 90%, rgba(255,255,255,0.35), transparent)
              `
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Capa 1: Nebulosa principal - Rojo y Amarillo dominantes */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 animate-nebula-pulse gpu-accelerated"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 10% 20%, ${c.primary}, transparent 60%),
            radial-gradient(ellipse 100% 70% at 90% 80%, ${c.secondary}, transparent 55%),
            radial-gradient(ellipse 80% 60% at 30% 70%, ${c.yellow}, transparent 50%),
            radial-gradient(ellipse 70% 50% at 80% 30%, ${c.orange}, transparent 45%)
          `
        }}
      />
      
      {/* Capa 2: Acentos de color - Púrpura, Azul, Rosa */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 animate-nebula-drift opacity-70 gpu-accelerated"
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 70% 50%, ${c.purple}, transparent 50%),
            radial-gradient(ellipse 50% 35% at 20% 90%, ${c.blue}, transparent 45%),
            radial-gradient(ellipse 45% 30% at 50% 20%, ${c.pink}, transparent 40%),
            radial-gradient(ellipse 40% 25% at 85% 15%, ${c.yellow}, transparent 35%)
          `
        }}
      />
      
      {/* Capa 3: Brillo central sutil */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30 gpu-accelerated"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 50%, ${c.yellow}, transparent 60%)
          `
        }}
      />
      
      {/* Estrellas pequeñas - Capa 1 */}
      <div className="fixed inset-0 pointer-events-none z-0 gpu-accelerated">
        <div 
          className="absolute inset-0 animate-twinkle"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 5% 15%, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 12% 45%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1.5px 1.5px at 18% 75%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 25% 25%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1.5px 1.5px at 32% 85%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 40% 10%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1.5px 1.5px at 48% 55%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 55% 35%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1.5px 1.5px at 62% 90%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1.5px 1.5px at 78% 65%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 85% 40%, rgba(255,255,255,0.7), transparent),
              radial-gradient(1.5px 1.5px at 92% 80%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 97% 5%, rgba(255,255,255,0.6), transparent)
            `
          }}
        />
        
        {/* Estrellas medianas */}
        <div 
          className="absolute inset-0 animate-twinkle-delayed"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 8% 30%, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 22% 60%, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 38% 15%, rgba(255,255,255,0.45), transparent),
              radial-gradient(2px 2px at 52% 75%, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 68% 45%, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 82% 85%, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 95% 25%, rgba(255,255,255,0.45), transparent)
            `
          }}
        />
        
        {/* Estrellas grandes brillantes */}
        <div 
          className="absolute inset-0 animate-pulse-slow"
          style={{
            backgroundImage: `
              radial-gradient(3px 3px at 15% 40%, rgba(255,255,255,0.7), transparent),
              radial-gradient(3px 3px at 45% 20%, rgba(255,255,255,0.6), transparent),
              radial-gradient(3px 3px at 75% 55%, rgba(255,255,255,0.65), transparent),
              radial-gradient(3px 3px at 90% 15%, rgba(255,255,255,0.6), transparent)
            `
          }}
        />

        {/* Estrellas con color */}
        <div 
          className="absolute inset-0 animate-pulse-slow opacity-70"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20% 50%, rgba(239, 68, 68, 0.7), transparent),
              radial-gradient(2px 2px at 60% 30%, rgba(250, 204, 21, 0.6), transparent),
              radial-gradient(2px 2px at 85% 70%, rgba(239, 68, 68, 0.6), transparent),
              radial-gradient(2px 2px at 35% 85%, rgba(250, 204, 21, 0.5), transparent)
            `
          }}
        />
      </div>
      
      {/* Estrellas fugaces */}
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
        >
          <div 
            className="relative"
            style={{
              animation: `shooting-star ${star.duration}s ease-out forwards`
            }}
          >
            <div 
              className="w-1 h-1 rounded-full bg-white"
              style={{
                boxShadow: `0 0 6px 2px rgba(255,255,255,0.8), 0 0 12px 4px ${c.glow}`
              }}
            />
            <div 
              className="absolute top-0 right-0 h-0.5 origin-right"
              style={{
                width: '60px',
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), white)`,
                transform: 'translateX(100%)'
              }}
            />
          </div>
        </div>
      ))}
      
      {/* Partículas flotantes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-1.5 h-1.5 bg-red-400/30 rounded-full animate-float-1 blur-[1px]" style={{ left: '8%', top: '25%' }} />
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-2 blur-[0.5px]" style={{ left: '25%', top: '65%' }} />
        <div className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float-3" style={{ left: '65%', top: '35%' }} />
        <div className="absolute w-0.5 h-0.5 bg-white/30 rounded-full animate-float-1" style={{ left: '80%', top: '75%' }} />
        <div className="absolute w-1.5 h-1.5 bg-yellow-400/25 rounded-full animate-float-2 blur-[1px]" style={{ left: '45%', top: '88%' }} />
        <div className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-float-3" style={{ left: '92%', top: '15%' }} />
        <div className="absolute w-1 h-1 bg-orange-400/25 rounded-full animate-float-1" style={{ left: '15%', top: '50%' }} />
      </div>
    </>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
