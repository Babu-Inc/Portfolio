import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Database, LineChart, ArrowLeft, Globe, Activity, Cpu, Eye, Github } from 'lucide-react';
import Header from '../Header.tsx';
import Footer from '../Footer.tsx';

const MindSightDetailPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Brain wave types data
    const brainWaveTypes = [
        {
            type: 'Alpha Waves',
            description: 'Relaxed, calm mental state (8-13 Hz)',
            color: '#4CAF50',
            icon: <Activity size={20} />
        },
        {
            type: 'Beta Waves',
            description: 'Alert, actively thinking (13-30 Hz)',
            color: '#2196F3',
            icon: <Activity size={20} />
        },
        {
            type: 'Theta Waves',
            description: 'Deep meditation, sleep (4-8 Hz)',
            color: '#9C27B0',
            icon: <Activity size={20} />
        },
        {
            type: 'Delta Waves',
            description: 'Deep sleep, regeneration (0.5-4 Hz)',
            color: '#F44336',
            icon: <Activity size={20} />
        },
        {
            type: 'Gamma Waves',
            description: 'High cognitive processing (30-100 Hz)',
            color: '#FF9800',
            icon: <Activity size={20} />
        }
    ];

    // AI technologies
    const aiTechnologies = [
        {
            name: 'Real-time Visualization',
            description: 'Interactive charting of brain wave activity across different frequency bands',
            icon: <LineChart size={20} />
        },
        {
            name: 'DeepSeek-R1 Integration',
            description: 'Advanced AI model for analyzing neural patterns and mental states',
            icon: <Brain size={20} />
        },
        {
            name: 'Pattern Recognition',
            description: 'Identification of significant neural patterns and correlation between brain wave types',
            icon: <Database size={20} />
        },
        {
            name: 'Data Analysis',
            description: 'Comprehensive analysis of brain activity with confidence scoring',
            icon: <Cpu size={20} />
        },
        {
            name: 'Export Capabilities',
            description: 'Export raw data and analysis results in multiple formats for further research',
            icon: <Globe size={20} />
        }
    ];

    // System features
    const features = [
        {
            name: 'Real-time Brain Wave Monitoring',
            description: 'Interactive visualization of alpha, beta, theta, delta, and gamma brain waves with real-time updates'
        },
        {
            name: 'AI-Powered Neural Analysis',
            description: 'Integration with DeepSeek-R1 AI model for advanced pattern recognition and mental state analysis'
        },
        {
            name: 'Wave Pattern Correlation',
            description: 'Identification of relationships between different brain wave types and their significance for mental states'
        },
        {
            name: 'Confidence-Scored Insights',
            description: 'Analysis results include confidence scores to indicate reliability of detected patterns'
        },
        {
            name: 'Data Export & Sharing',
            description: 'Export capabilities for raw data and analysis results in CSV, JSON, and PDF formats'
        }
    ];

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
                {/* Hero Section with Badge Strip */}
                <div className="relative overflow-hidden bg-gray-900 border-b border-gray-800">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl"></div>
                    </div>

                    <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
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

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-blue-200">
                                AI-Powered
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/50 text-purple-200">
                                Neuroscience
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/50 text-green-200">
                                Data Visualization
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-200">
                                React
                            </span>
                        </div>

                        <div className="text-center">
                            <div className="inline-block p-2 bg-indigo-900/20 rounded-full mb-6">
                                <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full">
                                    <Brain size={64} className="text-indigo-400" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                                MindSight
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                                AI-Powered Brain Activity Visualization and Analysis
                            </p>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                                An intuitive platform for visualizing and analyzing brain wave activity using advanced machine learning. Built with React and integrating with Hugging Face's DeepSeek-R1 model.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://mindsight-app.netlify.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
                                >
                                    Live Demo
                                </a>
                                <a
                                    href="https://github.com/ayaan-cis/MindSight"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition-all duration-300"
                                >
                                    View Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="border-b border-gray-800 sticky top-0 bg-gray-900/90 backdrop-blur-md z-20">
                    <div className="max-w-6xl mx-auto">
                        <nav className="flex overflow-x-auto hide-scrollbar">
                            {['overview', 'features', 'brain-waves', 'technology', 'dashboard'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-4 font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                                        activeTab === tab
                                            ? 'border-indigo-500 text-white'
                                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                                    }`}
                                >
                                    {tab === 'overview' && 'Overview'}
                                    {tab === 'features' && 'Key Features'}
                                    {tab === 'brain-waves' && 'Brain Waves'}
                                    {tab === 'technology' && 'Technology'}
                                    {tab === 'dashboard' && 'Dashboard'}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-6 text-white">Neural Data Visualized</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <p className="text-gray-300 text-lg mb-6">
                                        MindSight is an AI-powered tool for visualizing and analyzing brain wave activity using advanced machine learning. Built with React and integrating with Hugging Face's DeepSeek-R1 model, it demonstrates the potential of AI in neuroscience applications.
                                    </p>
                                    <p className="text-gray-300 text-lg mb-6">
                                        The application provides a real-time visualization of different brain wave frequencies (alpha, beta, theta, delta, and gamma) and uses AI to identify patterns and correlations that indicate specific mental states.
                                    </p>
                                    <h3 className="text-xl font-semibold mb-4 text-white">Project Goals</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <span>Create an intuitive interface for brain wave visualization</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <span>Integrate with DeepSeek-R1 for advanced neural pattern analysis</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <span>Provide meaningful insights into brain activity patterns</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <span>Enable data export for further research and analysis</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                                        <Brain size={20} className="mr-2 text-indigo-400" />
                                        Technical Specifications
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Core Architecture</h4>
                                            <p className="text-gray-400">React-based single-page application with real-time visualization</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">AI Integration</h4>
                                            <p className="text-gray-400">Hugging Face DeepSeek-R1 model via Inference API</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Data Processing</h4>
                                            <p className="text-gray-400">Real-time synthetic data generation with 5 wave types</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Visualization</h4>
                                            <p className="text-gray-400">Interactive charting with Recharts library</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Technology Stack</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">React</span>
                                                <span className="px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded text-xs">Recharts</span>
                                                <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">Hugging Face API</span>
                                                <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs">CSS</span>
                                                <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 rounded text-xs">JavaScript</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Features Tab */}
                    {activeTab === 'features' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5"
                                    >
                                        <h3 className="text-xl font-semibold mb-2 text-white">{feature.name}</h3>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Demo section */}
                            <div className="mt-16">
                                <h3 className="text-2xl font-bold mb-6 text-white">Interactive Visualization Dashboard</h3>
                                <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
                                    <div className="text-center">
                                        <p className="text-gray-300 mb-8">
                                            Experience the full capabilities of MindSight through our interactive demo dashboard.
                                            The demo showcases synthetic brain wave data visualization and real-time AI analysis using the DeepSeek-R1 model.
                                        </p>
                                        <a
                                            href="https://mindsight-app.netlify.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
                                        >
                                            Launch Interactive Demo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Brain Waves Tab */}
                    {activeTab === 'brain-waves' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">Brain Wave Types</h2>
                            <p className="text-gray-300 text-lg mb-10">
                                MindSight visualizes and analyzes five primary types of brain waves, each associated with different mental states and cognitive processes:
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="bg-gray-800/70">
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Wave Type</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Description</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Frequency</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                    {brainWaveTypes.map((wave, index) => (
                                        <tr key={index} className="hover:bg-gray-800/30 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="p-1 rounded mr-3" style={{ backgroundColor: `${wave.color}30` }}>
                                                        <Activity size={20} style={{ color: wave.color }} />
                                                    </div>
                                                    <span className="text-white font-medium">{wave.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{wave.description.split(' (')[0]}</td>
                                            <td className="px-6 py-4 text-gray-300">{wave.description.match(/\(([^)]+)\)/)?.[1]}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-semibold mb-4 text-white">Neural Pattern Analysis</h3>
                                <p className="text-gray-300">
                                    MindSight's AI component analyzes the relationships between different brain wave types to identify patterns that indicate specific mental states. The system can detect correlations between alpha and beta waves suggesting a relaxed but alert state, theta spikes indicating deep focus, and gamma bursts corresponding to complex information processing.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Technology Tab */}
                    {activeTab === 'technology' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">Technology Stack</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {aiTechnologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/30 transition-all duration-300"
                                    >
                                        <div className="p-2 bg-indigo-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                            {tech.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-white">{tech.name}</h3>
                                        <p className="text-gray-400">{tech.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white">DeepSeek-R1 Integration</h3>
                                    <p className="text-gray-300 mb-4">
                                        MindSight leverages Hugging Face's DeepSeek-R1 model for neural pattern analysis:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Natural Language Understanding</span>
                                                <p className="text-gray-400 text-sm mt-1">Translates neural patterns into human-readable insights</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Pattern Recognition</span>
                                                <p className="text-gray-400 text-sm mt-1">Identifies significant correlations between different wave types</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Confidence Scoring</span>
                                                <p className="text-gray-400 text-sm mt-1">Provides reliability metrics for each detected pattern</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white">React & Recharts</h3>
                                    <p className="text-gray-300 mb-4">
                                        MindSight's frontend is built with modern technologies:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">React Components</span>
                                                <p className="text-gray-400 text-sm mt-1">Modular architecture for maintainability and reusability</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Recharts Visualization</span>
                                                <p className="text-gray-400 text-sm mt-1">Interactive line charts for real-time brain wave monitoring</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-indigo-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Modern UI Design</span>
                                                <p className="text-gray-400 text-sm mt-1">Intuitive interface with dark mode for extended viewing sessions</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">Visualization Dashboard</h2>

                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 border border-gray-700 mb-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 text-white">Real-time Monitoring & Analysis</h3>
                                        <p className="text-gray-300 mb-6">
                                            The MindSight dashboard provides comprehensive visualization of brain wave activity and AI-generated insights in an intuitive interface designed for both researchers and casual users.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="p-1 bg-indigo-900/20 rounded-full mr-3 mt-1">
                                                    <LineChart size={16} className="text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Real-time visualization</h4>
                                                    <p className="text-gray-400 text-sm">Monitor brain waves as they change over time</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-1 bg-indigo-900/20 rounded-full mr-3 mt-1">
                                                    <Brain size={16} className="text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">AI-powered insights</h4>
                                                    <p className="text-gray-400 text-sm">Neural pattern analysis with confidence scoring</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-1 bg-indigo-900/20 rounded-full mr-3 mt-1">
                                                    <Database size={16} className="text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Data export options</h4>
                                                    <p className="text-gray-400 text-sm">Save and share your data in multiple formats</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-indigo-500/30 transition-all duration-300">
                                        <div className="aspect-video rounded overflow-hidden relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <a
                                                    href="https://mindsight-app.netlify.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-300 rounded flex items-center space-x-2"
                                                >
                                                    <Eye size={16} />
                                                    <span>View Live Demo</span>
                                                </a>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-gray-900/90"></div>
                                            <div className="h-full w-full flex items-center justify-center">
                                                <Brain size={64} className="text-indigo-500/30" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Tabbed Interface</h3>
                                    <p className="text-gray-300 text-sm">
                                        Navigate between real-time display, AI insights, wave pattern information, and data export options.
                                    </p>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Interactive Charts</h3>
                                    <p className="text-gray-300 text-sm">
                                        Visualize multiple brain wave types simultaneously with responsive line charts and hover details.
                                    </p>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Simulation Controls</h3>
                                    <p className="text-gray-300 text-sm">
                                        Start, pause, and analyze brain wave data with intuitive controls for seamless interaction.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-t border-gray-800">
                    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Experience MindSight in Action</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Try my interactive demo to see how MindSight visualizes brain wave activity and provides AI-powered analysis in real-time.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://mindsight-app.netlify.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
                            >
                                Launch Demo
                            </a>
                            <a
                                href="https://github.com/ayaan-cis/MindSight"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-all duration-300"
                            >
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};


export default MindSightDetailPage;

