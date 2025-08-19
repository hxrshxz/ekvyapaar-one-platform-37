import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { geminiService, type GeminiResponse } from '@/services/geminiService';

// Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  isError?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
}

type ChatAction =
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_MESSAGES' };

// Initial state
const initialState: ChatState = {
  messages: [],
  input: '',
  isLoading: false,
};

// Reducer
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'ADD_MESSAGE':
      // Validate message before adding
      if (action.payload && action.payload.content && action.payload.createdAt) {
        return { ...state, messages: [...state.messages, action.payload] };
      }
      console.error('Invalid message payload:', action.payload);
      return state;
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
}

// Context
interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string) => Promise<void>;
  setInput: (input: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider
interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = async (content: string): Promise<void> => {
    try {
      if (!content || !content.trim()) {
        console.warn('Attempted to send empty message');
        return;
      }

      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'user',
        content: content.trim(),
        createdAt: new Date(),
      };

      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      dispatch({ type: 'SET_INPUT', payload: '' });
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        // Get real AI response from Gemini
        const geminiResponse: GeminiResponse = await geminiService.generateResponse(content);
        
        if (geminiResponse.success && geminiResponse.content) {
          // Success - add AI response
          const aiMessage: ChatMessage = {
            id: `assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            role: 'assistant',
            content: geminiResponse.content,
            createdAt: new Date(),
          };

          dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
        } else {
          // Error from Gemini service
          const errorMessage: ChatMessage = {
            id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            role: 'assistant',
            content: geminiResponse.error || "I'm sorry, I encountered an error. Please try again.",
            createdAt: new Date(),
            isError: true,
          };

          dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
        }
      } catch (error) {
        console.error('Error getting Gemini response:', error);
        
        // Fallback error message
        const fallbackMessage: ChatMessage = {
          id: `fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again in a moment.",
          createdAt: new Date(),
          isError: true,
        };

        dispatch({ type: 'ADD_MESSAGE', payload: fallbackMessage });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error in sendMessage:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `system-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: "I'm sorry, something went wrong. Please try again.",
        createdAt: new Date(),
        isError: true,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
    }
  };

  const setInput = (input: string) => {
    try {
      dispatch({ type: 'SET_INPUT', payload: input || '' });
    } catch (error) {
      console.error('Error setting input:', error);
    }
  };

  const clearMessages = () => {
    try {
      dispatch({ type: 'CLEAR_MESSAGES' });
      // Also clear Gemini conversation history
      geminiService.clearHistory();
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  };

  const value: ChatContextType = {
    state,
    sendMessage,
    setInput,
    clearMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

// Hook
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 