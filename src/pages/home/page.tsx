
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import CategoryFilter from '../../components/feature/CategoryFilter';
import FloatingElements from '../../components/feature/FloatingElements';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleTools, setVisibleTools] = useState<string[]>([]);

  const tools = [
    {
      id: 'age-calculator',
      title: '⏰ Age Calculator',
      description: 'Calculate your exact age in years, months, days, hours, and minutes',
      href: '/age-calculator',
      category: 'date',
      color: 'blue',
      icon: 'ri-calendar-check-line'
    },
    {
      id: 'date-calculator',
      title: '📅 Date Calculator',
      description: 'Find the difference between two dates or add/subtract days',
      href: '/date-calculator',
      category: 'date',
      color: 'blue',
      icon: 'ri-calendar-2-line'
    },
    {
      id: 'countdown-timer',
      title: '⏱️ Countdown Timer',
      description: 'Set custom countdown timers for events, deadlines, and reminders',
      href: '/countdown-timer',
      category: 'timer',
      color: 'purple',
      icon: 'ri-timer-line'
    },
    {
      id: 'world-clock',
      title: '🌍 World Clock',
      description: 'View current time in multiple cities and time zones worldwide',
      href: '/world-clock',
      category: 'timezone',
      color: 'green',
      icon: 'ri-global-line'
    },
    {
      id: 'timezone-converter',
      title: '🔄 Timezone Converter',
      description: 'Convert time between different time zones instantly',
      href: '/timezone-converter',
      category: 'timezone',
      color: 'green',
      icon: 'ri-time-zone-line'
    },
    {
      id: 'add-subtract-days',
      title: '➕ Add/Subtract Days',
      description: 'Add or subtract days, weeks, months, or years from any date',
      href: '/add-subtract-days',
      category: 'date',
      color: 'blue',
      icon: 'ri-add-circle-line'
    },
    {
      id: 'future-date',
      title: '🔮 Future Date Calculator',
      description: 'Calculate what date it will be after a specific number of days',
      href: '/future-date',
      category: 'date',
      color: 'blue',
      icon: 'ri-calendar-event-line'
    },
    {
      id: 'working-days',
      title: '💼 Working Days Calculator',
      description: 'Calculate business days between dates, excluding weekends',
      href: '/working-days',
      category: 'date',
      color: 'blue',
      icon: 'ri-briefcase-line'
    },
    {
      id: 'stopwatch',
      title: '⏱️ Stopwatch',
      description: 'Precise stopwatch with lap times and split timing',
      href: '/stopwatch',
      category: 'timer',
      color: 'purple',
      icon: 'ri-play-circle-line'
    },
    {
      id: 'duration-calculator',
      title: '🧮 Duration Calculator',
      description: 'Calculate time duration between two specific times',
      href: '/duration-calculator',
      category: 'technical',
      color: 'orange',
      icon: 'ri-calculator-line'
    },
    {
      id: 'unix-timestamp',
      title: '🔢 Unix Timestamp Converter',
      description: 'Convert between Unix timestamps and human-readable dates',
      href: '/unix-timestamp',
      category: 'technical',
      color: 'orange',
      icon: 'ri-code-line'
    },
    {
      id: 'birthday-countdown',
      title: '🎂 Birthday Countdown',
      description: 'Count down to your next birthday or any special date',
      href: '/birthday-countdown',
      category: 'timer',
      color: 'purple',
      icon: 'ri-cake-line'
    }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleTools(filteredTools.map(tool => tool.id));
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredTools]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 hover:border-blue-300 hover:shadow-blue-100 dark:border-blue-800 dark:hover:border-blue-700',
      purple: 'border-purple-200 hover:border-purple-300 hover:shadow-purple-100 dark:border-purple-800 dark:hover:border-purple-700',
      green: 'border-green-200 hover:border-green-300 hover:shadow-green-100 dark:border-green-800 dark:hover:border-green-700',
      orange: 'border-orange-200 hover:border-orange-300 hover:shadow-orange-100 dark:border-orange-800 dark:hover:border-orange-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400',
      purple: 'text-purple-600 dark:text-purple-400',
      green: 'text-green-600 dark:text-green-400',
      orange: 'text-orange-600 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <FloatingElements />

      {/* Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
              <strong>Time & Date Tools</strong>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your complete suite of <strong>time calculators</strong> and <strong>date converters</strong>. Calculate ages, 
              convert time zones, set timers, and access 12 essential tools - all free and instant.
            </p>
          </div>

          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                className={`transform transition-all duration-500 ${
                  visibleTools.includes(tool.id)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link to={tool.href} className="block group">
                  <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-xl ${getColorClasses(tool.color)} bg-white dark:bg-gray-800 border-2`}>
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <i className={`${tool.icon} text-2xl ${getIconColorClasses(tool.color)}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {tool.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                      <span>Use Tool</span>
                      <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
              Why Choose <strong>TimeTools</strong>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional-grade time and date calculations with instant results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'ri-flashlight-line',
                title: 'Lightning Fast',
                description: 'Instant calculations with no loading time',
                color: 'blue'
              },
              {
                icon: 'ri-shield-check-line',
                title: '100% Accurate',
                description: 'Precise algorithms for reliable results',
                color: 'green'
              },
              {
                icon: 'ri-smartphone-line',
                title: 'Mobile Friendly',
                description: 'Works perfectly on all devices',
                color: 'purple'
              },
              {
                icon: 'ri-gift-line',
                title: 'Completely Free',
                description: 'No registration, no limits, no cost',
                color: 'orange'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center group hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${
                  feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  feature.color === 'green' ? 'from-green-500 to-green-600' :
                  feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-orange-500 to-orange-600'
                } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${feature.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 font-heading">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            Start Using Our <strong>Time Tools</strong> Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust TimeTools for accurate time and date calculations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/age-calculator">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 whitespace-nowrap">
                <i className="ri-calculator-line mr-2"></i>
                Try Age Calculator
              </Button>
            </Link>
            <Link to="/blog">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 whitespace-nowrap">
                <i className="ri-article-line mr-2"></i>
                Read Our Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
