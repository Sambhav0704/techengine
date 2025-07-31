import React from 'react';
import techEngineLogo from '../../public/tech-engine-logo.png';

interface TechEngineLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-20 h-20',   // 5rem
  md: 'w-28 h-28',   // 7rem
  lg: 'w-36 h-36',   // 9rem
};

const TechEngineLogo: React.FC<TechEngineLogoProps> = ({ className = '', size = 'md' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={techEngineLogo}
        alt="Tech Engine Logo"
        className={`object-contain ${sizeClasses[size]}`}
        draggable={false}
      />
    </div>
  );
};

export default TechEngineLogo; 