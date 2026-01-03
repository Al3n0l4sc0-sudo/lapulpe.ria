// MiniNebula - Componente de nebulosa compacto para barras y elementos UI
// Versión simplificada sin brillo constante
import { memo } from 'react';

const MiniNebula = memo(({ variant = 'default', intensity = 'medium' }) => {
  const intensityMap = {
    low: 0.2,
    medium: 0.3,
    high: 0.4
  };
  
  const opacity = intensityMap[intensity] || 0.3;
  
  if (variant === 'header') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebulosa roja/amarilla muy sutil - sin animación */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 150% at 20% 100%, rgba(220, 38, 38, ${opacity * 0.3}), transparent 50%),
              radial-gradient(ellipse 60% 120% at 80% 100%, rgba(250, 204, 21, ${opacity * 0.15}), transparent 45%)
            `
          }}
        />
        {/* Estrellas mini estáticas */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 10% 60%, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 45% 70%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.4), transparent)
            `
          }}
        />
        {/* Línea de separación sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }
  
  if (variant === 'bottom') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Nebulosa invertida para barra inferior - sin animación */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 150% at 20% 0%, rgba(220, 38, 38, ${opacity * 0.25}), transparent 50%),
              radial-gradient(ellipse 60% 120% at 80% 0%, rgba(250, 204, 21, ${opacity * 0.15}), transparent 45%)
            `
          }}
        />
        {/* Estrellas mini estáticas */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 8% 30%, rgba(255,255,255,0.4), transparent),
              radial-gradient(1px 1px at 55% 50%, rgba(255,255,255,0.3), transparent),
              radial-gradient(1px 1px at 90% 35%, rgba(255,255,255,0.4), transparent)
            `
          }}
        />
        {/* Línea de separación superior */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }
  
  // Default variant para otros usos
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-inherit">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 30% 50%, rgba(220, 38, 38, ${opacity * 0.2}), transparent 50%),
            radial-gradient(ellipse 80% 80% at 70% 50%, rgba(250, 204, 21, ${opacity * 0.15}), transparent 45%)
          `
        }}
      />
    </div>
  );
});

MiniNebula.displayName = 'MiniNebula';

export default MiniNebula;
