import React from 'react';
import { Waves } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = "Processing...", size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-blue-200 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        
        {/* Inner icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Waves className="h-4 w-4 text-blue-600 animate-pulse" />
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-lg font-medium text-gray-900 animate-pulse">{message}</p>
        <div className="flex justify-center mt-2 space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}