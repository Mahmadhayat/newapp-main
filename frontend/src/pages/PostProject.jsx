import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import { 
  PlusCircle, 
  FileText, 
  DollarSign, 
  Clock, 
  Tag,
  CheckCircle,
  X,
  Zap
} from 'lucide-react';

const PostProject = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deliveryTime: '',
    category: '',
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.title || !formData.description || !formData.budget || !formData.deliveryTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Project Posted Successfully!",
        description: "Your project has been posted and is now visible to our automation experts.",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        budget: '',
        deliveryTime: '',
        category: '',
        skills: []
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const categories = [
    'Business Automation',
    'Marketing Automation', 
    'Data Processing',
    'AI Automation',
    'E-commerce Automation',
    'Social Media Automation',
    'Email Automation',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <PlusCircle className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Post Your Automation Project
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Describe your automation needs and connect with skilled professionals who can bring your vision to life.
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-teal-600" />
              <span>Project Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-slate-700 flex items-center space-x-1">
                  <span>Project Title</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., E-commerce Inventory Management Automation"
                  className="text-base"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700 flex items-center space-x-1">
                  <span>Project Description</span>
                  <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your automation requirements, current process, expected outcomes, and any specific tools or integrations needed..."
                  rows={6}
                  className="text-base resize-none"
                  required
                />
                <p className="text-sm text-slate-500">
                  Be specific about your requirements to attract the right experts
                </p>
              </div>

              {/* Budget and Delivery Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>Budget</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('budget', value)} required>
                    <SelectTrigger className="text-base">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< $100">Less than $100</SelectItem>
                      <SelectItem value="$100-500">$100 - $500</SelectItem>
                      <SelectItem value="$500+">$500 or more</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTime" className="text-sm font-medium text-slate-700 flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Delivery Time (days)</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="deliveryTime"
                    name="deliveryTime"
                    type="number"
                    min="1"
                    max="365"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 14"
                    className="text-base"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>Category</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange('category', value)}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Select project category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Skills/Technologies */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Required Skills/Technologies
                </Label>
                <div className="flex space-x-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillKeyPress}
                    placeholder="e.g., Python, API Integration, Excel"
                    className="text-base flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addSkill}
                    variant="outline"
                    size="sm"
                    className="px-4"
                  >
                    Add
                  </Button>
                </div>
                
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-teal-50 text-teal-700 hover:bg-teal-100 pr-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-teal-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Posting Project...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Post Project</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8 bg-teal-50 border-teal-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-teal-800 mb-3">💡 Tips for a successful project</h3>
            <ul className="text-sm text-teal-700 space-y-2">
              <li>• Be specific about your current process and desired outcome</li>
              <li>• Include examples or references if available</li>
              <li>• Mention any existing tools or systems that need integration</li>
              <li>• Set realistic timelines for complex automation projects</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
};

export default PostProject;