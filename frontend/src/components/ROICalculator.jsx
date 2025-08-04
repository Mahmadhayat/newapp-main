import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Calculator, 
  X, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Users,
  Zap,
  CheckCircle
} from 'lucide-react';

const ROICalculator = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    hoursPerWeek: 10,
    hourlyRate: 25,
    numberOfEmployees: 5,
    workflowCost: 49,
    setupTime: 2
  });

  const [results, setResults] = useState({
    weeklyTimeSaved: 0,
    monthlySavings: 0,
    yearlySavings: 0,
    paybackPeriod: 0,
    roi: 0
  });

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  const calculateROI = () => {
    const { hoursPerWeek, hourlyRate, numberOfEmployees, workflowCost, setupTime } = inputs;
    
    const weeklyTimeSaved = hoursPerWeek * numberOfEmployees;
    const weeklySavings = weeklyTimeSaved * hourlyRate;
    const monthlySavings = weeklySavings * 4.33; // Average weeks per month
    const yearlySavings = monthlySavings * 12;
    
    const totalCost = workflowCost + (setupTime * hourlyRate);
    const paybackPeriod = totalCost / weeklySavings; // in weeks
    const roi = ((yearlySavings - totalCost) / totalCost) * 100;

    setResults({
      weeklyTimeSaved,
      monthlySavings,
      yearlySavings,
      paybackPeriod,
      roi
    });
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">ROI Calculator</h2>
                <p className="text-green-100">Calculate your automation savings</p>
              </div>
            </div>
            <Button 
              onClick={onClose}
              variant="ghost" 
              className="text-white hover:bg-green-800"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Your Current Situation</h3>
              
              <div className="space-y-6">
                {/* Hours per week */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Clock className="h-4 w-4 inline mr-2" />
                    Hours spent on manual tasks per week (per person)
                  </label>
                  <input
                    type="number"
                    value={inputs.hoursPerWeek}
                    onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.5"
                  />
                </div>

                {/* Hourly rate */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <DollarSign className="h-4 w-4 inline mr-2" />
                    Average hourly rate ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="1"
                  />
                </div>

                {/* Number of employees */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Users className="h-4 w-4 inline mr-2" />
                    Number of employees affected
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfEmployees}
                    onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="1"
                    step="1"
                  />
                </div>

                {/* Workflow cost */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Zap className="h-4 w-4 inline mr-2" />
                    Workflow cost ($)
                  </label>
                  <input
                    type="number"
                    value={inputs.workflowCost}
                    onChange={(e) => handleInputChange('workflowCost', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="1"
                  />
                </div>

                {/* Setup time */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Clock className="h-4 w-4 inline mr-2" />
                    Setup time (hours)
                  </label>
                  <input
                    type="number"
                    value={inputs.setupTime}
                    onChange={(e) => handleInputChange('setupTime', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Your Savings Potential</h3>
              
              <div className="space-y-4">
                {/* Weekly Time Saved */}
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">Weekly Time Saved</p>
                        <p className="text-2xl font-bold text-green-900">
                          {results.weeklyTimeSaved.toFixed(1)} hours
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Savings */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800">Monthly Savings</p>
                        <p className="text-2xl font-bold text-blue-900">
                          ${results.monthlySavings.toFixed(0)}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                {/* Yearly Savings */}
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-800">Yearly Savings</p>
                        <p className="text-2xl font-bold text-purple-900">
                          ${results.yearlySavings.toFixed(0)}
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                {/* Payback Period */}
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-800">Payback Period</p>
                        <p className="text-2xl font-bold text-orange-900">
                          {results.paybackPeriod.toFixed(1)} weeks
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                {/* ROI */}
                <Card className="border-teal-200 bg-teal-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-teal-800">Annual ROI</p>
                        <p className="text-2xl font-bold text-teal-900">
                          {results.roi.toFixed(0)}%
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-teal-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                <h4 className="font-semibold text-slate-900 mb-2">💡 Summary</h4>
                <p className="text-sm text-slate-700">
                  By investing ${inputs.workflowCost} in this workflow, you'll save{' '}
                  <strong>{results.weeklyTimeSaved.toFixed(1)} hours per week</strong> and{' '}
                  <strong>${results.yearlySavings.toFixed(0)} annually</strong>. 
                  The workflow pays for itself in just{' '}
                  <strong>{results.paybackPeriod.toFixed(1)} weeks</strong>!
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Get This Workflow
            </Button>
            <Button variant="outline" className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Save Calculation
            </Button>
            <Button variant="outline" className="flex-1">
              Share Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;