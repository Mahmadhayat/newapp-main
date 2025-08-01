import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Clock, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const WorkflowCard = ({ workflow }) => {
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

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 border-0 shadow-sm group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="bg-teal-100 p-2 rounded-lg group-hover:bg-teal-200 transition-colors">
              <Zap className="h-4 w-4 text-teal-600" />
            </div>
            {workflow.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-slate-900">{workflow.price}</div>
            <div className="text-xs text-slate-500">one-time</div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
          {workflow.title}
        </h3>
        
        <p className="text-sm text-slate-600 line-clamp-3 mb-3">
          {workflow.description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{workflow.estimatedSetupTime}</span>
          </div>
          <Badge 
            variant="secondary" 
            className={`text-xs ${getComplexityColor(workflow.complexity)}`}
          >
            {workflow.complexity.charAt(0).toUpperCase() + workflow.complexity.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Use Case */}
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-xs text-slate-600 italic">
              {workflow.useCase}
            </p>
          </div>

          {/* Integrations */}
          <div>
            <div className="text-xs font-medium text-slate-700 mb-2">Integrations:</div>
            <div className="flex flex-wrap gap-1">
              {workflow.integrations.slice(0, 3).map((integration, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-white border-slate-200 text-slate-600"
                >
                  {integration}
                </Badge>
              ))}
              {workflow.integrations.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-white border-slate-200 text-slate-500"
                >
                  +{workflow.integrations.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="text-xs font-medium text-slate-700 mb-2">Key Benefits:</div>
            <div className="space-y-1">
              {workflow.benefits.slice(0, 2).map((benefit, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              asChild 
              size="sm" 
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-xs"
            >
              <Link to={`/workflow/${workflow.id}`}>
                View Details
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs border-slate-300 hover:bg-slate-50"
            >
              Deploy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;