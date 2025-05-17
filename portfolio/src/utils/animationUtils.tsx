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
    shootingStars?: boolean;
    glowEffect?: boolean;
    parallaxIntensity?: 'low' | 'medium' | 'high';
    nebulae?: boolean;
}

interface Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    speed: number;
    twinkleDir: number;
    twinkleSpeed: number;
    color: string;
    parallaxFactor: number;
    directionX: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    lifetime: number;
    currentLife: number;
    angle: number;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    color: string;
    pulseDir: number;
    pulseSpeed: number;
}

export const StarryBackground = memo(({
                                          className = '',
                                          starCount = 100,
                                          starColor = 'rgba(255, 255, 255, 0.8)',
                                          speed = 'medium',
                                          density = 'medium',
                                          shootingStars = true,
                                          glowEffect = true,
                                          parallaxIntensity = 'medium',
                                          nebulae = true,
                                      }: StarryBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosition = useRef({ x: 0, y: 0 });

    // Get actual star count based on density
    const getActualStarCount = () => {
        const baseCounts = { low: 70, medium: 150, high: 250 };
        return baseCounts[density] || starCount;
    };

    // Get parallax intensity factor
    const getParallaxFactor = () => {
        const factors = { low: 0.02, medium: 0.05, high: 0.1 };
        return factors[parallaxIntensity] || 0.05;
    };

    // Speed factors based on setting
    function getSpeedFactor(speedSetting: 'slow' | 'medium' | 'fast'): number {
        switch (speedSetting) {
            case 'slow': return 0.3;
            case 'fast': return 1.5;
            default: return 0.7;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Cache the speed factor to avoid the initialization error
        const speedFactor = getSpeedFactor(speed);

        // Track mouse movement for parallax effect
        const handleMouseMove = (e: MouseEvent) => {
            const bounds = canvas.getBoundingClientRect();
            mousePosition.current = {
                x: (e.clientX - bounds.left) / bounds.width,
                y: (e.clientY - bounds.top) / bounds.height
            };
        };

        document.addEventListener('mousemove', handleMouseMove);

        // Use ResizeObserver for better performance
        const resizeObserver = new ResizeObserver(entries => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;

                // Reinitialize stars when canvas size changes
                initializeStars();
            }
        });

        const parent = canvas.parentElement;
        if (parent) {
            resizeObserver.observe(parent);
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }

        // Create white-to-blue color variations for stars
        function getStarColor(): string {
            const hue = Math.random() > 0.8 ? 210 : 0; // Occasionally add a slight blue tint
            const saturation = hue > 0 ? Math.random() * 20 + 10 : 0;
            const lightness = 95 + Math.random() * 5; // Very bright white
            return `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`;
        }

        // Star array with enhanced properties
        let stars: Star[] = [];
        // Shooting stars array
        let shootingStarsArray: ShootingStar[] = [];
        // Nebula array for subtle background glows
        let nebulaeArray: Nebula[] = [];

        // Initialize stars with enhanced properties
        function initializeStars() {
            stars = Array.from({ length: getActualStarCount() }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5, // Range from 0.5 to 2
                opacity: Math.random() * 0.5 + 0.5,
                speed: speedFactor * (Math.random() * 0.05 + 0.02),
                twinkleDir: Math.random() > 0.5 ? 0.01 : -0.01,
                twinkleSpeed: Math.random() * 0.01 + 0.005,
                color: getStarColor(),
                parallaxFactor: Math.random() * 0.8 + 0.2, // 0.2 to 1.0
                directionX: Math.random() * 0.4 - 0.2 // Slight horizontal movement
            }));

            // Add nebula clusters if enabled
            if (nebulae) {
                const nebulaCount = Math.floor(canvas.width * canvas.height / 200000) + 2; // Dynamic count based on canvas size
                nebulaeArray = Array.from({ length: nebulaCount }, () => ({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 100 + 50,
                    opacity: Math.random() * 0.07 + 0.03, // Very subtle
                    color: Math.random() > 0.5 ? 'rgba(100, 120, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                    pulseDir: Math.random() > 0.5 ? 0.0003 : -0.0003,
                    pulseSpeed: Math.random() * 0.001 + 0.0005
                }));
            }
        }

        // Initialize stars on start
        initializeStars();

        // Add a shooting star at random intervals
        const createShootingStar = () => {
            if (!shootingStars || shootingStarsArray.length >= 3) return;

            // Only add a shooting star with some probability
            if (Math.random() > 0.02) return;

            const angle = Math.random() * Math.PI / 4 + Math.PI / 4; // 45 to 90 degrees

            shootingStarsArray.push({
                x: Math.random() * canvas.width,
                y: 0,
                length: Math.random() * 80 + 70, // Length of the trail
                speed: speedFactor * (Math.random() * 5 + 10), // Use cached speedFactor
                opacity: Math.random() * 0.7 + 0.3,
                lifetime: Math.random() * 100 + 50, // How long it lives
                currentLife: 0,
                angle: angle
            });
        };

        // Draw a single star with potential glow effect
        const drawStar = (star: Star) => {
            // Apply parallax effect based on mouse position
            const parallaxX = (mousePosition.current.x - 0.5) * getParallaxFactor() * star.parallaxFactor * canvas.width;
            const parallaxY = (mousePosition.current.y - 0.5) * getParallaxFactor() * star.parallaxFactor * canvas.height;

            const x = star.x + parallaxX;
            const y = star.y + parallaxY;

            // Draw the main star
            ctx.beginPath();
            ctx.arc(x, y, star.radius, 0, Math.PI * 2);

            // Use the star's unique color with its opacity
            const color = star.color.replace('1)', `${star.opacity})`);
            ctx.fillStyle = color;
            ctx.fill();

            // Add glow effect for larger stars
            if (glowEffect && star.radius > 1.2) {
                const glow = ctx.createRadialGradient(
                    x, y, 0,
                    x, y, star.radius * 5
                );
                glow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
                glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.beginPath();
                ctx.arc(x, y, star.radius * 5, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();
            }
        };

        // Draw a shooting star
        const drawShootingStar = (star: ShootingStar) => {
            // Calculate the trail points based on angle and speed
            const radianAngle = star.angle;
            const endX = star.x - Math.cos(radianAngle) * star.length;
            const endY = star.y + Math.sin(radianAngle) * star.length;

            // Create gradient for the trail
            const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            // Draw the trail
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Add a bright point at the head of the star
            ctx.beginPath();
            ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();

            // Add glow effect
            if (glowEffect) {
                const glow = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, 15
                );
                glow.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.8})`);
                glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.beginPath();
                ctx.arc(star.x, star.y, 15, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();
            }
        };

        // Draw a nebula/star cluster
        const drawNebula = (nebula: Nebula) => {
            // Apply parallax effect to nebulae too (but less than stars)
            const parallaxX = (mousePosition.current.x - 0.5) * getParallaxFactor() * 0.3 * canvas.width;
            const parallaxY = (mousePosition.current.y - 0.5) * getParallaxFactor() * 0.3 * canvas.height;

            const x = nebula.x + parallaxX;
            const y = nebula.y + parallaxY;

            // Create a subtle glow
            const glow = ctx.createRadialGradient(
                x, y, 0,
                x, y, nebula.radius
            );
            glow.addColorStop(0, nebula.color.replace('0.05)', `${nebula.opacity})`));
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.arc(x, y, nebula.radius, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
        };

        // Optimize animation with requestAnimationFrame
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw nebulae first (background layer)
            if (nebulae) {
                nebulaeArray.forEach(nebula => {
                    drawNebula(nebula);

                    // Pulse the nebula opacity
                    nebula.opacity += nebula.pulseDir;
                    if (nebula.opacity < 0.01 || nebula.opacity > 0.08) {
                        nebula.pulseDir *= -1;
                    }
                });
            }

            // Draw stars
            stars.forEach(star => {
                drawStar(star);

                // Twinkle effect
                star.opacity += star.twinkleDir * star.twinkleSpeed;
                if (star.opacity < 0.2 || star.opacity > 0.9) {
                    star.twinkleDir *= -1;
                }

                // Move the star
                star.y += star.speed;
                star.x += star.directionX * star.speed * 2;

                // Wrap around edges
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
                if (star.x < 0) {
                    star.x = canvas.width;
                }
                if (star.x > canvas.width) {
                    star.x = 0;
                }
            });

            // Draw shooting stars
            if (shootingStars) {
                createShootingStar(); // Attempt to create a new shooting star

                // Draw and update existing shooting stars
                shootingStarsArray = shootingStarsArray.filter(star => {
                    drawShootingStar(star);

                    // Move the shooting star
                    star.x += Math.cos(star.angle) * star.speed;
                    star.y += Math.sin(star.angle) * star.speed;
                    star.currentLife++;

                    // Fade out as it reaches end of life
                    if (star.currentLife > star.lifetime * 0.7) {
                        star.opacity -= 0.02;
                    }

                    // Keep if still on screen and alive
                    return (
                        star.x > 0 &&
                        star.x < canvas.width &&
                        star.y > 0 &&
                        star.y < canvas.height &&
                        star.opacity > 0
                    );
                });
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, [starCount, starColor, speed, density, shootingStars, glowEffect, parallaxIntensity, nebulae]);

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