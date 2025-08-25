import React from 'react';

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 animate-gradient-shift" />
      
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 12}s`
          }}
        >
          <div 
            className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"
            style={{
              transform: `scale(${0.5 + Math.random() * 1.5})`
            }}
          />
        </div>
      ))}
      
      {/* Larger floating elements */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`large-${i}`}
          className="absolute animate-float-slow opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 20}s`
          }}
        >
          <div 
            className="w-8 h-8 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full blur-md"
            style={{
              transform: `scale(${0.8 + Math.random() * 1.2})`
            }}
          />
        </div>
      ))}
      
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-blue-100 opacity-30"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            className="animate-wave"
          />
        </svg>
        
        <svg
          className="absolute bottom-0 left-0 w-full h-full text-indigo-100 opacity-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C200,40 400,120 600,80 C800,40 1000,120 1200,80 L1200,120 L0,120 Z"
            fill="currentColor"
            className="animate-wave-reverse"
          />
        </svg>
      </div>
    </div>
  );
}

export function GlowingCard({ children, className = "", glowColor = "blue" }: {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "green" | "purple" | "orange";
}) {
  const glowColors = {
    blue: "shadow-blue-500/20 hover:shadow-blue-500/40",
    green: "shadow-green-500/20 hover:shadow-green-500/40", 
    purple: "shadow-purple-500/20 hover:shadow-purple-500/40",
    orange: "shadow-orange-500/20 hover:shadow-orange-500/40"
  };

  return (
    <div className={`
      bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20
      shadow-xl ${glowColors[glowColor]}
      transform hover:scale-[1.02] hover:-translate-y-1
      transition-all duration-500 ease-out
      ${className}
    `}>
      {children}
    </div>
  );
}

export function PulsingButton({ children, onClick, variant = "primary", disabled = false, className = "" }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  className?: string;
}) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-gray-500/25",
    success: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-green-500/25",
    danger: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-red-500/25"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-medium
        ${variants[variant]}
        shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        relative overflow-hidden
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
    </button>
  );
}

export function AnimatedCounter({ value, duration = 2000, suffix = "" }: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
}

export function LoadingWave({ message = "Processing..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex space-x-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-12 bg-gradient-to-t from-blue-600 to-purple-600 rounded-full animate-wave-loading"
            style={{
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      <p className="text-lg font-medium text-gray-700 animate-pulse">{message}</p>
    </div>
  );
}

export function MorphingIcon({ icons, interval = 3000 }: {
  icons: React.ReactNode[];
  interval?: number;
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % icons.length);
    }, interval);

    return () => clearInterval(timer);
  }, [icons.length, interval]);

  return (
    <div className="relative w-8 h-8">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-500 ${
            index === currentIndex 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-45'
          }`}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}