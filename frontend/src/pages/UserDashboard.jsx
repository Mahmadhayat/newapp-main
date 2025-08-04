import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  Download, 
  Heart, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Zap,
  Clock,
  Star,
  FileText,
  CreditCard,
  Bell,
  TrendingUp,
  Calendar
} from 'lucide-react';
import sampleWorkflows from '../data/sampleWorkflows.json';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = localStorage.getItem('userAuth');
    const userToken = localStorage.getItem('userToken');
    
    if (!userData || !userToken) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    localStorage.removeItem('userToken');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const stats = [
    { label: 'Purchased Workflows', value: '3', icon: ShoppingBag, color: 'text-blue-600' },
    { label: 'Favorite Workflows', value: '5', icon: Heart, color: 'text-red-600' },
    { label: 'Total Downloads', value: '12', icon: Download, color: 'text-green-600' },
    { label: 'Active Automations', value: '8', icon: Zap, color: 'text-teal-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-teal-600" />
                </div>
                <span className="text-xl font-bold text-slate-900">Automation Hub</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-0">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                  <p className="text-sm text-slate-600">{user.email}</p>
                  <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                    Active Member
                  </Badge>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'overview' 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4 inline mr-2" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('purchased')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'purchased' 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4 inline mr-2" />
                    My Workflows
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'settings' 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Settings className="h-4 w-4 inline mr-2" />
                    Settings
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Welcome back, {user.firstName || user.name}! 👋
                    </h2>
                    <p className="text-slate-600">
                      Here's what's happening with your automation workflows.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <Card key={index} className="shadow-sm border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'purchased' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">My Workflows</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {sampleWorkflows.slice(0, 3).map((workflow) => (
                    <Card key={workflow.id} className="shadow-sm border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-teal-100 p-2 rounded-lg">
                            <Zap className="h-5 w-5 text-teal-600" />
                          </div>
                          <Badge className="bg-green-100 text-green-800">Purchased</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{workflow.title}</h3>
                        <p className="text-sm text-slate-600 mb-4">{workflow.description}</p>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Account Settings</h2>
                <Card className="shadow-sm border-0">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;