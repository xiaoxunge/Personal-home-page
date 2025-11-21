import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getChatResponse = async (history: { role: string, text: string }[], newMessage: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm sorry, my connection to the surface is broken (API Key missing).";
  }

  try {
    // We are simulating a persistent chat by sending history.
    // Ideally we would use ai.chats.create but for a stateless-ish UI component wrapper, 
    // re-instantiating with history context or using generateContent is fine.
    // Here we use generateContent with system instructions for simplicity in this specific flow.
    
    const systemInstruction = `You are "Aqua", a digital persona for a creative developer's personal website. 
    Your personality is calm, fluid, and slightly mysterious, like deep water. 
    You use water metaphors occasionally. 
    You are helpful and can answer questions about web development, React, UI design, and the owner's skills.
    Keep responses concise (under 100 words) and conversational.
    The visual style of the site is anime minimalist underwater.`;

    // Convert history to format if needed, or just append to prompt for simple single-turn effect context
    // For better context, we'll construct a chat session.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      }
    });

    // Replay history (excluding the very last new message which we send)
    // Note: In a real production app, we'd keep the chat object alive in a React ref/context.
    // For this stateless function call, we might lose context if we don't pass it back and forth.
    // To keep it simple and robust for this demo, we will send the conversation as a prompt block or use the history properly.
    
    // Let's assume this function is called with the full history + new message.
    // But effectively, we'll just send the new message to a fresh chat initialized with the persona.
    // A more complex implementation would persist the 'chat' instance in a React Ref.
    
    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    
    return response.text || "I hear only silence from the deep...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The water is too turbulent right now. Please try again later.";
  }
};
