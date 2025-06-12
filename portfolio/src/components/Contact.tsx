import React, { useState } from 'react';
import { Send, Mail, MapPin, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState<{
        success?: boolean;
        message?: string;
    }>({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setFormStatus({
                success: true,
                message: 'Thanks for your message! I\'ll get back to you soon.'
            });
            setIsSubmitting(false);

            // Clear form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Reset form status after 5 seconds
            setTimeout(() => {
                setFormStatus({});
            }, 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 bg-gray-800 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-900 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-900 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-3 animate-fade-in">Get In Touch</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
                        <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-indigo-900/50 rounded-lg mt-1">
                                <Mail size={24} className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-indigo-400">Email</h4>
                                <a
                                    href="mailto:therealyaan9876@gmail.com"
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    therealyaan9876@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-indigo-900/50 rounded-lg mt-1">
                                <MapPin size={24} className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-indigo-400">Location</h4>
                                <p className="text-gray-300">Austin, TX</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-indigo-900/50 rounded-lg mt-1">
                                <Linkedin size={24} className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-indigo-400">LinkedIn</h4>
                                <a
                                    href="http://www.linkedin.com/in/ayaan-syed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    linkedin.com/in/ayaan-syed
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-indigo-900/50 rounded-lg mt-1">
                                <Github size={24} className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-indigo-400">GitHub</h4>
                                <a
                                    href="https://github.com/ayaan-cs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors duration-300"
                                >
                                    github.com/ayaan-cs
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                                    placeholder="Your email"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white"
                                    placeholder="Subject"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white resize-none"
                                    placeholder="Your message"
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`
                                        w-full py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300
                                        ${isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transform hover:scale-102'}
                                    `}
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <Send size={18} className="mr-2" />
                                    )}
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>

                            {/* Form status message */}
                            {formStatus.message && (
                                <div className={`
                                    p-4 rounded-lg mt-4 text-center
                                    ${formStatus.success ? 'bg-green-900/60 text-green-300' : 'bg-red-900/60 text-red-300'}
                                `}>
                                    {formStatus.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;