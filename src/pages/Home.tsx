import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileCheck, Cloud, Anchor, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { FloatingParticles } from '../components/HyperAnimations';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-3">
              <Anchor className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-pulse">
            Maritime Assistant
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered document processing for the maritime industry. 
            Extract, analyze, and optimize your maritime operations with cutting-edge technology.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Secure Processing</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Globe className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Global Weather Data</span>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* SoF Extraction Card */}
          <Link to="/sof-extraction" className="group">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl w-fit mb-6 group-hover:rotate-12 transition-transform duration-500">
                <FileText className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                SoF Extraction
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Extract events, timestamps, and critical data from Statement of Facts documents using advanced OCR and AI technology.
              </p>
              
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Process Documents</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">OCR</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">AI Analysis</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">JSON/CSV Export</span>
              </div>
            </div>
          </Link>
          
          {/* Charter Party Card */}
          <Link to="/charter-party" className="group">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-xl w-fit mb-6 group-hover:rotate-12 transition-transform duration-500">
                <FileCheck className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                Charter Party Generator
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Generate comprehensive charter party documents from fixture recaps, base templates, and negotiated clauses automatically.
              </p>
              
              <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Generate Documents</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">NLP</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">Legal Structure</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Word/PDF</span>
              </div>
            </div>
          </Link>
          
          {/* Weather Intelligence Card */}
          <Link to="/weather" className="group">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/20">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-xl w-fit mb-6 group-hover:rotate-12 transition-transform duration-500">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                Weather Intelligence
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Real-time weather alerts, 10-day forecasts, and route optimization suggestions for maritime operations.
              </p>
              
              <div className="flex items-center text-cyan-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>View Weather Data</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">Real-time</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">10-day Forecast</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">Route Optimization</span>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-gray-600 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">10k+</div>
            <div className="text-gray-600 text-sm">Documents Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Weather Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600 text-sm">Supported Formats</div>
          </div>
        </div>
      </div>
    </div>
  );
}