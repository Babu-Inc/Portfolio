import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxCard creates a card with 3D depth effect that responds to mouse position
 * Perfect for project cards, skill cards, or certificate displays
 *
 * @param children - Card content
 * @param depth - How pronounced the 3D effect should be (0.0 to 1.0)
 * @param glareEffect - Whether to show a light glare effect
 * @param className - Additional CSS classes
 * @param backgroundEffect - Whether to add parallax to the background
 * @param glowOnHover - Whether to add a glow effect on hover
 * @param perspective - CSS perspective value
 */
interface ParallaxCardProps {
    children: React.ReactNode;
    depth?: number;
    glareEffect?: boolean;
    className?: string;
    backgroundEffect?: boolean;
    glowOnHover?: boolean;
    perspective?: string;
    onClick?: () => void;
}

const ParallaxCard: React.FC<ParallaxCardProps> = ({
                                                       children,
                                                       depth = 0.08,
                                                       glareEffect = true,
                                                       className = '',
                                                       backgroundEffect = true,
                                                       glowOnHover = true,
                                                       perspective = '1000px',
                                                       onClick
                                                   }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();

            // Calculate mouse position relative to card center (-1 to 1)
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            // Calculate rotation (more pronounced on Y-axis for a natural feel)
            const rotX = -y * 20 * depth; // Inverted for natural feel
            const rotY = x * 20 * depth;

            // Calculate glare effect position and opacity
            const glareX = (e.clientX - rect.left) / rect.width * 100;
            const glareY = (e.clientY - rect.top) / rect.height * 100;
            const glareOpacity = isHovering ? 0.2 : 0;

            // Update state
            setRotation({ x: rotX, y: rotY });
            setGlarePosition({ x: glareX, y: glareY, opacity: glareOpacity });
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setRotation({ x: 0, y: 0 });
            setGlarePosition({ ...glarePosition, opacity: 0 });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [depth, glareEffect, isHovering, glarePosition]);

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className} ${glowOnHover && isHovering ? 'shadow-glow-md' : ''}`}
            style={{
                perspective,
                cursor: onClick ? 'pointer' : 'default',
                transition: 'box-shadow 0.3s ease',
                transformStyle: 'preserve-3d'
            }}
            onClick={onClick}
        >
            {/* Card with 3D transform */}
            <div
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovering ? 'scale(1.025)' : 'scale(1)'}`,
                    transition: isHovering ? 'transform 0.1s ease' : 'transform 0.5s ease',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                }}
            >
                {/* Card content */}
                <div className="relative z-10 backdrop-filter">
                    {children}
                </div>

                {/* Background effect */}
                {backgroundEffect && (
                    <div
                        className="absolute inset-0 -z-10"
                        style={{
                            transform: `translateX(${rotation.y * -4}px) translateY(${rotation.x * 4}px)`,
                            transition: isHovering ? 'transform 0.1s ease' : 'transform 0.5s ease',
                            backgroundSize: '120% 120%',
                            backgroundPosition: 'center',
                            willChange: 'transform'
                        }}
                    />
                )}

                {/* Glare effect */}
                {glareEffect && (
                    <div
                        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
                        style={{
                            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}) 0%, rgba(255,255,255,0) 60%)`,
                            transition: 'opacity 0.3s ease',
                            willChange: 'background'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ParallaxCard;