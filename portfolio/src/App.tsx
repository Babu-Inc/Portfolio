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
import MindSightDetailPage from './components/projects/MindSightDetailPage.tsx';
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
                    starCount={bgProps.starCount || 150}
                    speed={bgProps.speed || 'medium'}
                    className={bgProps.className || 'opacity-80'}
                    starColor="rgba(255, 255, 255, 0.8)"
                    density={bgProps.density || 'medium'}
                    shootingStars={bgProps.shootingStars !== false}
                    glowEffect={bgProps.glowEffect !== false}
                    parallaxIntensity={bgProps.parallaxIntensity || 'medium'}
                    nebulae={bgProps.nebulae !== false}
                />
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-b ${bgProps.gradient || 'from-black to-gray-900'}`}></div>
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
                    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
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
                                bgProps={{
                                    starCount: 200,
                                    density: "high",
                                    speed: "slow",
                                    className: "opacity-70",
                                    shootingStars: true,
                                    glowEffect: true,
                                    parallaxIntensity: "medium",
                                    nebulae: true
                                }}
                            >
                                <HeroSection scrollToSection={scrollToSection} />
                            </Section>

                            {/* About Section */}
                            <Section
                                id="about"
                                background="gradient"
                                bgProps={{ gradient: "from-black to-gray-900" }}
                            >
                                <About />
                            </Section>

                            {/* Experience Section */}
                            <Section
                                id="experience"
                                background="starry"
                                bgProps={{
                                    starCount: 120,
                                    density: "medium",
                                    speed: "medium",
                                    className: "opacity-50",
                                    shootingStars: false,
                                    glowEffect: true,
                                    parallaxIntensity: "low"
                                }}
                            >
                                <Experience />
                            </Section>

                            {/* Projects Section */}
                            <Section
                                id="projects"
                                background="gradient"
                                bgProps={{ gradient: "from-gray-900 to-black" }}
                            >
                                <Projects />
                            </Section>

                            {/* Skills Section */}
                            <Section
                                id="skills"
                                background="starry"
                                bgProps={{
                                    starCount: 150,
                                    density: "medium",
                                    speed: "slow",
                                    className: "opacity-60",
                                    shootingStars: true,
                                    glowEffect: true,
                                    parallaxIntensity: "medium",
                                    nebulae: true
                                }}
                            >
                                <Skills />
                            </Section>

                            {/* Contact Section */}
                            <Section
                                id="contact"
                                background="gradient"
                                bgProps={{ gradient: "from-black to-gray-900" }}
                            >
                                <Contact />
                            </Section>
                        </main>

                        <Footer />
                    </div>
                } />
                <Route path="/works/sentinelai" element={<SentinelAIDetailPage />} />
                <Route path="/works/mindsight" element={<MindSightDetailPage />} />
                <Route path="/works/:slug" element={<WorkDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;