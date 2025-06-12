import React from 'react';
import { Github, Linkedin, Mail, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-gray-800 py-12 text-center text-white">
            <div className="container mx-auto px-6">
                {/* Back to top button */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="mb-8 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-gray-800/30 to-black/30 text-white hover:from-gray-800/50 hover:to-black/50 transition-all duration-300 transform hover:scale-110 group"
                    aria-label="Back to top"
                >
                    <ChevronUp className="transform transition-transform duration-300 group-hover:-translate-y-1" />
                </button>

                <div className="mb-8">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gradient-text mb-2">
                        Ayaan A. Syed
                    </div>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Computer Information Science student passionate about AI, software development, and innovation.
                    </p>
                </div>

                <div className="flex justify-center mt-4 space-x-6 mb-8">
                    <a href="https://github.com/ayaan-cs" target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                        <Github size={24} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="http://www.linkedin.com/in/ayaan-syed" target="_blank" rel="noopener noreferrer"
                       className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                        <Linkedin size={24} />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="mailto:therealyaan9876@gmail.com"
                       className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                        <Mail size={24} />
                        <span className="sr-only">Email</span>
                    </a>
                </div>

                <div className="w-24 h-px bg-gradient-to-r from-gray-500 to-white mx-auto mb-6"></div>

                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Ayaan A. Syed. All rights reserved.
                </p>

                <p className="text-gray-600 text-xs mt-2">
                    Designed and built with React, TypeScript, and Tailwind CSS
                </p>
            </div>
        </footer>
    );
};

export default Footer;