import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Send, Bot, User, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useChat, type ChatMessage } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

// Utility function for formatting time
const formatTime = (date: Date) => {
  try {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '--:--';
  }
};

export function ChatPage() {
  const { state, sendMessage, setInput, clearMessages } = useChat();
  const { messages, input, isLoading } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      await sendMessage(input);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 h-screen flex flex-col bg-white">
      <Card className="flex-1 flex flex-col border-0 shadow-lg bg-white">
        <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-md">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-800 font-semibold">AI Chat Assistant</CardTitle>
                <p className="text-gray-600 text-sm">
                  Powered by Google Gemini AI - Ask me anything!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                {messages.length} messages
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                disabled={messages.length === 0}
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-gray-100" />

        <CardContent className="flex-1 flex flex-col p-0 bg-white">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full shadow-sm">
                  <Bot className="h-12 w-12 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome to AI Chat!</h3>
                  <p className="text-gray-600 text-sm">
                    Start a conversation by typing a message below.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600 font-medium">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <Separator className="bg-gray-100" />

          {/* Input Area */}
          <div className="p-6 bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ChatMessageProps {
  message: ChatMessage;
}

function ChatMessage({ message }: ChatMessageProps) {
  try {
    const isUser = message.role === 'user';
    const isError = message.isError;

    // Validate message data
    if (!message || !message.content || !message.createdAt) {
      console.error('Invalid message data:', message);
      return null;
    }

    return (
      <div className={cn(
        "flex items-start space-x-3",
        isUser ? "flex-row-reverse space-x-reverse" : ""
      )}>
        <Avatar className="h-10 w-10">
          {isUser ? (
            <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-md">
              <User className="h-5 w-5" />
            </AvatarFallback>
          ) : (
            <AvatarFallback className={cn(
              "text-white shadow-md",
              isError 
                ? "bg-gradient-to-br from-red-500 to-red-600" 
                : "bg-gradient-to-br from-blue-500 to-indigo-600"
            )}>
              {isError ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <Bot className="h-5 w-5" />
              )}
            </AvatarFallback>
          )}
        </Avatar>

        <div className={cn(
          "flex flex-col space-y-2",
          isUser ? "items-end" : "items-start"
        )}>
          <div className={cn(
            "rounded-2xl px-4 py-3 max-w-[80%] break-words shadow-sm",
            isUser
              ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
              : isError
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-white border border-gray-100 text-gray-800 shadow-sm"
          )}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <span className={cn(
            "text-xs px-2",
            isError ? "text-red-500" : "text-gray-500"
          )}>
            {formatTime(message.createdAt)}
            {isError && " • Error"}
          </span>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering ChatMessage:', error, message);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
        <p className="text-sm text-red-600">Error displaying message</p>
      </div>
    );
  }
} 