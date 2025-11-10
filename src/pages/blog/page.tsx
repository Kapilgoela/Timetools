
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 'calculate-days-between-dates',
      title: 'How to Calculate Days Between Dates: Complete Guide',
      excerpt: 'Learn the most accurate methods to calculate the exact number of days between any two dates, including working days, weekends, and business calculations.',
      category: 'Date Calculations',
      readTime: '5 min read',
      publishDate: 'December 15, 2024',
      image: 'https://readdy.ai/api/search-image?query=Professional%20calendar%20with%20highlighted%20dates%20showing%20date%20calculation%20concept%2C%20clean%20modern%20office%20desk%20with%20calendar%20pages%2C%20business%20planning%20and%20scheduling%2C%20time%20management%20visualization%2C%20corporate%20productivity%20tools%2C%20minimalist%20design%20with%20blue%20accents&width=400&height=250&seq=blog-date-calc&orientation=landscape',
      tags: ['Date Calculator', 'Time Management', 'Business Planning'],
      toolLink: '/date-calculator'
    },
    {
      id: 'best-countdown-timer-productivity',
      title: 'Best Countdown Timer Techniques for Maximum Productivity',
      excerpt: 'Discover proven countdown timer strategies that boost focus, improve time management, and increase productivity in work and personal projects.',
      category: 'Productivity',
      readTime: '7 min read',
      publishDate: 'December 12, 2024',
      image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20countdown%20timer%20on%20sleek%20workspace%20desk%2C%20productivity%20setup%20with%20timer%20display%2C%20focused%20work%20environment%2C%20time%20management%20tools%2C%20professional%20office%20setting%2C%20clean%20minimalist%20design%20with%20orange%20and%20blue%20tones&width=400&height=250&seq=blog-countdown&orientation=landscape',
      tags: ['Countdown Timer', 'Productivity', 'Time Management'],
      toolLink: '/countdown-timer'
    },
    {
      id: 'convert-time-zones-accurately',
      title: 'How to Convert Time Zones Accurately: Expert Tips',
      excerpt: 'Master time zone conversions with our comprehensive guide. Learn about daylight saving time, UTC offsets, and avoid common conversion mistakes.',
      category: 'Time Zones',
      readTime: '6 min read',
      publishDate: 'December 10, 2024',
      image: 'https://readdy.ai/api/search-image?query=World%20map%20showing%20different%20time%20zones%20with%20clock%20faces%2C%20global%20business%20communication%20concept%2C%20international%20scheduling%2C%20time%20zone%20visualization%2C%20professional%20world%20clock%20display%2C%20modern%20geographic%20design&width=400&height=250&seq=blog-timezone&orientation=landscape',
      tags: ['Time Zone Converter', 'Global Business', 'Travel Planning'],
      toolLink: '/timezone-converter'
    },
    {
      id: 'calculate-working-days-guide',
      title: 'How to Calculate Working Days Between Dates',
      excerpt: 'Essential guide for calculating business days, excluding weekends and holidays. Perfect for project planning, payroll, and deadline management.',
      category: 'Business Tools',
      readTime: '4 min read',
      publishDate: 'December 8, 2024',
      image: 'https://readdy.ai/api/search-image?query=Business%20calendar%20showing%20working%20days%20highlighted%20in%20blue%2C%20professional%20office%20planning%2C%20project%20timeline%20visualization%2C%20corporate%20scheduling%20tools%2C%20clean%20business%20environment%2C%20modern%20calendar%20interface%20design&width=400&height=250&seq=blog-workdays&orientation=landscape',
      tags: ['Working Days Calculator', 'Project Management', 'Business Planning'],
      toolLink: '/working-days'
    },
    {
      id: 'age-calculator-complete-guide',
      title: 'Complete Age Calculator Guide: Years, Months, Days & More',
      excerpt: 'Calculate your exact age down to the second. Learn about age calculations for legal documents, birthdays, and milestone tracking.',
      category: 'Personal Tools',
      readTime: '5 min read',
      publishDate: 'December 5, 2024',
      image: 'https://readdy.ai/api/search-image?query=Birthday%20celebration%20with%20calendar%20pages%20showing%20age%20calculation%2C%20milestone%20tracking%20concept%2C%20personal%20achievement%20visualization%2C%20birthday%20planning%20tools%2C%20festive%20yet%20professional%20design%20with%20colorful%20accents&width=400&height=250&seq=blog-age-calc&orientation=landscape',
      tags: ['Age Calculator', 'Birthday Planning', 'Personal Milestones'],
      toolLink: '/age-calculator'
    },
    {
      id: 'world-clock-global-business',
      title: 'World Clock Essentials for Global Business Success',
      excerpt: 'Navigate international business with confidence. Learn how to use world clocks effectively for meetings, deadlines, and global collaboration.',
      category: 'Global Business',
      readTime: '6 min read',
      publishDate: 'December 3, 2024',
      image: 'https://readdy.ai/api/search-image?query=Multiple%20clocks%20showing%20different%20world%20times%2C%20international%20business%20meeting%20setup%2C%20global%20collaboration%20tools%2C%20professional%20world%20clock%20display%2C%20modern%20office%20with%20international%20time%20zones%2C%20sleek%20corporate%20design&width=400&height=250&seq=blog-worldclock&orientation=landscape',
      tags: ['World Clock', 'International Business', 'Remote Work'],
      toolLink: '/world-clock'
    },
    {
      id: 'unix-timestamp-developer-guide',
      title: "Unix Timestamp Converter: Developer's Complete Guide",
      excerpt: 'Master Unix timestamps for programming, database management, and system administration. Includes conversion tips and common use cases.',
      category: 'Developer Tools',
      readTime: '8 min read',
      publishDate: 'November 30, 2024',
      image: 'https://readdy.ai/api/search-image?query=Computer%20screen%20showing%20code%20with%20timestamp%20data%2C%20developer%20workspace%20with%20programming%20tools%2C%20technical%20documentation%2C%20software%20development%20environment%2C%20clean%20coding%20setup%20with%20dark%20theme%20and%20green%20accents&width=400&height=250&seq=blog-unix&orientation=landscape',
      tags: ['Unix Timestamp', 'Programming', 'Database Management'],
      toolLink: '/unix-timestamp'
    },
    {
      id: 'stopwatch-timer-productivity-hacks',
      title: 'Stopwatch & Timer Productivity Hacks That Actually Work',
      excerpt: 'Transform your productivity with proven stopwatch and timer techniques. Learn Pomodoro method, time blocking, and focus strategies.',
      category: 'Productivity',
      readTime: '7 min read',
      publishDate: 'November 28, 2024',
      image: 'https://readdy.ai/api/search-image?query=Digital%20stopwatch%20and%20timer%20on%20modern%20desk%2C%20productivity%20workspace%20setup%2C%20time%20tracking%20tools%2C%20focused%20work%20environment%2C%20professional%20timing%20equipment%2C%20clean%20minimalist%20design%20with%20red%20and%20blue%20accents&width=400&height=250&seq=blog-stopwatch&orientation=landscape',
      tags: ['Stopwatch', 'Timer', 'Pomodoro Technique'],
      toolLink: '/stopwatch'
    }
  ];

  const categories = [
    'All',
    'Date Calculations',
    'Productivity',
    'Time Zones',
    'Business Tools',
    'Personal Tools',
    'Global Business',
    'Developer Tools'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20blog%20and%20resources%20concept%20with%20floating%20articles%2C%20digital%20content%20creation%2C%20professional%20knowledge%20sharing%20platform%2C%20clean%20editorial%20design%2C%20educational%20technology%20interface%2C%20sophisticated%20learning%20environment&width=1200&height=600&seq=blog-hero&orientation=landscape')`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <strong>Time Tools Blog & Resources</strong>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Expert guides, tips, and tutorials for mastering <strong>time calculations</strong>,
              <strong>date conversions</strong>, and <strong>productivity techniques</strong>.
            </p>
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <i className="ri-book-open-line mr-2"></i>
              Start Reading
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'primary' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Article</h2>
            <p className="text-gray-600">Our most popular and comprehensive guide</p>
          </div>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <i className="ri-calendar-line mr-1"></i>
                    {blogPosts[0].publishDate}
                    <span className="mx-2">•</span>
                    <i className="ri-time-line mr-1"></i>
                    {blogPosts[0].readTime}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    <strong>{blogPosts[0].title}</strong>
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">{blogPosts[0].excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blogPosts[0].tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link to={`/blog/${blogPosts[0].id}`}>
                    <Button>
                      Read Full Article
                      <i className="ri-arrow-right-line ml-2"></i>
                    </Button>
                  </Link>
                  <Link to={blogPosts[0].toolLink}>
                    <Button variant="outline">
                      <i className="ri-calculator-line mr-2"></i>
                      Try Tool
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <strong>Latest Articles & Guides</strong>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tutorials and expert tips for all your <strong>time calculation</strong> needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} hover className="h-full overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="relative h-48 mb-4">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <i className="ri-calendar-line mr-1"></i>
                      {post.publishDate}
                      <span className="mx-2">•</span>
                      <i className="ri-time-line mr-1"></i>
                      {post.readTime}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      <strong>{post.title}</strong>
                    </h3>

                    <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Link to={`/blog/${post.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Read More
                        </Button>
                      </Link>
                      <Link to={post.toolLink}>
                        <Button size="sm" className="whitespace-nowrap">
                          <i className="ri-calculator-line mr-1"></i>
                          Tool
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with <strong>Time Tools Tips</strong>
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get the latest <strong>productivity tips</strong>, <strong>time management guides</strong>,
            and <strong>calculator tutorials</strong> delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
