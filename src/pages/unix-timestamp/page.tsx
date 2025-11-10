import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function UnixTimestampPage() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [timestampResult, setTimestampResult] = useState<any>(null);
  const [dateResult, setDateResult] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const convertTimestampToDate = () => {
    if (!inputTimestamp) {
      alert('Please enter a Unix timestamp');
      return;
    }

    const timestamp = parseInt(inputTimestamp);
    if (isNaN(timestamp)) {
      alert('Please enter a valid number');
      return;
    }

    // Handle both seconds and milliseconds
    const date = new Date(timestamp > 9999999999 ? timestamp : timestamp * 1000);
    
    if (isNaN(date.getTime())) {
      alert('Invalid timestamp');
      return;
    }

    setTimestampResult({
      timestamp,
      date: date.toDateString(),
      time: date.toTimeString(),
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    });
  };

  const convertDateToTimestamp = () => {
    if (!inputDate || !inputTime) {
      alert('Please enter both date and time');
      return;
    }

    const date = new Date(`${inputDate}T${inputTime}`);
    
    if (isNaN(date.getTime())) {
      alert('Invalid date or time');
      return;
    }

    const timestamp = Math.floor(date.getTime() / 1000);
    const timestampMs = date.getTime();

    setDateResult({
      date: date.toDateString(),
      time: date.toTimeString(),
      timestamp,
      timestampMs,
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString()
    });
  };

  const setCurrentDateTime = () => {
    const now = new Date();
    setInputDate(now.toISOString().split('T')[0]);
    setInputTime(now.toTimeString().slice(0, 8));
  };

  const setCurrentTimestampInput = () => {
    setInputTimestamp(currentTimestamp.toString());
  };

  const commonTimestamps = [
    { label: 'Unix Epoch (1970-01-01)', timestamp: 0 },
    { label: 'Y2K (2000-01-01)', timestamp: 946684800 },
    { label: 'Start of 2020', timestamp: 1577836800 },
    { label: 'Start of 2024', timestamp: 1704067200 },
    { label: 'Start of 2025', timestamp: 1735689600 }
  ];

  const setCommonTimestamp = (timestamp: number) => {
    setInputTimestamp(timestamp.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Unix Timestamp Converter</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Convert between Unix timestamps and human-readable date formats
          </p>
        </div>

        {/* Current Timestamp */}
        <Card className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Unix Timestamp</h2>
          <div className="text-4xl font-mono font-bold text-blue-600 mb-2">
            {currentTimestamp}
          </div>
          <div className="text-lg text-gray-600 mb-4">
            {new Date().toLocaleString()}
          </div>
          <Button onClick={setCurrentTimestampInput} variant="outline" className="whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Use This Timestamp
          </Button>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timestamp to Date */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Timestamp to Date</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unix Timestamp
              </label>
              <Input
                type="text"
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value)}
                placeholder="e.g., 1640995200"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter timestamp in seconds or milliseconds
              </p>
            </div>
            
            <Button onClick={convertTimestampToDate} className="w-full mb-6">
              <i className="ri-calendar-line mr-2"></i>
              Convert to Date
            </Button>

            {/* Common Timestamps */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Timestamps</h3>
              <div className="space-y-2">
                {commonTimestamps.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setCommonTimestamp(item.timestamp)}
                    className="w-full text-left justify-start whitespace-nowrap"
                  >
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.timestamp}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {timestampResult && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Conversion Result</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Date:</strong> {timestampResult.date}</div>
                  <div><strong>Time:</strong> {timestampResult.time}</div>
                  <div><strong>ISO 8601:</strong> {timestampResult.iso}</div>
                  <div><strong>UTC:</strong> {timestampResult.utc}</div>
                  <div><strong>Local:</strong> {timestampResult.local}</div>
                </div>
              </div>
            )}
          </Card>

          {/* Date to Timestamp */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Date to Timestamp</h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <Input
                  type="time"
                  value={inputTime}
                  onChange={(e) => setInputTime(e.target.value)}
                  className="w-full"
                  step="1"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mb-6">
              <Button onClick={convertDateToTimestamp} className="w-full">
                <i className="ri-time-line mr-2"></i>
                Convert to Timestamp
              </Button>
              <Button onClick={setCurrentDateTime} variant="outline" className="w-full whitespace-nowrap">
                <i className="ri-refresh-line mr-2"></i>
                Use Current Date & Time
              </Button>
            </div>

            {dateResult && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Conversion Result</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Unix Timestamp:</strong> {dateResult.timestamp}</div>
                  <div><strong>Timestamp (ms):</strong> {dateResult.timestampMs}</div>
                  <div><strong>ISO 8601:</strong> {dateResult.iso}</div>
                  <div><strong>UTC:</strong> {dateResult.utc}</div>
                  <div><strong>Local:</strong> {dateResult.local}</div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Information */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About Unix Timestamps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What is a Unix Timestamp?</h4>
              <p className="text-sm text-gray-600 mb-4">
                A Unix timestamp is the number of seconds that have elapsed since January 1, 1970, 
                00:00:00 UTC (the Unix epoch). It's a standard way to represent time in computing systems.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Also known as POSIX time or epoch time</li>
                <li>• Always in UTC (Coordinated Universal Time)</li>
                <li>• Commonly used in databases and APIs</li>
                <li>• Can be in seconds or milliseconds</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Common Use Cases</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Database timestamp storage</li>
                <li>• API response timestamps</li>
                <li>• Log file analysis</li>
                <li>• System administration</li>
                <li>• Programming and development</li>
                <li>• Data migration and synchronization</li>
                <li>• Blockchain and cryptocurrency</li>
                <li>• File system timestamps</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}