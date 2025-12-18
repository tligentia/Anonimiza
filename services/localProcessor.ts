
import { PseudonymizationResult, Entity } from "../types";

const PATTERNS = {
  EMAIL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  PHONE: /\b(?:\+34|0034|34)?[6789]\d{8}\b/g,
  IP: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,
  DNI_NIE: /\b\d{8}[A-HJ-NP-TV-Z]\b|\b[XYZ]\d{7}[A-Z]\b/gi,
  CIF: /\b[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]\b/gi,
  IBAN: /\b[A-Z]{2}\d{2}(?:\s?\d{4}){4,5}\b/gi,
  LICENCIA: /\b\d{5}-[A-Z]{2,}\b/g,
  DATE: /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g,
  DATE_TEXT: /\b\d{1,2}\s+de\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+\d{4}\b/gi,
  COMPANY: /\b(?:[A-Z\u00C0-\u017F][a-z\u00C0-\u017F]+\s?){1,3}(?:S\.?L\.?|S\.?A\.?|S\.?L\.?U\.?|S\.?A\.?U\.?|S\.?Coop\.?|Sociedad\s+(?:Anónima|Limitada|Cooperativa))\b/gi,
  NAME_HEURISTIC: /(?:Sr\.|Sra\.|D\.|Dña\.|Dñ\.)\s+([A-Z][a-z\u00C0-\u017F]+\s+[A-Z][a-z\u00C0-\u017F]+(?:\s+[A-Z][a-z\u00C0-\u017F]+)?)/g,
  NAME_FULL: /\b(?:[A-Z\u00C0-\u017F][a-z\u00C0-\u017F]+\s+){1,2}[A-Z\u00C0-\u017F][a-z\u00C0-\u017F]+\b/g
};

const BLACKLIST_CAPS = new Set([
  'Investigación', 'Informe', 'Fecha', 'Detective', 'Número', 'Cliente', 
  'Introducción', 'Desarrollo', 'Observaciones', 'Registro', 'Conclusión',
  'Firma', 'Sello', 'Calle', 'Madrid', 'Club', 'Deportivo', 'Pádel', 'Empresa',
  'Propósito', 'Vigilancia', 'Seguimiento', 'Identidad', 'Trabajadora', 'Redes',
  'Sociales', 'Imágenes', 'Videos', 'Dolencia', 'Baja', 'Médica', 'Lumbalgia',
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Lunes', 'Martes', 
  'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
]);

const cleanText = (text: string): string => {
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Eliminar caracteres de control no imprimibles
    .replace(/\r\n/g, "\n")
    .trim();
};

export const processLocalContent = async (text: string, forced: Entity[] = [], ignored: string[] = []): Promise<PseudonymizationResult> => {
  const sourceText = cleanText(text);
  let processedText = sourceText;
  const entitiesFound: Entity[] = [...forced];
  const entityMap = new Map<string, string>();
  const counters: Record<string, number> = {};
  const ignoredSet = new Set(ignored.map(i => i.toLowerCase().trim()));

  forced.forEach(e => {
    entityMap.set(e.originalValue, e.placeholder);
    const typeKey = e.type.split('_')[0];
    counters[typeKey] = Math.max(counters[typeKey] || 0, 1);
  });

  const addEntity = (type: string, value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue || trimmedValue.length < 3) return;
    if (entityMap.has(trimmedValue)) return;
    
    if (ignoredSet.has(trimmedValue.toLowerCase())) return;

    if (type === 'NAME_FULL') {
      const words = trimmedValue.split(/\s+/);
      if (words.some(word => BLACKLIST_CAPS.has(word))) return;
    }
    
    const typeKey = type.split('_')[0];
    counters[typeKey] = (counters[typeKey] || 0) + 1;
    const placeholder = `[${typeKey}_${counters[typeKey]}]`;
    entityMap.set(trimmedValue, placeholder);
    
    entitiesFound.push({
      type: typeKey,
      originalValue: trimmedValue,
      placeholder
    });
  };

  const order = ['EMAIL', 'IBAN', 'DNI_NIE', 'CIF', 'PHONE', 'DATE_TEXT', 'DATE', 'LICENCIA', 'COMPANY', 'NAME_HEURISTIC', 'NAME_FULL', 'IP'];
  
  for (const type of order) {
    const regex = (PATTERNS as any)[type];
    if (!regex) continue;
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(sourceText)) !== null) {
      const value = (type === 'NAME_HEURISTIC' && match[1]) ? match[1] : match[0];
      addEntity(type, value);
    }
  }

  const sortedEntities = Array.from(entityMap.entries()).sort((a, b) => b[0].length - a[0].length);
  
  for (const [original, placeholder] of sortedEntities) {
    const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escaped, 'g');
    processedText = processedText.replace(pattern, placeholder);
  }

  return { originalText: sourceText, pseudonymizedText: processedText, entitiesFound };
};

export const reversePseudonymization = (text: string, map: Entity[]): string => {
  let restored = text;
  const sortedMap = [...map].sort((a, b) => b.placeholder.length - a.placeholder.length);
  
  for (const entity of sortedMap) {
    const escapedPlaceholder = entity.placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escapedPlaceholder, 'g');
    restored = restored.replace(pattern, entity.originalValue);
  }
  return restored;
};

export const extractTextFromPdf = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const pdfjsLib = (window as any).pdfjsLib;
  if (!pdfjsLib) throw new Error("Librería PDF.js no cargada");
  
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
};

export const extractTextFromDocx = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  const mammoth = (window as any).mammoth;
  if (!mammoth) throw new Error("Librería Mammoth no cargada");
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};
