import { GoogleGenAI } from "@google/genai";

// Get API key from environment variable or fallback to the one in the file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q";

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

const model = ai.models.generateContent({
  model: "gemini-2.5-pro",
});

export interface GeminiResponse {
  success: boolean;
  content?: string;
  error?: string;
}

export class GeminiService {
  private static instance: GeminiService;
  private conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public async generateResponse(userMessage: string): Promise<GeminiResponse> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({ role: 'user', content: userMessage });

      // Create conversation context for better responses
      const conversationContext = this.conversationHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Generate response using Gemini
      const response = await model.contents([
        {
          role: 'user',
          parts: [
            {
              text: `You are a helpful AI assistant for a business platform called Ekvyapaar. 
              You help users with business questions, technology explanations, productivity tips, and general knowledge.
              Please provide helpful, accurate, and engaging responses.
              
              Conversation context:
              ${conversationContext}
              
              User's latest message: ${userMessage}
              
              Please respond as the AI assistant.`
            }
          ]
        }
      ]);

      if (response && response.text) {
        const aiResponse = response.text;
        
        // Add AI response to conversation history
        this.conversationHistory.push({ role: 'assistant', content: aiResponse });
        
        // Keep only last 10 messages to manage context length
        if (this.conversationHistory.length > 10) {
          this.conversationHistory = this.conversationHistory.slice(-10);
        }

        return {
          success: true,
          content: aiResponse
        };
      } else {
        throw new Error('No response content received from Gemini');
      }
    } catch (error) {
      console.error('Error generating Gemini response:', error);
      
      // Fallback responses for common errors
      let fallbackMessage = "I'm sorry, I'm having trouble connecting to my AI service right now. ";
      
      if (error instanceof Error) {
        if (error.message.includes('API key') || error.message.includes('authentication')) {
          fallbackMessage += "There's an issue with my API configuration.";
        } else if (error.message.includes('rate limit') || error.message.includes('quota')) {
          fallbackMessage += "I'm receiving too many requests at the moment.";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          fallbackMessage += "There seems to be a network connectivity issue.";
        } else if (error.message.includes('model') || error.message.includes('generation')) {
          fallbackMessage += "There's an issue with the AI model service.";
        } else {
          fallbackMessage += "Please try again in a moment.";
        }
      }

      return {
        success: false,
        error: fallbackMessage
      };
    }
  }

  public clearHistory(): void {
    this.conversationHistory = [];
  }

  public getHistory(): Array<{ role: 'user' | 'assistant'; content: string }> {
    return [...this.conversationHistory];
  }

  public getApiKeyStatus(): { hasKey: boolean; isConfigured: boolean } {
    return {
      hasKey: !!API_KEY,
      isConfigured: API_KEY !== "AIzaSyDNHmmsmvod1_WQfIAjh5Tq7lu4NyLfo7Q"
    };
  }
}

// Export singleton instance
export const geminiService = GeminiService.getInstance(); 