import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function FutureDatePage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('days');
  const [result, setResult] = useState<any>(null);

  const calculateFutureDate = () => {
    if (!startDate || !amount) {
      alert('Please enter both date and amount');
      return;
    }

    const date = new Date(startDate);
    const value = parseInt(amount);
    
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    let futureDate = new Date(date);

    switch (unit) {
      case 'days':
        futureDate.setDate(date.getDate() + value);
        break;
      case 'weeks':
        futureDate.setDate(date.getDate() + (value * 7));
        break;
      case 'months':
        futureDate.setMonth(date.getMonth() + value);
        break;
      case 'years':
        futureDate.setFullYear(date.getFullYear() + value);
        break;
    }

    const daysDifference = Math.floor((futureDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.floor(daysDifference / 7);

    // Calculate working days
    let workingDays = 0;
    const currentDate = new Date(date);
    while (currentDate < futureDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResult({
      startDate: date.toDateString(),
      futureDate: futureDate.toDateString(),
      amount: value,
      unit,
      daysDifference,
      weeksDifference,
      workingDays,
      dayOfWeek: futureDate.toLocaleDateString('en-US', { weekday: 'long' })
    });
  };

  const commonPeriods = [
    { label: '30 days from now', amount: 30, unit: 'days' },
    { label: '60 days from now', amount: 60, unit: 'days' },
    { label: '90 days from now', amount: 90, unit: 'days' },
    { label: '6 months from now', amount: 6, unit: 'months' },
    { label: '1 year from now', amount: 1, unit: 'years' },
    { label: '2 years from now', amount: 2, unit: 'years' }
  ];

  const setCommonPeriod = (period: any) => {
    setAmount(period.amount.toString());
    setUnit(period.unit);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Future Date Calculator</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Calculate what date it will be after adding time periods
          </p>
        </div>

        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                Add Amount
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter number"
                className="w-full"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
          
          <Button onClick={calculateFutureDate} className="w-full md:w-auto">
            <i className="ri-calendar-check-line mr-2"></i>
            Calculate Future Date
          </Button>
        </Card>

        {/* Common Periods */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Time Periods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonPeriods.map((period, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setCommonPeriod(period)}
                className="text-left p-3 h-auto whitespace-nowrap"
              >
                {period.label}
              </Button>
            ))}
          </div>
        </Card>

        {result && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Future Date Result</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Date</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {result.startDate}
                </div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Future Date</h3>
                <div className="text-2xl font-bold text-green-600">
                  {result.futureDate}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  ({result.dayOfWeek})
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{result.daysDifference}</div>
                <div className="text-sm text-gray-600">Total Days</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{result.weeksDifference}</div>
                <div className="text-sm text-gray-600">Total Weeks</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">{result.workingDays}</div>
                <div className="text-sm text-gray-600">Working Days</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Calculation Summary</h3>
              <p className="text-gray-700">
                Adding <strong>{result.amount} {result.unit}</strong> to {result.startDate} 
                gives you <strong>{result.futureDate}</strong>.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Day of the week: </span>
                  <span className="font-medium">{result.dayOfWeek}</span>
                </div>
                <div>
                  <span className="text-gray-600">Working days (Mon-Fri): </span>
                  <span className="font-medium">{result.workingDays} days</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}