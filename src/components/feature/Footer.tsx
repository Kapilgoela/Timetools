
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const toolCategories = [
    {
      title: 'Date Calculators',
      tools: [
        { name: 'Age Calculator', href: '/age-calculator' },
        { name: 'Date Calculator', href: '/date-calculator' },
        { name: 'Working Days', href: '/working-days' },
        { name: 'Add/Subtract Days', href: '/add-subtract-days' }
      ]
    },
    {
      title: 'Timers & Counters',
      tools: [
        { name: 'Countdown Timer', href: '/countdown-timer' },
        { name: 'Stopwatch', href: '/stopwatch' },
        { name: 'Birthday Countdown', href: '/birthday-countdown' },
        { name: 'Duration Calculator', href: '/duration-calculator' }
      ]
    },
    {
      title: 'Time Zone Tools',
      tools: [
        { name: 'World Clock', href: '/world-clock' },
        { name: 'Timezone Converter', href: '/timezone-converter' },
        { name: 'Unix Timestamp', href: '/unix-timestamp' },
        { name: 'Future Date', href: '/future-date' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img 
                  src="https://readdy.ai/api/search-image?query=Modern%20flat%20design%20logo%20for%20TimeTools%20featuring%20a%20minimalist%20clock%20icon%20integrated%20with%20letter%20T%2C%20gradient%20blue%20colors%20from%20deep%20blue%20to%20bright%20blue%2C%20clean%20geometric%20design%2C%20professional%20tech%20company%20branding%2C%20square%20format%20with%20subtle%20glow%20effect%2C%20contemporary%20typography%2C%20digital%20time%20management%20theme&width=48&height=48&seq=timetools-logo-footer&orientation=squarish"
                  alt="TimeTools Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl opacity-20 blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  TimeTools
                </h3>
                <p className="text-xs text-gray-400 font-medium tracking-wide">
                  Fast • Free • Accurate
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your complete suite of time and date calculation tools. Fast, accurate, and completely free to use.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                <i className="ri-twitter-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                <i className="ri-facebook-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">
                <i className="ri-linkedin-line text-lg"></i>
              </a>
            </div>
          </div>

          {/* Tool Categories */}
          {toolCategories.map((category, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold font-heading mb-6 text-blue-400">
                {category.title}
              </h4>
              <ul className="space-y-3">
                {category.tools.map((tool) => (
                  <li key={tool.href}>
                    <Link
                      to={tool.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          {/* Main Footer Links */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-6 text-sm text-gray-300 mb-4 md:mb-0">
              <Link to="/about" className="hover:text-white transition-colors duration-200">
                About
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/contact" className="hover:text-white transition-colors duration-200">
                Contact
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/sitemap" className="hover:text-white transition-colors duration-200">
                Sitemap
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/blog" className="hover:text-white transition-colors duration-200">
                Blog
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/help" className="hover:text-white transition-colors duration-200">
                Help & FAQ
              </Link>
            </div>
          </div>

          {/* Made with Love & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p className="text-center md:text-left">
                Made with ❤️ by TimeTools. Fast, free & accurate.
              </p>
              <p>&copy; {currentYear} TimeTools. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <a 
                href="https://readdy.ai/?origin=logo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                Website Builder
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
