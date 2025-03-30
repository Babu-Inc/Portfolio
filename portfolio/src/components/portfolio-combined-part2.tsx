import React, { useState } from 'react';
import { Mail, Phone, MapPin, Code, Database, Server, Terminal, Globe, Cpu, LineChart } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

// Skills Section Component
export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skills: Skill[] = [
    { name: 'Python', icon: <Terminal size={20} />, category: 'Programming' },
    { name: 'Java', icon: <Code size={20} />, category: 'Programming' },
    { name: 'JavaScript', icon: <Code size={20} />, category: 'Programming' },
    { name: 'React', icon: <Code size={20} />, category: 'Web Development' },
    { name: 'Google Earth Engine', icon: <Globe size={20} />, category: 'Data Science' },
    { name: 'AWS Services', icon: <Server size={20} />, category: 'Cloud Computing' },
    { name: 'Firebase', icon: <Database size={20} />, category: 'Database' },
    { name: 'R', icon: <LineChart size={20} />, category: 'Data Science' },
    { name: 'LangChain', icon: <Cpu size={20} />, category: 'AI' },
    { name: 'Machine Learning', icon: <Cpu size={20} />, category: 'AI' },
    { name: 'HTML/CSS', icon: <Code size={20} />, category: 'Web Development' },
    { name: 'Git', icon: <Code size={20} />, category: 'Version Control' }
  ];

  const categories = ['all', ...Array.from(new Set(skills.map(skill => skill.category)))];

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  // Group skills by category for display
  const skillsByCategory: Record<string, Skill[]> = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Skills & Technologies</h2>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
            </button>
          ))}
        </div>

        {/* Skills display */}
        <div className="max-w-4xl mx-auto">
          {activeCategory === 'all' ? (
            // When "All" is selected, show skills grouped by category
            Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="bg-white p-4 rounded-lg shadow-sm flex items-center hover:shadow-md transition duration-300">
                      <div className="mr-3 text-blue-600">
                        {skill.icon}
                      </div>
                      <span className="text-gray-700">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // When a specific category is selected, show only those skills
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{activeCategory}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSkills.map((skill) => (
                  <div key={skill.name} className="bg-white p-4 rounded-lg shadow-sm flex items-center hover:shadow-md transition duration-300">
                    <div className="mr-3 text-blue-600">
                      {skill.icon}
                    </div>
                    <span className="text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Languages */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Languages</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">English</span>
                <span className="text-gray-500 text-sm">Native/Fluent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Urdu</span>
                <span className="text-gray-500 text-sm">Fluent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Hindi</span>
                <span className="text-gray-500 text-sm">Experienced</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Get In Touch</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail size={20} className="text-blue-600 mr-4 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">Email</p>
                  <a href="mailto:therealyaan9876@gmail.com" className="text-gray-600 hover:text-blue-600 transition">therealyaan9876@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone size={20} className="text-blue-600 mr-4 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">Phone</p>
                  <a href="tel:+15128046553" className="text-gray-600 hover:text-blue-600 transition">(512) 804-6553</a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin size={20} className="text-blue-600 mr-4 mt-1" />
                <div>
                  <p className="text-gray-700 font-medium">Location</p>
                  <p className="text-gray-600">Austin, TX</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-4 mt-1">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">LinkedIn</p>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">linkedin.com/in/ayaan-syed</a>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-4 mt-1">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">GitHub</p>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition">github.com/ayaan-syed</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Send Me a Message</h3>
            {submitSuccess ? (
              <div className="bg-green-100 p-4 rounded-lg text-green-700 mb-4">
                Thank you for your message! I'll get back to you soon.
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
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
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-8 text-center text-white">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Ayaan A. Syed. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="mailto:therealyaan9876@gmail.com" className="text-gray-400 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};