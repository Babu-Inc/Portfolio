import React, { useEffect, useRef, useState } from 'react';

// Types for our components
interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  variant?: 'stars' | 'nebula' | 'planets' | 'galaxy' | 'geometric' | 'combined';
  intensity?: 'low' | 'medium' | 'high';
  interactivity?: boolean;
  className?: string;
}

interface StarFieldProps {
  intensity: 'low' | 'medium' | 'high';
  className?: string;
  interactivity?: boolean;
}

interface NebulaProps {
  intensity: 'low' | 'medium' | 'high';
  className?: string;
}

interface PlanetarySystemProps {
  intensity: 'low' | 'medium' | 'high';
  className?: string;
}

interface GalaxyBackgroundProps {
  intensity: 'low' | 'medium' | 'high';
  className?: string;
}

interface GeometricBackgroundProps {
  intensity: 'low' | 'medium' | 'high';
  className?: string;
}

interface AnimatedWavesProps {
  intensity: 'low' | 'medium' | 'high';
  className?: string;
}

// Main component to wrap different background types
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'combined',
  intensity = 'low',
  interactivity = false,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background animation based on variant */}
      {(variant === 'stars' || variant === 'combined') && (
        <StarField
          interactivity={interactivity}
          intensity={intensity}
        />
      )}
      {(variant === 'nebula' || variant === 'combined') && (
        <NebulaBackground intensity={intensity} />
      )}
      {(variant === 'planets' || variant === 'combined') && (
        <PlanetarySystem intensity={intensity} />
      )}
      {(variant === 'galaxy' || variant === 'combined') && (
        <GalaxyBackground intensity={intensity} />
      )}
      {(variant === 'geometric') && (
        <GeometricBackground intensity={intensity} />
      )}

      {/* Content */}
      <div className="relative z-40">{children}</div>
    </div>
  );
};

