import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  CheckCircle, 
  Clock,
  Zap,
  ArrowRight,
  Settings,
  Activity
} from 'lucide-react';

const WorkflowSimulator = ({ isOpen, onClose, workflowData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationData, setSimulationData] = useState({});
  const [speed, setSpeed] = useState(1000); // milliseconds

  const defaultWorkflow = {
    title: "E-commerce Order Processing",
    description: "Automated order processing from receipt to fulfillment",
    steps: [
      {
        id: 1,
        title: "Order Received",
        description: "New order detected in Shopify",
        type: "trigger",
        icon: "📦",
        data: { orderId: "#12345", customer: "John Doe", amount: "$99.99" },
        duration: 1000
      },
      {
        id: 2,
        title: "Validate Payment",
        description: "Check payment status with Stripe",
        type: "action",
        icon: "💳",
        data: { status: "confirmed", method: "Credit Card", fee: "$3.20" },
        duration: 1500
      },
      {
        id: 3,
        title: "Check Inventory",
        description: "Verify product availability",
        type: "condition",
        icon: "📊",
        data: { product: "Wireless Headphones", stock: "15 units", status: "available" },
        duration: 800
      },
      {
        id: 4,
        title: "Send Confirmation",
        description: "Email confirmation to customer",
        type: "action",
        icon: "📧",
        data: { recipient: "john@example.com", template: "order_confirmation", sent: true },
        duration: 1200
      },
      {
        id: 5,
        title: "Update CRM",
        description: "Add customer data to Salesforce",
        type: "action",
        icon: "👤",
        data: { contact: "John Doe", status: "updated", segment: "premium" },
        duration: 1000
      },
      {
        id: 6,
        title: "Generate Invoice",
        description: "Create invoice in QuickBooks",
        type: "action",
        icon: "🧾",
        data: { invoiceId: "INV-001", amount: "$99.99", status: "generated" },
        duration: 1500
      },
      {
        id: 7,
        title: "Notify Fulfillment",
        description: "Send order to warehouse via Slack",
        type: "action",
        icon: "🏭",
        data: { channel: "#fulfillment", priority: "normal", assigned: "Warehouse Team" },
        duration: 800
      }
    ]
  };

  const workflow = workflowData || defaultWorkflow;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= workflow.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, workflow.steps.length]);

  const playSimulation = () => {
    setIsPlaying(true);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSimulationData({});
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'active': return 'bg-blue-500 text-white animate-pulse';
      case 'pending': return 'bg-slate-200 text-slate-500';
      default: return 'bg-slate-200 text-slate-500';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'trigger': return 'bg-green-100 text-green-800';
      case 'action': return 'bg-blue-100 text-blue-800';
      case 'condition': return 'bg-yellow-100 text-yellow-800';
      case 'delay': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Workflow Simulator</h2>
                <p className="text-purple-100">Watch your automation in action</p>
              </div>
            </div>
            <Button 
              onClick={onClose}
              variant="ghost" 
              className="text-white hover:bg-purple-800"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Workflow Info */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{workflow.title}</h3>
            <p className="text-slate-600 mb-4">{workflow.description}</p>
            
            {/* Controls */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={isPlaying ? pauseSimulation : playSimulation}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                <Button onClick={resetSimulation} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-slate-700">Speed:</label>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="px-2 py-1 border border-slate-300 rounded text-sm"
                  >
                    <option value={2000}>0.5x</option>
                    <option value={1000}>1x</option>
                    <option value={500}>2x</option>
                    <option value={250}>4x</option>
                  </select>
                </div>
                <div className="text-sm text-slate-600">
                  Step {currentStep + 1} of {workflow.steps.length}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-slate-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / workflow.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Steps List */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Workflow Steps</h4>
              {workflow.steps.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step.id} className="relative">
                    <Card className={`transition-all duration-300 ${
                      status === 'active' ? 'ring-2 ring-purple-500 shadow-lg' : 
                      status === 'completed' ? 'bg-green-50 border-green-200' : ''
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getStepColor(status)}`}>
                            {status === 'completed' ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xl">{step.icon}</span>
                              <h5 className="font-semibold text-slate-900">{step.title}</h5>
                              <Badge className={getTypeColor(step.type)}>
                                {step.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600">{step.description}</p>
                          </div>
                          {status === 'active' && (
                            <div className="flex items-center space-x-1 text-blue-600">
                              <Clock className="h-4 w-4 animate-spin" />
                              <span className="text-xs">Processing...</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Arrow between steps */}
                    {index < workflow.steps.length - 1 && (
                      <div className="flex justify-center my-2">
                        <ArrowRight className={`h-5 w-5 ${
                          status === 'completed' ? 'text-green-500' : 'text-slate-300'
                        }`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Current Step Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Step Details</h4>
              {currentStep < workflow.steps.length && (
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{workflow.steps[currentStep].icon}</span>
                      <span>{workflow.steps[currentStep].title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 mb-4">{workflow.steps[currentStep].description}</p>
                    
                    {/* Step Data */}
                    <div className="bg-white p-4 rounded-lg border">
                      <h6 className="font-semibold text-slate-900 mb-2">Data Processing:</h6>
                      <div className="space-y-2">
                        {Object.entries(workflow.steps[currentStep].data).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="font-medium text-slate-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Integration Info */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Integration: {workflow.steps[currentStep].type === 'trigger' ? 'Webhook' : 'API Call'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Simulation Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Steps:</span>
                      <span className="font-medium">{workflow.steps.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Completed:</span>
                      <span className="font-medium text-green-600">{currentStep}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Remaining:</span>
                      <span className="font-medium text-blue-600">{workflow.steps.length - currentStep}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Est. Runtime:</span>
                      <span className="font-medium">~{Math.round(workflow.steps.reduce((acc, step) => acc + step.duration, 0) / 1000)}s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Deploy This Workflow
            </Button>
            <Button variant="outline" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Customize Workflow
            </Button>
            <Button variant="outline" className="flex-1">
              Save Simulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSimulator;