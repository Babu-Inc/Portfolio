import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxScroll component creates a section with multiple layers that move at different speeds when scrolling
 *
 * @param children - Content to display in the foreground
 * @param backgroundLayers - Array of layer configurations (colors, images, speeds)
 * @param height - Height of the section (default: 100vh)
 * @param className - Additional CSS classes
 */
interface ParallaxScrollProps {
    children: React.ReactNode;
    backgroundLayers: Array<{
        color?: string;
        image?: string;
        speed: number;
        opacity?: number;
        className?: string;
        blur?: number;
    }>;
    height?: string;
    className?: string;
    onVisibilityChange?: (isVisible: boolean) => void;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
                                                           children,
                                                           backgroundLayers = [],
                                                           height = '100vh',
                                                           className = '',
                                                           onVisibilityChange
                                                       }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [isInView, setIsInView] = useState(false);

    // Performance optimization: Throttle scroll events
    const throttle = (callback: Function, delay: number) => {
        let lastCall = 0;
        return function(...args: any[]) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                callback(...args);
            }
        };
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Calculate parallax effect
        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const isNowInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (isNowInView) {
                // Calculate scroll offset relative to the element
                const scrollPosition = window.scrollY;
                const sectionTop = scrollPosition + rect.top;
                const relativeScroll = scrollPosition - sectionTop;
                setOffset(relativeScroll);

                if (!isInView) {
                    setIsInView(true);
                    onVisibilityChange?.(true);
                }
            } else if (isInView) {
                setIsInView(false);
                onVisibilityChange?.(false);
            }
        };

        // Handle initial state and add listener
        const throttledHandleScroll = throttle(handleScroll, 16); // ~60fps
        window.addEventListener('scroll', throttledHandleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', throttledHandleScroll);
    }, [isInView, onVisibilityChange]);

    return (
        <div
            ref={sectionRef}
            className={`relative overflow-hidden ${className}`}
            style={{ height }}
        >
            {/* Background layers with parallax effect */}
            {backgroundLayers.map((layer, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 will-change-transform ${layer.className || ''}`}
                    style={{
                        transform: `translateY(${offset * layer.speed}px)`,
                        backgroundColor: layer.color || 'transparent',
                        backgroundImage: layer.image ? `url(${layer.image})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: layer.opacity || 1,
                        filter: layer.blur ? `blur(${layer.blur}px)` : 'none',
                        zIndex: index,
                        transition: 'transform 0.1s ease-out' // Smooth movement
                    }}
                />
            ))}

            {/* Foreground content */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

export default ParallaxScroll;