// 1. Star Field - Lightweight CSS-based stars with minimal JS
const StarField: React.FC<StarFieldProps> = ({
  interactivity,
  intensity,
  className = ''
}) => {
  const starFieldRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Determine number of stars based on intensity
  const starCount = intensity === 'low' ? 30 : intensity === 'medium' ? 60 : 100;

  // Only track mouse position if interactivity is enabled
  useEffect(() => {
    if (!interactivity) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!starFieldRef.current) return;

      const rect = starFieldRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactivity]);

  // Generate stars with random positions and properties
  const stars = Array.from({ length: starCount }).map((_, index) => {
    const size = Math.random() * 2 + 0.5; // 0.5 to 2.5px (smaller stars)
    const opacity = Math.random() * 0.5 + 0.5; // 0.5 to 1
    const left = `${Math.random() * 100}%`;
    const top = `${Math.random() * 100}%`;
    const delay = Math.random() * 3; // Random delays for twinkling
    const duration = Math.random() * 3 + 2; // 2-5s twinkle duration

    // Only a small percentage of stars get a color other than white
    const isColored = Math.random() > 0.8;
    const colorClass = isColored ?
      ['text-blue-200', 'text-yellow-200', 'text-orange-200', 'text-purple-200', 'text-pink-200'][
        Math.floor(Math.random() * 5)
      ] : 'text-white';

    return { id: index, size, opacity, left, top, delay, duration, colorClass };
  });

  return (
    <div ref={starFieldRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map(star => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-current ${star.colorClass} animate-twinkle`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            transform: interactivity ?
              `translate(${
                (mousePosition.x ? (mousePosition.x / 100) * (Math.random() - 0.5) : 0)
              }px, ${
                (mousePosition.y ? (mousePosition.y / 100) * (Math.random() - 0.5) : 0)
              }px)` :
              'none',
            transition: interactivity ? 'transform 2s ease-out' : 'none',
          }}
        />
      ))}
    </div>
  );
};

// 2. Nebula Background - Subtle colored gradients
const NebulaBackground: React.FC<NebulaProps> = ({ intensity, className = '' }) => {
  // Adjust opacity based on intensity
  const baseOpacity = intensity === 'low' ? 0.02 : intensity === 'medium' ? 0.04 : 0.06;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Use 2-3 large, soft blurred elements instead of many small ones */}
      <div
        className="absolute rounded-full bg-indigo-700 blur-3xl mix-blend-screen transform-gpu"
        style={{
          width: '60%',
          height: '60%',
          top: '10%',
          left: '5%',
          opacity: baseOpacity,
          animation: 'float 90s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full bg-purple-700 blur-3xl mix-blend-screen transform-gpu"
        style={{
          width: '50%',
          height: '50%',
          bottom: '5%',
          right: '10%',
          opacity: baseOpacity,
          animation: 'float 80s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute rounded-full bg-pink-700 blur-3xl mix-blend-screen transform-gpu"
        style={{
          width: '40%',
          height: '40%',
          top: '30%',
          right: '20%',
          opacity: baseOpacity,
          animation: 'float 70s ease-in-out infinite',
          animationDelay: '-20s',
        }}
      />
    </div>
  );
};

// 3. Planetary System - Circular elements with orbital animations
const PlanetarySystem: React.FC<PlanetarySystemProps> = ({ intensity, className = '' }) => {
  // Adjust number of planets based on intensity
  const planetCount = intensity === 'low' ? 2 : intensity === 'medium' ? 3 : 4;

  // Set base opacity based on intensity
  const baseOpacity = intensity === 'low' ? 0.3 : intensity === 'medium' ? 0.4 : 0.5;

  // Create planets with varying sizes, colors, and orbital paths
  const planets = Array.from({ length: planetCount }).map((_, index) => {
    const size = 10 + index * 5; // Increase size for planets further from center
    const orbitSize = 20 + index * 15; // Different orbit sizes
    const speed = 40 + index * 20; // Slower orbits for outer planets (in seconds)
    const delay = index * 5; // Different starting positions
    const opacity = baseOpacity - (index * 0.05); // Slightly lower opacity for further planets

    // More subtle planet colors
    const colors = [
      'from-indigo-900 to-blue-800',
      'from-purple-900 to-indigo-800',
      'from-blue-900 to-cyan-800',
      'from-slate-900 to-blue-900'
    ];

    return {
      id: index,
      size,
      orbitSize,
      speed,
      delay,
      opacity,
      color: colors[index % colors.length]
    };
  });

  return (
    <div className={`absolute inset-0 overflow-hidden flex items-center justify-center ${className}`}>
      {/* Central star/sun */}
      <div
        className="absolute rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 z-10"
        style={{
          width: '6px',
          height: '6px',
          boxShadow: '0 0 8px rgba(255, 216, 111, 0.8)',
          opacity: baseOpacity,
        }}
      />

      {/* Planets in orbit */}
      {planets.map(planet => (
        <div
          key={planet.id}
          className="absolute rounded-full border border-gray-800/20 animate-orbit"
          style={{
            width: `${planet.orbitSize}%`,
            height: `${planet.orbitSize}%`,
            animationDuration: `${planet.speed}s`,
            animationDelay: `-${planet.delay}s`,
            opacity: 0.4,
          }}
        >
          <div
            className={`absolute rounded-full bg-gradient-to-b ${planet.color} transform-gpu`}
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              top: 0,
              transform: 'translateX(-50%)',
              opacity: planet.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );
};

// 4. Galaxy Background - Subtle spiral gradient effect
const GradientBackground: React.FC<GalaxyBackgroundProps> = ({ intensity, className = '' }) => {
  // Calculate opacity and animation speed based on intensity
  const baseOpacity = intensity === 'low' ? 0.1 : intensity === 'medium' ? 0.15 : 0.2;
  const animationSpeed = intensity === 'low' ? '80s' : intensity === 'medium' ? '60s' : '40s';

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 transform-gpu"
        style={{
          backgroundSize: '200% 200%',
          animation: `gradient ${animationSpeed} ease infinite`,
        }}
      />

      {/* Galaxy spiral effect - one main element with strong blur */}
      <div
        className="absolute w-full h-full opacity-10 transform-gpu"
        style={{
          backgroundImage: 'radial-gradient(ellipse at center, rgba(108, 99, 255, 0.2) 0%, rgba(0,0,0,0) 70%)',
          animation: 'spin 120s linear infinite',
          transformOrigin: 'center',
        }}
      />

      {/* A few large subtle "dust clouds" with different opacities */}
      <div
        className="absolute w-3/4 h-3/4 rounded-full bg-indigo-500/5 blur-3xl transform-gpu"
        style={{
          top: '15%',
          left: '10%',
          animation: 'float 100s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-1/2 h-1/2 rounded-full bg-purple-500/5 blur-3xl transform-gpu"
        style={{
          bottom: '20%',
          right: '15%',
          animation: 'float 90s ease-in-out infinite reverse',
          animationDelay: '-30s',
        }}
      />
    </div>
  );
};

// Alias for backward compatibility
const GalaxyBackground = GradientBackground;

// 5. Geometric Background - Space-themed geometric shapes (constellation patterns)
const GeometricBackground: React.FC<GeometricBackgroundProps> = ({ intensity, className = '' }) => {
  // Adjust shape count and opacity based on intensity
  const shapeCount = intensity === 'low' ? 3 : intensity === 'medium' ? 5 : 8;
  const baseOpacity = intensity === 'low' ? 0.03 : intensity === 'medium' ? 0.05 : 0.08;

  // Generate constellation shapes
  const shapes = Array.from({ length: shapeCount }).map((_, index) => {
    const size = Math.random() * 150 + 100; // 100-250px size
    const left = `${Math.random() * 90}%`;
    const top = `${Math.random() * 90}%`;
    const rotation = Math.random() * 360; // Random rotation
    const duration = 100 + Math.random() * 100; // Very slow rotation (100-200s)

    // Choose a constellation pattern
    const patterns = [
      'M0,0 L30,10 L50,40 L20,30 Z', // Small dipper-like
      'M0,0 L40,10 L50,50 L10,40 L30,20 Z', // Pentagon-like
      'M0,0 L50,10 L40,50 L10,40 Z', // Quadrilateral
      'M0,0 L50,20 L30,50 L10,30 Z', // Trapezoid
      'M0,0 L20,50 L50,30 L30,10 Z', // Random shape
    ];
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];

    return {
      id: index,
      size,
      left,
      top,
      rotation,
      duration,
      pattern,
      opacity: baseOpacity * (Math.random() * 0.5 + 0.75) // Slight variation in opacity
    };
  });

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="absolute opacity-10"
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: shape.left,
            top: shape.top,
            opacity: shape.opacity,
            transform: `rotate(${shape.rotation}deg)`,
            animation: `spin ${shape.duration}s linear infinite`,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Constellation shape */}
            <path
              d={shape.pattern}
              fill="none"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="0.5"
            />

            {/* Stars at vertices */}
            <circle cx="0" cy="0" r="1.5" fill="white" />
            <circle cx="50" cy="10" r="1" fill="white" />
            <circle cx="40" cy="50" r="1.2" fill="white" />
            <circle cx="10" cy="40" r="1" fill="white" />
            <circle cx="30" cy="20" r="0.8" fill="white" />
          </svg>
        </div>
      ))}
    </div>
  );
};

// 6. Animated Waves - Space version (space dust waves)
const AnimatedWaves: React.FC<AnimatedWavesProps> = ({ intensity, className = '' }) => {
  // Adjust opacity based on intensity
  const baseOpacity = intensity === 'low' ? 0.04 : intensity === 'medium' ? 0.07 : 0.1;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Create several layers of cosmic dust waves using SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: baseOpacity }}
      >
        {/* First cosmic dust wave */}
        <path
          d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#cosmicDust1)"
          className="animate-wave-slow"
          style={{ animationDuration: '60s' }}
        />

        {/* Second cosmic dust wave */}
        <path
          d="M0,352L48,346.7C96,341,192,331,288,309.3C384,288,480,256,576,229.3C672,203,768,181,864,197.3C960,213,1056,267,1152,277.3C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#cosmicDust2)"
          className="animate-wave"
          style={{ animationDuration: '50s' }}
        />

        {/* Third cosmic dust wave */}
        <path
          d="M0,192L80,186.7C160,181,320,171,480,186.7C640,203,800,245,960,256C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          fill="url(#cosmicDust3)"
          className="animate-wave-reverse"
          style={{ animationDuration: '70s' }}
        />

        {/* Gradients for cosmic dust */}
        <defs>
          <linearGradient id="cosmicDust1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
            <stop offset="50%" stopColor="rgba(124, 58, 237, 0.2)" />
            <stop offset="100%" stopColor="rgba(79, 70, 229, 0.2)" />
          </linearGradient>

          <linearGradient id="cosmicDust2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.1)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
          </linearGradient>

          <linearGradient id="cosmicDust3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.15)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.15)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.15)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Small animated star particles on the waves */}
      {Array.from({ length: 15 }).map((_, index) => {
        const size = Math.random() * 2 + 1; // 1-3px
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 40 + 20}%`; // Position along the wave areas
        const duration = Math.random() * 10 + 20; // 20-30s
        const delay = Math.random() * 5;

        return (
          <div
            key={index}
            className="absolute rounded-full bg-white opacity-70 animate-pulse-slow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left,
              top,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.8)`
            }}
          />
        );
      })}
    </div>
  );
};

// Export as default object with named components
export default {
  AnimatedBackground,
  StarField,
  NebulaBackground,
  PlanetarySystem,
  GalaxyBackground,
  GradientBackground,  // This is the new name for the GalaxyBackground
  GeometricBackground,
  AnimatedWaves
};