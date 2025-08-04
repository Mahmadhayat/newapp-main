import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot,
  Minimize2,
  Maximize2
} from 'lucide-react';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! 👋 Welcome to Automation Hub! How can I help you with n8n workflows today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = [
    "I'd be happy to help you find the perfect workflow! What type of automation are you looking for?",
    "Great question! Our workflows are designed to save you hours of manual work. Which business process would you like to automate?",
    "That sounds like a perfect use case for automation! Let me suggest some workflows that might help.",
    "I can help you with that! Have you checked out our workflow demos? They show exactly how each automation works.",
    "Absolutely! Our n8n workflows are pre-built and ready to deploy. Would you like me to show you some popular options?",
    "That's a common challenge many businesses face. We have several workflows that can solve that problem efficiently.",
    "Perfect! I can guide you through the setup process. Most of our workflows can be deployed in under 30 minutes.",
    "Great choice! That workflow has helped many businesses save significant time. Would you like to see a demo?"
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          {/* Notification Badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            1
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Support Chat</CardTitle>
                    <p className="text-teal-100 text-sm">We're here to help!</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setIsMinimized(!isMinimized)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-teal-800 p-1"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-teal-800 p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            {!isMinimized && (
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-teal-600' : 'bg-white border'}`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-teal-600" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-teal-600 text-white'
                              : 'bg-white border shadow-sm'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-teal-100' : 'text-slate-500'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="p-2 rounded-full bg-white border">
                          <Bot className="h-4 w-4 text-teal-600" />
                        </div>
                        <div className="bg-white border shadow-sm p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Press Enter to send • We typically reply in a few minutes
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;