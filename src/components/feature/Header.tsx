
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' }
  ];

  const tools = [
    { name: '⏰ Age Calculator', href: '/age-calculator' },
    { name: '📆 Date Calculator', href: '/date-calculator' },
    { name: '🌍 World Clock', href: '/world-clock' },
    { name: '⏱️ Countdown Timer', href: '/countdown-timer' },
    { name: '🔄 Timezone Converter', href: '/timezone-converter' },
    { name: '📊 Working Days', href: '/working-days' }
  ];

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-4">
              {/* Modern TimeTools Logo */}
              <div className="relative">
                <img 
                  src="https://readdy.ai/api/search-image?query=Modern%20flat%20design%20logo%20for%20TimeTools%20featuring%20a%20minimalist%20clock%20icon%20integrated%20with%20letter%20T%2C%20gradient%20blue%20colors%20from%20deep%20blue%20to%20bright%20blue%2C%20clean%20geometric%20design%2C%20professional%20tech%20company%20branding%2C%20square%20format%20with%20subtle%20glow%20effect%2C%20contemporary%20typography%2C%20digital%20time%20management%20theme&width=80&height=80&seq=timetools-logo-main&orientation=squarish"
                  alt="TimeTools Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl opacity-20 blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  TimeTools
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                  Fast • Free • Accurate Time Calculators
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                  location.pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>All Tools</span>
                <i className={`ri-arrow-down-s-line transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {isToolsDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      to={tool.href}
                      onClick={() => setIsToolsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <DarkModeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">TOOLS</p>
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 py-1"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
