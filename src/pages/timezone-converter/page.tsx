
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function TimezoneConverterPage() {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceDate, setSourceDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceTimezone, setSourceTimezone] = useState('America/New_York');
  const [targetTimezone, setTargetTimezone] = useState('Europe/London');
  const [result, setResult] = useState<any>(null);

  const timeZones = [
    { value: 'America/New_York', label: 'New York (EST/EDT)', offset: 'UTC-5/-4' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: 'UTC-8/-7' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: 'UTC-6/-5' },
    { value: 'America/Denver', label: 'Denver (MST/MDT)', offset: 'UTC-7/-6' },
    { value: 'Europe/London', label: 'London (GMT/BST)', offset: 'UTC+0/+1' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: 'UTC+1/+2' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', offset: 'UTC+1/+2' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK)', offset: 'UTC+3' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 'UTC+9' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: 'UTC+8' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: 'UTC+5:30' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: 'UTC+4' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', offset: 'UTC+10/+11' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', offset: 'UTC+12/+13' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', offset: 'UTC-3' },
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: 'UTC+0' }
  ];

  const convertTime = () => {
    if (!sourceTime || !sourceDate) {
      alert('Please enter both date and time');
      return;
    }

    try {
      const sourceDateTime = new Date(`${sourceDate}T${sourceTime}`);
      
      // Format source time
      const sourceFormatted = sourceDateTime.toLocaleString('en-US', {
        timeZone: sourceTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      // Convert to target timezone
      const targetFormatted = sourceDateTime.toLocaleString('en-US', {
        timeZone: targetTimezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      // Get just the time for display
      const sourceTimeOnly = sourceDateTime.toLocaleString('en-US', {
        timeZone: sourceTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const targetTimeOnly = sourceDateTime.toLocaleString('en-US', {
        timeZone: targetTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      // Calculate time difference
      const sourceOffset = getTimezoneOffset(sourceTimezone, sourceDateTime);
      const targetOffset = getTimezoneOffset(targetTimezone, sourceDateTime);
      const timeDifference = targetOffset - sourceOffset;

      setResult({
        sourceFormatted,
        targetFormatted,
        sourceTimeOnly,
        targetTimeOnly,
        timeDifference,
        sourceTimezone: timeZones.find(tz => tz.value === sourceTimezone)?.label,
        targetTimezone: timeZones.find(tz => tz.value === targetTimezone)?.label
      });
    } catch (error) {
      alert('Invalid date or time format');
    }
  };

  const getTimezoneOffset = (timezone: string, date: Date) => {
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const targetTime = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    const localTime = new Date(date.toLocaleString('en-US'));
    return (targetTime.getTime() - localTime.getTime()) / (1000 * 60 * 60);
  };

  const swapTimezones = () => {
    const temp = sourceTimezone;
    setSourceTimezone(targetTimezone);
    setTargetTimezone(temp);
    setResult(null);
  };

  const setCurrentTime = () => {
    const now = new Date();
    setSourceDate(now.toISOString().split('T')[0]);
    setSourceTime(now.toTimeString().slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Time Zone Converter</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Convert time between different time zones instantly and accurately
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <Input
                type="date"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={sourceTime}
                  onChange={(e) => setSourceTime(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={setCurrentTime} variant="outline" className="whitespace-nowrap">
                  Now
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Time Zone
              </label>
              <select
                value={sourceTimezone}
                onChange={(e) => setSourceTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label} ({tz.offset})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Time Zone
              </label>
              <div className="flex gap-2">
                <select
                  value={targetTimezone}
                  onChange={(e) => setTargetTimezone(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeZones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label} ({tz.offset})
                    </option>
                  ))}
                </select>
                <Button onClick={swapTimezones} variant="outline" className="whitespace-nowrap">
                  <i className="ri-arrow-left-right-line"></i>
                </Button>
              </div>
            </div>
          </div>
          
          <Button onClick={convertTime} className="w-full md:w-auto">
            <i className="ri-refresh-line mr-2"></i>
            Convert Time
          </Button>
        </Card>

        {result && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conversion Result</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">From</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.sourceTimeOnly}
                </div>
                <div className="text-sm text-gray-600">
                  {result.sourceTimezone}
                </div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">To</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {result.targetTimeOnly}
                </div>
                <div className="text-sm text-gray-600">
                  {result.targetTimezone}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Full Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">From: </span>
                  <span className="font-medium">{result.sourceFormatted}</span>
                </div>
                <div>
                  <span className="text-gray-600">To: </span>
                  <span className="font-medium">{result.targetFormatted}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Time Difference</h3>
              <p className="text-gray-700">
                The target time zone is <strong>
                  {result.timeDifference > 0 ? `${result.timeDifference} hours ahead` : 
                   result.timeDifference < 0 ? `${Math.abs(result.timeDifference)} hours behind` : 
                   'the same'}
                </strong> of the source time zone.
              </p>
            </div>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
