import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  BarChart3, 
  Zap, 
  DollarSign, 
  Eye, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  User,
  Plus,
  Settings,
  Users,
  FileText
} from 'lucide-react';
import sampleWorkflows from '../data/sampleWorkflows.json';

const Dashboard = () => {
  const [workflows, setWorkflows] = useState([]);
  const [customRequests, setCustomRequests] = useState([]);

  useEffect(() => {
    // Load workflows
    setWorkflows(sampleWorkflows);

    // Simulate custom requests
    const mockRequests = [
      {
        id: 1,
        title: "CRM Lead Scoring Automation",
        clientName: "TechCorp Solutions",
        budget: "$500-1000",
        deliveryTime: 21,
        status: "pending",
        submittedDate: "2025-01-10",
        category: "CRM Integration",
        priority: "high"
      },
      {
        id: 2,
        title: "Multi-Platform Content Distribution",
        clientName: "Digital Marketing Agency",
        budget: "$200-500",
        deliveryTime: 14,
        status: "in_progress",
        submittedDate: "2025-01-08",
        category: "Marketing Automation",
        priority: "medium"
      },
      {
        id: 3,
        title: "Automated Invoice Processing",
        clientName: "Accounting Firm LLC",
        budget: "$1000+",
        deliveryTime: 30,
        status: "completed",
        submittedDate: "2025-01-05",
        category: "Financial Automation",
        priority: "low"
      }
    ];
    setCustomRequests(mockRequests);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-3 w-3" />;
      case 'in_progress':
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'completed':
      case 'accepted':
        return <CheckCircle className="h-3 w-3" />;
      case 'rejected':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Dashboard stats
  const stats = [
    {
      title: "Ready-Made Workflows",
      value: workflows.length,
      icon: <Zap className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Custom Requests",
      value: customRequests.length,
      icon: <FileText className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Pending Requests",
      value: customRequests.filter(r => r.status === 'pending').length,
      icon: <Clock className="h-6 w-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Total Revenue",
      value: "$12,450",
      icon: <DollarSign className="h-6 w-6" />,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-slate-600">
                Manage workflows, custom requests, and track platform performance.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                asChild
                variant="outline"
                className="border-slate-300"
              >
                <Link to="/workflows">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Workflows
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Link to="/custom-request">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Workflow
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="workflows" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Workflows</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Custom Requests</span>
            </TabsTrigger>
          </TabsList>

          {/* Workflows Tab */}
          <TabsContent value="workflows">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Ready-Made Workflows</span>
                  <Badge variant="secondary">{workflows.length} workflows</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {workflows.length > 0 ? (
                  <div className="space-y-4">
                    {workflows.slice(0, 5).map((workflow) => (
                      <div key={workflow.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-slate-900">
                                {workflow.title}
                              </h3>
                              {workflow.featured && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                              {workflow.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{workflow.price}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{workflow.estimatedSetupTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{workflow.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge 
                              variant="outline" 
                              className="bg-green-100 text-green-800 border-green-200"
                            >
                              Active
                            </Badge>
                            <div className="flex space-x-2">
                              <Button 
                                asChild 
                                size="sm" 
                                variant="outline"
                              >
                                <Link to={`/workflow/${workflow.id}`}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Link>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                              >
                                <Settings className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Zap className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-lg font-medium text-slate-900 mb-2">No workflows yet</p>
                    <p className="text-slate-600 mb-4">Start by adding your first n8n workflow</p>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                      <Link to="/custom-request">Add Workflow</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Requests Tab */}
          <TabsContent value="requests">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Custom Workflow Requests</span>
                  <Badge variant="secondary">{customRequests.length} requests</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {customRequests.length > 0 ? (
                  <div className="space-y-4">
                    {customRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-slate-900">
                                {request.title}
                              </h3>
                              <Badge 
                                variant="outline" 
                                className={getPriorityColor(request.priority)}
                              >
                                {request.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-slate-600 mb-3">
                              <User className="h-4 w-4" />
                              <span>{request.clientName}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{request.budget}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{request.deliveryTime} days</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Submitted {new Date(request.submittedDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{request.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(request.status)} flex items-center space-x-1`}
                            >
                              {getStatusIcon(request.status)}
                              <span>{formatStatus(request.status)}</span>
                            </Badge>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Contact Client
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-lg font-medium text-slate-900 mb-2">No custom requests yet</p>
                    <p className="text-slate-600 mb-4">Custom workflow requests will appear here when clients submit them</p>
                    <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                      <Link to="/workflows">Manage Workflows</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;