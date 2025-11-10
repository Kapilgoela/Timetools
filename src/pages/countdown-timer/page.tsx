
import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function CountdownTimerPage() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [timeLeft, setTimeLeft] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && targetDate && targetTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(`${targetDate}T${targetTime}`).getTime();
        const difference = target - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds, expired: false });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
          setIsActive(false);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, targetDate, targetTime]);

  const startCountdown = () => {
    if (!targetDate || !targetTime) {
      alert('Please select both date and time');
      return;
    }

    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();

    if (target <= now) {
      alert('Target date and time must be in the future');
      return;
    }

    setIsActive(true);
  };

  const stopCountdown = () => {
    setIsActive(false);
    setTimeLeft(null);
  };

  const presetEvents = [
    { name: 'New Year 2025', date: '2025-01-01', time: '00:00' },
    { name: 'Christmas 2024', date: '2024-12-25', time: '00:00' },
    { name: 'Valentine\'s Day 2025', date: '2025-02-14', time: '00:00' },
    { name: 'Halloween 2024', date: '2024-10-31', time: '18:00' }
  ];

  const setPresetEvent = (preset: any) => {
    setEventName(preset.name);
    setTargetDate(preset.date);
    setTargetTime(preset.time);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Countdown Timer</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Create countdown timers for events, deadlines, or special occasions
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name (Optional)
              </label>
              <Input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., Birthday Party"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Date
              </label>
              <Input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Time
              </label>
              <Input
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={startCountdown} disabled={isActive} className="whitespace-nowrap">
              <i className="ri-play-line mr-2"></i>
              Start Countdown
            </Button>
            <Button onClick={stopCountdown} variant="outline" disabled={!isActive} className="whitespace-nowrap">
              <i className="ri-stop-line mr-2"></i>
              Stop Countdown
            </Button>
          </div>
        </Card>

        {/* Preset Events */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start - Popular Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetEvents.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setPresetEvent(preset)}
                className="text-left p-3 h-auto whitespace-nowrap"
              >
                <div className="text-sm font-medium">{preset.name}</div>
                <div className="text-xs text-gray-500">{preset.date}</div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Countdown Display */}
        {timeLeft && (
          <Card className="text-center">
            {eventName && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Countdown to <strong>{eventName}</strong>
              </h2>
            )}
            
            {timeLeft.expired ? (
              <div className="py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold text-red-600 mb-2">Time's Up!</h3>
                <p className="text-xl text-gray-600">
                  {eventName ? `${eventName} has arrived!` : 'The countdown has ended!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-2">
                    {timeLeft.days}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-green-600 mb-2">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-purple-600 mb-2">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-red-600 mb-2">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">Seconds</div>
                </div>
              </div>
            )}

            {!timeLeft.expired && (
              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <p className="text-gray-700">
                  Target: <strong>{new Date(`${targetDate}T${targetTime}`).toLocaleString()}</strong>
                </p>
              </div>
            )}
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
