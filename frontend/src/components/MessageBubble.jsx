import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';

const MessageBubble = ({ message, isCurrentUser = false }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className={`flex gap-3 mb-6 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={`text-sm font-medium ${
          isCurrentUser 
            ? 'bg-teal-100 text-teal-700' 
            : 'bg-slate-100 text-slate-700'
        }`}>
          {getInitials(message.senderName)}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-slate-700">
            {message.senderName}
          </span>
          <span className="text-xs text-slate-500">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        <Card className={`${
          isCurrentUser 
            ? 'bg-teal-600 text-white border-teal-600' 
            : 'bg-white border-gray-200'
        } shadow-sm`}>
          <CardContent className="p-3">
            <p className={`text-sm leading-relaxed ${
              isCurrentUser ? 'text-white' : 'text-slate-700'
            }`}>
              {message.message}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageBubble;