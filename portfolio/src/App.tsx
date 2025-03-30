import React, { useState, useEffect } from 'react';
import { CustomHero } from './components/portfolio-dark-mode.tsx';
import { AnimatedNav, InteractiveSkills } from './components/portfolio-dark-mode-nav-skills.tsx';
import { CreativeProjects, InteractiveContact, Footer } from './components/background/portfolio-projects-contact.tsx';
import { Book, Calendar, MapPin } from 'lucide-react';
import './styles/index.css';
import './styles/space-animation.css'; // Import the new space animation CSS
import EnhancedBackground from './components/background/enhanced-background.tsx';
import EnhancedHero from './components/background/hero-implementation.tsx';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

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
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    // In a real implementation, you'd also toggle classes on the body or update a theme context
  };

  // Animated About Section Component
  const AnimatedAbout: React.FC = () => {
    return (
      <section id="about" className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-900 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-900 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-center text-white mb-3">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"></div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm a Computer Information Science student at St. Edwards University with a passion for technology and innovation.
              My expertise spans software development, AI, and data science, allowing me to develop customized solutions for complex problems.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm skilled in collaborating with stakeholders and translating client needs into technical solutions using my programming expertise
              in Python, Java, and AWS services. I have experience in AI-driven applications, cloud computing, and full-stack development.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I speak and write in English and Urdu, and I am experienced in Hindi. When I'm not coding, I volunteer as an Animal Caretaker,
              providing care for animals and ensuring their well-being.
            </p>

            <div className="mt-12 bg-gray-900/80 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-6 relative inline-block">
                  Education
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                </h3>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="p-2 bg-indigo-900/50 rounded-lg">
                      <Book size={24} className="text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-400">St. Edwards University</h4>
                    <p className="text-gray-300">BA, Computer Information Science</p>
                    <div className="flex items-center text-gray-400 mt-1">
                      <Calendar size={16} className="mr-2" />
                      <span>August 2022 - Current</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div>
                        <h5 className="text-gray-200 font-medium">Relevant Coursework</h5>
                        <p className="text-gray-400 mt-1">
                          Concepts I & II, Algorithmic Problem Solving, Computation-Based Programming, Web Development,
                          Computer Architecture, Data Structures, Intro to AI, Database Theory, Software Engineering
                        </p>
                      </div>
                      <div>
                        <h5 className="text-gray-200 font-medium">Honors & Awards</h5>
                        <p className="text-gray-400 mt-1">President's Achievement Scholarship</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Animated Experience Section
  const AnimatedExperience: React.FC = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const experiences = [
      {
        id: 'ai-lead',
        title: 'AI Research Lead',
        company: 'Klein Sports Performance, LLC',
        type: 'Internship',
        period: 'Sep 2024 - Current',
        location: 'Austin, TX',
        description: 'Lead researcher for the AI component of a fitness app, responsible for developing machine learning algorithms to learn 100+ workouts, personalize workouts, and analyze user performance. Collaborated with data science/development teams to feed our ChatBot information across 20+ studies, optimizing feedback and enhancing user fitness outcomes through tailored insights.'
      },
      {
        id: 'data-scientist',
        title: 'Data Scientist',
        company: 'USDA',
        type: 'Internship',
        period: 'Jun 2024 - Aug 2024',
        location: 'Austin, TX',
        description: 'My role comprised two main projects. I developed a data science solution using Google Earth Engine to monitor water quality in Fiji, applying different indices for detecting pollution and analyzing seasonal trends. The other involved Land Use Land Cover (LULC) for Fiji. My job was to photo-interpret sample plots of land, write R scripts for the interpretations\' accuracy, and compile my data for the 2021-2022 reporting period.'
      }
    ];

    return (
      <section id="experience" className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-800 to-gray-900"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-800 to-gray-900"></div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-center text-white mb-3">Work Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"></div>

          <div className="max-w-3xl mx-auto space-y-8">
            {experiences.map(exp => (
              <div
                key={exp.id}
                className={`
                  bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform
                  ${activeCard === exp.id ? 'scale-105 shadow-xl' : 'hover:shadow-xl hover:-translate-y-1'}
                `}
                onMouseEnter={() => setActiveCard(exp.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className={`
                        text-xl font-semibold mb-1 transition-colors duration-300
                        ${activeCard === exp.id ? 'text-indigo-400' : 'text-white'}
                      `}>
                        {exp.title}
                      </h3>
                      <p className="text-purple-300">{exp.company}</p>
                      <p className="text-gray-400 italic">{exp.type}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <p className="text-gray-400 flex items-center md:justify-end">
                        <Calendar size={16} className="mr-2" />
                        {exp.period}
                      </p>
                      <p className="text-gray-400 flex items-center md:justify-end mt-1">
                        <MapPin size={16} className="mr-2" />
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  <div className={`
                    h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 transition-all duration-500
                    ${activeCard === exp.id ? 'opacity-100' : 'opacity-50'}
                  `}></div>

                  <p className="text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Animated background accent */}
                <div className={`
                  absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500
                  ${activeCard === exp.id ? 'w-full' : 'w-0'}
                `}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <AnimatedNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isScrolling={isScrolling}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <EnhancedHero scrollToSection={scrollToSection} />

      <div className="relative">
        <EnhancedBackground.AnimatedBackground
          variant="combined"
          intensity="low"
          className="absolute inset-0"
        />
        <div className="relative z-10">
          <AnimatedAbout />
        </div>
      </div>

      <div className="relative">
        <EnhancedBackground.GradientBackground intensity="low" className="absolute inset-0" />
        <EnhancedBackground.GeometricBackground intensity="low" className="absolute inset-0" />
        <div className="relative z-10">
          <AnimatedExperience />
        </div>
      </div>

      <div className="relative">
        <EnhancedBackground.AnimatedBackground variant="geometric" intensity="low" className="absolute inset-0" />
        <div className="relative z-10">
          <CreativeProjects />
        </div>
      </div>

      <div className="relative">
        <EnhancedBackground.AnimatedWaves intensity="low" className="absolute inset-0" />
        <div className="relative z-10">
          <InteractiveSkills />
        </div>
      </div>

      <div className="relative">
        <EnhancedBackground.GradientBackground intensity="low" className="absolute inset-0" />
        <div className="relative z-10">
          <InteractiveContact />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;