
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FloatingElements() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center hover:scale-110"
          aria-label="Back to top"
        >
          <i className="ri-arrow-up-line text-lg"></i>
        </button>
      )}

      {/* Floating View All Tools CTA */}
      <Link
        to="/#tools"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center space-x-2 hover:scale-105 animate-float"
      >
        <i className="ri-tools-line text-lg"></i>
        <span className="text-sm font-medium whitespace-nowrap">View All Tools</span>
      </Link>
    </>
  );
}
