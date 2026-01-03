// MiniNebula - Componente de nebulosa compacto para barras y elementos UI
import { memo } from 'react';

const MiniNebula = memo(({ variant = 'default', intensity = 'medium' }) => {
  const intensityMap = {
    low: 0.3,
    medium: 0.5,
    high: 0.7
  };
  
  const opacity = intensityMap[intensity] || 0.5;
  
  if (variant === 'header') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebulosa roja/amarilla sutil */}
        <div 
          className="absolute inset-0 animate-nebula-mini"
          style={{
            background: `
              radial-gradient(ellipse 80% 150% at 20% 100%, rgba(220, 38, 38, ${opacity * 0.4}), transparent 50%),
              radial-gradient(ellipse 60% 120% at 80% 100%, rgba(250, 204, 21, ${opacity * 0.25}), transparent 45%),
              radial-gradient(ellipse 40% 80% at 50% 100%, rgba(249, 115, 22, ${opacity * 0.2}), transparent 40%)
            `
          }}
        />
        {/* Estrellas mini */}
        <div 
          className="absolute inset-0 animate-twinkle opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 10% 60%, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 25% 40%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 45% 70%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 65% 30%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 95% 80%, rgba(255,255,255,0.3), transparent)
            `
          }}
        />
        {/* Línea de brillo animada */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent animate-glow-line" />
      </div>
    );
  }
  
  if (variant === 'bottom') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebulosa invertida para barra inferior */}
        <div 
          className="absolute inset-0 animate-nebula-mini"
          style={{
            background: `
              radial-gradient(ellipse 80% 150% at 20% 0%, rgba(220, 38, 38, ${opacity * 0.35}), transparent 50%),
              radial-gradient(ellipse 60% 120% at 80% 0%, rgba(250, 204, 21, ${opacity * 0.25}), transparent 45%),
              radial-gradient(ellipse 50% 100% at 50% 0%, rgba(147, 51, 234, ${opacity * 0.15}), transparent 40%)
            `
          }}
        />
        {/* Estrellas mini */}
        <div 
          className="absolute inset-0 animate-twinkle opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 8% 30%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 22% 60%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 38% 25%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 55% 50%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 72% 35%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 90% 65%, rgba(255,255,255,0.5), transparent)
            `
          }}
        />
        {/* Línea de brillo superior */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-glow-line" />
      </div>
    );
  }
  
  // Default variant para otros usos
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit">
      <div 
        className="absolute inset-0 animate-nebula-mini"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 30% 50%, rgba(220, 38, 38, ${opacity * 0.3}), transparent 50%),
            radial-gradient(ellipse 80% 80% at 70% 50%, rgba(250, 204, 21, ${opacity * 0.2}), transparent 45%)
          `
        }}
      />
    </div>
  );
});

MiniNebula.displayName = 'MiniNebula';

export default MiniNebula;
