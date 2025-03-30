import React, { useEffect, useRef, useState } from 'react';

interface MouseInteractiveStarsProps {
  starCount?: number;
  starColors?: string[];
  maxDistance?: number;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

// Lightweight interactive star field with mouse gravity effect
const MouseInteractiveStars: React.FC<MouseInteractiveStarsProps> = ({
  starCount = 50, // Reduced default count
  starColors = ['text-blue-300', 'text-white', 'text-purple-300', 'text-cyan-300'],
  maxDistance = 150,
  intensity = 'low',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

  // Adjust star count based on intensity
  const adjustedStarCount = intensity === 'low' ? starCount * 0.6 :
                           intensity === 'medium' ? starCount :
                           starCount * 1.3;

  const stars = useRef<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
    initialX: number;
    initialY: number;
    element: HTMLDivElement | null;
  }>>([]);

  // Initialize stars
  useEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: containerRect.width, height: containerRect.height });

    // Generate fewer stars with slight variations
    stars.current = Array.from({ length: Math.floor(adjustedStarCount) }).map((_, index) => {
      const size = Math.random() * 2 + 1; // 1-3px (smaller stars)
      const x = Math.random() * containerRect.width;
      const y = Math.random() * containerRect.height;
      // Choose a color with higher probability of white stars
      const color = starColors[Math.random() > 0.7 ? Math.floor(Math.random() * starColors.length) : 1];
      const opacity = Math.random() * 0.5 + 0.5; // 0.5-1

      return {
        id: index,
        x,
        y,
        initialX: x, // Store initial position for return animation
        initialY: y,
        size,
        color,
        opacity,
        element: null,
      };
    });

    // Set up animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!containerRef.current) return;

      stars.current.forEach(star => {
        if (!star.element) return;

        // Update star positions
        star.element.style.transform = `translate(${star.x}px, ${star.y}px)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [adjustedStarCount, starColors, dimensions]);

  // Track mouse position and apply gravity effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Apply gravity effect when mouse position changes
  useEffect(() => {
    if (!mousePosition) {
      // Return stars to their initial positions when mouse leaves
      stars.current.forEach(star => {
        const dx = star.initialX - star.x;
        const dy = star.initialY - star.y;

        // Apply a slight return force
        star.x += dx * 0.02;
        star.y += dy * 0.02;
      });
      return;
    }

    stars.current.forEach(star => {
      const dx = mousePosition.x - star.x;
      const dy = mousePosition.y - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        // Stars are attracted to mouse
        const force = (maxDistance - distance) / maxDistance;
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Apply force inversely proportional to size (smaller stars move more)
        const sizeFactor = 3 / star.size;
        star.x += dirX * force * 0.5 * sizeFactor;
        star.y += dirY * force * 0.5 * sizeFactor;
      }
    });
  }, [mousePosition, maxDistance]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });

      // Reposition stars within new boundaries
      stars.current.forEach(star => {
        star.initialX = Math.random() * rect.width;
        star.initialY = Math.random() * rect.height;
        star.x = star.initialX;
        star.y = star.initialY;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.current.map(star => (
        <div
          key={star.id}
          ref={el => { star.element = el; }}
          className={`absolute rounded-full ${star.color} transition-transform duration-500`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transform: `translate(${star.x}px, ${star.y}px)`,
            boxShadow: star.size > 2 ? `0 0 ${star.size}px rgba(255, 255, 255, 0.5)` : 'none'
          }}
        />
      ))}
    </div>
  );
};

// Constellation network effect that reacts to mouse
const StarConstellations: React.FC<{
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  connectDistance?: number;
  lineColor?: string;
}> = ({
  className = '',
  intensity = 'low',
  connectDistance = 100, // Reduced from 150
  lineColor = 'rgba(255, 255, 255, 0.1)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const starsRef = useRef<Array<{
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    brightness: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for better rendering
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Determine star count based on intensity and canvas size, but keep it low
    const pointMultiplier = intensity === 'low' ? 0.00005 :
                           intensity === 'medium' ? 0.0001 :
                           0.00015;
    const starCount = Math.min(
      Math.floor(canvas.width * canvas.height * pointMultiplier),
      30 // Cap at 30 stars for performance
    );

    // Create constellation stars with minimal properties
    starsRef.current = Array.from({ length: starCount }).map(() => {
      return {
        x: Math.random() * canvas.width / window.devicePixelRatio,
        y: Math.random() * canvas.height / window.devicePixelRatio,
        radius: Math.random() * 1.5 + 0.5, // Very small stars 0.5-2px
        vx: (Math.random() - 0.5) * 0.1, // Much slower movement
        vy: (Math.random() - 0.5) * 0.1,
        brightness: Math.random() * 0.3 + 0.7 // 0.7-1.0 brightness
      };
    });

    // Animation loop
    let animationFrameId: number;
    let lastDrawTime = 0;

    const animate = (timestamp: number) => {
      // Limit drawing to ~30fps to reduce CPU usage
      if (timestamp - lastDrawTime < 33) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      lastDrawTime = timestamp;

      // Use a fading clear instead of full clear for trail effect
      ctx.fillStyle = 'rgba(13, 17, 23, 0.3)'; // Dark space color with high opacity
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Update and draw stars
      starsRef.current.forEach(star => {
        // Move star very slowly
        star.x += star.vx;
        star.y += star.vy;

        // Bounce off edges
        if (star.x < 0 || star.x > canvas.width / window.devicePixelRatio) {
          star.vx *= -1;
        }
        if (star.y < 0 || star.y > canvas.height / window.devicePixelRatio) {
          star.vy *= -1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();

        // Mouse gravity effect
        if (mousePosition) {
          const dx = mousePosition.x - star.x;
          const dy = mousePosition.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            // Very weak attraction force
            const force = (connectDistance - distance) / connectDistance * 0.02;
            star.vx += dx * force * 0.01;
            star.vy += dy * force * 0.01;

            // Speed limit to prevent extreme acceleration
            const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
            if (speed > 0.5) {
              star.vx = (star.vx / speed) * 0.5;
              star.vy = (star.vy / speed) * 0.5;
            }
          }
        }
      });

      // Connect nearby stars - but limit connections to reduce processing
      let connectionsDrawn = 0;
      const maxConnections = 30; // Limit connections

      for (let i = 0; i < starsRef.current.length && connectionsDrawn < maxConnections; i++) {
        const star = starsRef.current[i];

        for (let j = i + 1; j < starsRef.current.length && connectionsDrawn < maxConnections; j++) {
          const otherStar = starsRef.current[j];

          const dx = otherStar.x - star.x;
          const dy = otherStar.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance / 2) { // Shorter connection distance
            // Calculate opacity based on distance
            const opacity = (1 - distance / (connectDistance / 2)) * 0.3; // Lower max opacity

            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(otherStar.x, otherStar.y);
            ctx.strokeStyle = lineColor.replace(')', `, ${opacity})`).replace('rgba', 'rgba');
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.stroke();

            connectionsDrawn++;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    // Handle resize
    window.addEventListener('resize', resize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity, connectDistance, lineColor]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvasRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />
  );
};

// Cosmic dust particles that follow the mouse
const CosmicDust: React.FC<{
  className?: string;
  particleCount?: number;
}> = ({
  className = '',
  particleCount = 15 // Very few particles for performance
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const particlesRef = useRef<Array<{
    id: number;
    size: number;
    color: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    element: HTMLDivElement | null;
  }>>([]);

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    // Generate a small number of dust particles
    particlesRef.current = Array.from({ length: particleCount }).map((_, index) => {
      const size = Math.random() * 2 + 1; // 1-3px (very small)
      const colors = [
        'bg-blue-400/30',
        'bg-purple-400/30',
        'bg-white/30'
      ];
      return {
        id: index,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
        vx: (Math.random() - 0.5) * 0.5, // Very slow base movement
        vy: (Math.random() - 0.5) * 0.5,
        element: null
      };
    });

    // Animation loop at reduced frequency
    let animationFrameId: number;
    let lastUpdateTime = 0;

    const animate = (timestamp: number) => {
      // Limit updates to 30fps
      if (timestamp - lastUpdateTime < 33) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      lastUpdateTime = timestamp;

      particlesRef.current.forEach(particle => {
        if (!particle.element) return;

        // Apply simple movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check with wrap-around
        if (particle.x < 0) particle.x = containerRect.width;
        if (particle.x > containerRect.width) particle.x = 0;
        if (particle.y < 0) particle.y = containerRect.height;
        if (particle.y > containerRect.height) particle.y = 0;

        // Apply mouse influence (very gently)
        if (mousePosition) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            // Very subtle attraction
            particle.vx += dx * 0.001;
            particle.vy += dy * 0.001;

            // Speed limit
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 1) {
              particle.vx = (particle.vx / speed) * 1;
              particle.vy = (particle.vy / speed) * 1;
            }
          }
        }

        // Update position
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    };

    const handleMouseLeave = () => {
      setMousePosition(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {particlesRef.current.map(particle => (
        <div
          key={particle.id}
          ref={el => { particle.element = el; }}
          className={`absolute rounded-full blur-sm ${particle.color}`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      ))}
    </div>
  );
};

// Export as default object with named components
export default {
  MouseInteractiveStars,
  StarConstellations,
  CosmicDust
};