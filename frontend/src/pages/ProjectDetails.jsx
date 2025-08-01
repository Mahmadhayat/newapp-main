import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '../components/ui/toaster';
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  User, 
  Clock, 
  Tag,
  Send,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import sampleProjects from '../data/sampleProjects.json';

const ProjectDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [project, setProject] = useState(null);
  const [offerData, setOfferData] = useState({
    price: '',
    deliveryTime: '',
    message: ''
  });
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);

  useEffect(() => {
    const foundProject = sampleProjects.find(p => p.id === parseInt(id));
    setProject(foundProject);
  }, [id]);

  const handleOfferChange = (e) => {
    const { name, value } = e.target;
    setOfferData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    setIsSubmittingOffer(true);

    // Validate offer data
    if (!offerData.price || !offerData.deliveryTime || !offerData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all offer details",
        variant: "destructive"
      });
      setIsSubmittingOffer(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Offer Sent Successfully!",
        description: "Your offer has been sent to the client. They will review it and get back to you.",
        className: "bg-green-50 border-green-200 text-green-800"
      });
      
      // Reset offer form
      setOfferData({
        price: '',
        deliveryTime: '',
        message: ''
      });
      setIsSubmittingOffer(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-slate-600 hover:text-slate-900">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex-1 mr-4">
                    {project.title}
                  </h1>
                  <Badge 
                    variant="outline" 
                    className={`flex items-center space-x-1 ${getStatusColor(project.status)}`}
                  >
                    {getStatusIcon(project.status)}
                    <span className="font-medium">{formatStatus(project.status)}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <DollarSign className="h-4 w-4 text-teal-600" />
                    <span className="font-medium">{project.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="h-4 w-4 text-teal-600" />
                    <span>{project.deliveryTime} days</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <User className="h-4 w-4 text-teal-600" />
                    <span>{project.clientName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span>{new Date(project.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Project Description */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-teal-600" />
                  <span>Project Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Skills and Category */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-teal-600" />
                  <span>Skills & Category</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Category</h4>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-teal-50 text-teal-700 border-teal-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Existing Offers */}
            {project.offers && project.offers.length > 0 && (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Current Offers ({project.offers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.offers.map((offer, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-teal-100 text-teal-700 font-medium">
                                {getInitials(offer.sellerName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-slate-900">{offer.sellerName}</p>
                              <div className="flex items-center space-x-4 text-sm text-slate-600">
                                <span>${offer.price}</span>
                                <span>{offer.deliveryTime} days</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm">{offer.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Send Offer */}
            {project.status === 'open' && (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="h-5 w-5 text-teal-600" />
                    <span>Send Offer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOffer} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium">
                        Your Price ($)
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="1"
                        value={offerData.price}
                        onChange={handleOfferChange}
                        placeholder="e.g., 500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime" className="text-sm font-medium">
                        Delivery Time (days)
                      </Label>
                      <Input
                        id="deliveryTime"
                        name="deliveryTime"
                        type="number"
                        min="1"
                        value={offerData.deliveryTime}
                        onChange={handleOfferChange}
                        placeholder="e.g., 14"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Cover Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={offerData.message}
                        onChange={handleOfferChange}
                        placeholder="Explain why you're the right fit for this project..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={isSubmittingOffer}
                    >
                      {isSubmittingOffer ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-4 w-4" />
                          <span>Send Offer</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Project Stats */}
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Project ID</span>
                    <span className="font-medium">#{project.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Posted</span>
                    <span className="font-medium">
                      {new Date(project.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Offers</span>
                    <span className="font-medium">
                      {project.offers ? project.offers.length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(project.status)}`}
                    >
                      {formatStatus(project.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Client */}
            <Card className="shadow-sm border-0">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-slate-600 mb-4">
                  Have questions about this project?
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full"
                >
                  <Link to="/messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Client
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

export default ProjectDetails;