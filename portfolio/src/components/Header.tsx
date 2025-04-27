import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
    activeSection: string;
    isScrolling: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    scrollToSection: (sectionId: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                           activeSection,
                                           isScrolling,
                                           isMenuOpen,
                                           setIsMenuOpen,
                                           scrollToSection,
                                           isDarkMode,
                                           toggleDarkMode
                                       }) => {
    return (
        <nav className={`
      fixed w-full z-50 transition-all duration-500
      ${isScrolling
            ? 'bg-gray-900/90 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-4'}
    `}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo with animated gradient */}
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-text">
                    Ayaan A. Syed
                </div>

                {/* Desktop Navigation Links with enhanced active state */}
                <div className="hidden md:flex space-x-1">
                    {["home", "about", "experience", "projects", "skills", "contact"].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className={`
                relative px-4 py-2 rounded-md transition-all duration-300
                ${activeSection === section
                                ? 'text-white font-medium'
                                : 'text-gray-400 hover:text-gray-200'}
              `}
                        >
                            <span className="relative z-10 capitalize">{section}</span>
                            {activeSection === section && (
                                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-md -z-0 animate-pulse-slow"></span>
                            )}
                        </button>
                    ))}

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm text-gray-200 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
                        aria-label="Toggle dark mode"
                    >
                        <div className="relative w-5 h-5">
                            <Moon
                                className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                                size={20}
                            />
                            <Sun
                                className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                                size={20}
                            />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Button with animation */}
                <div className="md:hidden flex items-center space-x-3">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm text-gray-200 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
                        aria-label="Toggle dark mode"
                    >
                        <div className="relative w-5 h-5">
                            <Moon
                                className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                                size={20}
                            />
                            <Sun
                                className={`absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                                size={20}
                            />
                        </div>
                    </button>

                    <button
                        className="text-gray-200 hover:text-white transition-transform duration-300 hover:scale-110"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="w-6 h-6 flex flex-col justify-center space-y-1.5 overflow-hidden">
                            <span className={`block h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
                            <span className={`block h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Scrollbar Progress Indicator */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300" style={{ width: isScrolling ? '100%' : '0%' }}></div>

            {/* Mobile Menu Dropdown with Animation */}
            <div
                className={`
          md:hidden bg-gray-900/95 backdrop-blur-lg shadow-xl transform transition-all duration-300 ease-in-out overflow-hidden
          ${isMenuOpen ? 'max-h-96 py-4 px-6 opacity-100' : 'max-h-0 py-0 px-6 opacity-0'}
        `}
            >
                <div className="flex flex-col space-y-3">
                    {["home", "about", "experience", "projects", "skills", "contact"].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className={`
                text-left py-2 px-3 rounded-md transition-all duration-300
                ${activeSection === section
                                ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}
              `}
                        >
                            <span className="capitalize">{section}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Header;