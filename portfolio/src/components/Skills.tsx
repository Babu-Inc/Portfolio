import React, { useState } from 'react';
import { Code, Database, Server, Terminal, Globe, Cpu, LineChart, Brain, Repeat, FileText, Zap, BarChart, Network, Lock, Shield } from 'lucide-react';

interface Skill {
    name: string;
    icon: React.ReactNode;
    category: string;
    color: string;
    proficiency: number; // 1-5 scale
    yearsExperience: number;
    description: string;
}

interface SkillCardProps {
    skill: Skill;
    isExpanded: boolean;
    toggleExpand: () => void;
}

// Skill Card Component
const SkillCard: React.FC<SkillCardProps> = ({ skill, isExpanded, toggleExpand }) => {
    return (
        <div
            className={`
        bg-gray-800 rounded-lg shadow-md relative overflow-hidden transition-all duration-300 transform
        ${isExpanded ? 'scale-105 shadow-xl ring-1 ring-indigo-500/50' : 'hover:shadow-lg hover:scale-102'}
      `}
            onClick={toggleExpand}
        >
            {/* Basic View */}
            <div className="p-4 flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                    <div className={`
            mr-3 p-2 rounded-md bg-gradient-to-br ${skill.color} text-white
            transition-all duration-300
            ${isExpanded ? 'scale-110 rotate-6' : ''}
          `}>
                        {skill.icon}
                    </div>
                    <span className="text-gray-200 font-medium">{skill.name}</span>
                </div>

                {/* Proficiency Indicator */}
                <div className="flex space-x-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <div
                            key={star}
                            className={`h-1.5 w-1.5 rounded-full ${star <= skill.proficiency ? 'bg-indigo-400' : 'bg-gray-600'}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Expanded View */}
            <div
                className={`
          overflow-hidden transition-all duration-300 bg-gray-800/80 border-t border-gray-700
          ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="p-4">
                    <div className="flex justify-between mb-4">
                        <div>
                            <div className="text-sm text-gray-400">Experience</div>
                            <div className="text-indigo-300 font-medium">{skill.yearsExperience} {skill.yearsExperience === 1 ? 'year' : 'years'}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Category</div>
                            <div className="text-indigo-300 font-medium">{skill.category}</div>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm">{skill.description}</p>
                </div>
            </div>
        </div>
    );
};

// Main Skills Component
const Skills: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Enhanced skill data with proficiency levels, years of experience, and descriptions
    const skills: Skill[] = [
        // Programming Languages
        {
            name: 'Python',
            icon: <Terminal size={20} />,
            category: 'Programming',
            color: 'from-blue-400 to-blue-600',
            proficiency: 5,
            yearsExperience: 4,
            description: 'Advanced Python development including web frameworks, data analysis libraries, and machine learning applications.'
        },
        {
            name: 'Java',
            icon: <Code size={20} />,
            category: 'Programming',
            color: 'from-orange-400 to-red-600',
            proficiency: 4,
            yearsExperience: 3,
            description: 'Object-oriented programming, Android development, and enterprise applications.'
        },
        {
            name: 'JavaScript',
            icon: <Code size={20} />,
            category: 'Programming',
            color: 'from-yellow-400 to-yellow-600',
            proficiency: 4,
            yearsExperience: 3,
            description: 'Modern JavaScript including ES6+, async programming, and frameworks like React.'
        },
        {
            name: 'R',
            icon: <LineChart size={20} />,
            category: 'Data Science',
            color: 'from-blue-400 to-indigo-600',
            proficiency: 4,
            yearsExperience: 2,
            description: 'Statistical analysis, data visualization, and research methodology using R and its ecosystem.'
        },

        // Web Development
        {
            name: 'React',
            icon: <Code size={20} />,
            category: 'Web Development',
            color: 'from-cyan-400 to-blue-500',
            proficiency: 4,
            yearsExperience: 2,
            description: 'Frontend development with React, including hooks, context API, and state management.'
        },
        {
            name: 'HTML/CSS',
            icon: <Code size={20} />,
            category: 'Web Development',
            color: 'from-red-400 to-pink-600',
            proficiency: 4,
            yearsExperience: 3,
            description: 'Semantic HTML, responsive design, CSS Grid/Flexbox, and modern styling techniques.'
        },

        // Data Science & AI/ML
        {
            name: 'TensorFlow',
            icon: <Brain size={20} />,
            category: 'AI/ML',
            color: 'from-orange-400 to-orange-600',
            proficiency: 4,
            yearsExperience: 2,
            description: 'Deep learning model development, training, and deployment using TensorFlow and Keras.'
        },
        {
            name: 'PyTorch',
            icon: <Zap size={20} />,
            category: 'AI/ML',
            color: 'from-red-400 to-red-600',
            proficiency: 3,
            yearsExperience: 1,
            description: 'Neural network implementation and research using PyTorch for computer vision and NLP tasks.'
        },
        {
            name: 'Scikit-learn',
            icon: <Brain size={20} />,
            category: 'AI/ML',
            color: 'from-blue-400 to-blue-600',
            proficiency: 4,
            yearsExperience: 3,
            description: 'Machine learning algorithms implementation, model training, and evaluation pipelines.'
        },
        {
            name: 'Pandas',
            icon: <Database size={20} />,
            category: 'Data Science',
            color: 'from-blue-400 to-indigo-600',
            proficiency: 5,
            yearsExperience: 3,
            description: 'Data manipulation, cleaning, transformation, and analysis using Pandas DataFrames.'
        },
        {
            name: 'NumPy',
            icon: <BarChart size={20} />,
            category: 'Data Science',
            color: 'from-yellow-400 to-yellow-600',
            proficiency: 5,
            yearsExperience: 3,
            description: 'Numerical computing with multi-dimensional arrays and mathematical functions.'
        },

        // Cloud & Infrastructure
        {
            name: 'AWS Services',
            icon: <Server size={20} />,
            category: 'Cloud Computing',
            color: 'from-orange-400 to-orange-600',
            proficiency: 3,
            yearsExperience: 2,
            description: 'Cloud infrastructure including EC2, S3, Lambda, SageMaker, and other AWS services.'
        },
        {
            name: 'Google Earth Engine',
            icon: <Globe size={20} />,
            category: 'Data Science',
            color: 'from-green-400 to-emerald-600',
            proficiency: 4,
            yearsExperience: 2,
            description: 'Geospatial analysis and satellite imagery processing at scale for environmental monitoring.'
        },
        {
            name: 'Docker',
            icon: <Database size={20} />,
            category: 'DevOps',
            color: 'from-blue-400 to-blue-600',
            proficiency: 3,
            yearsExperience: 2,
            description: 'Containerization of applications and services for consistent development and deployment.'
        },

        // Database
        {
            name: 'SQL',
            icon: <Database size={20} />,
            category: 'Database',
            color: 'from-blue-400 to-indigo-600',
            proficiency: 4,
            yearsExperience: 3,
            description: 'Database design, query optimization, and data management using SQL and relational databases.'
        },
        {
            name: 'Firebase',
            icon: <Database size={20} />,
            category: 'Database',
            color: 'from-yellow-400 to-amber-600',
            proficiency: 3,
            yearsExperience: 2,
            description: 'Real-time database, authentication, and hosting for web and mobile applications.'
        }
    ];

    // Extract unique categories and sort them
    const categories: string[] = ['all', ...Array.from(new Set(skills.map(skill => skill.category))).sort()];

    // Filter skills based on active category and search query
    const filteredSkills = skills
        .filter(skill => activeCategory === 'all' || skill.category === activeCategory)
        .filter(skill =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Toggle skill expansion
    const toggleSkillExpand = (skillName: string) => {
        setExpandedSkill(expandedSkill === skillName ? null : skillName);
    };

    return (
        <section id="skills" className="py-20 px-6 bg-gray-900 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 text-9xl">{"{ }"}</div>
                <div className="absolute bottom-10 right-10 text-9xl">{"</>"}</div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-600 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-3">Skills & Technologies</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"></div>

                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
                    A comprehensive toolbox of languages, frameworks, and technologies with a focus on AI, data science, and software development.
                </p>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 px-4 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500"
                        />
                        <svg
                            className="absolute left-3 top-2.5 text-gray-500"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                </div>

                {/* Animated category filters */}
                <div className="flex flex-wrap justify-center mb-10 gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                px-4 py-2 rounded-full transition-all duration-300 transform
                ${activeCategory === category
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-105 shadow-lg'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'}
              `}
                        >
                            {category === 'all' ? 'All Skills' : category}
                        </button>
                    ))}
                </div>

                {/* Skills display with staggered animations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {filteredSkills.map((skill) => (
                        <SkillCard
                            key={skill.name}
                            skill={skill}
                            isExpanded={expandedSkill === skill.name}
                            toggleExpand={() => toggleSkillExpand(skill.name)}
                        />
                    ))}
                </div>

                {/* Empty state for search */}
                {searchQuery && filteredSkills.length === 0 && (
                    <div className="text-center text-gray-400 my-10">
                        No skills match your search criteria.
                    </div>
                )}

                {/* Enhanced Languages section with animated progress bars */}
                <div className="mt-16 bg-gray-800 p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold text-white mb-6">Languages</h3>
                    <div className="space-y-5">
                        <div className="language-progress">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300 font-medium">English</span>
                                <span className="text-gray-400 text-sm">Native</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full w-full animate-pulse-slow"
                                    style={{ animationDuration: '3.5s' }}
                                ></div>
                            </div>
                        </div>

                        <div className="language-progress">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300 font-medium">Urdu</span>
                                <span className="text-gray-400 text-sm">Fluent</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full w-full animate-pulse-slow"
                                    style={{ animationDuration: '3.5s' }}
                                ></div>
                            </div>
                        </div>

                        <div className="language-progress">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300 font-medium">Hindi</span>
                                <span className="text-gray-400 text-sm">Experienced</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full w-4/5 animate-pulse-slow"
                                    style={{ animationDuration: '4s' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;