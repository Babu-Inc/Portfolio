import React, { useEffect, useRef, useState } from 'react';

// Interface for mouse position
interface MousePosition {
  x: number;
  y: number;
}

// Mouse follower component with smooth transitions
export const MouseFollower: React.FC<{
  size?: number;
  color?: string;
  blur?: number;
  opacity?: number;
  delay?: number;
}> = ({
  size = 20,
  color = 'rgba(99, 102, 241, 0.5)',
  blur = 10,
  opacity = 0.7,
  delay = 0.08
}) => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    let mousePosition = { x: 0, y: 0 };
    let currentPosition = { x: 0, y: 0 };
    let animationFrameId: number;

    // Show the follower when mouse moves
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Hide when mouse leaves window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    // Animate follower with smooth interpolation
    const animateFollower = () => {
      // Smooth interpolation
      currentPosition.x += (mousePosition.x - currentPosition.x) * delay;
      currentPosition.y += (mousePosition.y - currentPosition.y) * delay;

      // Apply transform with hardware acceleration
      follower.style.transform = `translate3d(${currentPosition.x}px, ${currentPosition.y}px, 0)`;

      animationFrameId = requestAnimationFrame(animateFollower);
    };

    // Initialize animation
    currentPosition.x = mousePosition.x;
    currentPosition.y = mousePosition.y;
    animationFrameId = requestAnimationFrame(animateFollower);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [delay]);

  return (
    <div
      ref={followerRef}
      className="pointer-events-none fixed top-0 left-0 z-50 will-change-transform"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity: isVisible ? opacity : 0,
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'opacity 0.3s ease',
        marginLeft: `-${size / 2}px`,
        marginTop: `-${size / 2}px`
      }}
    />
  );
};

// Hook to add magnetic effect to elements
export const useMagneticEffect = (
  strength: number = 0.3,
  ease: number = 0.1
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let bounds: DOMRect;
    let mousePosition = { x: 0, y: 0 };
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      bounds = element.getBoundingClientRect();

      mousePosition = {
        x: e.clientX - bounds.left - bounds.width / 2,
        y: e.clientY - bounds.top - bounds.height / 2
      };

      if (!active) {
        setActive(true);
      }
    };

    const handleMouseLeave = () => {
      setActive(false);

      // Reset position on mouse leave
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    // Use GSAP for smoother animations if available
    const animateMagnetic = () => {
      if (active && typeof window.gsap !== 'undefined') {
        // Apply magnetic effect with GSAP
        gsap.to(element, {
          x: mousePosition.x * strength,
          y: mousePosition.y * strength,
          duration: ease
        });
      }

      animationFrameId = requestAnimationFrame(animateMagnetic);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animateMagnetic);

    // Add event listeners
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [strength, ease, active]);

  return elementRef;
};

// Utility to create magnetic button with smooth hover effect
export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}> = ({
  children,
  className = '',
  strength = 0.3,
  onClick
}) => {
  const buttonRef = useMagneticEffect(strength);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

// 3D tilt effect for cards
export const useTiltEffect = (
  perspective: number = 1000,
  scale: number = 1.05,
  max: number = 15
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateTilt = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      // Calculate tilt
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      const tiltX = -max * percentY;
      const tiltY = max * percentX;

      // Apply transform with smooth transition
      element.style.transform = `
        perspective(${perspective}px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale3d(${scale}, ${scale}, ${scale})
      `;
    };

    const resetTilt = () => {
      element.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
    };

    // Add event listeners
    element.addEventListener('mousemove', updateTilt);
    element.addEventListener('mouseleave', resetTilt);

    // Cleanup
    return () => {
      element.removeEventListener('mousemove', updateTilt);
      element.removeEventListener('mouseleave', resetTilt);
    };
  }, [perspective, scale, max]);

  return elementRef;
};

// 3D tilt component for cards or sections
export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  scale?: number;
  max?: number;
}> = ({
  children,
  className = '',
  perspective = 1000,
  scale = 1.05,
  max = 15
}) => {
  const tiltRef = useTiltEffect(perspective, scale, max);

  return (
    <div
      ref={tiltRef}
      className={`transition-transform duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

// Parallax effect based on mouse position
export const useParallaxEffect = (depth: number = 30) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      // Normalize coordinates to range -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;

      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Apply the transform based on mouse position
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Apply smooth parallax movement
    const x = position.x * depth;
    const y = position.y * depth;

    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, [position, depth]);

  return elementRef;
};

// Parallax layers component for background depth
export const ParallaxLayers: React.FC<{
  children: React.ReactNode[];
  baseDepth?: number;
  className?: string;
}> = ({
  children,
  baseDepth = 20,
  className = ''
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {React.Children.map(children, (child, index) => {
        // Calculate depth based on index
        const depth = baseDepth / (index + 1);

        return (
          <ParallaxLayer depth={depth} key={index}>
            {child}
          </ParallaxLayer>
        );
      })}
    </div>
  );
};

// Single parallax layer
const ParallaxLayer: React.FC<{
  children: React.ReactNode;
  depth: number;
  className?: string;
}> = ({
  children,
  depth,
  className = ''
}) => {
  const layerRef = useParallaxEffect(depth);

  return (
    <div
      ref={layerRef}
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{ transition: 'transform 0.1s ease-out' }}
    >
      {children}
    </div>
  );
};

// Declare global GSAP interface
declare global {
  interface Window {
    gsap?: any;
  }
}

export default {
  MouseFollower,
  MagneticButton,
  TiltCard,
  ParallaxLayers,
  useMagneticEffect,
  useTiltEffect,
  useParallaxEffect
};