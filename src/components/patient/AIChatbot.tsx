import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';

export const AIChatbot = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatHistory = [
    {
      id: 1,
      sender: 'bot',
      message: "Hello! I'm your Panchakarma AI assistant. How can I help you today?",
      time: '10:00 AM',
      type: 'greeting'
    },
    {
      id: 2,
      sender: 'user',
      message: "I'm feeling a bit anxious about my upcoming Shirodhara session. What should I expect?",
      time: '10:05 AM',
      type: 'question'
    },
    {
      id: 3,
      sender: 'bot',
      message: "Shirodhara is a deeply relaxing therapy where warm oil is gently poured over your forehead. It's completely painless and most patients find it very soothing. The session typically lasts 45-60 minutes, and you'll feel deeply relaxed afterwards. Would you like me to explain the preparation steps?",
      time: '10:05 AM',
      type: 'answer'
    },
    {
      id: 4,
      sender: 'user',
      message: 'Yes, that would be helpful!',
      time: '10:06 AM',
      type: 'response'
    },
    {
      id: 5,
      sender: 'bot',
      message: "Great! Here are the preparation steps:\n\n1. Arrive 15 minutes early to relax\n2. Wear comfortable, old clothing that can get oily\n3. Remove all jewelry and contact lenses\n4. Have a light meal 2 hours before\n5. Avoid caffeine before the session\n\nAfter the session, rest for 30 minutes and drink warm water. Any other questions?",
      time: '10:07 AM',
      type: 'detailed_answer'
    }
  ];

  const quickSuggestions = [
    'What to expect during Abhyanga?',
    'Post-treatment care instructions',
    'Benefits of Panchakarma',
    'Diet recommendations',
    'How to prepare for my next session',
    'Managing stress naturally'
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setIsTyping(true);
    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      setMessage('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="medical-gradient w-12 h-12 rounded-lg flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Chatbot</h1>
          <p className="text-muted-foreground">Your intelligent Panchakarma assistant</p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Window */}
        <Card className="medical-card lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Panchakarma AI Assistant</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <CardDescription>Online • Ready to help</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-96">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {msg.sender === 'bot' && (
                        <Sparkles className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{msg.message}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3 opacity-70" />
                          <span className="text-xs opacity-70">{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm px-4 py-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-purple-500" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about Panchakarma..."
                className="flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                size="icon"
                className="bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Suggestions Sidebar */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Questions</CardTitle>
            <CardDescription>Common topics I can help with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3 text-sm"
                  onClick={() => setMessage(suggestion)}
                >
                  <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="line-clamp-2">{suggestion}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Capabilities */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>What I Can Help With</CardTitle>
          <CardDescription>I'm trained on Panchakarma and Ayurvedic knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Treatment Info</h3>
              <p className="text-sm text-muted-foreground">Learn about therapies, benefits, and what to expect</p>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Wellness Tips</h3>
              <p className="text-sm text-muted-foreground">Diet, lifestyle, and post-treatment care advice</p>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Always available to answer your questions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
