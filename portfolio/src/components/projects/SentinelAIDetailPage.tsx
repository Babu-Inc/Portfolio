import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, Server, Brain, Network, LineChart, Terminal, AlertTriangle, Zap, Globe, Eye, Github, ArrowLeft } from 'lucide-react';
import Header from '../Header.tsx';
import Footer from '../Footer.tsx';

const SentinelAIDetailPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Attack types data
    const attackTypes = [
        {
            type: 'Port Scanning',
            description: 'Reconnaissance attacks probing network services',
            method: 'Temporal pattern analysis + protocol anomaly detection',
            icon: <Terminal size={20} />
        },
        {
            type: 'Brute Force',
            description: 'Credential attacks against authentication systems',
            method: 'Rate limiting anomalies + destination profiling',
            icon: <Zap size={20} />
        },
        {
            type: 'Data Exfiltration',
            description: 'Unauthorized data transfers',
            method: 'Volumetric anomaly detection + destination analysis',
            icon: <Database size={20} />
        },
        {
            type: 'Denial of Service',
            description: 'Resource exhaustion attacks',
            method: 'Statistical outlier detection + protocol analysis',
            icon: <AlertTriangle size={20} />
        }
    ];

    // AI technologies
    const aiTechnologies = [
        {
            name: 'Unsupervised Learning',
            description: 'Detects anomalies without requiring labeled training data',
            icon: <Brain size={20} />
        },
        {
            name: 'Semi-supervised Learning',
            description: 'Leverages known patterns to improve detection accuracy',
            icon: <Network size={20} />
        },
        {
            name: 'Ensemble Learning',
            description: 'Combines multiple ML models for higher accuracy and lower false positives',
            icon: <Globe size={20} />
        },
        {
            name: 'Feature Importance Analysis',
            description: 'Identifies which network characteristics contributed most to detection',
            icon: <LineChart size={20} />
        },
        {
            name: 'Neural-inspired Anomaly Scoring',
            description: 'Quantifies the severity of detected anomalies',
            icon: <Server size={20} />
        }
    ];

    // System features
    const features = [
        {
            name: 'Multi-model AI Detection Engine',
            description: 'Combines Isolation Forest, One-Class SVM, and DBSCAN algorithms in an ensemble approach for superior threat detection'
        },
        {
            name: 'Neural Feature Engineering',
            description: 'Automatically extracts and analyzes over 20 network flow characteristics using neural-inspired feature extraction'
        },
        {
            name: 'Zero-Day Threat Detection',
            description: 'Identifies previously unknown attack patterns through behavioral analysis and unsupervised learning'
        },
        {
            name: 'Explainable Security Intelligence',
            description: 'Provides human-readable insights into detection decisions, enabling rapid incident response'
        },
        {
            name: 'Real-time Cyber Threat Monitoring',
            description: 'Processes and analyzes network flows as they happen with millisecond response times'
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
                        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-red-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-900/30 rounded-full blur-3xl"></div>
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
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900/50 text-red-200">
                Cybersecurity
              </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/50 text-green-200">
                Machine Learning
              </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/50 text-purple-200">
                Explainable AI
              </span>
                        </div>

                        <div className="text-center">
                            <div className="inline-block p-2 bg-red-900/20 rounded-full mb-6">
                                <div className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full">
                                    <Shield size={64} className="text-red-400" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                                SentinelAI
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                                Advanced AI-Powered Network Intrusion Detection System
                            </p>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                                Leveraging multiple machine learning algorithms to identify malicious network activities in real-time with explainable AI and sophisticated anomaly detection.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://sentinelaiapp.streamlit.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-medium hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                                >
                                    Live Demo
                                </a>
                                <a
                                    href="https://github.com/ayaan-cis/sentinelai"
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
                            {['overview', 'features', 'attack-vectors', 'technology', 'dashboard'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-4 font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                                        activeTab === tab
                                            ? 'border-red-500 text-white'
                                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                                    }`}
                                >
                                    {tab === 'overview' && 'Overview'}
                                    {tab === 'features' && 'Key Features'}
                                    {tab === 'attack-vectors' && 'Attack Vectors'}
                                    {tab === 'technology' && 'AI Technology'}
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
                            <h2 className="text-3xl font-bold mb-6 text-white">Cybersecurity Intelligence, Amplified</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <p className="text-gray-300 text-lg mb-6">
                                        SentinelAI is a cutting-edge, AI-driven network intrusion detection system that leverages multiple machine learning algorithms to identify malicious network activities in real-time.
                                    </p>
                                    <p className="text-gray-300 text-lg mb-6">
                                        Using advanced anomaly detection techniques and explainable AI, SentinelAI not only detects potential threats but provides security analysts with clear, actionable insights into why activities were flagged.
                                    </p>
                                    <h3 className="text-xl font-semibold mb-4 text-white">Project Goals</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <span>Develop an AI-powered system capable of detecting both known and unknown network threats</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <span>Create explainable AI mechanisms that security professionals can understand and trust</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <span>Implement real-time monitoring capabilities with minimal false positives</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <span>Provide an intuitive dashboard for visualizing and investigating security events</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                                        <Terminal size={20} className="mr-2 text-red-400" />
                                        Technical Specifications
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Core Architecture</h4>
                                            <p className="text-gray-400">Python-based system with ensemble machine learning</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Models Implemented</h4>
                                            <p className="text-gray-400">Isolation Forest, One-Class SVM, DBSCAN</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Feature Engineering</h4>
                                            <p className="text-gray-400">20+ network flow characteristics analyzed</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Response Time</h4>
                                            <p className="text-gray-400">Millisecond-level detection and analysis</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Technology Stack</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">Python</span>
                                                <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs">Scikit-learn</span>
                                                <span className="px-2 py-1 bg-purple-900/30 text-purple-300 rounded text-xs">Pandas</span>
                                                <span className="px-2 py-1 bg-red-900/30 text-red-300 rounded text-xs">Streamlit</span>
                                                <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 rounded text-xs">NumPy</span>
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
                            <h2 className="text-3xl font-bold mb-8 text-white">Advanced Security Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5"
                                    >
                                        <h3 className="text-xl font-semibold mb-2 text-white">{feature.name}</h3>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Demo section */}
                            <div className="mt-16">
                                <h3 className="text-2xl font-bold mb-6 text-white">Interactive Security Dashboard</h3>
                                <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700">
                                    <div className="text-center">
                                        <p className="text-gray-300 mb-8">
                                            Experience the full capabilities of SentinelAI through our interactive demo dashboard.
                                            The demo includes synthetic network flow data that simulates both normal traffic and various attack patterns.
                                        </p>
                                        <a
                                            href="https://sentinelaiapp.streamlit.app/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-medium hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                                        >
                                            Launch Interactive Demo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Attack Vectors Tab */}
                    {activeTab === 'attack-vectors' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">Attack Vectors Detected</h2>
                            <p className="text-gray-300 text-lg mb-10">
                                SentinelAI's neural networks and machine learning algorithms are trained to detect sophisticated attack patterns including:
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="bg-gray-800/70">
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Attack Type</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Description</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Detection Method</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                    {attackTypes.map((attack, index) => (
                                        <tr key={index} className="hover:bg-gray-800/30 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="p-1 bg-red-900/20 rounded mr-3">
                                                        {attack.icon}
                                                    </div>
                                                    <span className="text-white font-medium">{attack.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{attack.description}</td>
                                            <td className="px-6 py-4 text-gray-300">{attack.method}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-semibold mb-4 text-white">Adaptive Learning System</h3>
                                <p className="text-gray-300">
                                    SentinelAI employs continuous adaptation to evolving threats. The system can be retrained with new data to improve detection capabilities over time, ensuring protection against emerging attack vectors and zero-day vulnerabilities.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* AI Technology Tab */}
                    {activeTab === 'technology' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">AI Technology Stack</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {aiTechnologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-red-500/30 transition-all duration-300"
                                    >
                                        <div className="p-2 bg-red-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                            {tech.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-white">{tech.name}</h3>
                                        <p className="text-gray-400">{tech.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white">Ensemble Learning Approach</h3>
                                    <p className="text-gray-300 mb-4">
                                        SentinelAI implements an ensemble approach combining three distinct anomaly detection algorithms:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Isolation Forest</span>
                                                <p className="text-gray-400 text-sm mt-1">Efficiently isolates anomalies by recursively partitioning the data space</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">One-Class SVM</span>
                                                <p className="text-gray-400 text-sm mt-1">Creates a boundary around normal behavior to identify outliers</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">DBSCAN</span>
                                                <p className="text-gray-400 text-sm mt-1">Identifies clusters of normal behavior and flags points that don't belong to any cluster</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white">Explainable AI Insights</h3>
                                    <p className="text-gray-300 mb-4">
                                        SentinelAI provides human-readable explanations for detected anomalies:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Feature Importance Analysis</span>
                                                <p className="text-gray-400 text-sm mt-1">Identifies which network characteristics contributed most to anomaly detection</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Comparative Visualization</span>
                                                <p className="text-gray-400 text-sm mt-1">Shows how anomalous flows differ from normal network behavior</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-red-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Natural Language Insights</span>
                                                <p className="text-gray-400 text-sm mt-1">Translates complex detection patterns into actionable security intelligence</p>
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
                            <h2 className="text-3xl font-bold mb-8 text-white">Interactive Security Dashboard</h2>

                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 border border-gray-700 mb-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 text-white">Real-time Monitoring & Analysis</h3>
                                        <p className="text-gray-300 mb-6">
                                            The SentinelAI dashboard provides security analysts with comprehensive visualizations and interactive tools to monitor network traffic and investigate potential threats in real-time.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="p-1 bg-red-900/20 rounded-full mr-3 mt-1">
                                                    <LineChart size={16} className="text-red-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Real-time threat visualization</h4>
                                                    <p className="text-gray-400 text-sm">Monitor network traffic and anomalies as they occur</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-1 bg-red-900/20 rounded-full mr-3 mt-1">
                                                    <Brain size={16} className="text-red-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Explainable AI insights</h4>
                                                    <p className="text-gray-400 text-sm">Understand why specific activities were flagged as suspicious</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-1 bg-red-900/20 rounded-full mr-3 mt-1">
                                                    <Database size={16} className="text-red-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Network flow forensics</h4>
                                                    <p className="text-gray-400 text-sm">Detailed analysis of individual network connections</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-red-500/30 transition-all duration-300">
                                        <div className="aspect-video rounded overflow-hidden relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <a
                                                    href="https://sentinelaiapp.streamlit.app/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-red-600 hover:bg-red-500 transition-colors duration-300 rounded flex items-center space-x-2"
                                                >
                                                    <Eye size={16} />
                                                    <span>View Live Demo</span>
                                                </a>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-gray-900/90"></div>
                                            <div className="h-full w-full flex items-center justify-center">
                                                <Shield size={64} className="text-red-500/30" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Model Performance Metrics</h3>
                                    <p className="text-gray-300 text-sm">
                                        Visualize detection accuracy, precision, recall, and F1 scores for each model and the ensemble approach.
                                    </p>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Anomaly Timeline</h3>
                                    <p className="text-gray-300 text-sm">
                                        View detected anomalies on an interactive timeline with filtering by severity, type, and time period.
                                    </p>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Real-time Simulation</h3>
                                    <p className="text-gray-300 text-sm">
                                        Simulate network traffic in real-time to observe how the system detects and classifies different types of traffic.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-t border-gray-800">
                    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Experience SentinelAI in Action</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Try our interactive demo to see how SentinelAI detects and explains network anomalies in real-time.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://sentinelaiapp.streamlit.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-medium hover:from-red-500 hover:to-orange-500 transition-all duration-300 shadow-lg"
                            >
                                Launch Demo
                            </a>
                            <a
                                href="https://github.com/ayaan-cis/sentinelai"
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

export default SentinelAIDetailPage;