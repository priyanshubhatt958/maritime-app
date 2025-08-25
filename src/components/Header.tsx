import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Anchor, FileText, FileCheck, Cloud } from 'lucide-react';
import { MorphingIcon } from './HyperAnimations';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="glass border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <MorphingIcon 
                icons={[
                  <Anchor className="h-6 w-6 text-white" />,
                  <FileText className="h-6 w-6 text-white" />,
                  <Cloud className="h-6 w-6 text-white" />
                ]}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text-blue">Maritime Assistant</h1>
              <p className="text-xs text-gray-500">AI-Powered Maritime Intelligence</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-700 bg-blue-50/80 backdrop-blur-sm' 
                  : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              <span>Home</span>
            </Link>
            <Link
              to="/sof-extraction"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/sof-extraction') 
                  ? 'text-blue-700 bg-blue-50/80 backdrop-blur-sm' 
                  : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>SoF Extraction</span>
            </Link>
            <Link
              to="/charter-party"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/charter-party') 
                  ? 'text-blue-700 bg-blue-50/80 backdrop-blur-sm' 
                  : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>Charter Party</span>
            </Link>
            <Link
              to="/weather"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/weather') 
                  ? 'text-blue-700 bg-blue-50/80 backdrop-blur-sm' 
                  : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50/50'
              }`}
            >
              <Cloud className="h-4 w-4" />
              <span>Weather</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}