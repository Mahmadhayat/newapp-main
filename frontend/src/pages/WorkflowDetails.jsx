import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import { 
  ArrowLeft, 
  Zap, 
  Clock, 
  CheckCircle, 
  Star,
  Download,
  Play,
  Settings,
  Users,
  TrendingUp
} from 'lucide-react';
import sampleWorkflows from '../data/sampleWorkflows.json';

const WorkflowDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [workflow, setWorkflow] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const foundWorkflow = sampleWorkflows.find(w => w.id === parseInt(id));
    setWorkflow(foundWorkflow);
  }, [id]);

  const handleDeploy = () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      toast({
        title: "Workflow Deployed Successfully!",
        description: "Your n8n workflow is now active and ready to automate your processes.",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      setIsDeploying(false);
    }, 2000);
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!workflow) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-slate-600">Workflow not found</p>
            <Button asChild className="mt-4">
              <Link to="/workflows">Back to Workflows</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900">
            <Link to="/workflows">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Workflows
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-teal-100 p-3 rounded-xl">
                <Zap className="h-8 w-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {workflow.title}
                </h1>
                <div className="flex items-center space-x-3">
                  <Badge className={getComplexityColor(workflow.complexity)}>
                    {workflow.complexity.charAt(0).toUpperCase() + workflow.complexity.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    {workflow.category}
                  </Badge>
                  {workflow.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-900 mb-1">{workflow.price}</div>
              <div className="text-sm text-slate-500">one-time purchase</div>
            </div>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            {workflow.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Use Case */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span>Perfect For</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  {workflow.useCase}
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <span>Key Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workflow.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-teal-600" />
                  <span>Required Integrations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {workflow.integrations.map((integration, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-lg text-center">
                      <div className="font-medium text-slate-900 text-sm">
                        {integration}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You'll need active accounts for these services. 
                    Setup instructions will be provided after purchase.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-teal-600" />
                  <span>How It Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Purchase & Download</h4>
                      <p className="text-sm text-slate-600">Get instant access to the n8n workflow file and setup guide.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Import to n8n</h4>
                      <p className="text-sm text-slate-600">Import the workflow into your n8n instance (cloud or self-hosted).</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Configure Integrations</h4>
                      <p className="text-sm text-slate-600">Connect your accounts and customize settings according to the guide.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 text-teal-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Activate & Automate</h4>
                      <p className="text-sm text-slate-600">Turn on the workflow and start automating your processes immediately.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Setup Time</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium">{workflow.estimatedSetupTime}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Complexity</span>
                  <Badge className={getComplexityColor(workflow.complexity)}>
                    {workflow.complexity.charAt(0).toUpperCase() + workflow.complexity.slice(1)}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Category</span>
                  <span className="text-sm font-medium">{workflow.category}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button 
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    size="lg"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {isDeploying ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Deploying...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Deploy Workflow</span>
                      </div>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full"
                  >
                    Preview Workflow
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500">
                    30-day money-back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Get support with setup and customization.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/custom-request">
                    Request Custom Modification
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default WorkflowDetails;