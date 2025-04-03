// src/components/AnimationProvider.tsx
// Simplified version with no infinite loops

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useMemo, useCallback } from 'react';
import '../styles/animations.css';
import '../styles/space-animation.css';

// Animation settings type
interface AnimationSettings {
  enabled: boolean;
  intensity: 'low' | 'medium' | 'high';
  preferReducedMotion: boolean;
}

// Context for animation settings
interface AnimationContextType {
  settings: AnimationSettings;
  updateSettings: (newSettings: Partial<AnimationSettings>) => void;
}

const defaultSettings: AnimationSettings = {
  enabled: true,
  intensity: 'medium',
  preferReducedMotion: false
};

// Create context
const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

// Provider component
export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AnimationSettings>(defaultSettings);

  // Check for reduced motion preference - only run once on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({
        ...prev,
        preferReducedMotion: e.matches,
        // If user prefers reduced motion, set intensity to low
        ...(e.matches ? { intensity: 'low' as const } : {})
      }));
    };

    // Set initial value
    setSettings(prev => ({
      ...prev,
      preferReducedMotion: mediaQuery.matches,
      // If user prefers reduced motion, set intensity to low
      ...(mediaQuery.matches ? { intensity: 'low' as const } : {})
    }));

    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Update settings function - wrap in useCallback to avoid recreating on each render
  const updateSettings = useCallback((newSettings: Partial<AnimationSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  }, []);

  // Add body class for animation intensity - only run when settings change
  useEffect(() => {
    // Remove any existing intensity classes
    document.body.classList.remove('animation-intensity-low');
    document.body.classList.remove('animation-intensity-medium');
    document.body.classList.remove('animation-intensity-high');

    // Add current intensity class
    document.body.classList.add(`animation-intensity-${settings.intensity}`);

    // Add/remove animations disabled class
    if (!settings.enabled) {
      document.body.classList.add('animations-disabled');
    } else {
      document.body.classList.remove('animations-disabled');
    }
  }, [settings.enabled, settings.intensity]);

  // Use useMemo to avoid creating a new context value on every render
  const contextValue = useMemo(() => ({
    settings,
    updateSettings
  }), [settings, updateSettings]);

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

// Hook for using animation context
export const useAnimation = () => {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }

  return context;
};

// Simple animated component (CSS only, no scroll detection)
export const AnimatedSection: React.FC<{
  children: ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
}> = ({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0
}) => {
  const { settings } = useAnimation();

  // Skip animations if disabled or reduced motion preferred
  if (!settings.enabled || settings.preferReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`${className} animate-${animation}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Simplified parallax container component
export const ParallaxContainer: React.FC<{
  children: ReactNode;
  className?: string;
  perspective?: number;
}> = ({
  children,
  className = '',
  perspective = 1000
}) => {
  const { settings } = useAnimation();

  // Skip parallax if animations disabled
  if (!settings.enabled || settings.preferReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      {children}
    </div>
  );
};

// Simplified parallax layer component
export const ParallaxLayer: React.FC<{
  children: ReactNode;
  className?: string;
  depth?: number;
}> = ({
  children,
  className = '',
  depth = 0
}) => {
  const { settings } = useAnimation();
  const layerRef = useRef<HTMLDivElement>(null);

  // Skip parallax if animations disabled
  if (!settings.enabled || settings.preferReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={layerRef}
      className={`${className}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
        zIndex: depth > 0 ? 10 - depth : 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default {
  AnimationProvider,
  useAnimation,
  AnimatedSection,
  ParallaxContainer,
  ParallaxLayer
};