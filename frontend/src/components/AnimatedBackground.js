// AnimatedBackground - Tema galáctico estilo Grok
// Estrellas con brillo sutil y nebulosas animadas
// Soporta variantes de color: 'red' (default), 'yellow', 'minimal'

const AnimatedBackground = ({ color = 'red', variant = 'full' }) => {
  // Color configurations
  const colors = {
    red: {
      nebula1: 'rgba(220, 38, 38, 0.15)',
      nebula2: 'rgba(185, 28, 28, 0.1)',
      nebula3: 'rgba(239, 68, 68, 0.08)',
      particle: 'bg-red-400/20'
    },
    yellow: {
      nebula1: 'rgba(245, 158, 11, 0.15)',
      nebula2: 'rgba(217, 119, 6, 0.1)',
      nebula3: 'rgba(251, 191, 36, 0.08)',
      particle: 'bg-amber-400/20'
    },
    purple: {
      nebula1: 'rgba(139, 92, 246, 0.15)',
      nebula2: 'rgba(124, 58, 237, 0.1)',
      nebula3: 'rgba(167, 139, 250, 0.08)',
      particle: 'bg-purple-400/20'
    },
    cyan: {
      nebula1: 'rgba(6, 182, 212, 0.15)',
      nebula2: 'rgba(8, 145, 178, 0.1)',
      nebula3: 'rgba(34, 211, 238, 0.08)',
      particle: 'bg-cyan-400/20'
    }
  };

  const c = colors[color] || colors.red;

  if (variant === 'minimal') {
    return (
      <>
        {/* Minimal version - just subtle nebula */}
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-20"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, ${c.nebula1}, transparent),
              radial-gradient(ellipse 60% 40% at 80% 60%, ${c.nebula2}, transparent)
            `
          }}
        />
        {/* Minimal stars */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 animate-twinkle"
            style={{
              backgroundImage: `
                radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.4), transparent),
                radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.35), transparent),
                radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.4), transparent),
                radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,0.35), transparent),
                radial-gradient(1px 1px at 90% 90%, rgba(255,255,255,0.3), transparent)
              `
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Capa de nebulosa */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, ${c.nebula1}, transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, ${c.nebula2}, transparent),
            radial-gradient(ellipse 40% 30% at 50% 80%, ${c.nebula3}, transparent)
          `
        }}
      />
      
      {/* Capa de estrellas con brillo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Estrellas pequeñas que parpadean */}
        <div 
          className="absolute inset-0 animate-twinkle"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.55), transparent),
              radial-gradient(1px 1px at 50% 70%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 60% 10%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,0.55), transparent),
              radial-gradient(1px 1px at 90% 90%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 5% 95%, rgba(255,255,255,0.45), transparent),
              radial-gradient(1px 1px at 95% 5%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 15% 45%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.45), transparent),
              radial-gradient(1px 1px at 25% 15%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 75% 85%, rgba(255,255,255,0.4), transparent)
            `
          }}
        />
        
        {/* Estrellas medianas con delay diferente */}
        <div 
          className="absolute inset-0 animate-twinkle-delayed"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 40% 30%, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 70% 60%, rgba(255,255,255,0.35), transparent),
              radial-gradient(2px 2px at 35% 65%, rgba(255,255,255,0.3), transparent),
              radial-gradient(2px 2px at 65% 25%, rgba(255,255,255,0.35), transparent),
              radial-gradient(2px 2px at 45% 85%, rgba(255,255,255,0.3), transparent)
            `
          }}
        />
        
        {/* Estrellas grandes brillantes */}
        <div 
          className="absolute inset-0 animate-pulse-slow"
          style={{
            backgroundImage: `
              radial-gradient(3px 3px at 25% 35%, rgba(255,255,255,0.5), transparent),
              radial-gradient(3px 3px at 75% 45%, rgba(255,255,255,0.4), transparent),
              radial-gradient(3px 3px at 55% 75%, rgba(255,255,255,0.45), transparent)
            `
          }}
        />
      </div>
      
      {/* Partículas flotantes sutiles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-1" style={{ left: '10%', top: '20%' }} />
        <div className="absolute w-0.5 h-0.5 bg-white/30 rounded-full animate-float-2" style={{ left: '30%', top: '60%' }} />
        <div className={`absolute w-1 h-1 ${c.particle} rounded-full animate-float-3`} style={{ left: '70%', top: '30%' }} />
        <div className="absolute w-0.5 h-0.5 bg-white/25 rounded-full animate-float-1" style={{ left: '85%', top: '70%' }} />
        <div className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-2" style={{ left: '50%', top: '85%' }} />
      </div>
    </>
  );
};

export default AnimatedBackground;
