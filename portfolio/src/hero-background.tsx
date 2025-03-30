import React, { useEffect, useRef } from 'react';

interface HeroBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

// Simple canvas-based star field with minimal resource usage
const AnimatedHeroBackground: React.FC<HeroBackgroundProps> = ({
  className = '',
  intensity = 'low'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Determine star count based on intensity
    const pointsMultiplier = intensity === 'low' ? 0.03 : intensity === 'medium' ? 0.06 : 0.1;
    const numStars = Math.floor(window.innerWidth * window.innerHeight * pointsMultiplier / 1000);

    // Generate stars with positions, sizes, and colors
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5, // 0.5 to 2px
      color: Math.random() > 0.9 ? // Only 10% of stars get a color
        `hsla(${Math.random() * 60 + 200}, 80%, 80%, 0.8)` : // Blue hues
        `hsla(60, 20%, 95%, ${Math.random() * 0.4 + 0.6})`, // White with varying opacity
      twinkleSpeed: Math.random() * 0.01 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let animationFrameId: number;
    let time = 0;

    // Animation loop
    const animate = () => {
      // Clear canvas with a semi-transparent black for a trail effect
      ctx.fillStyle = 'rgba(13, 17, 30, 0.05)'; // Very dark blue with low opacity
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      time += 0.01;

      // Draw stars
      stars.forEach(star => {
        // Simple twinkling effect with sine wave
        const twinkle = 0.7 + 0.3 * Math.sin(time + star.twinklePhase);

        // Draw star with glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          star.x / window.devicePixelRatio,
          star.y / window.devicePixelRatio,
          0,
          star.x / window.devicePixelRatio,
          star.y / window.devicePixelRatio,
          star.radius * 2
        );
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.arc(
          star.x / window.devicePixelRatio,
          star.y / window.devicePixelRatio,
          star.radius * twinkle,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', resize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

// CSS-based glowing stars with minimal JS for hero backgrounds
const HeroGlowingStars: React.FC<{
  className?: string;
  starCount?: number;
}> = ({
  className = '',
  starCount = 20 // Reduced from 50 to 20 for better performance
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: starCount }).map((_, index) => {
        const size = Math.random() * 4 + 2; // 2-6px
        const duration = Math.random() * 10 + 10; // 10-20s pulse duration
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const delay = Math.random() * 10;
        const hue = Math.random() > 0.8 ?
          Math.random() * 60 + 200 : // Blue to purple for some stars
          60; // Yellow/white for most stars

        return (
          <div
            key={index}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left,
              top,
              backgroundColor: `hsla(${hue}, 80%, 80%, 0.2)`,
              boxShadow: `0 0 ${size}px hsla(${hue}, 80%, 70%, 0.5)`,
              animation: `pulse ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
    </div>
  );
};

// Distant galaxies that slowly rotate
const DistantGalaxies: React.FC<{
  className?: string;
  count?: number;
}> = ({
  className = '',
  count = 3 // Just a few for better performance
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, index) => {
        const size = Math.random() * 200 + 100; // 100-300px
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 200 + 100; // Very slow rotation
        const hue = Math.random() * 60 + 200; // Blue to purple

        return (
          <div
            key={index}
            className="absolute rounded-full blur-3xl mix-blend-screen animate-spin-slow transform-gpu"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left,
              top,
              background: `radial-gradient(ellipse at center, hsla(${hue}, 70%, 40%, 0.15) 0%, transparent 70%)`,
              transform: `rotate(${rotation}deg)`,
              animation: `spin ${duration}s linear infinite`,
            }}
          />
        );
      })}
    </div>
  );
};

// Shooting stars that occasionally cross the screen
const ShootingStars: React.FC<{
  className?: string;
}> = ({
  className = ''
}) => {
  // This component uses only CSS for animations
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const size = Math.random() * 100 + 50; // Length of shooting star trail
        const startLeft = `${Math.random() * 80}%`;
        const startTop = `${Math.random() * 50}%`;
        const angle = Math.random() * 50 + 20; // Angle between 20-70 degrees
        const delay = Math.random() * 20 + (index * 4); // Stagger shooting stars
        const duration = Math.random() * 3 + 2; // 2-5s

        return (
          <div
            key={index}
            className="absolute h-px rounded-full animate-shooting-star transform-gpu opacity-0"
            style={{
              width: `${size}px`,
              left: startLeft,
              top: startTop,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
              transform: `rotate(${angle}deg)`,
              animation: `shootingStar ${duration}s ease-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

// Export as default object with named components
export default {
  AnimatedHeroBackground,
  HeroGlowingStars,
  DistantGalaxies,
  ShootingStars
};