import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Wrench, Code, AlertCircle, Github, Mail } from 'lucide-react';
import Header from '../Header.tsx';
import Footer from '../Footer.tsx';

const ProjectImportingPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Map slugs to project names for better display
    const projectNames: { [key: string]: string } = {
        'esports-ai-assistant': 'Esports Manager AI Assistant',
        'peerscribe': 'PeerScribe',
        'predictive-climate-model': 'Predictive Climate Model',
        'fiji-water-monitoring': 'Fiji Water Discoloration Monitoring'
    };

    const projectName = slug ? projectNames[slug] || slug.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : 'Project';

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Header
                activeSection="projects"
                isScrolling={true}
                isMenuOpen={false}
                setIsMenuOpen={() => {}}
                scrollToSection={() => {}}
                isDarkMode={true}
                toggleDarkMode={() => {}}
            />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gray-900 border-b border-gray-800">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-900/30 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                        {/* Back button */}
                        <div className="mb-8">
                            <Link
                                to="/"
                                className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Back to all projects
                            </Link>
                        </div>

                        <div className="text-center">
                            {/* Loading animation icon */}
                            <div className="inline-block p-4 bg-blue-900/20 rounded-full mb-6">
                                <div className="p-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full">
                                    <div className="relative">
                                        <Wrench size={64} className="text-blue-400 animate-bounce" />
                                        <div className="absolute -top-2 -right-2">
                                            <div className="w-6 h-6 bg-yellow-500 rounded-full animate-pulse flex items-center justify-center">
                                                <Clock size={12} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                                {projectName}
                            </h1>

                            <div className="flex flex-wrap justify-center gap-3 mb-8">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-900/50 text-yellow-200">
                                    <Clock size={16} className="mr-2" />
                                    In Development
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-blue-200">
                                    <Code size={16} className="mr-2" />
                                    Coming Soon
                                </span>
                            </div>

                            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                                This project is currently being imported into the portfolio.
                                Please check back soon for the complete project showcase!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Status Card */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 border border-gray-700">
                            <div className="text-center">
                                <div className="inline-block p-3 bg-blue-900/20 rounded-full mb-4">
                                    <AlertCircle size={32} className="text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">Project Status</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Documentation</span>
                                        <span className="text-yellow-400">In Progress</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Code Review</span>
                                        <span className="text-yellow-400">Pending</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Portfolio Integration</span>
                                        <span className="text-red-400">Scheduled</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Card */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 border border-gray-700">
                            <div className="text-center">
                                <div className="inline-block p-3 bg-indigo-900/20 rounded-full mb-4">
                                    <Clock size={32} className="text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-4">Expected Timeline</h3>
                                <div className="space-y-4">
                                    <div className="text-left">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                            <span className="text-gray-300">Project Completion</span>
                                        </div>
                                        <div className="text-sm text-green-400 ml-6">✓ Completed</div>
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                                            <span className="text-gray-300">Documentation & Review</span>
                                        </div>
                                        <div className="text-sm text-yellow-400 ml-6">⏳ 1-2 weeks</div>
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                                            <span className="text-gray-300">Portfolio Integration</span>
                                        </div>
                                        <div className="text-sm text-gray-400 ml-6">📅 Coming Soon</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Coming Section */}
                    <div className="mt-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-8 border border-gray-700">
                        <h3 className="text-2xl font-semibold text-white mb-6 text-center">What's Coming</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="inline-block p-3 bg-purple-900/20 rounded-full mb-4">
                                    <Code size={24} className="text-purple-400" />
                                </div>
                                <h4 className="text-lg font-medium text-white mb-2">Detailed Code Examples</h4>
                                <p className="text-gray-400 text-sm">
                                    In-depth code snippets and implementation details
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-block p-3 bg-green-900/20 rounded-full mb-4">
                                    <AlertCircle size={24} className="text-green-400" />
                                </div>
                                <h4 className="text-lg font-medium text-white mb-2">Technical Architecture</h4>
                                <p className="text-gray-400 text-sm">
                                    System design diagrams and technology stack details
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-block p-3 bg-blue-900/20 rounded-full mb-4">
                                    <Github size={24} className="text-blue-400" />
                                </div>
                                <h4 className="text-lg font-medium text-white mb-2">Live Demo & Repository</h4>
                                <p className="text-gray-400 text-sm">
                                    Interactive demonstrations and source code access
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-16 text-center">
                        <h3 className="text-xl font-semibold text-white mb-4">Questions About This Project?</h3>
                        <p className="text-gray-300 mb-6">
                            Feel free to reach out if you'd like to learn more about this project or discuss its implementation.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="mailto:therealyaan9876@gmail.com"
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg flex items-center"
                            >
                                <Mail size={16} className="mr-2" />
                                Get in Touch
                            </a>
                            <Link
                                to="/"
                                className="px-6 py-3 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-all duration-300"
                            >
                                View Other Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectImportingPage;