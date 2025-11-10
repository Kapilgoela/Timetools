import { useState, useEffect, useRef } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function StopwatchPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  
  // Timer state
  const [timerMinutes, setTimerMinutes] = useState('');
  const [timerSeconds, setTimerSeconds] = useState('');
  const [timerTime, setTimerTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stopwatch functions
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Timer functions
  useEffect(() => {
    if (timerRunning && timerTime > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerTime(prevTime => {
          if (prevTime <= 100) {
            setTimerRunning(false);
            setTimerFinished(true);
            return 0;
          }
          return prevTime - 100;
        });
      }, 100);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerRunning, timerTime]);

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const formatTimerTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const addLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
    }
  };

  const startTimer = () => {
    const minutes = parseInt(timerMinutes) || 0;
    const seconds = parseInt(timerSeconds) || 0;
    const totalMs = (minutes * 60 + seconds) * 1000;
    
    if (totalMs > 0) {
      setTimerTime(totalMs);
      setTimerRunning(true);
      setTimerFinished(false);
    }
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerTime(0);
    setTimerRunning(false);
    setTimerFinished(false);
  };

  const presetTimers = [
    { label: '1 minute', minutes: 1, seconds: 0 },
    { label: '5 minutes', minutes: 5, seconds: 0 },
    { label: '10 minutes', minutes: 10, seconds: 0 },
    { label: '15 minutes', minutes: 15, seconds: 0 },
    { label: '30 minutes', minutes: 30, seconds: 0 },
    { label: '1 hour', minutes: 60, seconds: 0 }
  ];

  const setPresetTimer = (preset: any) => {
    setTimerMinutes(preset.minutes.toString());
    setTimerSeconds(preset.seconds.toString());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Stopwatch & Timer</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Online stopwatch and timer for tracking time intervals and setting alarms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stopwatch */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stopwatch</h2>
            
            <div className="text-center mb-8">
              <div className="text-6xl font-mono font-bold text-blue-600 mb-6">
                {formatTime(time)}
              </div>
              
              <div className="flex justify-center gap-4 mb-6">
                {!isRunning ? (
                  <Button onClick={startStopwatch} className="whitespace-nowrap">
                    <i className="ri-play-line mr-2"></i>
                    Start
                  </Button>
                ) : (
                  <Button onClick={stopStopwatch} variant="outline" className="whitespace-nowrap">
                    <i className="ri-pause-line mr-2"></i>
                    Stop
                  </Button>
                )}
                
                <Button onClick={addLap} disabled={!isRunning} variant="outline" className="whitespace-nowrap">
                  <i className="ri-flag-line mr-2"></i>
                  Lap
                </Button>
                
                <Button onClick={resetStopwatch} variant="outline" className="whitespace-nowrap">
                  <i className="ri-refresh-line mr-2"></i>
                  Reset
                </Button>
              </div>
            </div>

            {laps.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lap Times</h3>
                <div className="max-h-48 overflow-y-auto">
                  {laps.map((lapTime, index) => (
                    <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg mb-2">
                      <span className="font-medium">Lap {index + 1}</span>
                      <span className="font-mono">{formatTime(lapTime)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Timer */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Timer</h2>
            
            <div className="text-center mb-8">
              {timerTime > 0 ? (
                <div className={`text-6xl font-mono font-bold mb-6 ${timerFinished ? 'text-red-600' : 'text-green-600'}`}>
                  {formatTimerTime(timerTime)}
                </div>
              ) : (
                <div className="text-6xl font-mono font-bold text-gray-400 mb-6">
                  00:00
                </div>
              )}

              {timerFinished && (
                <div className="text-2xl font-bold text-red-600 mb-4">
                  🔔 Time's Up!
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minutes
                  </label>
                  <Input
                    type="number"
                    value={timerMinutes}
                    onChange={(e) => setTimerMinutes(e.target.value)}
                    placeholder="0"
                    className="w-full text-center"
                    min="0"
                    max="999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seconds
                  </label>
                  <Input
                    type="number"
                    value={timerSeconds}
                    onChange={(e) => setTimerSeconds(e.target.value)}
                    placeholder="0"
                    className="w-full text-center"
                    min="0"
                    max="59"
                  />
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mb-6">
                {!timerRunning ? (
                  <Button onClick={startTimer} className="whitespace-nowrap">
                    <i className="ri-play-line mr-2"></i>
                    Start Timer
                  </Button>
                ) : (
                  <Button onClick={stopTimer} variant="outline" className="whitespace-nowrap">
                    <i className="ri-pause-line mr-2"></i>
                    Stop Timer
                  </Button>
                )}
                
                <Button onClick={resetTimer} variant="outline" className="whitespace-nowrap">
                  <i className="ri-refresh-line mr-2"></i>
                  Reset
                </Button>
              </div>
            </div>

            {/* Preset Timers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Timers</h3>
              <div className="grid grid-cols-2 gap-2">
                {presetTimers.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setPresetTimer(preset)}
                    className="text-sm whitespace-nowrap"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Information */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Stopwatch</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click "Start" to begin timing</li>
                <li>• Click "Stop" to pause the stopwatch</li>
                <li>• Click "Lap" while running to record lap times</li>
                <li>• Click "Reset" to clear the time and laps</li>
                <li>• Accurate to centiseconds (1/100th of a second)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Timer</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Set minutes and seconds for countdown</li>
                <li>• Use preset buttons for common durations</li>
                <li>• Click "Start Timer" to begin countdown</li>
                <li>• Timer will alert when time reaches zero</li>
                <li>• Perfect for cooking, workouts, and breaks</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}