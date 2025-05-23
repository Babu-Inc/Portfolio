// File: src/components/parallax/parallaxHooks.ts
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Optimized utilities for creating performant parallax effects
 * Provides custom React hooks for different scroll-based animations
 */

/**
 * Hook to detect element visibility and trigger animations
 * Uses IntersectionObserver for better performance than scroll events
 */
export const useElementVisibility = (
    options: {
        threshold?: number;
        rootMargin?: string;
        triggerOnce?: boolean;
    } = {}
) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const currentElement = elementRef.current;
        if (!currentElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(currentElement);

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return { isVisible, elementRef };
};

/**
 * Hook to create a parallax scrolling effect based on scroll position
 * Returns transform values that can be applied to elements
 */
export const useParallaxScroll = (
    speed: number = 0.1,
    direction: 'vertical' | 'horizontal' = 'vertical'
) => {
    const [offset, setOffset] = useState(0);
    const ref = useRef<HTMLElement>(null);

    // Performance optimization: Throttle scroll events
    const throttle = useCallback(<T extends any[]>(callback: (...args: T) => void, limit: number = 16) => {
        let waiting = false;
        return (...args: T) => {
            if (!waiting) {
                callback(...args);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, limit);
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (isInView) {
                // Get element position relative to viewport
                const viewportMiddle = window.innerHeight / 2;
                const elementMiddle = rect.top + rect.height / 2;
                const distanceFromMiddle = elementMiddle - viewportMiddle;

                // Calculate parallax offset
                setOffset(distanceFromMiddle * speed);
            }
        };

        // Throttle for performance
        const throttledScroll = throttle(handleScroll);
        window.addEventListener('scroll', throttledScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', throttledScroll);
    }, [speed, throttle]);

    // Return transform style for the element
    const transform = direction === 'vertical'
        ? `translateY(${-offset}px)`
        : `translateX(${-offset}px)`;

    return { ref, transform, offset };
};

/**
 * Hook to calculate transform based on scroll position within a section
 * Creates a sticky effect with parallax elements during scroll
 */
export const useStickyParallax = (
    duration: number = 1.5, // Viewport heights to scroll through
    startOffset: number = 0 // Offset before starting the effect (0-1)
) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate when the effect should start
            const startPosition = viewportHeight * startOffset;

            // Calculate when the container is in the active zone
            const isNowActive = rect.top <= startPosition && rect.bottom >= 0;
            setIsActive(isNowActive);

            if (isNowActive) {
                // Calculate progress through the parallax section (0 to 1)
                const totalScrollDistance = viewportHeight * duration;
                const scrolled = startPosition - rect.top;
                const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
                setProgress(currentProgress);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, [duration, startOffset]);

    // Function to calculate transform for elements at different speeds
    const getTransform = (speed: number) => {
        if (!isActive) return {};

        return {
            transform: `translateY(${progress * -100 * speed}%)`,
            transition: 'transform 0.1s ease-out'
        };
    };

    return { containerRef, progress, isActive, getTransform };
};

/**
 * Hook to create a depth-based parallax effect on mouse movement
 * Perfect for subtle hover effects
 */
export const useMouseParallax = (
    intensity: number = 0.1,
    resetOnLeave: boolean = true
) => {
    const elementRef = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Track last animation frame request
        let animationFrameId: number;

        // Target and current positions for smooth interpolation
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();

            // Calculate position relative to element center (-1 to 1)
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            if (!isHovering) setIsHovering(true);

            // Start animation loop if not running
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updatePosition);
            }
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            if (resetOnLeave) {
                targetX = 0;
                targetY = 0;
            }
        };

        const updatePosition = () => {
            // Smooth interpolation
            const easing = 0.1; // Lower = smoother
            currentX += (targetX - currentX) * easing;
            currentY += (targetY - currentY) * easing;

            setPosition({ x: currentX, y: currentY });

            // Continue animation
            animationFrameId = requestAnimationFrame(updatePosition);

            // Stop animation if stabilized and not hovering
            if (!isHovering && resetOnLeave &&
                Math.abs(currentX) < 0.001 && Math.abs(currentY) < 0.001) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = 0;
            }
        };

        // Add event listeners
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [intensity, resetOnLeave, isHovering]);

    // Generate transform based on position and layer depth
    const getTransform = (depth: number = 1) => {
        const x = position.x * intensity * 50 * depth;
        const y = position.y * intensity * 50 * depth;

        return {
            transform: `translateX(${x}px) translateY(${y}px)`,
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        };
    };

    return { elementRef, position, isHovering, getTransform };
};

/**
 * Utility functions for performance
 */

// Debounce function to limit how often a function runs
export const debounce = <T extends any[]>(func: (...args: T) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: T) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Throttle function to limit function calls
export const throttle = <T extends any[]>(func: (...args: T) => void, limit: number) => {
    let inThrottle = false;
    return (...args: T) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
};

// Check device performance to adjust effects
export const isLowPerformanceDevice = () => {
    const { hardwareConcurrency = 4 } = navigator as Navigator;
    return hardwareConcurrency < 4;
};