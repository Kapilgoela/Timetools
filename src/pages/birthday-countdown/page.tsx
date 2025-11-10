import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function BirthdayCountdownPage() {
  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [countdown, setCountdown] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && birthDate) {
      interval = setInterval(() => {
        const now = new Date();
        const birth = new Date(birthDate);
        
        // Calculate next birthday
        let nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        
        // If birthday has passed this year, set to next year
        if (nextBirthday < now) {
          nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const difference = nextBirthday.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          // Calculate age on next birthday
          const currentAge = now.getFullYear() - birth.getFullYear();
          const hasHadBirthdayThisYear = now >= new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
          const nextAge = hasHadBirthdayThisYear ? currentAge + 1 : currentAge;

          setCountdown({
            days,
            hours,
            minutes,
            seconds,
            nextBirthday: nextBirthday.toDateString(),
            nextAge,
            isToday: days === 0 && hours === 0 && minutes === 0 && seconds === 0
          });
        } else {
          setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            nextBirthday: nextBirthday.toDateString(),
            nextAge: now.getFullYear() - birth.getFullYear(),
            isToday: true
          });
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, birthDate]);

  const startCountdown = () => {
    if (!birthDate) {
      alert('Please enter your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) {
      alert('Birth date cannot be in the future');
      return;
    }

    setIsActive(true);
  };

  const stopCountdown = () => {
    setIsActive(false);
    setCountdown(null);
  };

  const calculateAge = () => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const now = new Date();
    
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const currentAge = calculateAge();

  const zodiacSigns = [
    { name: 'Aries', start: [3, 21], end: [4, 19], emoji: '♈' },
    { name: 'Taurus', start: [4, 20], end: [5, 20], emoji: '♉' },
    { name: 'Gemini', start: [5, 21], end: [6, 20], emoji: '♊' },
    { name: 'Cancer', start: [6, 21], end: [7, 22], emoji: '♋' },
    { name: 'Leo', start: [7, 23], end: [8, 22], emoji: '♌' },
    { name: 'Virgo', start: [8, 23], end: [9, 22], emoji: '♍' },
    { name: 'Libra', start: [9, 23], end: [10, 22], emoji: '♎' },
    { name: 'Scorpio', start: [10, 23], end: [11, 21], emoji: '♏' },
    { name: 'Sagittarius', start: [11, 22], end: [12, 21], emoji: '♐' },
    { name: 'Capricorn', start: [12, 22], end: [1, 19], emoji: '♑' },
    { name: 'Aquarius', start: [1, 20], end: [2, 18], emoji: '♒' },
    { name: 'Pisces', start: [2, 19], end: [3, 20], emoji: '♓' }
  ];

  const getZodiacSign = () => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const month = birth.getMonth() + 1;
    const day = birth.getDate();

    for (const sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;

      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month === startMonth || month === endMonth))
      ) {
        return sign;
      }
    }

    return null;
  };

  const zodiacSign = getZodiacSign();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Birthday Countdown</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Count down to your next birthday and see how many days are left
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name (Optional)
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Date
              </label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={startCountdown} disabled={isActive} className="whitespace-nowrap">
              <i className="ri-cake-line mr-2"></i>
              Start Birthday Countdown
            </Button>
            <Button onClick={stopCountdown} variant="outline" disabled={!isActive} className="whitespace-nowrap">
              <i className="ri-stop-line mr-2"></i>
              Stop Countdown
            </Button>
          </div>
        </Card>

        {/* Current Age & Info */}
        {birthDate && (
          <Card className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{currentAge}</div>
                <div className="text-sm text-gray-600">Current Age</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl">{zodiacSign?.emoji}</div>
                <div className="text-sm text-gray-600">{zodiacSign?.name}</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {new Date(birthDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-sm text-gray-600">Birthday</div>
              </div>
            </div>
          </Card>
        )}

        {/* Countdown Display */}
        {countdown && (
          <Card className="text-center">
            {name && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {name}'s Birthday Countdown
              </h2>
            )}
            
            {countdown.isToday ? (
              <div className="py-12">
                <div className="text-6xl mb-4">🎉🎂🎉</div>
                <h3 className="text-4xl font-bold text-pink-600 mb-4">Happy Birthday!</h3>
                <p className="text-xl text-gray-600">
                  {name ? `Happy ${countdown.nextAge}th Birthday, ${name}!` : `You're ${countdown.nextAge} today!`}
                </p>
                <p className="text-lg text-gray-500 mt-2">
                  Hope you have a wonderful day! 🎈
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-pink-600 mb-2">
                      {countdown.days}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-purple-600 mb-2">
                      {countdown.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-2">
                      {countdown.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-green-600 mb-2">
                      {countdown.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm md:text-base text-gray-600">Seconds</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Next Birthday: {countdown.nextBirthday}
                  </h3>
                  <p className="text-gray-700">
                    {name ? `${name} will be` : 'You will be'} <strong>{countdown.nextAge} years old</strong>
                  </p>
                  {countdown.days === 1 && (
                    <p className="text-pink-600 font-semibold mt-2">
                      🎉 Your birthday is tomorrow! 🎉
                    </p>
                  )}
                  {countdown.days <= 7 && countdown.days > 1 && (
                    <p className="text-purple-600 font-semibold mt-2">
                      🎂 Your birthday is coming up this week! 🎂
                    </p>
                  )}
                </div>
              </>
            )}
          </Card>
        )}

        {/* Birthday Facts */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Birthday Fun Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Did You Know?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• The most common birthday is September 9th</li>
                <li>• The least common birthday is February 29th</li>
                <li>• About 385,000 babies are born worldwide each day</li>
                <li>• The birthday song is one of the most recognized songs</li>
                <li>• Ancient Greeks believed birthdays were protected by spirits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Birthday Traditions</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Blowing out candles started with ancient Greeks</li>
                <li>• Birthday cakes date back to ancient Rome</li>
                <li>• The birthday song was written in 1893</li>
                <li>• Birthday parties became popular in the 19th century</li>
                <li>• Different cultures have unique birthday customs</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}