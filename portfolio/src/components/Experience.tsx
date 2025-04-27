import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
    const [activeCard, setActiveCard] = useState<string | null>(null);

    const experiences = [
        {
            id: 'ai-lead',
            title: 'AI Research Lead',
            company: 'Klein Sports Performance, LLC',
            type: 'Internship',
            period: 'Sep 2024 - Current',
            location: 'Austin, TX',
            description: 'Lead researcher for the AI component of a fitness app, responsible for developing machine learning algorithms to learn 100+ workouts, personalize workouts, and analyze user performance. Collaborated with data science/development teams to feed our ChatBot information across 20+ studies, optimizing feedback and enhancing user fitness outcomes through tailored insights.'
        },
        {
            id: 'data-scientist',
            title: 'Data Scientist',
            company: 'USDA',
            type: 'Internship',
            period: 'Jun 2024 - Aug 2024',
            location: 'Austin, TX',
            description: 'My role comprised two main projects. I developed a data science solution using Google Earth Engine to monitor water quality in Fiji, applying different indices for detecting pollution and analyzing seasonal trends. The other involved Land Use Land Cover (LULC) for Fiji. My job was to photo-interpret sample plots of land, write R scripts for the interpretations\' accuracy, and compile my data for the 2021-2022 reporting period.'
        }
    ];

    return (
        <section id="experience" className="py-20 bg-gray-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-800 to-gray-900"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-800 to-gray-900"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="animate-fade-in">
                    <h2 className="text-3xl font-bold text-center text-white mb-3">Work Experience</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"></div>
                </div>

                <div className="max-w-3xl mx-auto space-y-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`
                bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform
                ${activeCard === exp.id ? 'scale-105 shadow-xl' : 'hover:shadow-xl hover:-translate-y-1'}
                animate-fade-in
              `}
                            style={{ animationDelay: `${index * 200}ms` }}
                            onMouseEnter={() => setActiveCard(exp.id)}
                            onMouseLeave={() => setActiveCard(null)}
                        >
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h3 className={`
                      text-xl font-semibold mb-1 transition-colors duration-300
                      ${activeCard === exp.id ? 'text-indigo-400' : 'text-white'}
                    `}>
                                            {exp.title}
                                        </h3>
                                        <p className="text-purple-300">{exp.company}</p>
                                        <p className="text-gray-400 italic">{exp.type}</p>
                                    </div>
                                    <div className="mt-2 md:mt-0 md:text-right">
                                        <p className="text-gray-400 flex items-center md:justify-end">
                                            <Calendar size={16} className="mr-2" />
                                            {exp.period}
                                        </p>
                                        <p className="text-gray-400 flex items-center md:justify-end mt-1">
                                            <MapPin size={16} className="mr-2" />
                                            {exp.location}
                                        </p>
                                    </div>
                                </div>

                                <div className={`
                  h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 transition-all duration-500
                  ${activeCard === exp.id ? 'opacity-100' : 'opacity-50'}
                `}></div>

                                <p className="text-gray-300 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>

                            {/* Animated background accent */}
                            <div className={`
                absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500
                ${activeCard === exp.id ? 'w-full' : 'w-0'}
              `}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;