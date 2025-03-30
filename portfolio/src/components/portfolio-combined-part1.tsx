import React from 'react';
import { Mail, Phone, MapPin, Briefcase, Calendar, ChevronRight, Code, Database, Server, Terminal, Globe, Cpu, LineChart, Book } from 'lucide-react';

interface NavAndHeroProps {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  isScrolling: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToSection: (sectionId: string) => void;
}

// Combined Navigation and Hero Sections
export const NavAndHero: React.FC<NavAndHeroProps> = ({
  activeSection,
  setActiveSection,
  isScrolling,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection
}) => {
  return (
    <>
      {/* Navigation */}
      <nav className={`fixed w-full z-10 transition-all duration-300 ${isScrolling ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">Ayaan A. Syed</div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className={`transition hover:text-blue-600 ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-700'}`}>Home</button>
            <button onClick={() => scrollToSection('about')} className={`transition hover:text-blue-600 ${activeSection === 'about' ? 'text-blue-600' : 'text-gray-700'}`}>About</button>
            <button onClick={() => scrollToSection('experience')} className={`transition hover:text-blue-600 ${activeSection === 'experience' ? 'text-blue-600' : 'text-gray-700'}`}>Experience</button>
            <button onClick={() => scrollToSection('projects')} className={`transition hover:text-blue-600 ${activeSection === 'projects' ? 'text-blue-600' : 'text-gray-700'}`}>Projects</button>
            <button onClick={() => scrollToSection('skills')} className={`transition hover:text-blue-600 ${activeSection === 'skills' ? 'text-blue-600' : 'text-gray-700'}`}>Skills</button>
            <button onClick={() => scrollToSection('contact')} className={`transition hover:text-blue-600 ${activeSection === 'contact' ? 'text-blue-600' : 'text-gray-700'}`}>Contact</button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md py-4 px-6">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className={`text-left transition hover:text-blue-600 ${activeSection === 'home' ? 'text-blue-600' : 'text-gray-700'}`}>Home</button>
              <button onClick={() => scrollToSection('about')} className={`text-left transition hover:text-blue-600 ${activeSection === 'about' ? 'text-blue-600' : 'text-gray-700'}`}>About</button>
              <button onClick={() => scrollToSection('experience')} className={`text-left transition hover:text-blue-600 ${activeSection === 'experience' ? 'text-blue-600' : 'text-gray-700'}`}>Experience</button>
              <button onClick={() => scrollToSection('projects')} className={`text-left transition hover:text-blue-600 ${activeSection === 'projects' ? 'text-blue-600' : 'text-gray-700'}`}>Projects</button>
              <button onClick={() => scrollToSection('skills')} className={`text-left transition hover:text-blue-600 ${activeSection === 'skills' ? 'text-blue-600' : 'text-gray-700'}`}>Skills</button>
              <button onClick={() => scrollToSection('contact')} className={`text-left transition hover:text-blue-600 ${activeSection === 'contact' ? 'text-blue-600' : 'text-gray-700'}`}>Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col items-center">
          <div className="mb-8 w-40 h-40 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            AS
          </div>
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">Ayaan A. Syed</h1>
          <div className="flex items-center justify-center text-gray-600 mb-6">
            <span className="flex items-center">
              <Briefcase size={16} className="mr-2" />
              Technology Consultant
            </span>
            <span className="mx-3">|</span>
            <span className="flex items-center">
              <MapPin size={16} className="mr-2" />
              Austin, TX
            </span>
          </div>
          <p className="text-xl text-center text-gray-600 max-w-2xl mb-10">
            Results-driven technology consultant with expertise in software development, AI, and data science.
          </p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

// About Section Component
export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            I'm a Computer Information Science student at St. Edwards University with a passion for technology and innovation.
            My expertise spans software development, AI, and data science, allowing me to develop customized solutions for complex problems.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            I'm skilled in collaborating with stakeholders and translating client needs into technical solutions using my programming expertise
            in Python, Java, and AWS services. I have experience in AI-driven applications, cloud computing, and full-stack development.
          </p>
          <p className="text-lg text-gray-600">
            I speak and write in English and Urdu, and I am experienced in Hindi. When I'm not coding, I volunteer as an Animal Caretaker,
            providing care for animals and ensuring their well-being.
          </p>

          <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Book size={24} className="text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">St. Edwards University</h4>
                <p className="text-gray-600">BA, Computer Information Science</p>
                <div className="flex items-center text-gray-500 mt-1">
                  <Calendar size={16} className="mr-2" />
                  <span>August 2022 - Current</span>
                </div>
                <p className="text-gray-600 mt-2">
                  <strong>Relevant Coursework:</strong> Concepts I & II, Algorithmic Problem Solving, Computation-Based Programming, Web Development,
                  Computer Architecture, Data Structures, Intro to AI, Database Theory, Software Engineering
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Honors & Awards:</strong> President's Achievement Scholarship
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Work Experience</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* AI Research Lead */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">AI Research Lead</h3>
                <p className="text-gray-600">Klein Sports Performance, LLC</p>
                <p className="text-gray-500 italic">Internship</p>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                <p className="text-gray-500 flex items-center md:justify-end">
                  <Calendar size={16} className="mr-2" />
                  Sep 2024 - Current
                </p>
                <p className="text-gray-500 flex items-center md:justify-end mt-1">
                  <MapPin size={16} className="mr-2" />
                  Austin, TX
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Lead researcher for the AI component of a fitness app, responsible for developing machine learning algorithms to learn 100+ workouts,
              personalize workouts, and analyze user performance. Collaborated with data science/development teams to feed our ChatBot information
              across 20+ studies, optimizing feedback and enhancing user fitness outcomes through tailored insights.
            </p>
          </div>

          {/* Data Scientist */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Data Scientist</h3>
                <p className="text-gray-600">USDA</p>
                <p className="text-gray-500 italic">Internship</p>
              </div>
              <div className="mt-2 md:mt-0 md:text-right">
                <p className="text-gray-500 flex items-center md:justify-end">
                  <Calendar size={16} className="mr-2" />
                  Jun 2024 - Aug 2024
                </p>
                <p className="text-gray-500 flex items-center md:justify-end mt-1">
                  <MapPin size={16} className="mr-2" />
                  Austin, TX
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              My role comprised two main projects. I developed a data science solution using Google Earth Engine to monitor water quality in Fiji,
              applying different indices for detecting pollution and analyzing seasonal trends. The other involved Land Use Land Cover (LULC) for Fiji.
              My job was to photo-interpret sample plots of land, write R scripts for the interpretations' accuracy, and compile my data for the 2021-2022
              reporting period.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Fiji Water Project */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <Globe size={64} className="text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fiji Water Discoloration Monitoring</h3>
              <p className="text-gray-600 mb-4">
                Cloud-Based Computing Script that leverages Sentinel-2 satellite imagery and Google Earth Engine to monitor water discoloration in Fiji.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Python</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Javascript</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Google Earth Engine</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">ArcGIS Pro</span>
              </div>
              <a href="#" className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition">
                View project <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Esports Manager Project */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
              <Cpu size={64} className="text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Esports Manager AI Assistant</h3>
              <p className="text-gray-600 mb-4">
                LLM-powered digital assistant with a chat interface to make an esports team and answer queries about the players, using RAG workflow.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">AWS</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">Python</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">LangChain</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">StreamLit</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">Claude v2</span>
              </div>
              <a href="#" className="text-purple-600 font-medium flex items-center hover:text-purple-800 transition">
                View project <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>

          {/* PeerScribe Project */}
          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
            <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
              <Code size={64} className="text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">PeerScribe</h3>
              <p className="text-gray-600 mb-4">
                Subscription-based platform providing tutoring services, curated study notes, and tutor-checked notes.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">React</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">JavaScript</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Firebase</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Bootstrap</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">CSS</span>
              </div>
              <a href="#" className="text-green-600 font-medium flex items-center hover:text-green-800 transition">
                View project <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};