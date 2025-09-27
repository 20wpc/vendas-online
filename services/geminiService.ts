
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found in environment variables. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateCreativeDescription = async (eventName: string): Promise<string> => {
  if (!API_KEY) {
    return "O serviço de IA não está disponível no momento. A chave da API não foi configurada.";
  }

  try {
    const prompt = `Gere uma descrição de marketing curta, empolgante e criativa em português para um evento chamado "${eventName}". Use no máximo 3 frases. Foque em criar um senso de urgência e exclusividade.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating creative description:", error);
    return "Não foi possível gerar a descrição no momento. Tente novamente mais tarde.";
  }
};
