import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Briefcase, Calendar, ChevronRight, Code, Database, Server, Terminal, Globe, Cpu, LineChart, Book, Moon, Sun, ArrowDown, Github, Linkedin } from 'lucide-react';

interface AnimatedIconProps {
  children: React.ReactNode;
  delay?: string;
  className?: string;
}

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  primary?: boolean;
}

interface SectionTitleProps {
  children: React.ReactNode;
}

interface RevealSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  darker?: boolean;
}

interface CustomHeroProps {
  scrollToSection: (sectionId: string) => void;
}

// Enhanced Wavy SVG Background with Animation
const WavyBackground: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
    <svg
      className="absolute top-0 left-0 w-full h-full opacity-10"
      viewBox="0 0 1440 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        fill="#4F46E5"
        fillOpacity="0.4"
        className="animate-wave-slow"
      />
      <path
        d="M0,352L48,346.7C96,341,192,331,288,309.3C384,288,480,256,576,229.3C672,203,768,181,864,197.3C960,213,1056,267,1152,277.3C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        fill="#10B981"
        fillOpacity="0.3"
        className="animate-wave"
      />
    </svg>
  </div>
);

// Enhanced Particle Background with more particles and smoother animations
const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* First row of particles */}
      <div className="absolute h-2 w-2 rounded-full bg-blue-400 opacity-30 animate-float1" style={{ top: '15%', left: '10%' }}></div>
      <div className="absolute h-3 w-3 rounded-full bg-purple-400 opacity-20 animate-float2" style={{ top: '25%', left: '25%' }}></div>
      <div className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-30 animate-float3" style={{ top: '18%', left: '40%' }}></div>
      <div className="absolute h-2 w-2 rounded-full bg-green-400 opacity-20 animate-float1" style={{ top: '12%', left: '65%' }}></div>
      <div className="absolute h-3 w-3 rounded-full bg-pink-400 opacity-15 animate-float2" style={{ top: '22%', left: '80%' }}></div>

      {/* Middle row of particles */}
      <div className="absolute h-2 w-2 rounded-full bg-green-400 opacity-20 animate-float3" style={{ top: '45%', left: '15%' }}></div>
      <div className="absolute h-4 w-4 rounded-full bg-indigo-400 opacity-10 animate-float1" style={{ top: '50%', left: '35%' }}></div>
      <div className="absolute h-1 w-1 rounded-full bg-purple-400 opacity-30 animate-float2" style={{ top: '55%', left: '55%' }}></div>
      <div className="absolute h-2 w-2 rounded-full bg-blue-400 opacity-25 animate-float3" style={{ top: '48%', left: '75%' }}></div>
      <div className="absolute h-1 w-1 rounded-full bg-pink-400 opacity-30 animate-float1" style={{ top: '40%', left: '90%' }}></div>

      {/* Bottom row of particles */}
      <div className="absolute h-3 w-3 rounded-full bg-blue-400 opacity-20 animate-float2" style={{ top: '70%', left: '8%' }}></div>
      <div className="absolute h-1 w-1 rounded-full bg-indigo-400 opacity-30 animate-float3" style={{ top: '80%', left: '20%' }}></div>
      <div className="absolute h-2 w-2 rounded-full bg-purple-400 opacity-25 animate-float1" style={{ top: '75%', left: '45%' }}></div>
      <div className="absolute h-3 w-3 rounded-full bg-green-400 opacity-15 animate-float2" style={{ top: '85%', left: '70%' }}></div>
      <div className="absolute h-2 w-2 rounded-full bg-pink-400 opacity-20 animate-float3" style={{ top: '65%', left: '85%' }}></div>
    </div>
  );
};

// Enhanced animated icon component with hover effects
const AnimatedIcon: React.FC<AnimatedIconProps> = ({ children, delay = '0s', className = '' }) => {
  return (
    <div
      className={`transition-all duration-300 hover:scale-110 hover:text-indigo-400 ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

// Enhanced button with improved hover effects and animations
const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, onClick, className = '', primary = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden transition-all duration-300 ease-out
        ${primary 
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
          : 'bg-gray-800 hover:bg-gray-700 text-gray-200'}
        font-semibold py-3 px-6 rounded-lg
        transform hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></span>

      {/* Animated border effect */}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-500"></span>
      <span className="absolute right-0 top-0 h-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-500 group-hover:h-full transition-all duration-500 delay-100"></span>
      <span className="absolute top-0 right-0 w-0 h-0.5 bg-gradient-to-l from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-500 delay-200"></span>
      <span className="absolute left-0 bottom-0 h-0 w-0.5 bg-gradient-to-t from-indigo-400 to-purple-500 group-hover:h-full transition-all duration-500 delay-300"></span>
    </button>
  );
};

// Enhanced section title with animation
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <h2 className="relative inline-block text-3xl font-bold text-center text-white mb-12 group">
      {children}
      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded group-hover:w-full transition-all duration-500 ease-out"></span>
    </h2>
  );
};

// Enhanced reveal animation for sections
const RevealSection: React.FC<RevealSectionProps> = ({ children, id, className = '', darker = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`
        py-20 px-6 relative transition-all duration-700 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${darker ? 'bg-gray-900' : 'bg-gray-800'}
        ${className}
      `}
    >
      {children}
    </section>
  );
};

// Enhanced Hero Section with better animations and visual effects
const CustomHero: React.FC<CustomHeroProps> = ({ scrollToSection }) => {
  // Typing animation for the tagline
  const [displayText, setDisplayText] = useState("");
  const fullText = "Passionate about AI, software development, and data science.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background elements */}
      <WavyBackground />
      <ParticleBackground />

      <div className="absolute inset-0 bg-gray-900 opacity-70"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Animated name with gradient text */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-text">
          Ayaan Syed
        </h1>

        {/* Subtitle with fade-in animation */}
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Computer Information Science Student
        </h2>

        <div className="max-w-xl mx-auto">
          {/* Typing animation for tagline */}
          <p className="text-lg text-gray-300 mb-12 leading-relaxed h-16">
            {displayText}
            <span className="animate-blink">|</span>
          </p>
        </div>

        {/* Social links with enhanced hover effects */}
        <div className="flex justify-center space-x-4 mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          <a
            href="https://github.com/ayaan-cis"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-full hover:bg-indigo-600 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <Github size={24} />
          </a>
          <a
            href="http://www.linkedin.com/in/ayaan-syed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800 rounded-full hover:bg-indigo-600 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:therealyaan9876@gmail.com"
            className="p-3 bg-gray-800 rounded-full hover:bg-indigo-600 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <Mail size={24} />
          </a>
        </div>

        {/* Scroll down button with enhanced animation */}
        <button
          onClick={() => scrollToSection('about')}
          className="animate-bounce-slow bg-gray-800/50 p-3 rounded-full hover:bg-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 opacity-0 animate-fade-in"
          style={{ animationDelay: '2s', animationFillMode: 'forwards' }}
        >
          <ArrowDown size={24} className="text-gray-300" />
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fade-in" style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <div className="w-5 h-10 border border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-indigo-400 rounded-full mt-1 animate-scroll-down"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export {
  WavyBackground,
  ParticleBackground,
  AnimatedIcon,
  AnimatedButton,
  SectionTitle,
  RevealSection,
  CustomHero
};