import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxMouseEffect creates elements that react to mouse movement with a 3D parallax effect
 *
 * @param children - Content to display with the effect
 * @param intensity - How strong the effect should be (0.0 to 1.0)
 * @param perspective - CSS perspective value for 3D effect
 * @param resetOnLeave - Whether to reset position when mouse leaves
 * @param className - Additional CSS classes
 */
interface ParallaxMouseEffectProps {
    children: React.ReactNode;
    intensity?: number;
    perspective?: string;
    resetOnLeave?: boolean;
    className?: string;
    layers?: Array<{
        content: React.ReactNode;
        depth: number;
        className?: string;
    }>;
}

const ParallaxMouseEffect: React.FC<ParallaxMouseEffectProps> = ({
                                                                     children,
                                                                     intensity = 0.05,
                                                                     perspective = '1000px',
                                                                     resetOnLeave = true,
                                                                     className = '',
                                                                     layers = []
                                                                 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Performance optimization: Request Animation Frame for smooth updates
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let rafId: number;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();

            // Calculate mouse position relative to the center of the container
            targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            if (!isHovering) setIsHovering(true);

            // Use RAF to smooth out the animation
            if (!rafId) {
                rafId = requestAnimationFrame(updatePosition);
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
            // Smoothly interpolate current position toward target position
            const easing = 0.1; // Lower = smoother but slower
            currentX += (targetX - currentX) * easing;
            currentY += (targetY - currentY) * easing;

            setPosition({ x: currentX, y: currentY });

            // Continue animation loop
            rafId = requestAnimationFrame(updatePosition);

            // Stop animation when close enough to target and not hovering
            if (!isHovering && resetOnLeave && Math.abs(currentX) < 0.001 && Math.abs(currentY) < 0.001) {
                cancelAnimationFrame(rafId);
                rafId = 0;
            }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [intensity, resetOnLeave, isHovering]);

    // Calculate transforms based on mouse position
    const getLayerStyle = (depth: number) => {
        const translateX = position.x * intensity * 100 * depth; // Convert to pixels
        const translateY = position.y * intensity * 100 * depth;
        const rotateY = position.x * intensity * 20 * depth; // Degrees
        const rotateX = -position.y * intensity * 20 * depth; // Negative for correct direction

        return {
            transform: `
        translateX(${translateX}px) 
        translateY(${translateY}px)
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `,
            transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        };
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{ perspective }}
        >
            {/* Main content with parallax effect */}
            <div
                style={getLayerStyle(1)}
                className="will-change-transform"
            >
                {children}
            </div>

            {/* Additional depth layers if provided */}
            {layers.map((layer, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 will-change-transform ${layer.className || ''}`}
                    style={getLayerStyle(layer.depth)}
                >
                    {layer.content}
                </div>
            ))}
        </div>
    );
};

export default ParallaxMouseEffect;