import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function WorkingDaysPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [excludeHolidays, setExcludeHolidays] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateWorkingDays = () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      alert('Start date cannot be after end date');
      return;
    }

    let workingDays = 0;
    let totalDays = 0;
    let weekends = 0;
    let holidays = 0;

    const currentDate = new Date(start);
    const commonHolidays = getCommonHolidays(start.getFullYear(), end.getFullYear());

    while (currentDate <= end) {
      totalDays++;
      const dayOfWeek = currentDate.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Weekend
        weekends++;
      } else {
        // Check if it's a holiday
        const dateString = currentDate.toISOString().split('T')[0];
        const isHoliday = excludeHolidays && commonHolidays.includes(dateString);
        
        if (isHoliday) {
          holidays++;
        } else {
          workingDays++;
        }
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    setResult({
      startDate: start.toDateString(),
      endDate: end.toDateString(),
      totalDays,
      workingDays,
      weekends,
      holidays,
      weeks,
      remainingDays,
      excludeHolidays
    });
  };

  const getCommonHolidays = (startYear: number, endYear: number) => {
    const holidays = [];
    
    for (let year = startYear; year <= endYear; year++) {
      // Common US holidays (you can customize this list)
      holidays.push(
        `${year}-01-01`, // New Year's Day
        `${year}-07-04`, // Independence Day
        `${year}-12-25`, // Christmas Day
        // Add more holidays as needed
      );
    }
    
    return holidays;
  };

  const addWorkingDays = () => {
    if (!startDate) {
      alert('Please select a start date first');
      return;
    }

    const daysToAdd = prompt('How many working days would you like to add?');
    if (!daysToAdd || isNaN(parseInt(daysToAdd))) return;

    const start = new Date(startDate);
    let addedDays = 0;
    let currentDate = new Date(start);

    while (addedDays < parseInt(daysToAdd)) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();
      
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        addedDays++;
      }
    }

    setEndDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Working Days Calculator</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Calculate business days between dates, excluding weekends and holidays
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

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={excludeHolidays}
                onChange={(e) => setExcludeHolidays(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                Exclude common holidays (New Year's Day, Independence Day, Christmas)
              </span>
            </label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={calculateWorkingDays} className="whitespace-nowrap">
              <i className="ri-calculator-line mr-2"></i>
              Calculate Working Days
            </Button>
            <Button onClick={addWorkingDays} variant="outline" className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Add Working Days
            </Button>
          </div>
        </Card>

        {result && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Working Days Calculation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Date</h3>
                <div className="text-xl font-bold text-blue-600">
                  {result.startDate}
                </div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">End Date</h3>
                <div className="text-xl font-bold text-green-600">
                  {result.endDate}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{result.workingDays}</div>
                <div className="text-sm text-gray-600">Working Days</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{result.totalDays}</div>
                <div className="text-sm text-gray-600">Total Days</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{result.weekends}</div>
                <div className="text-sm text-gray-600">Weekend Days</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{result.holidays}</div>
                <div className="text-sm text-gray-600">Holidays</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Time Period Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Full weeks: </span>
                  <span className="font-medium">{result.weeks} weeks</span>
                </div>
                <div>
                  <span className="text-gray-600">Additional days: </span>
                  <span className="font-medium">{result.remainingDays} days</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
              <p className="text-gray-700">
                Between {result.startDate} and {result.endDate}, there are{' '}
                <strong>{result.workingDays} working days</strong> out of{' '}
                <strong>{result.totalDays} total days</strong>.
                {result.excludeHolidays && result.holidays > 0 && (
                  <> This calculation excludes {result.holidays} holiday(s).</>
                )}
              </p>
            </div>
          </Card>
        )}

        {/* Information Card */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">About Working Days</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What are Working Days?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Working days, also known as business days, are the days of the week that are typically 
                considered working days in most businesses. This usually excludes weekends (Saturday and Sunday).
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monday through Friday are working days</li>
                <li>• Weekends (Saturday & Sunday) are excluded</li>
                <li>• Public holidays may also be excluded</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Common Uses</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Project planning and deadlines</li>
                <li>• Shipping and delivery calculations</li>
                <li>• Business process timelines</li>
                <li>• Contract and legal deadlines</li>
                <li>• Payroll and HR calculations</li>
                <li>• Service level agreements (SLAs)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
}