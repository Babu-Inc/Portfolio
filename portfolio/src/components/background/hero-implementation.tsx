// src/components/background/hero-implementation.tsx
// Temporary hero component that doesn't use animation context

import React, { useState, useEffect, useRef } from 'react';
import heroBackground from './hero-background.tsx';
import mouseInteractivity from './mouse-interactivity.tsx';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

// Use the components from the default exports
const {
  AnimatedHeroBackground,
  HeroGlowingStars,
  DistantGalaxies,
  ShootingStars
} = heroBackground;

const {
  MouseInteractiveStars,
  StarConstellations,
  CosmicDust
} = mouseInteractivity;

interface EnhancedHeroProps {
  scrollToSection: (sectionId: string) => void;
  animationVariant?: 'stars' | 'constellation' | 'cosmic' | 'combined';
}

// Temporary settings object
const tempSettings = {
  enabled: false,
  preferReducedMotion: false,
  intensity: 'low' as 'low' | 'medium' | 'high'
};

const EnhancedHero: React.FC<EnhancedHeroProps> = ({
  scrollToSection,
  animationVariant = 'combined'
}) => {
  const fullText = "Passionate about AI, software development, and data science.";
  const heroRef = useRef<HTMLDivElement>(null);

  // Implement a simplified typing animation to avoid infinite loops
  const [displayText, setDisplayText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  // Run only once on component mount
  useEffect(() => {
    // Skip animation if disabled
    if (!tempSettings.enabled || tempSettings.preferReducedMotion) {
      setDisplayText(fullText);
      setTypingComplete(true);
      return;
    }

    let i = 0;
    const timeouts: NodeJS.Timeout[] = [];

    // Add a delay before starting
    const initialTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(prev => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTypingComplete(true);
        }
      }, 50);

      timeouts.push(typingInterval as unknown as NodeJS.Timeout);
    }, 500);

    timeouts.push(initialTimeout);

    // Cleanup
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []); // Empty dependency array to run only once

  // Log to identify if Hero is re-rendering too much
  console.log("Hero rendering");

  useEffect(() => {
    console.log("Hero mounted");
    return () => {
      console.log("Hero unmounted");
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gray-900 opacity-60 z-40"></div>

      <div className="container mx-auto px-6 relative z-50 text-center">
        {/* Name with gradient text and new backdrop blur effect */}
        <div className="backdrop-blur-sm bg-gray-900/20 rounded-full py-6 px-8 inline-block mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-text">
            Ayaan Syed
          </h1>
        </div>

        {/* Subtitle with fade-in animation */}
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Computer Information Science Student
        </h2>

        <div className="max-w-xl mx-auto">
          {/* Use simplified typing animation */}
          <div className="h-16 backdrop-blur-sm bg-gray-900/10 rounded-lg p-4 mb-12">
            <p className="text-lg text-gray-300 leading-relaxed">
              {tempSettings.preferReducedMotion ? fullText : displayText}
              <span className={`animate-blink ${typingComplete ? '' : 'invisible'}`}>|</span>
            </p>
          </div>
        </div>

        {/* Social links with enhanced hover effects */}
        <div className="flex justify-center space-x-4 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          <a
            href="https://github.com/ayaan-cis"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 backdrop-blur-sm bg-gray-800/50 rounded-full hover:bg-indigo-600/80 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <Github size={24} />
          </a>
          <a
            href="http://www.linkedin.com/in/ayaan-syed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 backdrop-blur-sm bg-gray-800/50 rounded-full hover:bg-indigo-600/80 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:therealyaan9876@gmail.com"
            className="p-3 backdrop-blur-sm bg-gray-800/50 rounded-full hover:bg-indigo-600/80 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <Mail size={24} />
          </a>
        </div>

        {/* Animated scroll button with glass morphism effect */}
        <button
          onClick={() => scrollToSection('about')}
          className="animate-bounce-slow backdrop-blur-sm bg-gray-800/30 p-3 rounded-full hover:bg-indigo-600/80 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 opacity-0 animate-fade-in group"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          <ArrowDown size={24} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
        </button>

        {/* Scroll indicator with enhanced glass morphism */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
          <span className="text-sm text-gray-400 mb-2 backdrop-blur-sm bg-gray-800/20 px-3 py-1 rounded-full">Scroll Down</span>
          <div className="w-5 h-10 border border-gray-500 rounded-full flex justify-center backdrop-blur-sm bg-gray-800/10">
            <div className="w-1 h-2 bg-indigo-400 rounded-full mt-1 animate-scroll-down"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;