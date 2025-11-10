
import { useState } from 'react';

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}

export default function CategoryFilter({ onCategoryChange, activeCategory }: CategoryFilterProps) {
  const categories = [
    { id: 'all', name: 'All Tools', icon: 'ri-apps-line', color: 'bg-gray-500' },
    { id: 'date', name: 'Date Tools', icon: 'ri-calendar-line', color: 'bg-blue-500' },
    { id: 'timer', name: 'Timers', icon: 'ri-timer-line', color: 'bg-purple-500' },
    { id: 'timezone', name: 'Time Zone Tools', icon: 'ri-global-line', color: 'bg-green-500' },
    { id: 'technical', name: 'Converters', icon: 'ri-code-line', color: 'bg-orange-500' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 whitespace-nowrap ${
            activeCategory === category.id
              ? `${category.color} text-white shadow-lg scale-105`
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
          }`}
        >
          <i className={`${category.icon} text-lg`}></i>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
