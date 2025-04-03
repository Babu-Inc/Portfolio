// src/components/MouseFollower.tsx
import React, { useEffect, useRef, useState } from 'react';

// Mouse follower component with smooth transitions
interface MouseFollowerProps {
  size?: number;
  color?: string;
  blur?: number;
  opacity?: number;
  delay?: number;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({
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
  }, [delay, isVisible]);

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

export default MouseFollower;