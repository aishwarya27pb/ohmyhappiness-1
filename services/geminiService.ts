
import { GoogleGenAI } from "@google/genai";
import { RecommendationRequest } from "../types";

export const getGiftRecommendations = async (params: RecommendationRequest) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `You are the Chief Joy Officer for 'Oh My Happiness', a luxury corporate gifting platform. 
  Your goal is to suggest 3 specific gift packages that maximize positive emotional impact and delight.
  
  Criteria provided:
  - Occasion: ${params.occasion}
  - Budget: ${params.budget} per person
  - Number of recipients: ${params.recipientCount}
  - Desired Tone: ${params.tone}
  
  Please provide a professional, warm, and inspiring response. 
  Format it with clear bullet points. 
  Each suggestion should include:
  1. A creative Name for the gift set.
  2. Brief list of contents.
  3. A "Happiness Impact" section explaining why this choice specifically will delight the recipients.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I'm having a little trouble finding the perfect joy-sparking gifts at the moment. Let's try adjusting your parameters!";
  }
};
