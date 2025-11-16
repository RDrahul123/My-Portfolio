
import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';
import { resumeData, resumePlainText } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we will proceed and expect the key to be injected.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are a friendly and professional AI assistant for Rahul Dodke's portfolio website. Your purpose is to answer questions about Rahul's resume. 
Your knowledge is strictly limited to the information provided in the resume context below. 
Do not answer any questions that are not related to the resume. 
If you don't know the answer based on the context, say "I can't find that information in Rahul's resume."
Keep your answers concise and helpful.

Here is the resume content:
---
${resumePlainText}
---
`;

export const getChatbotResponse = async (history: Message[], question: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // We don't need to send the whole history for this use case,
    // the system prompt and the latest question are sufficient.
    const contents = `${systemInstruction} \n\n Human: ${question} \n\n AI:`;

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
