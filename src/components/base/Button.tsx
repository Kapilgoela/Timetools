
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  category?: 'date' | 'timer' | 'timezone' | 'technical';
  className?: string;
  loading?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  category,
  className = '',
  loading = false,
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'date': return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      case 'timer': return 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500';
      case 'timezone': return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
      case 'technical': return 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500';
      default: return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
    }
  };
  
  const variantClasses = {
    primary: category 
      ? `${getCategoryColor(category)} text-white shadow-lg hover:shadow-xl hover:scale-105`
      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 hover:scale-105',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl focus:ring-gray-500 hover:scale-105',
    outline: category
      ? `border-2 border-current text-${category === 'date' ? 'blue' : category === 'timer' ? 'purple' : category === 'timezone' ? 'green' : 'orange'}-600 hover:bg-${category === 'date' ? 'blue' : category === 'timer' ? 'purple' : category === 'timezone' ? 'green' : 'orange'}-50 dark:hover:bg-${category === 'date' ? 'blue' : category === 'timer' ? 'purple' : category === 'timezone' ? 'green' : 'orange'}-900/20`
      : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500'
  };
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <i className="ri-loader-4-line animate-spin mr-2"></i>
      )}
      {children}
    </button>
  );
}
