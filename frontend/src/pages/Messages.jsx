import React, { useState, useEffect } from 'react';
import MessageBubble from '../components/MessageBubble';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Search,
  Users,
  Clock
} from 'lucide-react';
import mockMessages from '../data/mockMessages.json';
import sampleProjects from '../data/sampleProjects.json';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Combine project info with messages
    const conversationsWithProjects = mockMessages.map(conv => {
      const project = sampleProjects.find(p => p.id === conv.projectId);
      return {
        ...conv,
        project: project
      };
    });
    setConversations(conversationsWithProjects);
    
    // Select first conversation by default
    if (conversationsWithProjects.length > 0) {
      setSelectedConversation(conversationsWithProjects[0]);
    }
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: selectedConversation.messages.length + 1,
      sender: 'client',
      senderName: 'You',
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    // Update the selected conversation
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message]
    };

    // Update conversations list
    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id ? updatedConversation : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation(updatedConversation);
    setNewMessage('');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const getLastMessage = (messages) => {
    if (messages.length === 0) return 'No messages yet';
    const lastMsg = messages[messages.length - 1];
    return lastMsg.message.length > 50 
      ? lastMsg.message.substring(0, 50) + '...' 
      : lastMsg.message;
  };

  const getLastMessageTime = (messages) => {
    if (messages.length === 0) return '';
    const lastMsg = messages[messages.length - 1];
    return new Date(lastMsg.timestamp).toLocaleDateString();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.project?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.messages.some(msg => 
      msg.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <MessageSquare className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Messages
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Communicate with clients and manage your project conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 h-[700px]">
          {/* Conversations List */}
          <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 text-sm"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Users className="h-4 w-4" />
                <span>{filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-120px)]">
              {filteredConversations.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-teal-50 border-r-2 border-teal-600' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback className="bg-slate-100 text-slate-700 font-medium text-sm">
                            {getInitials(conversation.project?.clientName || 'Unknown')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-slate-900 truncate">
                              {conversation.project?.clientName || 'Unknown Client'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {getLastMessageTime(conversation.messages)}
                            </p>
                          </div>
                          
                          <p className="text-sm text-slate-600 truncate mb-2">
                            {conversation.project?.title || 'Project'}
                          </p>
                          
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {getLastMessage(conversation.messages)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Message Header */}
                <div className="p-4 border-b border-gray-200 bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-teal-100 text-teal-700 font-medium">
                        {getInitials(selectedConversation.project?.clientName || 'Unknown')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        {selectedConversation.project?.clientName || 'Unknown Client'}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">
                        {selectedConversation.project?.title || 'Project'}
                      </p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-teal-50 text-teal-700 text-xs"
                    >
                      Project #{selectedConversation.projectId}
                    </Badge>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-slate-25">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        isCurrentUser={message.sender === 'client'}
                      />
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-slate-50">
                  <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      disabled={!newMessage.trim()}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Select a conversation</p>
                  <p className="text-sm">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;