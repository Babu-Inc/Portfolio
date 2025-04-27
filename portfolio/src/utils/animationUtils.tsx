/**
 * =====================================================
 * ANIMATION UTILITIES FOR PORTFOLIO SITE
 * This file contains all animation-related utilities to enhance
 * site visuals while keeping code organized and performance optimized
 * =====================================================
 */

import { useEffect, useState, useRef } from 'react';
import React, { memo } from 'react';

export type AnimationName = 'fadeIn' | 'slideUp' | 'slideDown' | 'pulse' | 'float' | 'gradient' | 'bounce';

/**
 * ==== ANIMATION CLASS NAMES ====
 * Centralized animation class definitions to use throughout the app
 */
export const animations = {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
    pulse: 'animate-pulse-slow',
    float: 'animate-float',
    gradient: 'animate-gradient-text',
    bounce: 'animate-bounce-slow',
};

/**
 * ==== ANIMATION DELAY UTILITY ====
 * Helper function to generate staggered animation delays
 */
export const getAnimationDelay = (index: number, baseDelay: number = 100) => {
    return { animationDelay: `${index * baseDelay}ms` };
};

/**
 * ==== SCROLL ANIMATION HOOK ====
 * Hook that triggers animations when elements enter the viewport
 * Uses IntersectionObserver for performance benefits
 */
export const useScrollAnimation = (options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
} = {}) => {
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
 * ==== OPTIMIZED STARRY BACKGROUND ====
 * Enhanced version of the StarryBackground with performance improvements
 * - Uses React.memo to prevent unnecessary re-renders
 * - Uses ResizeObserver instead of window event listeners
 * - Optimizes animation frame handling
 */

interface StarryBackgroundProps {
    className?: string;
    starCount?: number;
    starColor?: string;
    speed?: 'slow' | 'medium' | 'fast';
    density?: 'low' | 'medium' | 'high';
}

export const StarryBackground = memo(({
                                          className = '',
                                          starCount = 100,
                                          starColor = 'rgba(255, 255, 255, 0.8)',
                                          speed = 'medium',
                                          density = 'medium',
                                      }: StarryBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Get actual star count based on density (reduces star count in lower settings)
    const getActualStarCount = () => {
        const baseCounts = { low: 50, medium: 100, high: 150 };
        return baseCounts[density] || starCount;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use ResizeObserver instead of event listener for better performance
        const resizeObserver = new ResizeObserver(entries => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        });

        const parent = canvas.parentElement;
        if (parent) {
            resizeObserver.observe(parent);
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }

        // Initialize stars with optimized data structure
        const stars = Array.from({ length: getActualStarCount() }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random() * 0.5 + 0.5,
            speed: getSpeedFactor(speed) * (Math.random() * 0.05 + 0.05),
            // Adding twinkle direction to reduce random calls
            twinkleDir: Math.random() > 0.5 ? 0.01 : -0.01,
        }));

        function getSpeedFactor(speedSetting: 'slow' | 'medium' | 'fast'): number {
            switch (speedSetting) {
                case 'slow': return 0.5;
                case 'fast': return 2;
                default: return 1;
            }
        }

        // Optimize animation with requestAnimationFrame
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = starColor.replace(')', `, ${star.opacity})`).replace('rgba', 'rgba').replace('rgb', 'rgba');
                ctx.fill();

                // More deterministic twinkle effect
                star.opacity += star.twinkleDir;
                if (star.opacity < 0.2 || star.opacity > 1) {
                    star.twinkleDir *= -1;
                }

                star.y += star.speed;

                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, [starCount, starColor, speed, density]);

    return (
        <canvas
            ref={canvasRef}
    className={`absolute inset-0 z-0 ${className}`}
    />
);
});

/**
 * ==== TYPED TEXT EFFECT ====
 * Improved version of your typing animation that's more performant
 * and customizable
 */
export const useTypedText = (
    text: string,
    options: {
        typingSpeed?: number;
        startDelay?: number;
        cursorBlinkSpeed?: number;
    } = {}
) => {
    const {
        typingSpeed = 50,
        startDelay = 500,
        cursorBlinkSpeed = 500
    } = options;

    const [displayText, setDisplayText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let i = 0;
        const timeouts: NodeJS.Timeout[] = [];

        // Initial delay before typing starts
        const initialTimeout = setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                    setIsTypingComplete(true);
                }
            }, typingSpeed);

            timeouts.push(typingInterval as unknown as NodeJS.Timeout);
        }, startDelay);

        timeouts.push(initialTimeout);

        // Cursor blinking effect
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, cursorBlinkSpeed);

        timeouts.push(cursorInterval);

        // Cleanup
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [text, typingSpeed, startDelay, cursorBlinkSpeed]);

    return { displayText, isTypingComplete, showCursor };
};

/**
 * ==== SCROLL-TRIGGERED SECTION ANIMATIONS ====
 * Utility to handle section transitions and animations
 * when scrolling through the page
 */
export const useSectionAnimation = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState(sectionIds[0]);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(window.scrollY > 50);

            // Determine active section based on scroll position
            const scrollPosition = window.scrollY + 300; // Offset for earlier detection

            for (const section of sectionIds) {
                const element = document.getElementById(section);
                if (element) {
                    const offset = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= offset && scrollPosition < offset + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds]);

    /**
     * Smoothly scroll to a section
     */
    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return { activeSection, isScrolling, scrollToSection };
};

/**
 * ==== ENHANCED HOVER EFFECTS ====
 * For cards, buttons, and interactive elements
 */
export const useHoverEffect = (initialState = false) => {
    const [isHovered, setIsHovered] = useState(initialState);

    const hoverProps = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onFocus: () => setIsHovered(true),
        onBlur: () => setIsHovered(false)
    };

    return { isHovered, hoverProps };
};

/**
 * ==== UTILITY TO CREATE ANIMATED ELEMENTS ====
 * Higher-order component to wrap elements with animation logic
 */
export const AnimatedElement = ({
                                    children,
                                    animation = 'fadeIn' as AnimationName, // Type assertion here
                                    delay = 0,
                                    duration,
                                    threshold = 0.1,
                                    className = '',
                                    triggerOnce = true,
                                }) => {
    const { isVisible, elementRef } = useScrollAnimation({
        threshold,
        triggerOnce,
    });

    const style = {
        animationDelay: `${delay}ms`,
        ...(duration ? { animationDuration: `${duration}ms` } : {}),
    };

    return (
        <div
            ref={elementRef}
            className={`${className} ${isVisible ? animations[animation] : 'opacity-0'}`}
            style={style}
        >
            {children}
        </div>
    );
};