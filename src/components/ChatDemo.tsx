import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, Sparkles, Zap } from 'lucide-react';

export function ChatDemo() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-md">
              <Bot className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2 text-gray-800 font-bold">AI Chat Feature</CardTitle>
          <p className="text-gray-600 text-lg">
            Experience our intelligent chat assistant powered by Google Gemini AI
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-sm bg-blue-100 text-blue-800 border-blue-300">
              <Zap className="h-3 w-3 mr-1" />
              Powered by Gemini 2.5 Pro
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <MessageCircle className="h-10 w-10 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2 text-gray-800">Real AI Conversations</h3>
              <p className="text-sm text-gray-600">
                Powered by Google's latest Gemini AI for intelligent responses
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <Sparkles className="h-10 w-10 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2 text-gray-800">Context Aware</h3>
              <p className="text-sm text-gray-600">
                Remembers conversation context for better understanding
              </p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <Bot className="h-10 w-10 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2 text-gray-800">Business Focused</h3>
              <p className="text-sm text-gray-600">
                Specialized in business, tech, and productivity topics
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Badge variant="secondary" className="text-sm mb-4 bg-blue-100 text-blue-800 border-blue-200">
              Ready to chat? Navigate to /chat to get started!
            </Badge>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Ask about business strategies and planning</p>
              <p>• Learn about technology trends and concepts</p>
              <p>• Get productivity tips and advice</p>
              <p>• Explore AI and machine learning topics</p>
              <p>• Have natural conversations with context memory</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-sm">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm text-blue-800">
                <h4 className="font-semibold mb-2 text-lg">Real AI Power</h4>
                <p>This chat uses Google's Gemini 2.5 Pro model, providing intelligent, context-aware responses. The AI remembers your conversation history and can engage in meaningful discussions about any topic.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 