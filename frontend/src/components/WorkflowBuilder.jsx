import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Trash2, 
  Settings, 
  Play, 
  Save,
  Download,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const WorkflowBuilder = ({ isOpen, onClose }) => {
  const [workflowSteps, setWorkflowSteps] = useState([
    { id: 1, type: 'trigger', title: 'Trigger', description: 'When this happens...', icon: '⚡' },
    { id: 2, type: 'action', title: 'Action', description: 'Do this...', icon: '🔧' }
  ]);
  const [workflowName, setWorkflowName] = useState('My Custom Workflow');

  const stepTypes = [
    { type: 'trigger', title: 'Trigger', icon: '⚡', color: 'bg-green-100 text-green-800' },
    { type: 'action', title: 'Action', icon: '🔧', color: 'bg-blue-100 text-blue-800' },
    { type: 'condition', title: 'Condition', icon: '❓', color: 'bg-yellow-100 text-yellow-800' },
    { type: 'delay', title: 'Delay', icon: '⏰', color: 'bg-purple-100 text-purple-800' }
  ];

  const addStep = (type) => {
    const newStep = {
      id: Date.now(),
      type,
      title: stepTypes.find(s => s.type === type)?.title || 'Step',
      description: 'Configure this step...',
      icon: stepTypes.find(s => s.type === type)?.icon || '🔧'
    };
    setWorkflowSteps([...workflowSteps, newStep]);
  };

  const removeStep = (id) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== id));
  };

  const saveWorkflow = () => {
    // Simulate saving workflow
    alert(`Workflow "${workflowName}" saved successfully!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Workflow Builder</h2>
                <p className="text-teal-100">Create your custom n8n automation</p>
              </div>
            </div>
            <Button 
              onClick={onClose}
              variant="ghost" 
              className="text-white hover:bg-teal-800"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Workflow Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Workflow Name
            </label>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Add Step Buttons */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Add Steps</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stepTypes.map((stepType) => (
                <Button
                  key={stepType.type}
                  onClick={() => addStep(stepType.type)}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-center space-y-2"
                >
                  <span className="text-2xl">{stepType.icon}</span>
                  <span className="text-sm font-medium">{stepType.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Workflow Steps</h3>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <Card className="border-2 border-dashed border-slate-200 hover:border-teal-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{step.icon}</div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{step.title}</h4>
                            <p className="text-sm text-slate-600">{step.description}</p>
                          </div>
                          <Badge className={stepTypes.find(s => s.type === step.type)?.color}>
                            {step.type}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeStep(step.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow between steps */}
                  {index < workflowSteps.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-6 w-6 text-slate-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button onClick={saveWorkflow} className="bg-teal-600 hover:bg-teal-700 text-white flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Workflow
            </Button>
            <Button variant="outline" className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Test Workflow
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export to n8n
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;