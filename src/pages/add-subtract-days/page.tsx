import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function AddSubtractDaysPage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState('add');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('days');
  const [result, setResult] = useState<any>(null);

  const calculateDate = () => {
    if (!startDate || !amount) {
      alert('Please enter both date and amount');
      return;
    }

    const date = new Date(startDate);
    const value = parseInt(amount);
    
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    const multiplier = operation === 'add' ? 1 : -1;
    const finalValue = value * multiplier;

    let resultDate = new Date(date);

    switch (unit) {
      case 'days':
        resultDate.setDate(date.getDate() + finalValue);
        break;
      case 'weeks':
        resultDate.setDate(date.getDate() + (finalValue * 7));
        break;
      case 'months':
        resultDate.setMonth(date.getMonth() + finalValue);
        break;
      case 'years':
        resultDate.setFullYear(date.getFullYear() + finalValue);
        break;
    }

    const daysDifference = Math.floor((resultDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      originalDate: date.toDateString(),
      resultDate: resultDate.toDateString(),
      operation,
      amount: value,
      unit,
      daysDifference: Math.abs(daysDifference),
      isInFuture: resultDate > date
    });
  };

  const presetOperations = [
    { label: 'Add 30 days', operation: 'add', amount: 30, unit: 'days' },
    { label: 'Add 90 days', operation: 'add', amount: 90, unit: 'days' },
    { label: 'Add 1 year', operation: 'add', amount: 1, unit: 'years' },
    { label: 'Subtract 30 days', operation: 'subtract', amount: 30, unit: 'days' }
  ];

  const setPreset = (preset: any) => {
    setOperation(preset.operation);
    setAmount(preset.amount.toString());
    setUnit(preset.unit);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Add/Subtract Days Calculator</strong>
          </h1>
          <p className="text-xl text-gray-600">
            Add or subtract days, weeks, months, or years from any date
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
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
              >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
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
                Unit
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
          
          <Button onClick={calculateDate} className="w-full md:w-auto">
            <i className="ri-calculator-line mr-2"></i>
            Calculate Date
          </Button>
        </Card>

        {/* Quick Presets */}
        <Card className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Calculations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetOperations.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setPreset(preset)}
                className="text-left p-3 h-auto whitespace-nowrap"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </Card>

        {result && (
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculation Result</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Original Date</h3>
                <div className="text-2xl font-bold text-blue-600">
                  {result.originalDate}
                </div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Result Date</h3>
                <div className="text-2xl font-bold text-green-600">
                  {result.resultDate}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Operation Summary</h3>
              <p className="text-gray-700">
                <strong>{result.operation === 'add' ? 'Added' : 'Subtracted'}</strong> {result.amount} {result.unit} 
                {result.operation === 'add' ? ' to ' : ' from '} {result.originalDate}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total days difference: </span>
                  <span className="font-medium">{result.daysDifference} days</span>
                </div>
                <div>
                  <span className="text-gray-600">Direction: </span>
                  <span className="font-medium">{result.isInFuture ? 'Future' : 'Past'}</span>
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