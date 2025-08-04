import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Send, 
  Zap,
  FileText,
  Clock,
  DollarSign
} from 'lucide-react';
import sampleWorkflows from '../data/sampleWorkflows.json';

const WorkflowModificationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    requestType: 'modification',
    modifications: '',
    urgency: 'normal',
    budget: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundWorkflow = sampleWorkflows.find(w => w.id === parseInt(id));
    if (foundWorkflow) {
      setWorkflow(foundWorkflow);
    }
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create the modification request
    const modificationRequest = {
      id: Date.now(),
      workflowId: id,
      workflowTitle: workflow.title,
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      type: 'modification'
    };
    
    // Store in localStorage (in real app, this would be API call)
    const existingRequests = JSON.parse(localStorage.getItem('modificationRequests') || '[]');
    existingRequests.push(modificationRequest);
    localStorage.setItem('modificationRequests', JSON.stringify(existingRequests));
    
    setTimeout(() => {
      alert('Your modification request has been submitted successfully! We will contact you within 24 hours.');
      setIsSubmitting(false);
      navigate('/workflows');
    }, 2000);
  };

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-slate-600">Workflow not found</p>
          <Button onClick={() => navigate('/workflows')} className="mt-4">
            Back to Workflows
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate(`/workflow/${id}`)} 
            variant="ghost" 
            className="text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workflow
          </Button>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <FileText className="h-8 w-8 text-teal-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Request Workflow Modifications
            </h1>
            <p className="text-lg text-slate-600">
              Need changes to this workflow? Let us customize it for your specific needs.
            </p>
          </div>
        </div>

        {/* Workflow Info */}
        <Card className="mb-8 shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-1">
                  {workflow.title}
                </h3>
                <p className="text-slate-600 mb-2">{workflow.description}</p>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="bg-teal-50 text-teal-700">
                    {workflow.category}
                  </Badge>
                  <Badge variant="outline">
                    {workflow.complexity}
                  </Badge>
                  <span className="text-sm text-slate-500">
                    Current Price: {workflow.price}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.clientName}
                        onChange={(e) => handleInputChange('clientName', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modification Details */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Modification Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      What changes do you need? *
                    </label>
                    <Textarea
                      value={formData.modifications}
                      onChange={(e) => handleInputChange('modifications', e.target.value)}
                      placeholder="Please describe the specific changes you need to this workflow. Be as detailed as possible..."
                      rows={6}
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Include details about new integrations, changed logic, additional features, etc.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Urgency Level
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="low">Low - Within 2 weeks</option>
                        <option value="normal">Normal - Within 1 week</option>
                        <option value="high">High - Within 3 days</option>
                        <option value="urgent">Urgent - Within 24 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Budget Range (Optional)
                      </label>
                      <Input
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder="e.g., $100-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      placeholder="Any additional information, requirements, or questions..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Process Info */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-teal-600" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-100 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Submit Request</p>
                        <p className="text-xs text-slate-600">Fill out this form with your requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-100 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Get Quote</p>
                        <p className="text-xs text-slate-600">Receive pricing within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-100 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Development</p>
                        <p className="text-xs text-slate-600">We customize the workflow</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-100 text-teal-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Delivery</p>
                        <p className="text-xs text-slate-600">Get your customized workflow</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Info */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-teal-600" />
                    Pricing Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Minor changes:</span>
                      <span className="font-medium">$50-100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">New integrations:</span>
                      <span className="font-medium">$100-200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Logic changes:</span>
                      <span className="font-medium">$150-300</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Major overhaul:</span>
                      <span className="font-medium">$300+</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    Final pricing depends on complexity and requirements
                  </p>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Submit Request</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkflowModificationRequest;