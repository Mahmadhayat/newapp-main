import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Search, Filter, Briefcase, X } from 'lucide-react';
import sampleProjects from '../data/sampleProjects.json';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Budget filter
    if (selectedBudget && selectedBudget !== 'all') {
      filtered = filtered.filter(project => project.budget === selectedBudget);
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus && selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, selectedBudget, selectedCategory, selectedStatus]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBudget('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  const categories = [...new Set(projects.map(project => project.category))];
  const budgetRanges = [...new Set(projects.map(project => project.budget))];
  const statuses = [...new Set(projects.map(project => project.status))];

  const activeFiltersCount = [selectedBudget, selectedCategory, selectedStatus].filter(filter => filter && filter !== 'all').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <Briefcase className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Browse Automation Projects
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover exciting automation opportunities and connect with clients who need your expertise.
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
                  placeholder="Search projects by title, description, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-base h-12"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget} value={budget}>
                        {budget}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
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
                  {selectedBudget && selectedBudget !== 'all' && (
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                      Budget: {selectedBudget}
                      <button
                        onClick={() => setSelectedBudget('all')}
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
                  {selectedStatus && selectedStatus !== 'all' && (
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700">
                      Status: {selectedStatus.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                      <button
                        onClick={() => setSelectedStatus('all')}
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
            Showing <span className="font-medium text-slate-900">{filteredProjects.length}</span> of{' '}
            <span className="font-medium text-slate-900">{projects.length}</span> projects
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-500">
              {activeFiltersCount > 0 && `${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied`}
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-slate-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No projects found</p>
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

export default ProjectList;