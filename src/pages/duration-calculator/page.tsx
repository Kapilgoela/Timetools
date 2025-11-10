import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function DurationCalculatorPage() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      alert('Please enter both start and end times');
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (startDateTime >= endDateTime) {
      alert('End time must be after start time');
      return;
    }

    const durationMs = endDateTime.getTime() - startDateTime.getTime();
    
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
    
    const totalMinutes = Math.floor(durationMs / (1000 * 60));
    const totalSeconds = Math.floor(durationMs / 1000);
    
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    setResult({
      startDateTime: startDateTime.toLocaleString(),
      endDateTime: endDateTime.toLocaleString(),
      duration: {
        days,
        hours: remainingHours,
        minutes,
        seconds
      },
      totalHours: hours,
      totalMinutes,
      totalSeconds,
      durationMs
    });
  };

  const addTime = () => {
    if (!startTime) {
      alert('Please enter a start time first');
      return;
    }

    const hoursToAdd = prompt('How many hours would you like to add?');
    const minutesToAdd = prompt('How many minutes would you like to add?');
    
    if (hoursToAdd === null && minutesToAdd === null) return;

    const hours = parseInt(hoursToAdd || '0');
    const minutes = parseInt(minutesToAdd || '0');
    
    if (isNaN(hours) || isNaN(minutes)) {
      alert('Please enter valid numbers');
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    startDateTime.setHours(startDateTime.getHours() + hours);
    startDateTime.setMinutes(startDateTime.getMinutes() + minutes);

    setEndDate(startDateTime.toISOString().split('T')[0]);
    setEndTime(startDateTime.toTimeString().slice(0, 5));
  };

  const commonDurations = [
    { label: '8 hours (work day)', hours: 8, minutes: 0 },
    { label: '1 hour', hours: 1, minutes: 0 },
    { label: '30 minutes', hours: 0, minutes: 30 },
    { label: '15 minutes', hours: 0, minutes: 15 },
    { label: '2 hours', hours: 2, minutes: 0 },
    { label: '4 hours', hours: 4, minutes: 0 }
  ];

  const setCommonDuration = (duration: any) => {
    if (!startTime) {
      alert('Please set a start time first');
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    startDateTime.setHours(startDateTime.getHours() + duration.hours);
    startDateTime.setMinutes(startDateTime.getMinutes() + duration.minutes);

    setEndDate(startDateTime.toISOString().split('T')[0]);
    setEndTime(startDateTime.toTimeString().slice(0, 5));
  };

  const setCurrentTime = (field: 'start' | 'end') => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    if (field === 'start') {
      setStartTime(timeString);
    } else {
      setEndTime(timeString);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Time Duration Calculator</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Calculate the duration between two times (e.g., 2:15 PM to 6:45 PM)
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => setCurrentTime('start')} variant="outline" className="whitespace-nowrap">
                  Now
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => setCurrentTime('end')} variant="outline" className="whitespace-nowrap">
                  Now
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={calculateDuration} className="whitespace-nowrap">
              <i className="ri-time-line mr-2"></i>
              Calculate Duration
            </Button>
            <Button onClick={addTime} variant="outline" className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Add Time to Start
            </Button>
          </div>
        </Card>

        {/* Common Durations */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Duration Setup</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonDurations.map((duration, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setCommonDuration(duration)}
                className="text-left p-3 h-auto whitespace-nowrap"
              >
                {duration.label}
              </Button>
            ))}
          </div>
        </Card>

        {result && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Duration Result</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Time</h3>
                <div className="text-lg font-bold text-blue-600">
                  {result.startDateTime}
                </div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">End Time</h3>
                <div className="text-lg font-bold text-green-600">
                  {result.endDateTime}
                </div>
              </div>
            </div>

            <div className="text-center p-8 bg-purple-50 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Total Duration</h3>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {result.duration.days > 0 && `${result.duration.days}d `}
                {result.duration.hours}h {result.duration.minutes}m {result.duration.seconds}s
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{result.totalHours}</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">{result.totalMinutes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Minutes</div>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">{result.totalSeconds.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Seconds</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Duration Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">In decimal hours: </span>
                  <span className="font-medium">{(result.totalMinutes / 60).toFixed(2)} hours</span>
                </div>
                <div>
                  <span className="text-gray-600">In work days (8h): </span>
                  <span className="font-medium">{(result.totalHours / 8).toFixed(2)} days</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Usage Examples */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Work & Business</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Calculate work hours for timesheets</li>
                <li>• Track meeting durations</li>
                <li>• Project time tracking</li>
                <li>• Break time calculations</li>
                <li>• Overtime calculations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Personal Use</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Travel time planning</li>
                <li>• Event duration tracking</li>
                <li>• Exercise session timing</li>
                <li>• Study session planning</li>
                <li>• Sleep duration calculation</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}