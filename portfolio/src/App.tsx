import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import HeroSection from './components/HeroSection.tsx';
import About from './components/About.tsx';
import Experience from './components/Experience.tsx';
import Projects from './components/Projects.tsx';
import Skills from './components/Skills.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import WorkDetailPage from './components/WorkDetailPage.tsx';
import SentinelAIDetailPage from './components/projects/SentinelAIDetailPage.tsx';
import { StarryBackground } from './utils/animationUtils.tsx';

// Reusable section component for cleaner organization and animated backgrounds
const Section: React.FC<{
    id: string;
    children: React.ReactNode;
    background: 'starry' | 'gradient';
    bgProps?: any;
}> = ({ id, children, background, bgProps = {} }) => {
    return (
        <div className="relative">
            {background === 'starry' ? (
                <StarryBackground
                    starCount={bgProps.starCount || 100}
                    speed={bgProps.speed || 'medium'}
                    className={bgProps.className || 'opacity-50'}
                />
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-b ${bgProps.gradient || 'from-gray-900 to-gray-800'}`}></div>
            )}
            <div className="relative z-10" id={id}>
                {children}
            </div>
        </div>
    );
};

const App: React.FC = () => {
    // Animation-optimized scroll tracking with IntersectionObserver
    const [activeSection, setActiveSection] = useState<string>('home');
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    // Use debounced scroll handler for performance
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(window.scrollY > 50);

            // Find which section is currently in view
            const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 300;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offset = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= offset && scrollPosition < offset + height) {
                        if (activeSection !== section) {
                            setActiveSection(section);
                        }
                        break;
                    }
                }
            }
        };

        // Use passive event listener for better scrolling performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                        <Header
                            activeSection={activeSection}
                            isScrolling={isScrolling}
                            isMenuOpen={isMenuOpen}
                            setIsMenuOpen={setIsMenuOpen}
                            scrollToSection={scrollToSection}
                            isDarkMode={isDarkMode}
                            toggleDarkMode={toggleDarkMode}
                        />

                        <main>
                            {/* Hero Section with enhanced Starry Background */}
                            <Section
                                id="home"
                                background="starry"
                                bgProps={{ starCount: 150, speed: "slow", className: "opacity-60" }}
                            >
                                <HeroSection scrollToSection={scrollToSection} />
                            </Section>

                            {/* About Section */}
                            <Section
                                id="about"
                                background="gradient"
                                bgProps={{ gradient: "from-gray-900 to-gray-800" }}
                            >
                                <About />
                            </Section>

                            {/* Experience Section */}
                            <Section
                                id="experience"
                                background="starry"
                                bgProps={{ starCount: 100, speed: "medium", className: "opacity-40" }}
                            >
                                <Experience />
                            </Section>

                            {/* Projects Section */}
                            <Section
                                id="projects"
                                background="gradient"
                                bgProps={{ gradient: "from-gray-800 to-gray-900" }}
                            >
                                <Projects />
                            </Section>

                            {/* Skills Section */}
                            <Section
                                id="skills"
                                background="starry"
                                bgProps={{ starCount: 120, speed: "slow", className: "opacity-50" }}
                            >
                                <Skills />
                            </Section>

                            {/* Contact Section */}
                            <Section
                                id="contact"
                                background="gradient"
                                bgProps={{ gradient: "from-gray-900 to-gray-800" }}
                            >
                                <Contact />
                            </Section>
                        </main>

                        <Footer />
                    </div>
                } />
                <Route path="/works/sentinelai" element={<SentinelAIDetailPage />} />
                <Route path="/works/:slug" element={<WorkDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;