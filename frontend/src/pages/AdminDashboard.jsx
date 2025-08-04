import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
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
  FileText,
  LogOut,
  Shield,
  Edit,
  Trash2,
  PlayCircle,
  PauseCircle,
  Activity,
  Target,
  MoreHorizontal
} from 'lucide-react';
import sampleWorkflows from '../data/sampleWorkflows.json';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workflows, setWorkflows] = useState([]);
  const [customRequests, setCustomRequests] = useState([]);
  const [modificationRequests, setModificationRequests] = useState([]);
  const [projects, setProjects] = useState([]);

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

    // Load modification requests from localStorage
    const storedModificationRequests = JSON.parse(localStorage.getItem('modificationRequests') || '[]');
    setModificationRequests(storedModificationRequests);

    // Simulate all projects (workflows + custom requests combined)
    const mockProjects = [
      {
        id: 1,
        title: "E-commerce Order Processing",
        type: "workflow",
        status: "active",
        deployments: 45,
        revenue: "$2,205",
        lastUpdated: "2025-01-10",
        progress: 100
      },
      {
        id: 2,
        title: "CRM Lead Scoring Automation",
        type: "custom",
        status: "in_development",
        client: "TechCorp Solutions",
        progress: 65,
        dueDate: "2025-01-31",
        lastUpdated: "2025-01-10"
      },
      {
        id: 3,
        title: "Social Media Content Scheduler",
        type: "workflow",
        status: "active",
        deployments: 32,
        revenue: "$928",
        lastUpdated: "2025-01-09",
        progress: 100
      },
      {
        id: 4,
        title: "Multi-Platform Content Distribution",
        type: "custom",
        status: "in_development",
        client: "Digital Marketing Agency",
        progress: 40,
        dueDate: "2025-01-22",
        lastUpdated: "2025-01-08"
      },
      {
        id: 5,
        title: "Automated Invoice Processing",
        type: "custom",
        status: "completed",
        client: "Accounting Firm LLC",
        progress: 100,
        completedDate: "2025-01-05",
        lastUpdated: "2025-01-05"
      }
    ];
    setProjects(mockProjects);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'in_progress':
        return <AlertCircle className="h-3 w-3" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3" />;
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

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_development':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProjectStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <PlayCircle className="h-3 w-3" />;
      case 'in_development':
        return <Activity className="h-3 w-3" />;
      case 'paused':
        return <PauseCircle className="h-3 w-3" />;
      case 'completed':
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  // Project Management Functions
  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    toast({
      title: "Project Deleted",
      description: "The project has been successfully removed.",
      className: "bg-red-50 border-red-200 text-red-800"
    });
  };

  const handleToggleProjectStatus = (projectId) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const newStatus = p.status === 'active' ? 'paused' : 'active';
        return { ...p, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] };
      }
      return p;
    }));
    toast({
      title: "Project Status Updated",
      description: "The project status has been changed successfully.",
      className: "bg-blue-50 border-blue-200 text-blue-800"
    });
  };

  const handleUpdateProgress = (projectId, newProgress) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const status = newProgress === 100 ? 'completed' : p.status;
        return { 
          ...p, 
          progress: newProgress, 
          status,
          lastUpdated: new Date().toISOString().split('T')[0],
          ...(newProgress === 100 && { completedDate: new Date().toISOString().split('T')[0] })
        };
      }
      return p;
    }));
    toast({
      title: "Progress Updated",
      description: `Project progress updated to ${newProgress}%.`,
      className: "bg-green-50 border-green-200 text-green-800"
    });
  };

  const handleDeleteWorkflow = (workflowId) => {
    setWorkflows(workflows.filter(w => w.id !== workflowId));
    toast({
      title: "Workflow Deleted",
      description: "The workflow has been successfully removed.",
      className: "bg-red-50 border-red-200 text-red-800"
    });
  };

  const handleUpdateRequestStatus = (requestId, newStatus) => {
    setCustomRequests(customRequests.map(r => {
      if (r.id === requestId) {
        return { ...r, status: newStatus };
      }
      return r;
    }));
    toast({
      title: "Request Status Updated",
      description: `Request status changed to ${formatStatus(newStatus)}.`,
      className: "bg-blue-50 border-blue-200 text-blue-800"
    });
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
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-800 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
                <p className="text-sm text-slate-600">Automation Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                asChild
                variant="outline"
                size="sm"
              >
                <Link to="/">
                  <Eye className="h-4 w-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button 
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  Dashboard Overview
                </h2>
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
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[800px]">
              <TabsTrigger value="projects" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>All Projects</span>
              </TabsTrigger>
              <TabsTrigger value="workflows" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Workflows</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Custom Requests</span>
              </TabsTrigger>
              <TabsTrigger value="modifications" className="flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Modifications</span>
              </TabsTrigger>
            </TabsList>

            {/* All Projects Tab */}
            <TabsContent value="projects">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>All Projects Overview</span>
                    <Badge variant="secondary">{projects.length} projects</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projects.length > 0 ? (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-slate-900">
                                  {project.title}
                                </h3>
                                <Badge 
                                  variant="outline" 
                                  className={project.type === 'workflow' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}
                                >
                                  {project.type === 'workflow' ? 'Workflow' : 'Custom'}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={`${getProjectStatusColor(project.status)} flex items-center space-x-1`}
                                >
                                  {getProjectStatusIcon(project.status)}
                                  <span>{formatStatus(project.status)}</span>
                                </Badge>
                              </div>
                              
                              {/* Project Details */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                  {project.type === 'workflow' ? (
                                    <>
                                      <div className="flex items-center space-x-1 text-sm text-slate-500">
                                        <Users className="h-4 w-4" />
                                        <span>{project.deployments} deployments</span>
                                      </div>
                                      <div className="flex items-center space-x-1 text-sm text-slate-500">
                                        <DollarSign className="h-4 w-4" />
                                        <span>{project.revenue} revenue</span>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex items-center space-x-1 text-sm text-slate-500">
                                        <User className="h-4 w-4" />
                                        <span>{project.client}</span>
                                      </div>
                                      {project.dueDate && (
                                        <div className="flex items-center space-x-1 text-sm text-slate-500">
                                          <Calendar className="h-4 w-4" />
                                          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700">Progress</span>
                                    <span className="text-sm text-slate-500">{project.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`h-2 rounded-full transition-all duration-300 ${
                                        project.progress === 100 ? 'bg-green-500' : 
                                        project.progress >= 70 ? 'bg-blue-500' : 
                                        project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${project.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                {/* Last Updated */}
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-1 text-sm text-slate-500">
                                    <Clock className="h-4 w-4" />
                                    <span>Updated: {new Date(project.lastUpdated).toLocaleDateString()}</span>
                                  </div>
                                  {project.completedDate && (
                                    <div className="flex items-center space-x-1 text-sm text-green-600">
                                      <CheckCircle className="h-4 w-4" />
                                      <span>Completed: {new Date(project.completedDate).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-2 ml-4">
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    const newProgress = prompt(`Update progress for "${project.title}" (0-100):`, project.progress);
                                    if (newProgress !== null && !isNaN(newProgress) && newProgress >= 0 && newProgress <= 100) {
                                      handleUpdateProgress(project.id, parseInt(newProgress));
                                    }
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Update
                                </Button>
                                
                                {project.type === 'workflow' && project.status !== 'completed' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleToggleProjectStatus(project.id)}
                                  >
                                    {project.status === 'active' ? (
                                      <>
                                        <PauseCircle className="h-4 w-4 mr-1" />
                                        Pause
                                      </>
                                    ) : (
                                      <>
                                        <PlayCircle className="h-4 w-4 mr-1" />
                                        Activate
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button 
                                  asChild 
                                  size="sm" 
                                  variant="ghost"
                                >
                                  <Link to={project.type === 'workflow' ? `/workflow/${project.id}` : '#'}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Link>
                                </Button>
                                
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
                                      handleDeleteProject(project.id);
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Target className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                      <p className="text-lg font-medium text-slate-900 mb-2">No projects yet</p>
                      <p className="text-slate-600 mb-4">Projects will appear here as you create workflows and receive custom requests</p>
                      <div className="flex space-x-3 justify-center">
                        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                          <Link to="/custom-request">Add Workflow</Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link to="/workflows">Browse Workflows</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

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
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete "${workflow.title}"?`)) {
                                      handleDeleteWorkflow(workflow.id);
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
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
                                  variant="outline"
                                  onClick={() => {
                                    const statusOptions = ['pending', 'in_progress', 'completed'];
                                    const currentIndex = statusOptions.indexOf(request.status);
                                    const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];
                                    handleUpdateRequestStatus(request.id, nextStatus);
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Update Status
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

            {/* Modification Requests Tab */}
            <TabsContent value="modifications">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Workflow Modification Requests</span>
                    <Badge variant="secondary">{modificationRequests.length} requests</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {modificationRequests.length > 0 ? (
                    <div className="space-y-4">
                      {modificationRequests.map((request) => (
                        <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-slate-900">
                                  {request.workflowTitle} - Modification Request
                                </h3>
                                <Badge 
                                  variant="outline" 
                                  className={`${getStatusColor(request.status)} flex items-center space-x-1`}
                                >
                                  {getStatusIcon(request.status)}
                                  <span>{formatStatus(request.status)}</span>
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div>
                                  <p className="text-sm text-slate-600 mb-1">
                                    <strong>Client:</strong> {request.clientName}
                                  </p>
                                  <p className="text-sm text-slate-600 mb-1">
                                    <strong>Email:</strong> {request.clientEmail}
                                  </p>
                                  <p className="text-sm text-slate-600 mb-1">
                                    <strong>Budget:</strong> {request.budget || 'Not specified'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-600 mb-1">
                                    <strong>Urgency:</strong> {request.urgency}
                                  </p>
                                  <p className="text-sm text-slate-600 mb-1">
                                    <strong>Submitted:</strong> {new Date(request.submittedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="mb-3">
                                <p className="text-sm font-medium text-slate-700 mb-1">Requested Changes:</p>
                                <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded">
                                  {request.modifications}
                                </p>
                              </div>
                              
                              {request.additionalNotes && (
                                <div className="mb-3">
                                  <p className="text-sm font-medium text-slate-700 mb-1">Additional Notes:</p>
                                  <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded">
                                    {request.additionalNotes}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col space-y-2 ml-4">
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    const newStatus = prompt('Update status (pending/in_progress/completed):', request.status);
                                    if (newStatus && ['pending', 'in_progress', 'completed'].includes(newStatus)) {
                                      const updatedRequests = modificationRequests.map(r => 
                                        r.id === request.id ? { ...r, status: newStatus } : r
                                      );
                                      setModificationRequests(updatedRequests);
                                      localStorage.setItem('modificationRequests', JSON.stringify(updatedRequests));
                                      toast({
                                        title: "Status Updated",
                                        description: `Request status changed to ${formatStatus(newStatus)}.`,
                                        className: "bg-blue-50 border-blue-200 text-blue-800"
                                      });
                                    }
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Update Status
                                </Button>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button 
                                  asChild 
                                  size="sm" 
                                  variant="ghost"
                                >
                                  <Link to={`/workflow/${request.workflowId}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Workflow
                                  </Link>
                                </Button>
                                
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this modification request?')) {
                                      const updatedRequests = modificationRequests.filter(r => r.id !== request.id);
                                      setModificationRequests(updatedRequests);
                                      localStorage.setItem('modificationRequests', JSON.stringify(updatedRequests));
                                      toast({
                                        title: "Request Deleted",
                                        description: "The modification request has been removed.",
                                        className: "bg-red-50 border-red-200 text-red-800"
                                      });
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Edit className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                      <p className="text-lg font-medium text-slate-900 mb-2">No modification requests yet</p>
                      <p className="text-slate-600 mb-4">Workflow modification requests will appear here when users request changes to existing workflows</p>
                      <Button asChild variant="outline">
                        <Link to="/workflows">View Workflows</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminDashboard;