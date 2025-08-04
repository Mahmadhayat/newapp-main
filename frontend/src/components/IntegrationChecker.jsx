import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  X, 
  Search, 
  Plug,
  AlertTriangle,
  ExternalLink,
  Filter
} from 'lucide-react';

const IntegrationChecker = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIntegrations, setSelectedIntegrations] = useState([]);

  const integrations = [
    { id: 1, name: 'Gmail', category: 'Email', status: 'supported', difficulty: 'easy', icon: '📧' },
    { id: 2, name: 'Slack', category: 'Communication', status: 'supported', difficulty: 'easy', icon: '💬' },
    { id: 3, name: 'Shopify', category: 'E-commerce', status: 'supported', difficulty: 'medium', icon: '🛒' },
    { id: 4, name: 'Google Sheets', category: 'Productivity', status: 'supported', difficulty: 'easy', icon: '📊' },
    { id: 5, name: 'Salesforce', category: 'CRM', status: 'supported', difficulty: 'hard', icon: '☁️' },
    { id: 6, name: 'Stripe', category: 'Payment', status: 'supported', difficulty: 'medium', icon: '💳' },
    { id: 7, name: 'Trello', category: 'Project Management', status: 'supported', difficulty: 'easy', icon: '📋' },
    { id: 8, name: 'HubSpot', category: 'CRM', status: 'supported', difficulty: 'medium', icon: '🎯' },
    { id: 9, name: 'Mailchimp', category: 'Email', status: 'supported', difficulty: 'easy', icon: '🐵' },
    { id: 10, name: 'Zoom', category: 'Communication', status: 'supported', difficulty: 'medium', icon: '📹' },
    { id: 11, name: 'Notion', category: 'Productivity', status: 'supported', difficulty: 'medium', icon: '📝' },
    { id: 12, name: 'Discord', category: 'Communication', status: 'supported', difficulty: 'easy', icon: '🎮' },
    { id: 13, name: 'Airtable', category: 'Database', status: 'supported', difficulty: 'medium', icon: '🗃️' },
    { id: 14, name: 'Zapier', category: 'Automation', status: 'supported', difficulty: 'easy', icon: '⚡' },
    { id: 15, name: 'Custom API', category: 'Custom', status: 'partial', difficulty: 'hard', icon: '🔧' }
  ];

  const categories = ['all', 'Email', 'Communication', 'E-commerce', 'Productivity', 'CRM', 'Payment', 'Project Management', 'Database', 'Automation', 'Custom'];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleIntegration = (integrationId) => {
    setSelectedIntegrations(prev => 
      prev.includes(integrationId) 
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'supported': return 'bg-green-100 text-green-800 border-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unsupported': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompatibilityScore = () => {
    if (selectedIntegrations.length === 0) return 0;
    const supportedCount = selectedIntegrations.filter(id => {
      const integration = integrations.find(i => i.id === id);
      return integration?.status === 'supported';
    }).length;
    return Math.round((supportedCount / selectedIntegrations.length) * 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Plug className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Integration Compatibility Checker</h2>
                <p className="text-blue-100">Check if your tools work with our workflows</p>
              </div>
            </div>
            <Button 
              onClick={onClose}
              variant="ghost" 
              className="text-white hover:bg-blue-800"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Integrations Summary */}
            {selectedIntegrations.length > 0 && (
              <Card className="mb-4 border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-900">
                        Selected Integrations: {selectedIntegrations.length}
                      </h3>
                      <p className="text-sm text-blue-700">
                        Compatibility Score: {getCompatibilityScore()}%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        getCompatibilityScore() >= 80 ? 'bg-green-100 text-green-800' :
                        getCompatibilityScore() >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getCompatibilityScore() >= 80 ? '✅ Excellent' :
                         getCompatibilityScore() >= 60 ? '⚠️ Good' : '❌ Needs Work'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredIntegrations.map((integration) => {
              const isSelected = selectedIntegrations.includes(integration.id);
              return (
                <Card 
                  key={integration.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => toggleIntegration(integration.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-semibold text-slate-900">{integration.name}</h3>
                          <p className="text-sm text-slate-600">{integration.category}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status === 'supported' && '✅ Supported'}
                        {integration.status === 'partial' && '⚠️ Partial'}
                        {integration.status === 'unsupported' && '❌ Not Supported'}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(integration.difficulty)}>
                        {integration.difficulty}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Compatibility Report */}
          {selectedIntegrations.length > 0 && (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Compatibility Report</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedIntegrations.map(id => {
                    const integration = integrations.find(i => i.id === id);
                    return (
                      <div key={id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{integration.icon}</span>
                          <div>
                            <h4 className="font-medium text-slate-900">{integration.name}</h4>
                            <p className="text-sm text-slate-600">
                              {integration.status === 'supported' && 'Full integration available'}
                              {integration.status === 'partial' && 'Limited functionality available'}
                              {integration.status === 'unsupported' && 'Not currently supported'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                          {integration.status === 'supported' && (
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Setup Guide
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recommendations */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-blue-600" />
                    Recommendations
                  </h4>
                  {getCompatibilityScore() >= 80 ? (
                    <p className="text-sm text-slate-700">
                      🎉 Excellent compatibility! All your selected tools work great with our workflows. 
                      You're ready to automate!
                    </p>
                  ) : getCompatibilityScore() >= 60 ? (
                    <p className="text-sm text-slate-700">
                      👍 Good compatibility! Most of your tools are supported. 
                      Consider alternatives for unsupported integrations.
                    </p>
                  ) : (
                    <p className="text-sm text-slate-700">
                      ⚠️ Some of your tools have limited support. 
                      Contact our team for custom integration solutions.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Find Compatible Workflows
            </Button>
            <Button variant="outline" className="flex-1">
              Request Custom Integration
            </Button>
            <Button variant="outline" className="flex-1">
              Save Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationChecker;