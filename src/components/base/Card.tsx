
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  gradient?: boolean;
  category?: 'date' | 'timer' | 'timezone' | 'technical';
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false,
  gradient = false,
  category
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const hoverClass = hover ? 'hover-scale hover-glow cursor-pointer' : '';
  
  const gradientClass = gradient ? 'gradient-border dark:gradient-border-dark' : '';
  
  const categoryClass = category ? `category-${category}` : '';
  
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 
      ${paddingClasses[padding]} ${hoverClass} ${gradientClass} ${categoryClass} ${className}
      transition-all duration-300
    `}>
      {children}
    </div>
  );
}
