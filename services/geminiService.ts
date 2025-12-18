
import { GoogleGenAI, Type } from "@google/genai";
import { PseudonymizationResult, FileData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `Eres un experto en protección de datos (RGPD). 
Tu tarea es analizar el documento proporcionado (texto, imagen o PDF) y pseudonimizarlo.
1. Identifica: Nombres, emails, teléfonos, direcciones, DNI/NIE, fechas y empresas.
2. Reemplaza cada dato con etiquetas: [NOMBRE_1], [EMAIL_1], etc.
3. Mantén coherencia: la misma entidad siempre recibe el mismo marcador.
4. Si recibes una imagen o PDF, transcribe el contenido íntegro aplicando la pseudonimización.
Devuelve un JSON con 'pseudonymizedText' y 'entitiesFound' (lista de objetos con type, originalValue, placeholder).`;

export const processContent = async (
  content: string | FileData
): Promise<PseudonymizationResult> => {
  try {
    const parts: any[] = [];

    if (typeof content === 'string') {
      parts.push({ text: `Pseudonimiza este texto:\n\n${content}` });
    } else {
      parts.push({
        inlineData: {
          data: content.data,
          mimeType: content.mimeType
        }
      });
      parts.push({ text: "Analiza este documento y devuélvelo totalmente pseudonimizado siguiendo el esquema JSON." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pseudonymizedText: { type: Type.STRING },
            entitiesFound: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  originalValue: { type: Type.STRING },
                  placeholder: { type: Type.STRING }
                },
                required: ["type", "originalValue", "placeholder"]
              }
            }
          },
          required: ["pseudonymizedText", "entitiesFound"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      originalText: typeof content === 'string' ? content : `[Contenido extraído de ${content.name}]`,
      pseudonymizedText: result.pseudonymizedText,
      entitiesFound: result.entitiesFound || []
    };
  } catch (error) {
    console.error("Error processing content:", error);
    throw new Error("Error crítico procesando el archivo. Asegúrate de que el formato es válido.");
  }
};
