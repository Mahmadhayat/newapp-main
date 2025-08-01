import React, { useState, useEffect } from 'react';
import WorkflowCard from '../components/WorkflowCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Search, Filter, Zap, X } from 'lucide-react';
import sampleWorkflows from '../data/sampleWorkflows.json';

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');

  useEffect(() => {
    setWorkflows(sampleWorkflows);
    setFilteredWorkflows(sampleWorkflows);
  }, []);

  useEffect(() => {
    let filtered = workflows;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(workflow =>
        workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.useCase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workflow.integrations.some(integration => integration.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(workflow => workflow.category === selectedCategory);
    }

    // Complexity filter
    if (selectedComplexity && selectedComplexity !== 'all') {
      filtered = filtered.filter(workflow => workflow.complexity === selectedComplexity);
    }

    setFilteredWorkflows(filtered);
  }, [workflows, searchTerm, selectedCategory, selectedComplexity]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedComplexity('all');
  };

  const categories = [...new Set(workflows.map(workflow => workflow.category))];
  const complexities = [...new Set(workflows.map(workflow => workflow.complexity))];

  const activeFiltersCount = [selectedCategory, selectedComplexity].filter(filter => filter && filter !== 'all').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <Zap className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready-Made n8n Workflows
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our library of pre-built automation workflows. Deploy instantly and start automating your business processes today.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-sm border-0">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search workflows by title, description, use case, integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-base h-12"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Complexities</SelectItem>
                    {complexities.map((complexity) => (
                      <SelectItem key={complexity} value={complexity}>
                        {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    disabled={!searchTerm && activeFiltersCount === 0}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || activeFiltersCount > 0) && (
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 hover:text-teal-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedCategory && selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-2 hover:text-teal-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedComplexity && selectedComplexity !== 'all' && (
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                      Complexity: {selectedComplexity.charAt(0).toUpperCase() + selectedComplexity.slice(1)}
                      <button
                        onClick={() => setSelectedComplexity('all')}
                        className="ml-2 hover:text-teal-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-slate-600">
            Showing <span className="font-medium text-slate-900">{filteredWorkflows.length}</span> of{' '}
            <span className="font-medium text-slate-900">{workflows.length}</span> workflows
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-500">
              {activeFiltersCount > 0 && `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied`}
            </span>
          </div>
        </div>

        {/* Workflows Grid */}
        {filteredWorkflows.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-slate-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No workflows found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="mt-4"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkflowList;