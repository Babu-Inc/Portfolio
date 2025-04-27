import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

// Sample work details data
const worksData = {
    'fiji-water-monitoring': {
        title: 'Fiji Water Discoloration Monitoring',
        year: 2024,
        category: 'Data Science, Environmental Monitoring',
        description: 'Cloud-Based Computing Script that leverages Sentinel-2 satellite imagery and Google Earth Engine to monitor water discoloration in Fiji.',
        content: `
      <h2>Project Overview</h2>
      <p>This project developed a data science solution using Google Earth Engine to monitor water quality in Fiji, focusing on detecting pollution and analyzing seasonal trends. The solution helps environmental agencies track changes in water quality over time.</p>
      
      <h2>Technology Stack</h2>
      <p>The project leveraged Google Earth Engine's cloud computing capabilities alongside Python and JavaScript for data processing and analysis. ArcGIS Pro was used for advanced geospatial visualization and analysis.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Automated detection of water discoloration using satellite imagery</li>
        <li>Temporal analysis of water quality changes</li>
        <li>Integration with environmental monitoring systems</li>
        <li>Interactive visualization of affected areas</li>
      </ul>
      
      <h2>Results & Impact</h2>
      <p>The monitoring system successfully identified several previously undetected areas of water pollution, enabling more targeted conservation efforts and better resource allocation by environmental agencies.</p>
    `,
        mainImage: '/fiji-water.jpg',
        images: [
            '/fiji-water.jpg',
            '/fiji-map.jpg',
            '/water-analysis.jpg'
        ],
        skills: ['Python', 'JavaScript', 'Google Earth Engine', 'ArcGIS Pro', 'Remote Sensing']
    },
    'esports-ai-assistant': {
        title: 'Esports Manager AI Assistant',
        year: 2023,
        category: 'Artificial Intelligence, NLP',
        description: 'LLM-powered digital assistant with a chat interface to make an esports team and answer queries about the players, using RAG workflow.',
        content: `
      <h2>Project Overview</h2>
      <p>This AI assistant helps esports team managers make informed decisions about player selection, team composition, and strategy development. The system uses a RAG (Retrieval Augmented Generation) workflow to provide accurate and contextual information about players and teams.</p>
      
      <h2>Technology Stack</h2>
      <p>The assistant is built using AWS services for infrastructure, Python for backend logic, LangChain for the RAG workflow, StreamLit for the user interface, and Claude v2 as the foundation language model.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Natural language interface for querying player statistics and performance metrics</li>
        <li>Team composition recommendations based on player synergies</li>
        <li>Strategy suggestions for specific game scenarios</li>
        <li>Performance analytics and visualization</li>
      </ul>
      
      <h2>Results & Impact</h2>
      <p>The AI assistant has significantly reduced the time team managers spend researching players and strategizing, allowing them to focus more on player development and team cohesion. Several professional esports organizations have expressed interest in adopting the tool.</p>
    `,
        mainImage: '/esports-ai.jpg',
        images: [
            '/esports-ai.jpg',
            '/team-analysis.jpg',
            '/player-stats.jpg'
        ],
        skills: ['AWS', 'Python', 'LangChain', 'StreamLit', 'Claude v2', 'RAG', 'NLP']
    },
    'peerscribe': {
        title: 'PeerScribe',
        year: 2023,
        category: 'Web Development, Education',
        description: 'Subscription-based platform providing tutoring services, curated study notes, and tutor-checked notes.',
        content: `
      <h2>Project Overview</h2>
      <p>PeerScribe is an educational platform that connects students with tutors and provides access to high-quality study materials. The platform aims to make education more accessible and effective through personalized support and curated content.</p>
      
      <h2>Technology Stack</h2>
      <p>The platform is built using React for the frontend, JavaScript for application logic, Firebase for backend services and authentication, and Bootstrap and CSS for styling and responsive design.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Subscription-based access to peer-reviewed study materials</li>
        <li>Direct tutoring sessions with subject matter experts</li>
        <li>Note verification service for student-created study materials</li>
        <li>Collaborative study groups and discussion forums</li>
      </ul>
      
      <h2>Results & Impact</h2>
      <p>PeerScribe has helped hundreds of students improve their academic performance through better study resources and personalized tutoring. The platform continues to grow its user base and expand its subject coverage.</p>
    `,
        mainImage: '/peerscribe.jpg',
        images: [
            '/peerscribe.jpg',
            '/tutor-interface.jpg',
            '/notes-library.jpg'
        ],
        skills: ['React', 'JavaScript', 'Firebase', 'Bootstrap', 'CSS', 'User Experience Design']
    },
    'data-visualization-dashboard': {
        title: 'Interactive Data Visualization Dashboard',
        year: 2022,
        category: 'Data Visualization, Environmental Monitoring',
        description: 'Real-time data visualization platform for environmental data with interactive charts and mapping features.',
        content: `
      <h2>Project Overview</h2>
      <p>This interactive dashboard provides researchers and environmental agencies with powerful visualization tools for analyzing complex environmental datasets. The platform supports real-time data integration and custom visualization creation.</p>
      
      <h2>Technology Stack</h2>
      <p>The dashboard is built with D3.js for advanced visualizations, React for the user interface, TypeScript for type-safe code, Python for backend processing, and Flask for API endpoints.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Real-time data streaming and visualization</li>
        <li>Interactive maps with geospatial data layers</li>
        <li>Customizable charts and graphs for data analysis</li>
        <li>Data export and sharing capabilities</li>
      </ul>
      
      <h2>Results & Impact</h2>
      <p>The dashboard has become an essential tool for environmental researchers, enabling them to identify patterns and trends that would be difficult to detect through traditional analysis methods. Several research papers have cited insights gained through the platform.</p>
    `,
        mainImage: '/data-dashboard.jpg',
        images: [
            '/data-dashboard.jpg',
            '/interactive-map.jpg',
            '/data-charts.jpg'
        ],
        skills: ['D3.js', 'React', 'TypeScript', 'Python', 'Flask', 'Data Visualization']
    },
    'predictive-climate-model': {
        title: 'Predictive Climate Model',
        year: 2022,
        category: 'Machine Learning, Climate Science',
        description: 'Machine learning model for predicting climate patterns and extreme weather events using historical data.',
        content: `
      <h2>Project Overview</h2>
      <p>This predictive model uses machine learning algorithms to analyze historical climate data and forecast future climate patterns, with a particular focus on predicting extreme weather events. The model helps communities and organizations prepare for and mitigate the impacts of climate change.</p>
      
      <h2>Technology Stack</h2>
      <p>The model is developed using Python as the primary programming language, with TensorFlow for deep learning components, Scikit-learn for machine learning algorithms, and Pandas and NumPy for data manipulation and numerical computing.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Long-term climate pattern predictions</li>
        <li>Extreme weather event forecasting</li>
        <li>Regional climate impact assessment</li>
        <li>Scenario-based climate projections</li>
      </ul>
      
      <h2>Results & Impact</h2>
      <p>The model has successfully predicted several major weather events with high accuracy, providing valuable lead time for emergency preparations. Local governments and disaster response agencies have incorporated the model's projections into their planning processes.</p>
    `,
        mainImage: '/climate-model.jpg',
        images: [
            '/climate-model.jpg',
            '/prediction-accuracy.jpg',
            '/extreme-weather-forecast.jpg'
        ],
        skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'Machine Learning']
    }
};

// Social media data
const socialLinks = [
    {
        platform: 'facebook',
        url: 'https://facebook.com',
    },
    {
        platform: 'instagram',
        url: 'https://instagram.com',
    },
    {
        platform: 'twitter',
        url: 'https://twitter.com',
    },
    {
        platform: 'linkedin',
        url: 'http://www.linkedin.com/in/ayaan-syed',
    },
];

const WorkDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Find the work data based on slug
    const work = slug ? worksData[slug as keyof typeof worksData] : null;

    if (!work) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header
                    activeSection="projects"
                    isScrolling={true}
                    isMenuOpen={false}
                    setIsMenuOpen={() => {}}
                    scrollToSection={() => {}}
                    isDarkMode={true}
                    toggleDarkMode={() => {}}
                />

                <main className="flex-grow px-6 md:px-16 py-10 md:py-20 bg-gray-900">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-200 mb-4">Project Not Found</h1>
                        <p className="mb-8 text-gray-400">The project you're looking for doesn't exist.</p>
                        <Link
                            to="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition duration-300"
                        >
                            Back to Home
                        </Link>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

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

            <main className="flex-grow px-6 md:px-16 py-10 md:py-20">
                <article className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        {work.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-blue-900 text-white text-sm font-medium px-4 py-1 rounded-full">
              {work.year}
            </span>
                        <span className="text-gray-400">{work.category}</span>
                    </div>

                    <p className="text-gray-300 mb-12 text-lg">
                        {work.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {work.skills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-gray-800 text-gray-200 text-xs font-semibold px-3 py-1.5 rounded"
                            >
                {skill}
              </span>
                        ))}
                    </div>

                    {/* Project Content */}
                    <div
                        className="prose prose-lg prose-invert max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: work.content }}
                    ></div>

                    {/* Back to projects button */}
                    <div className="mt-16">
                        <Link
                            to="/"
                            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2"
                            >
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Back to All Projects
                        </Link>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default WorkDetailPage;