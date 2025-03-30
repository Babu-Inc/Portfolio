import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronRight, Code, Globe, Cpu, ExternalLink, Github, Eye, FileText, Shield, Database, Server, HardDrive } from 'lucide-react';

// Define TypeScript interfaces for our components
interface Project {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  skills: string[];
  skillColors: string[];
  demoLink?: string;
  codeLink?: string;
}

interface ContactMethodProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

// Creative Projects Section
const CreativeProjects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: 'fiji',
      title: 'Fiji Water Discoloration Monitoring',
      description: 'Cloud-Based Computing Script that leverages Sentinel-2 satellite imagery and Google Earth Engine to monitor water discoloration in Fiji.',
      icon: <Globe size={64} className="text-white" />,
      color: 'from-blue-500 to-cyan-500',
      skills: ['Python', 'Javascript', 'Google Earth Engine', 'ArcGIS Pro'],
      skillColors: ['bg-blue-100 text-blue-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800', 'bg-blue-100 text-blue-800']
    },
    {
      id: 'esports',
      title: 'Esports Manager AI Assistant',
      description: 'LLM-powered digital assistant with a chat interface to make an esports team and answer queries about the players, using RAG workflow.',
      icon: <Cpu size={64} className="text-white" />,
      color: 'from-purple-500 to-pink-500',
      skills: ['AWS', 'Python', 'LangChain', 'StreamLit', 'Claude v2'],
      skillColors: ['bg-orange-100 text-orange-800', 'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800']
    },
    {
      id: 'peerscribe',
      title: 'PeerScribe',
      description: 'Subscription-based platform providing tutoring services, curated study notes, and tutor-checked notes.',
      icon: <Code size={64} className="text-white" />,
      color: 'from-green-500 to-emerald-500',
      skills: ['React', 'JavaScript', 'Firebase', 'Bootstrap', 'CSS'],
      skillColors: ['bg-blue-100 text-blue-800', 'bg-yellow-100 text-yellow-800', 'bg-amber-100 text-amber-800', 'bg-purple-100 text-purple-800', 'bg-blue-100 text-blue-800']
    },
    {
      id: 'securityscan',
      title: 'Network Security Scanner',
      description: 'Cybersecurity tool for scanning network vulnerabilities, detecting open ports, and identifying potential security threats.',
      icon: <Shield size={64} className="text-white" />,
      color: 'from-red-500 to-orange-500',
      skills: ['Python', 'Networking', 'Penetration Testing', 'Cryptography'],
      skillColors: ['bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800', 'bg-red-100 text-red-800', 'bg-yellow-100 text-yellow-800']
    },
    {
      id: 'datavisualization',
      title: 'Interactive Data Visualization Dashboard',
      description: 'Real-time data visualization platform for environmental data with interactive charts and mapping features.',
      icon: <FileText size={64} className="text-white" />,
      color: 'from-blue-500 to-indigo-500',
      skills: ['D3.js', 'React', 'TypeScript', 'Python', 'Flask'],
      skillColors: ['bg-orange-100 text-orange-800', 'bg-blue-100 text-blue-800', 'bg-blue-100 text-blue-800', 'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800']
    },
    {
      id: 'mlmodel',
      title: 'Predictive Climate Model',
      description: 'Machine learning model for predicting climate patterns and extreme weather events using historical data.',
      icon: <HardDrive size={64} className="text-white" />,
      color: 'from-teal-500 to-emerald-500',
      skills: ['Python', 'TensorFlow', 'Sklearn', 'Pandas', 'NumPy'],
      skillColors: ['bg-blue-100 text-blue-800', 'bg-orange-100 text-orange-800', 'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800']
    }
  ];

  // Project card hover effects
  const handleMouseEnter = (id: string) => {
    setActiveProject(id);
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <section id="projects" className="py-20 px-6 bg-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-3">Featured Projects</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Project Header with Gradient Background */}
              <div className={`h-48 bg-gradient-to-r ${project.color} flex items-center justify-center relative`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 text-6xl opacity-20">{"< />"}</div>
                  <div className="absolute bottom-4 right-4 text-4xl opacity-20">{"{ }"}</div>
                </div>

                <div className="relative transform transition-transform duration-500 group-hover:scale-110">
                  {project.icon}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, index) => (
                    <span
                      key={skill}
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded ${project.skillColors[index % project.skillColors.length]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  {project.demoLink && (
                    <a
                      href="#"
                      className={`
                        font-medium flex items-center 
                        ${project.id === 'fiji' ? 'text-blue-400 hover:text-blue-300' : 
                          project.id === 'esports' ? 'text-purple-400 hover:text-purple-300' : 
                          project.id === 'securityscan' ? 'text-red-400 hover:text-red-300' :
                          project.id === 'datavisualization' ? 'text-blue-400 hover:text-blue-300' :
                          project.id === 'mlmodel' ? 'text-teal-400 hover:text-teal-300' :
                          'text-green-400 hover:text-green-300'}
                      `}
                    >
                      <Eye size={16} className="mr-1" />
                      Demo
                    </a>
                  )}

                  <a
                    href="#"
                    className={`
                      font-medium flex items-center ml-auto
                      ${project.id === 'fiji' ? 'text-blue-400 hover:text-blue-300' : 
                        project.id === 'esports' ? 'text-purple-400 hover:text-purple-300' : 
                        project.id === 'securityscan' ? 'text-red-400 hover:text-red-300' :
                        project.id === 'datavisualization' ? 'text-blue-400 hover:text-blue-300' :
                        project.id === 'mlmodel' ? 'text-teal-400 hover:text-teal-300' :
                        'text-green-400 hover:text-green-300'}
                    `}
                  >
                    View project
                    <ChevronRight
                      size={16}
                      className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const InteractiveContact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Contact method component
  const ContactMethod: React.FC<ContactMethodProps> = ({ icon, title, value, link }) => {
    return (
      <div className="flex items-start">
        <div className="text-indigo-400 mr-4 mt-1">
          {icon}
        </div>
        <div>
          <p className="text-gray-300 font-medium">{title}</p>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
            >
              {value}
            </a>
          ) : (
            <p className="text-gray-400">{value}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-3">Get In Touch</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"></div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <ContactMethod
                icon={<Mail size={20} />}
                title="Email"
                value="therealyaan9876@gmail.com"
                link="mailto:therealyaan9876@gmail.com"
              />

              <ContactMethod
                icon={<Phone size={20} />}
                title="Phone"
                value="(512) 804-6553"
                link="tel:+15128046553"
              />

              <ContactMethod
                icon={<MapPin size={20} />}
                title="Location"
                value="Austin, TX"
              />

              <ContactMethod
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                }
                title="LinkedIn"
                value="linkedin.com/in/ayaan-syed"
                link="http://www.linkedin.com/in/ayaan-syed"
              />

              <ContactMethod
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                }
                title="GitHub"
                value="github.com/ayaan-syed"
                link="https://github.com/ayaan-cis"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-6">Send Me a Message</h3>

            {submitSuccess && (
              <div className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded-lg mb-4">
                <p className="font-medium">Thank you for your message! I'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className={`block mb-2 ${focusedField === 'name' ? 'text-indigo-400' : 'text-gray-300'}`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className={`block mb-2 ${focusedField === 'email' ? 'text-indigo-400' : 'text-gray-300'}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className={`block mb-2 ${focusedField === 'message' ? 'text-indigo-400' : 'text-gray-300'}`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white resize-none"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`
                  w-full py-3 px-6 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 
                  text-white transition-all duration-300 transform hover:-translate-y-1
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-8 text-center text-white">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Ayaan A. Syed. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="http://www.linkedin.com/in/ayaan-syed" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://github.com/ayaan-cis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="mailto:therealyaan9876@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-6 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          Back to top
        </button>
      </div>
    </footer>
  );
};

export { CreativeProjects, InteractiveContact, Footer };