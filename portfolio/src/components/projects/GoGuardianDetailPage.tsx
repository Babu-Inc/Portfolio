import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Database, Server, Activity, BarChart, Terminal, AlertTriangle, Zap, Globe, Eye, Github, ArrowLeft, Network, Clock } from 'lucide-react';
import Header from '../Header.tsx';
import Footer from '../Footer.tsx';

const GoGuardianDetailPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Threat types detected by GoGuardian
    const threatTypes = [
        {
            type: 'SQL Injection',
            description: 'Malicious SQL commands inserted into API parameters',
            method: 'Pattern recognition + AI classification',
            icon: <Database size={20} />
        },
        {
            type: 'Rate Limiting Abuse',
            description: 'Abnormal request frequencies from single sources',
            method: 'Statistical analysis + distributed rate tracking',
            icon: <Clock size={20} />
        },
        {
            type: 'Authorization Bypass',
            description: 'Attempts to access unauthorized resources',
            method: 'Token validation + permission analysis',
            icon: <Lock size={20} />
        },
        {
            type: 'Data Exfiltration',
            description: 'Unusually large outbound data transfers',
            method: 'Response size monitoring + anomaly detection',
            icon: <AlertTriangle size={20} />
        }
    ];

    // Technologies used
    const technologies = [
        {
            name: 'Concurrent Processing',
            description: 'Leverages Golang\'s goroutines and channels for high-performance parallel processing',
            icon: <Zap size={20} />
        },
        {
            name: 'Real-time Analytics',
            description: 'Streaming analytics pipeline for immediate threat detection and response',
            icon: <Activity size={20} />
        },
        {
            name: 'In-memory Caching',
            description: 'Redis-backed caching for fast lookup of threat signatures and rate limits',
            icon: <Database size={20} />
        },
        {
            name: 'WebSocket Alerts',
            description: 'Real-time notifications and dashboard updates via WebSockets',
            icon: <Globe size={20} />
        },
        {
            name: 'Docker Containerization',
            description: 'Containerized deployment for easy scaling and distribution',
            icon: <Server size={20} />
        }
    ];

    // Key features
    const features = [
        {
            name: 'High-Performance Proxy Architecture',
            description: 'Golang-powered reverse proxy with minimal latency overhead, capable of handling thousands of requests per second'
        },
        {
            name: 'Real-time Threat Detection Engine',
            description: 'Pattern matching and heuristic analysis to identify common API attack vectors like SQL injection, XSS, and CSRF attempts'
        },
        {
            name: 'Distributed Rate Limiting',
            description: 'Redis-backed rate limiting system to prevent brute force and DDoS attacks across multiple server instances'
        },
        {
            name: 'Analytics Dashboard',
            description: 'Real-time visualization of API traffic patterns, threat detections, and system performance metrics'
        },
        {
            name: 'Automated Response Workflows',
            description: 'Configurable response actions including IP blocking, CAPTCHA challenges, and security team alerts'
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
                        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-teal-900/20 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-900/30 rounded-full blur-3xl"></div>
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
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-900/50 text-teal-200">
                                Golang
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900/50 text-red-200">
                                Cybersecurity
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-blue-200">
                                API Protection
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/50 text-purple-200">
                                Real-time Analytics
                            </span>
                        </div>

                        <div className="text-center">
                            <div className="inline-block p-2 bg-teal-900/20 rounded-full mb-6">
                                <div className="p-4 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full">
                                    <Shield size={64} className="text-teal-400" />
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
                                GoGuardian
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                                High-Performance API Security Monitoring System
                            </p>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                                Leveraging Golang's powerful concurrency model to detect and mitigate API threats in real-time with minimal performance impact.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://github.com/ayaan-cis/goguardian"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg font-medium hover:from-teal-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-teal-500/20"
                                >
                                    View Demo
                                </a>
                                <a
                                    href="https://github.com/ayaan-cis/goguardian"
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
                            {['overview', 'features', 'threats', 'technology', 'architecture'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-4 font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                                        activeTab === tab
                                            ? 'border-teal-500 text-white'
                                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                                    }`}
                                >
                                    {tab === 'overview' && 'Overview'}
                                    {tab === 'features' && 'Key Features'}
                                    {tab === 'threats' && 'Threat Detection'}
                                    {tab === 'technology' && 'Technology'}
                                    {tab === 'architecture' && 'Architecture'}
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
                            <h2 className="text-3xl font-bold mb-6 text-white">API Security, Accelerated</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                    <p className="text-gray-300 text-lg mb-6">
                                        GoGuardian is a high-performance API security monitoring system built with Golang, designed to protect web services from common attack vectors while maintaining extremely low latency.
                                    </p>
                                    <p className="text-gray-300 text-lg mb-6">
                                        Leveraging Golang's powerful concurrency model through goroutines and channels, GoGuardian can process thousands of API requests per second, analyzing each for potential security threats without impacting application performance.
                                    </p>
                                    <h3 className="text-xl font-semibold mb-4 text-white">Project Goals</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <span>Create a high-performance API security layer with minimal latency overhead</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <span>Implement real-time threat detection for common API attack vectors</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <span>Demonstrate Golang's capabilities for concurrent processing and network applications</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <span>Provide actionable security insights and automated response capabilities</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
                                        <Terminal size={20} className="mr-2 text-teal-400" />
                                        Technical Specifications
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Core Architecture</h4>
                                            <p className="text-gray-400">Golang-based reverse proxy with concurrent processing</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Performance</h4>
                                            <p className="text-gray-400">Processes 5,000+ requests/second with &lt;5ms added latency</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Threat Detection</h4>
                                            <p className="text-gray-400">Pattern matching, rate analysis, and anomaly detection</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Deployment</h4>
                                            <p className="text-gray-400">Docker-containerized with Redis dependency</p>
                                        </div>
                                        <div>
                                            <h4 className="text-gray-300 font-medium">Technology Stack</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">Golang</span>
                                                <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">Docker</span>
                                                <span className="px-2 py-1 bg-red-900/30 text-red-300 rounded text-xs">Redis</span>
                                                <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 rounded text-xs">WebSockets</span>
                                                <span className="px-2 py-1 bg-green-900/30 text-green-300 rounded text-xs">Prometheus</span>
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
                                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5"
                                    >
                                        <h3 className="text-xl font-semibold mb-2 text-white">{feature.name}</h3>
                                        <p className="text-gray-400">{feature.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Code sample section */}
                            <div className="mt-16">
                                <h3 className="text-2xl font-bold mb-6 text-white">Golang Implementation Example</h3>
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <pre className="text-sm text-gray-300 overflow-x-auto">
                                        <code>
{`package main

import (
    "context"
    "fmt"
    "log"
    "net/http"
    "net/http/httputil"
    "net/url"
    "sync"
    "time"

    "github.com/go-redis/redis/v8"
    "github.com/gorilla/mux"
)

// Simplified threat detection function
func detectThreats(req *http.Request) (bool, string) {
    // SQL Injection check (simplified example)
    if containsSQLInjection(req.URL.Query().Encode()) {
        return true, "SQL Injection attempt detected"
    }
    
    // Rate limiting check would go here
    
    return false, ""
}

func main() {
    // Create a Redis client for distributed rate limiting
    rdb := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
    })
    
    // Target API to protect
    targetURL, _ := url.Parse("http://api.example.com")
    proxy := httputil.NewSingleHostReverseProxy(targetURL)
    
    // Create a router
    router := mux.NewRouter()
    
    // Create a WaitGroup for concurrent processing
    var wg sync.WaitGroup
    
    // Security middleware
    router.Use(func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // Process security checks concurrently
            threatChan := make(chan struct {
                detected bool
                message  string
            })
            
            wg.Add(1)
            go func() {
                defer wg.Done()
                detected, message := detectThreats(r)
                threatChan <- struct {
                    detected bool
                    message  string
                }{detected, message}
            }()
            
            // Get threat detection result
            result := <-threatChan
            
            if result.detected {
                // Log the threat
                log.Printf("Threat detected: %s", result.message)
                
                // Update Redis with threat info
                ctx := context.Background()
                rdb.Incr(ctx, fmt.Sprintf("threat:%s:count", r.RemoteAddr))
                
                // Respond with 403 Forbidden
                w.WriteHeader(http.StatusForbidden)
                w.Write([]byte("Access denied due to security policy"))
                return
            }
            
            // No threat detected, proxy the request
            next.ServeHTTP(w, r)
        })
    })
    
    // Handle all paths
    router.PathPrefix("/").Handler(proxy)
    
    // Start the server
    server := &http.Server{
        Addr:         ":8080",
        Handler:      router,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
    }
    
    log.Println("GoGuardian starting on :8080")
    log.Fatal(server.ListenAndServe())
}`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Threats Tab */}
                    {activeTab === 'threats' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">Advanced Threat Detection</h2>
                            <p className="text-gray-300 text-lg mb-10">
                                GoGuardian is designed to identify and mitigate a wide range of API security threats in real-time:
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="bg-gray-800/70">
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Threat Type</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Description</th>
                                        <th className="px-6 py-4 text-left text-white font-semibold border-b border-gray-700">Detection Method</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                    {threatTypes.map((threat, index) => (
                                        <tr key={index} className="hover:bg-gray-800/30 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="p-1 bg-teal-900/20 rounded mr-3">
                                                        {threat.icon}
                                                    </div>
                                                    <span className="text-white font-medium">{threat.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{threat.description}</td>
                                            <td className="px-6 py-4 text-gray-300">{threat.method}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-semibold mb-4 text-white">Golang-powered Pattern Recognition</h3>
                                <p className="text-gray-300">
                                    GoGuardian leverages Golang's powerful string manipulation and regular expression capabilities to efficiently identify malicious patterns in API requests. The system's concurrent processing architecture enables it to check each request against hundreds of threat signatures with minimal latency impact.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Technology Tab */}
                    {activeTab === 'technology' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">Technology Stack</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {technologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-teal-500/30 transition-all duration-300"
                                    >
                                        <div className="p-2 bg-teal-900/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                            {tech.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-white">{tech.name}</h3>
                                        <p className="text-gray-400">{tech.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white">Why Golang?</h3>
                                    <p className="text-gray-300 mb-4">
                                        GoGuardian leverages Golang's unique advantages for security applications:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Concurrent Processing</span>
                                                <p className="text-gray-400 text-sm mt-1">Goroutines enable efficient parallel security checks with minimal overhead</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Low Latency</span>
                                                <p className="text-gray-400 text-sm mt-1">Fast compilation to machine code enables sub-millisecond processing</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Memory Safety</span>
                                                <p className="text-gray-400 text-sm mt-1">Built-in memory management reduces vulnerabilities in security code</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-xl font-semibold mb-4 text-white">Redis Integration</h3>
                                    <p className="text-gray-300 mb-4">
                                        GoGuardian utilizes Redis for distributed security functions:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Distributed Rate Limiting</span>
                                                <p className="text-gray-400 text-sm mt-1">Tracks request frequencies across multiple service instances</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">Threat Intelligence Sharing</span>
                                                <p className="text-gray-400 text-sm mt-1">Enables real-time sharing of detected threats across the system</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 mt-1 text-teal-400">•</span>
                                            <div>
                                                <span className="text-white font-medium">IP Reputation Database</span>
                                                <p className="text-gray-400 text-sm mt-1">Maintains dynamic scoring of client IP addresses based on behavior</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Architecture Tab */}
                    {activeTab === 'architecture' && (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold mb-8 text-white">System Architecture</h2>

                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 border border-gray-700 mb-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 text-white">Concurrent Processing Design</h3>
                                        <p className="text-gray-300 mb-6">
                                            GoGuardian implements a sophisticated multi-layered architecture that leverages Golang's concurrency model to perform parallel security checks without impacting API response times.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="p-1 bg-teal-900/20 rounded-full mr-3 mt-1">
                                                    <Network size={16} className="text-teal-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Reverse Proxy Layer</h4>
                                                    <p className="text-gray-400 text-sm">Intercepts and forwards API requests while maintaining connection pools</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-1 bg-teal-900/20 rounded-full mr-3 mt-1">
                                                    <Zap size={16} className="text-teal-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Concurrent Analysis Engine</h4>
                                                    <p className="text-gray-400 text-sm">Distributes security checks across multiple goroutines for parallel processing</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="p-1 bg-teal-900/20 rounded-full mr-3 mt-1">
                                                    <Database size={16} className="text-teal-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Distributed Data Layer</h4>
                                                    <p className="text-gray-400 text-sm">Redis-based storage for sharing security state across instances</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                                        <div className="aspect-video rounded overflow-hidden relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <a
                                                    href="https://github.com/ayaan-cis/goguardian"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 transition-colors duration-300 rounded flex items-center space-x-2"
                                                >
                                                    <Eye size={16} />
                                                    <span>View Architecture Diagram</span>
                                                </a>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-gray-900/90"></div>
                                            <div className="h-full w-full flex items-center justify-center">
                                                <Network size={64} className="text-teal-500/30" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Horizontal Scaling</h3>
                                    <p className="text-gray-300 text-sm">
                                        Docker containerization allows for easy deployment and scaling across multiple nodes with shared Redis state.
                                    </p>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Plugin System</h3>
                                    <p className="text-gray-300 text-sm">
                                        Modular architecture allows for custom security checks to be added without modifying the core codebase.
                                    </p>
                                </div>
                                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold mb-3 text-white">Performance Metrics</h3>
                                    <p className="text-gray-300 text-sm">
                                        Prometheus integration provides detailed metrics on request processing times, threat detection rates, and system health.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-t border-gray-800">
                    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Explore GoGuardian</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Check out the source code to see how Golang's concurrency model is leveraged to create a high-performance API security system.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://github.com/ayaan-cis/goguardian"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg font-medium hover:from-teal-500 hover:to-emerald-500 transition-all duration-300 shadow-lg"
                            >
                                View Source Code
                            </a>
                            <a
                                href="https://github.com/ayaan-cis/goguardian#getting-started"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-all duration-300"
                            >
                                Getting Started Guide
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default GoGuardianDetailPage;