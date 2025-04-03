import React, { useEffect, useState, useRef } from 'react';

// Animation timing constants for consistency across components
export const TIMING = {
  fast: 300,      // Quick transitions (hover effects, small UI changes)
  medium: 500,    // Medium transitions (section reveals, card expansions)
  slow: 800,      // Slower animations (hero elements, background effects)
  verySlow: 1200  // Very slow animations (particles, space animations)
};

// Easing functions for different animation feels
export const EASING = {
  // Standard easings
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // Custom easings for specific effects
  bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
};

// Animation variants for use with framer-motion or CSS transitions
export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: TIMING.medium / 1000 } }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: TIMING.medium / 1000,
        ease: EASING.easeOut
      }
    }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: TIMING.medium / 1000,
        ease: EASING.easeOut
      }
    }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: TIMING.medium / 1000,
        ease: EASING.bounce
      }
    }
  },
  stagger: (staggerTime = 0.1) => ({
    visible: {
      transition: {
        staggerChildren: staggerTime
      }
    }
  })
};

// Hook to detect when an element is in viewport
export const useInView = (options = { threshold: 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

// Animation presets for common components
export const ANIMATION_PRESETS = {
  sectionReveal: `opacity-0 translate-y-10 transition-all duration-${TIMING.medium} ease-out`,
  sectionRevealed: `opacity-100 translate-y-0`,
  fadeIn: `transition-opacity duration-${TIMING.medium} ease-in-out`,
  hover: `transition-all duration-${TIMING.fast} ease-out transform hover:scale-105`,
  pulse: `animate-pulse-slow`,
  float: `animate-float`,
};

// Animated component wrapper for section reveals
export const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}> = ({ children, className = '', delay = 0, threshold = 0.1 }) => {
  const { ref, isVisible } = useInView({ threshold });

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-${TIMING.medium} ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

// Hook for coordinated animations between multiple elements
export const useCoordinatedAnimation = (steps = 1, baseDelay = 100) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        setStep(currentStep);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, baseDelay);

    return () => clearInterval(interval);
  }, [steps, baseDelay]);

  const getDelay = (stepNumber: number) => stepNumber * baseDelay;
  const isReady = (stepNumber: number) => step >= stepNumber;

  return { getDelay, isReady, currentStep: step };
};

// ThreeJS animation utility for smooth camera animations
export const smoothCameraLookAt = (
  camera: any,
  targetPosition: { x: number, y: number, z: number },
  duration: number = TIMING.slow,
  onComplete?: () => void
) => {
  const startTime = Date.now();
  const startPosition = { ...camera.position };
  const startRotation = { ...camera.rotation };

  // Create a temporary camera to calculate target rotation
  const tempCamera = camera.clone();
  tempCamera.position.copy(targetPosition);
  tempCamera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
  const targetRotation = { ...tempCamera.rotation };

  const animate = () => {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Apply easing
    const easedProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Interpolate position and rotation
    camera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * easedProgress;
    camera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * easedProgress;
    camera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * easedProgress;

    camera.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * easedProgress;
    camera.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * easedProgress;
    camera.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else if (onComplete) {
      onComplete();
    }
  };

  animate();
};

// Mouse parallax effect hook
export const useMouseParallax = (strength = 0.1) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate target position (normalized -1 to 1)
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;

    setTarget({ x, y });
  };

  const animate = () => {
    // Apply smooth interpolation
    setPosition(prev => ({
      x: prev.x + (target.x - prev.x) * 0.1,
      y: prev.y + (target.y - prev.y) * 0.1
    }));

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [target]);

  return {
    x: position.x * strength,
    y: position.y * strength
  };
};

// Optimized animation frame hook to prevent excessive renders
export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
};

// Scroll progress hook for scroll-triggered animations
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress(currentScroll / totalScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};