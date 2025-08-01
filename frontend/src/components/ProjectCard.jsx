import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, DollarSign, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ProjectCard = ({ project }) => {
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
        return <AlertCircle className="h-3 w-3" />;
      case 'in_progress':
        return <Clock className="h-3 w-3" />;
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

  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-slate-800 line-clamp-2 flex-1 mr-3">
            {project.title}
          </h3>
          <Badge 
            variant="outline" 
            className={`flex items-center space-x-1 ${getStatusColor(project.status)} flex-shrink-0`}
          >
            {getStatusIcon(project.status)}
            <span className="text-xs font-medium">{formatStatus(project.status)}</span>
          </Badge>
        </div>
        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
          {project.description}
        </p>
      </CardHeader>

      <CardContent className="py-3">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <DollarSign className="h-4 w-4 text-teal-600" />
            <span className="font-medium">{project.budget}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Clock className="h-4 w-4 text-teal-600" />
            <span>{project.deliveryTime} days</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{project.clientName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(project.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.skills.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {skill}
              </Badge>
            ))}
            {project.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                +{project.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm text-slate-500">
            {project.offers && project.offers.length > 0 ? (
              <span>{project.offers.length} offer{project.offers.length > 1 ? 's' : ''}</span>
            ) : (
              <span>No offers yet</span>
            )}
          </div>
          <Button 
            asChild 
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Link to={`/project/${project.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;