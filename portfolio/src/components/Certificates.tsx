import React, { useState } from 'react';
import { Award, Calendar, ExternalLink, CheckCircle, Book, Code, Database, Shield, Brain, Globe, BarChart } from 'lucide-react';

interface Certificate {
    id: string;
    title: string;
    organization: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
    verificationUrl?: string;
    category: string;
    description: string;
    skills: string[];
    icon: React.ReactNode;
    color: string;
    logo?: string; // URL to organization logo
}

const Certificates: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [hoveredCert, setHoveredCert] = useState<string | null>(null);

    // Your actual certificates from LinkedIn Learning and other platforms
    const certificates: Certificate[] = [
        {
            id: 'generative-ai-essentials',
            title: 'Career Essentials in Generative AI',
            organization: 'Microsoft and LinkedIn',
            issueDate: '2025-05-09',
            credentialId: '64ef2fc8bcbaa4b642a0547c9745712d9a47fbe6e7f4c29979f357546d81e144',
            verificationUrl: 'https://www.linkedin.com/learning/certificates/64ef2fc8bcbaa4b642a0547c9745712d9a47fbe6e7f4c29979f357546d81e144?u=35179268',
            category: 'Artificial Intelligence',
            description: 'Comprehensive program covering generative AI fundamentals, Microsoft Copilot, and responsible AI practices for business applications.',
            skills: ['Generative AI', 'Microsoft Copilot', 'Artificial Intelligence for Business', 'Responsible AI'],
            icon: <Brain size={24} />,
            color: 'from-blue-300 to-purple-700'
        },
        {
            id: 'microsoft-azure',
            title: 'Microsoft Azure AI Essentials Professional Certificate',
            organization: 'Microsoft and LinkedIn',
            issueDate: '2025-05-21',
            credentialId: '99a0ebd757994fc4f83a36307f4dcd645472bf25df0b7b891c70c413a02860c1',
            verificationUrl: 'https://www.linkedin.com/learning/certificates/99a0ebd757994fc4f83a36307f4dcd645472bf25df0b7b891c70c413a02860c1?u=35179268',
            category: 'Artificial Intelligence',
            description: 'Comprehensive program covering generative AI fundamentals, Microsoft Copilot, and responsible AI practices for business applications.',
            skills: ['Generative AI', 'Microsoft Copilot', 'Artificial Intelligence for Business', 'Responsible AI'],
            icon: <Brain size={24} />,
            color: 'from-blue-800 to-blue-400'
        },
        {
            id: 'github-professional',
            title: 'Career Essentials in GitHub Professional Certificate',
            organization: 'GitHub',
            issueDate: '2025-05-08',
            credentialId: 'e4a5f1f8cdb71baa96d0b898a087653fac85040a2c270322c0c7511f9ae58eae',
            verificationUrl: 'https://www.linkedin.com/learning/certificates/e4a5f1f8cdb71baa96d0b898a087653fac85040a2c270322c0c7511f9ae58eae?u=35179268',
            category: 'Software Development',
            description: 'Professional-level GitHub skills including version control, collaboration, and project management using Git and GitHub.',
            skills: ['GitHub', 'Git Version Control', 'Collaborative Development', 'Project Management'],
            icon: <Code size={24} />,
            color: 'from-gray-700 to-gray-900'
        },
        {
            id: 'data-science-knime',
            title: 'Data Science Professional Certificate',
            organization: 'KNIME',
            issueDate: '2025-05-14',
            credentialId: 'afdf6ff61761b9cd448747aac3905d54dad8e41a4134e604848b95dc18489271',
            verificationUrl: 'https://www.linkedin.com/learning/certificates/afdf6ff61761b9cd448747aac3905d54dad8e41a4134e604848b95dc18489271?u=35179268',
            category: 'Data Science',
            description: 'Advanced data science certification covering machine learning, artificial intelligence, and comprehensive data analysis workflows.',
            skills: ['Artificial Intelligence (AI)', 'Artificial Intelligence for Business', 'Data Science', 'KNIME Analytics Platform'],
            icon: <Database size={24} />,
            color: 'from-yellow-500 to-orange-500'
        },
        {
            id: 'statistics-foundations-wolfram',
            title: 'Statistics Foundations Professional Certificate',
            organization: 'Wolfram Research',
            issueDate: '2025-05-20',
            credentialId: 'af7d1e0b7ae5ddefc3a21f28c2c37663d8346cc74b466dfb5641b5470198b7e9',
            verificationUrl: 'https://www.linkedin.com/learning/certificates/af7d1e0b7ae5ddefc3a21f28c2c37663d8346cc74b466dfb5641b5470198b7e9?u=35179268',
            category: 'Data Science',
            description: 'Comprehensive statistics foundation covering statistical data analysis, Wolfram Language programming, and probability theory.',
            skills: ['Statistical Data Analysis', 'Wolfram Language', 'Statistics', 'Probability Theory'],
            icon: <BarChart size={24} />,
            color: 'from-red-500 to-pink-500'
        }
    ];

    // Extract unique categories
    const categories = ['all', ...Array.from(new Set(certificates.map(cert => cert.category))).sort()];

    // Filter certificates based on active category
    const filteredCertificates = certificates.filter(cert =>
        activeCategory === 'all' || cert.category === activeCategory
    );

    // Format date for display
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    };

    // Check if certificate is still valid
    const isValidCertificate = (cert: Certificate) => {
        if (!cert.expiryDate) return true;
        return new Date(cert.expiryDate) > new Date();
    };

    return (
        <section id="certificates" className="py-20 px-6 bg-gray-800 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 text-9xl">🏆</div>
                <div className="absolute bottom-10 right-10 text-9xl">📜</div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-600 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="animate-fade-in">
                    <h2 className="text-3xl font-bold text-center text-white mb-3">Certifications & Achievements</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
                        Professional certifications and courses completed to enhance skills and stay current with industry trends.
                    </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center mb-10 gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                px-4 py-2 rounded-full transition-all duration-300 transform
                                ${activeCategory === category
                                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white scale-105 shadow-lg'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'}
                            `}
                        >
                            {category === 'all' ? 'All Certificates' : category}
                        </button>
                    ))}
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredCertificates.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in group relative"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Certificate Header */}
                            <div className={`h-32 bg-gradient-to-r ${cert.color} flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-2 left-2 text-4xl opacity-30">🎓</div>
                                    <div className="absolute bottom-2 right-2 text-3xl opacity-30">✓</div>
                                </div>

                                <div className="relative transform transition-transform duration-500 group-hover:scale-110">
                                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                        {cert.icon}
                                    </div>
                                </div>

                                {/* Validity indicator */}
                                <div className="absolute top-3 right-3">
                                    {isValidCertificate(cert) ? (
                                        <div className="p-1 bg-green-500 rounded-full" title="Valid">
                                            <CheckCircle size={16} className="text-white" />
                                        </div>
                                    ) : (
                                        <div className="p-1 bg-red-500 rounded-full" title="Expired">
                                            <Award size={16} className="text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Certificate Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                                    {cert.title}
                                </h3>

                                <p className="text-orange-300 text-sm font-medium mb-2">
                                    {cert.organization}
                                </p>

                                <div className="flex items-center text-gray-400 text-sm mb-3">
                                    <Calendar size={14} className="mr-2" />
                                    <span>Earned: {formatDate(cert.issueDate)}</span>
                                    {cert.expiryDate && (
                                        <span className="ml-2">
                                            | Expires: {formatDate(cert.expiryDate)}
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                    {cert.description}
                                </p>

                                {/* Skills Tags */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {cert.skills.slice(0, 3).map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {cert.skills.length > 3 && (
                                        <span className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded">
                                            +{cert.skills.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between items-center">
                                    {cert.verificationUrl ? (
                                        <a
                                            href={cert.verificationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors duration-300"
                                        >
                                            <ExternalLink size={14} className="mr-1" />
                                            Verify
                                        </a>
                                    ) : (
                                        <span className="text-gray-500 text-sm">No verification link</span>
                                    )}

                                    {cert.credentialId && (
                                        <span className="text-gray-500 text-xs">
                                            ID: {cert.credentialId.slice(-6)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Expandable skills section - only show if more than 3 skills */}
                            {cert.skills.length > 3 && (
                                <div className="border-t border-gray-800 mt-4 pt-4">
                                    <div
                                        className="cursor-pointer flex justify-between items-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setHoveredCert(hoveredCert === cert.id ? null : cert.id);
                                        }}
                                    >
                                        <span className="text-gray-400 text-sm">
                                            {hoveredCert === cert.id ? 'Hide all skills' : `View all ${cert.skills.length} skills`}
                                        </span>
                                        <span className={`text-gray-400 transition-transform duration-200 ${hoveredCert === cert.id ? 'rotate-180' : ''}`}>
                                            ▼
                                        </span>
                                    </div>

                                    {hoveredCert === cert.id && (
                                        <div className="mt-3 animate-fade-in">
                                            <div className="flex flex-wrap gap-2">
                                                {cert.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="text-xs font-medium px-3 py-1 bg-yellow-600/20 text-yellow-300 rounded-full border border-yellow-600/30"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Summary Stats */}
                <div className="mt-16 bg-gray-900/60 rounded-xl p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-2xl font-bold text-yellow-400">{certificates.length}</div>
                            <div className="text-gray-300">Total Certificates</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-400">
                                {certificates.filter(isValidCertificate).length}
                            </div>
                            <div className="text-gray-300">Currently Valid</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-400">{categories.length - 1}</div>
                            <div className="text-gray-300">Categories</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-400">
                                {Array.from(new Set(certificates.flatMap(cert => cert.skills))).length}
                            </div>
                            <div className="text-gray-300">Skills Covered</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certificates;