import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

interface HeroSectionProps {
    scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
    const fullText = "Passionate about AI, software development, and data science.";
    const [displayText, setDisplayText] = useState("");
    const [typingComplete, setTypingComplete] = useState(false);

    // Run only once on component mount
    useEffect(() => {
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

    // Star components - randomly positioned
    const renderStars = () => {
        const stars = [];
        const starCount = 20;

        for (let i = 0; i < starCount; i++) {
            const size = Math.random() * 6 + 2; // 2-8px
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 4;
            const duration = Math.random() * 3 + 3; // 3-6s

            stars.push(
                <div
                    key={i}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        top: `${top}%`,
                        left: `${left}%`,
                        opacity: Math.random() * 0.5 + 0.3,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`
                    }}
                />
            );
        }

        return stars;
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Static stars */}
            {renderStars()}

            <div className="container mx-auto px-6 relative z-50 text-center">
                {/* Name with gradient text and backdrop blur effect */}
                <div className="backdrop-blur-sm bg-gray-900/20 rounded-full py-6 px-8 inline-block mb-6 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gradient-text">
                        Ayaan Syed
                    </h1>
                </div>

                {/* Subtitle with fade-in animation */}
                <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 animate-slide-down" style={{ animationDelay: '0.5s' }}>
                    Computer Information Science Student
                </h2>

                <div className="max-w-xl mx-auto">
                    {/* Typing animation */}
                    <div className="h-16 backdrop-blur-sm bg-gray-900/10 rounded-lg p-4 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {displayText}
                            <span className={`animate-blink ${typingComplete ? '' : 'invisible'}`}>|</span>
                        </p>
                    </div>
                </div>

                {/* Social links with enhanced hover effects */}
                <div className="flex justify-center space-x-4 mb-12 animate-slide-up" style={{ animationDelay: '1.2s' }}>
                    <a
                        href="https://github.com/ayaan-cis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 backdrop-blur-sm bg-gray-800/50 rounded-full hover:bg-black/80 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-white/20 animate-float"
                        style={{ animationDelay: '0s' }}
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href="http://www.linkedin.com/in/ayaan-syed"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 backdrop-blur-sm bg-gray-800/50 rounded-full hover:bg-black/80 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-white/20 animate-float"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="mailto:therealyaan9876@gmail.com"
                        className="p-3 backdrop-blur-sm bg-gray-800/50 rounded-full hover:bg-black/80 transition-all duration-300 text-gray-300 hover:text-white transform hover:scale-110 hover:shadow-lg hover:shadow-white/20 animate-float"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <Mail size={24} />
                    </a>
                </div>

                {/* Animated scroll button with glass morphism effect */}
                <button
                    onClick={() => scrollToSection('about')}
                    className="animate-bounce-slow backdrop-blur-sm bg-gray-800/30 p-3 rounded-full hover:bg-black/80 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 animate-fade-in group"
                    style={{ animationDelay: '1.5s' }}
                >
                    <ArrowDown size={24} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                </button>

                {/* Scroll indicator with enhanced glass morphism */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in" style={{ animationDelay: '1.8s' }}>
                    <span className="text-sm text-gray-400 mb-2 backdrop-blur-sm bg-gray-800/20 px-3 py-1 rounded-full">Scroll Down</span>
                    <div className="w-5 h-10 border border-gray-500 rounded-full flex justify-center backdrop-blur-sm bg-gray-800/10">
                        <div className="w-1 h-2 bg-white rounded-full mt-1 animate-[bounce_1.5s_infinite]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;