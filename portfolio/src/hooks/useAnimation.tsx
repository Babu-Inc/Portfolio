// src/hooks/useAnimation.tsx
// Custom hooks for controlling animations across components

import { useState, useEffect, useRef, useCallback } from 'react';

// Constants for consistent timing
export const ANIMATION_TIMING = {
  fast: 300,
  medium: 500,
  slow: 800,
  verySlow: 1200
};

// Constants for animation easing
export const ANIMATION_EASING = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

// Hook for controlling staggered animations
export const useStaggeredAnimation = (
  itemCount: number,
  staggerDelay: number = 100,
  initialDelay: number = 0
) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize all items as not visible
    const items = Array(itemCount).fill(false);
    setVisibleItems(items);

    // Stagger the animations
    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, initialDelay + i * staggerDelay);

      timeouts.push(timeout);
    }

    // Cleanup timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [itemCount, staggerDelay, initialDelay]);

  return visibleItems;
};

// Hook for controlling scroll-triggered animations
export const useScrollAnimation = (
  threshold: number = 0.1,
  rootMargin: string = '0px',
  triggerOnce: boolean = true
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (triggerOnce && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Hook for smooth progress-based animations
export const useAnimationProgress = (
  duration: number = 1000,
  easing: (t: number) => number = t => t
) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const startAnimation = useCallback(() => {
    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(rawProgress);

      setProgress(easedProgress);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [duration, easing]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const resetAnimation = useCallback(() => {
    stopAnimation();
    setProgress(0);
  }, [stopAnimation]);

  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

  return {
    progress,
    startAnimation,
    stopAnimation,
    resetAnimation
  };
};

// Hook for parallax scrolling effect
export const useParallaxScroll = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      // Calculate scroll position
      const scrollY = window.scrollY;
      const offsetY = scrollY * speed;

      // Apply transform with hardware acceleration
      ref.current.style.transform = `translate3d(0, ${offsetY}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return ref;
};

// Hook for animation sequencing
export const useAnimationSequence = (steps: number) => {
  const [currentStep, setCurrentStep] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const nextStep = useCallback(() => {
    setCurrentStep(prev => (prev < steps - 1 ? prev + 1 : prev));
  }, [steps]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps) {
      setCurrentStep(step);
    }
  }, [steps]);

  const scheduleNext = useCallback((delay: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      nextStep();
    }, delay);
  }, [nextStep]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    scheduleNext,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps - 1,
    progress: steps > 1 ? currentStep / (steps - 1) : 1
  };
};

// Hook for controlling hover animations
export const useHoverAnimation = (duration: number = ANIMATION_TIMING.fast) => {
  const [isHovered, setIsHovered] = useState(false);

  const bindHoverEvents = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onBlur: () => setIsHovered(false)
  };

  return {
    isHovered,
    bindHoverEvents,
    hoverClass: isHovered ? 'hovered' : '',
    hoverStyle: {
      transition: `all ${duration}ms ${ANIMATION_EASING.easeOut}`
    }
  };
};

// Hook for controlling typing animation
export const useTypingAnimation = (
  text: string,
  typingSpeed: number = 50,
  startDelay: number = 0,
  autoStart: boolean = true
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout>();
  const charIndexRef = useRef(0);
  const textRef = useRef(text);

  // Update text reference when it changes
  useEffect(() => {
    textRef.current = text;

    // Reset if text changes
    if (autoStart) {
      resetTyping();
      startTyping();
    }
  }, [text]);

  const startTyping = useCallback(() => {
    if (isTyping) return;

    setIsTyping(true);
    setIsDone(false);
    charIndexRef.current = 0;
    setDisplayedText('');

    const type = () => {
      if (charIndexRef.current < textRef.current.length) {
        setDisplayedText(prev => prev + textRef.current.charAt(charIndexRef.current));
        charIndexRef.current++;

        intervalRef.current = setTimeout(type, typingSpeed);
      } else {
        setIsTyping(false);
        setIsDone(true);
      }
    };

    intervalRef.current = setTimeout(type, startDelay);
  }, [typingSpeed, startDelay]);

  const stopTyping = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = undefined;
    }
    setIsTyping(false);
  }, []);

  const resetTyping = useCallback(() => {
    stopTyping();
    setDisplayedText('');
    charIndexRef.current = 0;
    setIsDone(false);
  }, [stopTyping]);

  // Auto-start effect - only run once on mount
  useEffect(() => {
    if (autoStart && text) {
      startTyping();
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return {
    displayedText,
    isTyping,
    isDone,
    startTyping,
    stopTyping,
    resetTyping
  };
};

// Hook for optimized scroll animations with intersection observer
export const useOptimizedScrollAnimation = (options = { threshold: 0.1, triggerOnce: true }) => {
  const { threshold, triggerOnce } = options;
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [visibleElements, setVisibleElements] = useState<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            setVisibleElements(prev => {
              const updated = new Set(prev);
              updated.add(element);
              return updated;
            });

            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setVisibleElements(prev => {
              const updated = new Set(prev);
              updated.delete(element);
              return updated;
            });
          }
        });
      },
      { threshold }
    );

    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [elements, threshold, triggerOnce]);

  const registerElement = useCallback((element: HTMLElement | null) => {
    if (element && !elements.includes(element)) {
      setElements(prev => [...prev, element]);
    }
  }, [elements]);

  const isVisible = useCallback(
    (element: HTMLElement | null) => {
      return element ? visibleElements.has(element) : false;
    },
    [visibleElements]
  );

  return { registerElement, isVisible };
};

export default {
  useStaggeredAnimation,
  useScrollAnimation,
  useAnimationProgress,
  useParallaxScroll,
  useAnimationSequence,
  useHoverAnimation,
  useTypingAnimation,
  useOptimizedScrollAnimation,
  ANIMATION_TIMING,
  ANIMATION_EASING
};