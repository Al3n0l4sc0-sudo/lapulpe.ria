import React, { useEffect, useRef } from 'react';

/**
 * Starry Background Component
 * Creates a subtle, animated starfield similar to Grok's aesthetic
 * Features:
 * - Multiple layers of stars with varying sizes
 * - Subtle twinkling/pulsing animation
 * - Slow parallax movement on mouse
 * - Performance optimized with CSS transforms
 */
const StarryBackground = ({ density = 100, enableParallax = true }) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      };

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableParallax]);

  // Generate star positions
  const stars = Array.from({ length: density }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Main starfield */}
      <div
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{ willChange: 'transform' }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`
            }}
          />
        ))}
      </div>

      {/* Distant nebula glow - very subtle */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default StarryBackground;
