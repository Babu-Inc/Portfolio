import React, { useState } from 'react';
import { Code, Globe, Cpu, Shield, FileText, HardDrive, Eye, Github, ChevronRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    slug: string;
}

const Projects: React.FC = () => {
    const [activeProject, setActiveProject] = useState<string | null>(null);

    const projects: Project[] = [
        {
          id: 'goguardian',
          title: 'GoGuardian',
          description: 'High-performance API security monitoring system built with Golang, leveraging concurrent processing to detect and mitigate threats in real-time.',
          icon: <Shield size={64} className="text-white" />,
          color: 'from-teal-500 to-emerald-500',
          skills: ['Golang', 'Docker', 'Redis', 'WebSockets', 'Security Analytics'],
          skillColors: ['bg-blue-100 text-blue-800', 'bg-blue-100 text-blue-800', 'bg-red-100 text-red-800', 'bg-purple-100 text-purple-800', 'bg-red-100 text-red-800'],
          demoLink: 'https://github.com/ayaan-cs/goguardian',
          codeLink: 'https://github.com/ayaan-cs/goguardian',
          slug: 'goguardian'
        },
        {
            id: 'sentinelai',
            title: 'SentinelAI',
            description: 'Advanced AI-powered network intrusion detection system that leverages machine learning algorithms to identify malicious network activities in real-time.',
            icon: <Shield size={64} className="text-white" />,
            color: 'from-red-500 to-orange-500',
            skills: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Network Security'],
            skillColors: ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-blue-100 text-blue-800', 'bg-red-100 text-red-800'],
            demoLink: 'https://sentinelaiapp.streamlit.app/',
            codeLink: 'https://github.com/ayaan-cs/sentinelai',
            slug: 'sentinelai'
        },
        {
            id: 'mindsight',
            title: 'MindSight',
            description: 'AI-Powered brain activity visualization and analysis tool using advanced machine learning to interpret neural patterns and mental states.',
            icon: <Brain size={64} className="text-white" />,
            color: 'from-indigo-500 to-purple-500',
            skills: ['React', 'JavaScript', 'Hugging Face API', 'Recharts', 'CSS'],
            skillColors: ['bg-blue-100 text-blue-800', 'bg-yellow-100 text-yellow-800', 'bg-purple-100 text-purple-800', 'bg-blue-100 text-blue-800', 'bg-blue-100 text-blue-800'],
            demoLink: 'https://mindsight-app.netlify.app/',
            codeLink: 'https://github.com/ayaan-cs/MindSight',
            slug: 'mindsight'
        },
        {
            id: 'esports',
            title: 'Esports Manager AI Assistant',
            description: 'LLM-powered digital assistant with a chat interface to make an esports team and answer queries about the players, using RAG workflow.',
            icon: <Cpu size={64} className="text-white" />,
            color: 'from-purple-500 to-pink-500',
            skills: ['AWS', 'Python', 'LangChain', 'StreamLit', 'Claude v2'],
            skillColors: ['bg-orange-100 text-orange-800', 'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-blue-100 text-blue-800', 'bg-purple-100 text-purple-800'],
            slug: 'esports-ai-assistant'
        },
        {
            id: 'peerscribe',
            title: 'PeerScribe',
            description: 'Subscription-based platform providing tutoring services, curated study notes, and tutor-checked notes.',
            icon: <Code size={64} className="text-white" />,
            color: 'from-green-500 to-emerald-500',
            skills: ['React', 'JavaScript', 'Firebase', 'Bootstrap', 'CSS'],
            skillColors: ['bg-blue-100 text-blue-800', 'bg-yellow-100 text-yellow-800', 'bg-amber-100 text-amber-800', 'bg-purple-100 text-purple-800', 'bg-blue-100 text-blue-800'],
            slug: 'peerscribe'
        },
        {
            id: 'mlmodel',
            title: 'Predictive Climate Model',
            description: 'Machine learning model for predicting climate patterns and extreme weather events using historical data.',
            icon: <HardDrive size={64} className="text-white" />,
            color: 'from-teal-500 to-emerald-500',
            skills: ['Python', 'TensorFlow', 'Sklearn', 'Pandas', 'NumPy'],
            skillColors: ['bg-blue-100 text-blue-800', 'bg-orange-100 text-orange-800', 'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800'],
            slug: 'predictive-climate-model'
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
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`
                                              font-medium flex items-center 
                                              ${project.id === 'fiji' ? 'text-blue-400 hover:text-blue-300' :
                                                project.id === 'mindsight' ? 'text-indigo-400 hover:text-indigo-300' :
                                                    project.id === 'esports' ? 'text-purple-400 hover:text-purple-300' :
                                                        project.id === 'sentinelai' ? 'text-red-400 hover:text-red-300' :
                                                            project.id === 'mlmodel' ? 'text-teal-400 hover:text-teal-300' :
                                                                'text-green-400 hover:text-green-300'}
                                            `}
                                        >
                                            <Eye size={16} className="mr-1" />
                                            Demo
                                        </a>
                                    )}

                                    {project.codeLink && (
                                        <a
                                            href={project.codeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`
                                              font-medium flex items-center 
                                              ${project.id === 'fiji' ? 'text-blue-400 hover:text-blue-300' :
                                                project.id === 'mindsight' ? 'text-indigo-400 hover:text-indigo-300' :
                                                    project.id === 'esports' ? 'text-purple-400 hover:text-purple-300' :
                                                        project.id === 'sentinelai' ? 'text-red-400 hover:text-red-300' :
                                                            project.id === 'mlmodel' ? 'text-teal-400 hover:text-teal-300' :
                                                                'text-green-400 hover:text-green-300'}
                                            `}
                                        >
                                            <Github size={16} className="mr-1" />
                                            Code
                                        </a>
                                    )}

                                    <Link
                                        to={`/works/${project.slug}`}
                                        className={`
                                          font-medium flex items-center ml-auto
                                          ${project.id === 'fiji' ? 'text-blue-400 hover:text-blue-300' :
                                            project.id === 'mindsight' ? 'text-indigo-400 hover:text-indigo-300' :
                                                project.id === 'esports' ? 'text-purple-400 hover:text-purple-300' :
                                                    project.id === 'sentinelai' ? 'text-red-400 hover:text-red-300' :
                                                        project.id === 'mlmodel' ? 'text-teal-400 hover:text-teal-300' :
                                                            'text-green-400 hover:text-green-300'}
                                        `}
                                    >
                                        View project
                                        <ChevronRight
                                            size={16}
                                            className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;