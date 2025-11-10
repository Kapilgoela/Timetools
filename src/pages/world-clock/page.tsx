
import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';

export default function WorldClockPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeZones = [
    { city: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
    { city: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
    { city: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷' },
    { city: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪' },
    { city: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { city: 'Shanghai', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
    { city: 'Mumbai', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
    { city: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪' },
    { city: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
    { city: 'Moscow', timezone: 'Europe/Moscow', flag: '🇷🇺' },
    { city: 'São Paulo', timezone: 'America/Sao_Paulo', flag: '🇧🇷' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(currentTime);
  };

  const formatDate = (timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(currentTime);
  };

  const getTimeOffset = (timezone: string) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (getTimezoneOffset(timezone) * 3600000));
    const offset = getTimezoneOffset(timezone);
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.abs(Math.floor(offset));
    const minutes = Math.abs((offset % 1) * 60);
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getTimezoneOffset = (timezone: string) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const localTime = new Date(now.toLocaleString('en-US'));
    return (targetTime.getTime() - localTime.getTime()) / (1000 * 60 * 60);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>World Clock</strong>
          </h1>
          <p className="text-xl text-gray-600">
            View current time in major cities around the world with live updates
          </p>
        </div>

        {/* Local Time */}
        <Card className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Local Time</h2>
          <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-2">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit',
              hour12: true 
            })}
          </div>
          <div className="text-lg text-gray-600">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </Card>

        {/* World Clocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {timeZones.map((zone) => (
            <Card key={zone.city} className="text-center">
              <div className="text-3xl mb-2">{zone.flag}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                <strong>{zone.city}</strong>
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatTime(zone.timezone)}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {formatDate(zone.timezone)}
              </div>
              <div className="text-xs text-gray-500">
                {getTimeOffset(zone.timezone)}
              </div>
            </Card>
          ))}
        </div>

        {/* Time Zone Info */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Zone Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About Time Zones</h3>
              <p className="text-gray-600 mb-4">
                Time zones are regions of the Earth that have the same standard time. 
                The world is divided into 24 time zones, each representing one hour of the day.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• UTC (Coordinated Universal Time) is the primary time standard</li>
                <li>• Time zones are typically expressed as UTC+/- hours</li>
                <li>• Some regions observe Daylight Saving Time</li>
                <li>• The International Date Line roughly follows 180° longitude</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Time Zones:</span>
                  <span className="font-semibold">24 (officially)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Largest Time Zone:</span>
                  <span className="font-semibold">UTC+12 to UTC-12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Most Populated:</span>
                  <span className="font-semibold">UTC+8 (China)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Greenwich Mean Time:</span>
                  <span className="font-semibold">UTC+0</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
