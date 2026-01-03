// GalacticLoader - Animación de carga con nebulosa y logo
import { memo } from 'react';

const GalacticLoader = memo(({ size = 'default', text = 'Cargando...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-16 h-16',
    large: 'w-24 h-24'
  };
  
  const textSize = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Contenedor del loader con nebulosa */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Fondo de nebulosa animada */}
        <div className="absolute inset-[-50%] animate-spin-slow">
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `
                conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(220, 38, 38, 0.4) 60deg,
                  rgba(250, 204, 21, 0.3) 120deg,
                  rgba(249, 115, 22, 0.2) 180deg,
                  rgba(147, 51, 234, 0.15) 240deg,
                  transparent 360deg
                )
              `,
              filter: 'blur(8px)'
            }}
          />
        </div>
        
        {/* Anillo exterior con gradiente */}
        <div 
          className={`absolute inset-0 rounded-full animate-spin`}
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(220, 38, 38, 0.8) 25%, rgba(250, 204, 21, 0.6) 50%, transparent 75%)',
            mask: 'radial-gradient(transparent 60%, black 62%, black 100%)',
            WebkitMask: 'radial-gradient(transparent 60%, black 62%, black 100%)'
          }}
        />
        
        {/* Centro con icono de La Pulpería */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Glow del icono */}
            <div className="absolute inset-0 bg-red-500/30 rounded-full blur-md animate-pulse" />
            {/* Icono emoji de tienda */}
            <span className="relative text-2xl animate-float-icon">🏪</span>
          </div>
        </div>
        
        {/* Estrellas orbitando */}
        <div className="absolute inset-[-20%] animate-spin-reverse">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
          <div className="absolute bottom-0 right-1/4 w-0.5 h-0.5 bg-yellow-300 rounded-full" />
          <div className="absolute top-1/4 right-0 w-0.5 h-0.5 bg-red-300 rounded-full" />
        </div>
      </div>
      
      {/* Texto con efecto */}
      {text && (
        <p className={`${textSize[size]} text-stone-400 animate-pulse font-medium`}>
          {text}
        </p>
      )}
    </div>
  );
});

GalacticLoader.displayName = 'GalacticLoader';

export default GalacticLoader;
