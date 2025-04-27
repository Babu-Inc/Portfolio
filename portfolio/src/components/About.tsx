import React from 'react';
import { Book, Calendar, MapPin } from 'lucide-react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-gray-800 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-900 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-900 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-3 animate-fade-in">About Me</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"></div>

                <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
                        I'm a Computer Information Science student at St. Edwards University with a passion for technology and innovation.
                        My expertise spans software development, AI, and data science, allowing me to develop customized solutions for complex problems.
                    </p>

                    <p className="text-lg text-gray-300 mb-6 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
                        I'm skilled in collaborating with stakeholders and translating client needs into technical solutions using my programming expertise
                        in Python, Java, and AWS services. I have experience in AI-driven applications, cloud computing, and full-stack development.
                    </p>

                    <p className="text-lg text-gray-300 leading-relaxed animate-fade-in" style={{ animationDelay: '300ms' }}>
                        I speak and write in English and Urdu, and I am experienced in Hindi. When I'm not coding, I volunteer as an Animal Caretaker,
                        providing care for animals and ensuring their well-being.
                    </p>

                    <div className="mt-12 bg-gray-900/80 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"></div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-semibold text-white mb-6 relative inline-block">
                                Education
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                            </h3>
                            <div className="flex items-start">
                                <div className="mr-4 mt-1">
                                    <div className="p-2 bg-indigo-900/50 rounded-lg">
                                        <Book size={24} className="text-indigo-400" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-indigo-400">St. Edwards University</h4>
                                    <p className="text-gray-300">BA, Computer Information Science</p>
                                    <div className="flex items-center text-gray-400 mt-1">
                                        <Calendar size={16} className="mr-2" />
                                        <span>August 2022 - Current</span>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div>
                                            <h5 className="text-gray-200 font-medium">Relevant Coursework</h5>
                                            <p className="text-gray-400 mt-1">
                                                Concepts I & II, Algorithmic Problem Solving, Computation-Based Programming, Web Development,
                                                Computer Architecture, Data Structures, Intro to AI, Database Theory, Software Engineering
                                            </p>
                                        </div>
                                        <div>
                                            <h5 className="text-gray-200 font-medium">Honors & Awards</h5>
                                            <p className="text-gray-400 mt-1">President's Achievement Scholarship</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;