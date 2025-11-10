
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const isNegative = start > end;
    const [earlier, later] = isNegative ? [end, start] : [start, end];

    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((later.getTime() - earlier.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Calculate working days (excluding weekends)
    let workingDays = 0;
    const currentDate = new Date(earlier);
    while (currentDate <= later) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setResult({
      years,
      months,
      days,
      totalDays: isNegative ? -totalDays : totalDays,
      totalWeeks: isNegative ? -totalWeeks : totalWeeks,
      totalHours: isNegative ? -totalHours : totalHours,
      totalMinutes: isNegative ? -totalMinutes : totalMinutes,
      workingDays: isNegative ? -workingDays : workingDays,
      isNegative
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Days Between Dates Calculator</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Calculate the exact difference between any two dates
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
          
          <Button onClick={calculateDifference} className="w-full md:w-auto">
            <i className="ri-calculator-line mr-2"></i>
            Calculate Difference
          </Button>
        </Card>

        {result && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Date Difference {result.isNegative && '(Negative)'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{Math.abs(result.years)}</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{Math.abs(result.months)}</div>
                <div className="text-sm text-gray-600">Months</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{Math.abs(result.days)}</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900">{Math.abs(result.totalDays).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Days</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900">{Math.abs(result.totalWeeks).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Weeks</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900">{Math.abs(result.totalHours).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Total Hours</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-900">{Math.abs(result.workingDays).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Working Days</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
              <p className="text-gray-700">
                The difference between the selected dates is <strong>{Math.abs(result.totalDays)} days</strong> 
                ({Math.abs(result.totalWeeks)} weeks and {Math.abs(result.totalDays % 7)} days).
                {result.workingDays !== 0 && (
                  <> This includes <strong>{Math.abs(result.workingDays)} working days</strong> (excluding weekends).</>
                )}
              </p>
            </div>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
