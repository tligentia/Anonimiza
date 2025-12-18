
import React, { useState, useEffect, useRef } from 'react';
import { ProcessStatus, PseudonymizationResult, Entity } from '../types';
import { extractTextFromPdf, extractTextFromDocx } from '../services/localProcessor';

interface PseudonymizerProps {
  mode: 'ANON' | 'REVERT';
  status: ProcessStatus;
  result: PseudonymizationResult | null;
  error: string | null;
  inputText: string;
  setInputText: (text: string) => void;
  mappingFile: Entity[] | null;
  setMappingFile: (mapping: Entity[] | null) => void;
  forcedEntities: Entity[];
  setForcedEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
  ignoredValues: string[];
  setIgnoredValues: React.Dispatch<React.SetStateAction<string[]>>;
  onProcess: (content: string) => void;
  onRestore: (content: string, mapping: Entity[]) => void;
  onReset: () => void;
  setStatus: (status: ProcessStatus) => void;
  onNotify?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const Pseudonymizer: React.FC<PseudonymizerProps> = ({ 
  mode, status, result, error, 
  inputText, setInputText,
  mappingFile, setMappingFile,
  forcedEntities, setForcedEntities, 
  ignoredValues, setIgnoredValues,
  onProcess, onRestore, onReset, setStatus, onNotify 
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [mappingFileName, setMappingFileName] = useState<string | null>(null);
  const [expandedPanel, setExpandedPanel] = useState<'NONE' | 'INPUT' | 'OUTPUT' | 'ENTITIES'>('NONE');
  
  const [newForcedOrig, setNewForcedOrig] = useState('');
  const [newForcedPlac, setNewForcedPlac] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const prevModeRef = useRef(mode);

  useEffect(() => {
    if (prevModeRef.current !== mode) {
      setFileName(null);
      setExpandedPanel('NONE');
      prevModeRef.current = mode;
    }
  }, [mode]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus(ProcessStatus.LOADING_FILE);
    setFileName(file.name);
    try {
      const extension = file.name.split('.').pop()?.toLowerCase();
      let text = "";
      if (file.type === 'application/pdf' || extension === 'pdf') {
        text = await extractTextFromPdf(await file.arrayBuffer());
      } else if (extension === 'docx') {
        text = await extractTextFromDocx(await file.arrayBuffer());
      } else {
        text = await file.text();
      }
      setInputText(text);
      setStatus(ProcessStatus.IDLE);
      onNotify?.("Documento cargado correctamente", "success");
    } catch (err) {
      onNotify?.("Fallo al leer el archivo", "error");
      setStatus(ProcessStatus.IDLE);
    }
  };

  const handlePaste = async () => {
    // 1. Verificar si la API existe
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      onNotify?.("Tu navegador bloquea el acceso. Usa Ctrl+V directamente.", "info");
      textAreaRef.current?.focus();
      return;
    }

    try {
      // 2. Intentar leer el portapapeles
      const text = await navigator.clipboard.readText();
      
      if (text) {
        setInputText(text);
        onNotify?.("Texto pegado con éxito", "success");
        // Devolver el foco al textarea
        textAreaRef.current?.focus();
      } else {
        onNotify?.("El portapapeles está vacío", "info");
      }
    } catch (err: any) {
      console.warn("Clipboard access error:", err);
      
      // 3. Manejo específico de errores
      if (err.name === 'NotAllowedError') {
        onNotify?.("Permiso denegado. Habilítalo en el candado de la barra de direcciones o usa Ctrl+V.", "error");
      } else {
        onNotify?.("No se pudo acceder al portapapeles. Usa Ctrl+V manualmente.", "info");
      }
      
      // Facilitar el pegado manual enfocando el campo
      textAreaRef.current?.focus();
    }
  };

  const handleMappingFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        setMappingFile(data);
        setMappingFileName(file.name);
        onNotify?.("Mapa JSON importado", "success");
      } else {
        onNotify?.("Formato JSON inválido", "error");
      }
    } catch (err) {
      onNotify?.("Error al leer el mapa", "error");
    }
  };

  const generateAutoAlias = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    setNewForcedPlac(`[MAN_${randomId}]`);
  };

  const addForcedSubstitution = () => {
    if (!newForcedOrig.trim() || !newForcedPlac.trim()) return;
    const entity: Entity = {
      type: 'MANUAL',
      originalValue: newForcedOrig.trim(),
      placeholder: newForcedPlac.trim().startsWith('[') ? newForcedPlac.trim() : `[${newForcedPlac.trim()}]`,
      forced: true
    };
    setForcedEntities(prev => [...prev, entity]);
    setNewForcedOrig('');
    setNewForcedPlac('');
    setIgnoredValues(prev => prev.filter(v => v.toLowerCase() !== newForcedOrig.trim().toLowerCase()));
    onNotify?.("Regla manual añadida", "info");
  };

  const removeForced = (idx: number) => {
    setForcedEntities(prev => prev.filter((_, i) => i !== idx));
  };

  const ignoreValue = (value: string) => {
    setIgnoredValues(prev => [...prev, value]);
    onNotify?.("Entidad excluida", "info");
  };

  const unignoreValue = (idx: number) => {
    setIgnoredValues(prev => prev.filter((_, i) => i !== idx));
  };

  const downloadText = (content: string, name: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    onNotify?.("Descargando documento...", "success");
  };

  const downloadMapping = () => {
    if (!result?.entitiesFound) return;
    const blob = new Blob([JSON.stringify(result.entitiesFound, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = 'mapa_transformacion.json';
    a.click();
    onNotify?.("Descargando Mapa JSON", "success");
  };

  const toggleExpand = (panel: 'INPUT' | 'OUTPUT' | 'ENTITIES') => {
    setExpandedPanel(prev => prev === panel ? 'NONE' : panel);
  };

  return (
    <div className="h-full flex flex-col min-h-0 space-y-4">
      
      <div className={`flex-[3.5] min-h-0 grid gap-6 transition-all duration-500 ease-in-out ${expandedPanel === 'ENTITIES' ? 'opacity-10 pointer-events-none translate-y-full' : ''} ${expandedPanel === 'INPUT' ? 'grid-cols-[1fr_0px] overflow-hidden' : expandedPanel === 'OUTPUT' ? 'grid-cols-[0px_1fr] overflow-hidden' : 'grid-cols-1 lg:grid-cols-2'}`}>
        
        {/* PANEL IZQUIERDO: ENTRADA */}
        <div className={`bg-white flex flex-col min-h-0 border border-black shadow-sm transition-all duration-500 overflow-hidden ${expandedPanel === 'OUTPUT' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="h-14 border-b border-black flex items-center justify-between px-6 bg-gray-50 shrink-0">
             <div className="flex items-center space-x-3">
                <button onClick={() => toggleExpand('INPUT')} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-all border border-gray-200 rounded-sm" title="Expandir área de entrada">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${expandedPanel === 'INPUT' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{mode === 'ANON' ? 'Documento Original' : 'Documento Cifrado'}</span>
                  {fileName && <span className="text-[9px] text-red-600 font-bold truncate max-w-[150px]">{fileName}</span>}
                </div>
             </div>
             
             <div className="flex items-center space-x-2">
                <button 
                  onClick={handlePaste}
                  className="text-[9px] font-black uppercase bg-white border border-black px-4 py-2 hover:bg-gray-100 transition-all rounded-sm"
                  title="Intentar pegar automáticamente"
                >
                  Pegar
                </button>
                {mode === 'REVERT' && (
                  <div className="flex items-center">
                    <input type="file" accept=".json" onChange={handleMappingFileChange} className="hidden" id="mapping-upload" />
                    <label htmlFor="mapping-upload" className={`text-[10px] font-black uppercase cursor-pointer px-4 py-2 border border-black transition-all rounded-sm ${mappingFile ? 'bg-green-600 text-white border-green-700' : 'bg-white text-black hover:bg-black hover:text-white'}`}>
                      {mappingFile ? 'MAPA ✓' : '1. CARGAR MAPA'}
                    </label>
                  </div>
                )}
                <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="text-[10px] font-black uppercase cursor-pointer bg-black text-white px-5 py-2 hover:bg-red-600 transition-all border border-black rounded-sm" title="Formatos: PDF, DOCX, TXT">
                  {mode === 'REVERT' ? '2. CARGAR TEXTO' : 'IMPORTAR DOC'}
                </label>
             </div>
          </div>
          <div className="flex-1 relative flex flex-col min-h-0 bg-white">
            <textarea
              ref={textAreaRef}
              className="flex-1 p-10 font-legal resize-none outline-none bg-transparent overflow-y-auto text-black placeholder-gray-300 scrollbar-thin"
              placeholder={mode === 'ANON' ? "Pegue el texto o importe PDF/Word/TXT para anonimizar localmente..." : "Inserte el texto anonimizado para restaurar datos originales..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute bottom-4 right-6 flex items-center space-x-4">
               {inputText.length > 0 && (
                 <button onClick={() => setInputText('')} className="text-[9px] font-black uppercase text-gray-300 hover:text-red-600 transition-colors">Limpiar</button>
               )}
               <span className="text-[9px] font-black text-gray-200 uppercase tracking-widest">{inputText.length} caracteres</span>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: SALIDA */}
        <div className={`bg-white flex flex-col min-h-0 border border-black shadow-sm transition-all duration-500 overflow-hidden ${expandedPanel === 'INPUT' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="h-14 border-b border-black flex items-center justify-between px-6 bg-gray-50 shrink-0">
             <div className="flex items-center space-x-3">
                <button onClick={() => toggleExpand('OUTPUT')} className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-all border border-gray-200 rounded-sm" title="Expandir área de salida">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${expandedPanel === 'OUTPUT' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Resultado Procesado</span>
             </div>
             
             <div className="flex items-center space-x-2">
                {result && (
                  <div className="flex items-center space-x-1.5 mr-3 border-r border-gray-200 pr-3">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(mode === 'ANON' ? result.pseudonymizedText : result.originalText);
                        onNotify?.("Copiado al portapapeles", "success");
                      }} 
                      className="text-[9px] font-black uppercase text-gray-500 hover:text-black px-2 py-1.5 border border-transparent hover:border-gray-200 rounded-sm"
                    >
                      Copiar
                    </button>
                    {mode === 'ANON' && (
                      <button 
                        onClick={downloadMapping} 
                        className="text-[9px] font-black uppercase text-black border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-all rounded-sm"
                        title="Necesario para restaurar el texto original más tarde"
                      >
                        MAPA JSON
                      </button>
                    )}
                    <button 
                      onClick={() => downloadText(mode === 'ANON' ? result.pseudonymizedText : result.originalText, 'documento_final.txt')} 
                      className="text-[9px] font-black uppercase text-red-600 border border-red-600 px-3 py-1.5 hover:bg-red-600 hover:text-white transition-all rounded-sm"
                    >
                      EXPORTAR
                    </button>
                  </div>
                )}

                {mode === 'ANON' ? (
                  <button onClick={() => onProcess(inputText)} className="bg-red-600 text-white px-8 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all border border-red-600 rounded-sm shadow-sm active:scale-95">
                    {status === ProcessStatus.PROCESSING ? 'PROCESANDO...' : 'PROCESAR'}
                  </button>
                ) : (
                  <button onClick={() => onRestore(inputText, mappingFile || [])} disabled={!mappingFile} className={`px-8 py-2 text-[10px] font-black uppercase tracking-widest transition-all border rounded-sm shadow-sm active:scale-95 ${!mappingFile ? 'bg-gray-100 cursor-not-allowed text-gray-400 border-gray-200' : 'bg-black text-white hover:bg-red-600 border-black'}`}>
                    RESTAURAR ORIGINAL
                  </button>
                )}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 font-legal relative bg-white selection:bg-red-600 selection:text-white">
            {status === ProcessStatus.PROCESSING && (
              <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center space-y-6 z-50">
                 <div className="w-24 h-1 bg-gray-100 overflow-hidden"><div className="h-full bg-red-600 animate-width"></div></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600 animate-pulse">Analizando RAM Local...</span>
              </div>
            )}
            {mode === 'ANON' && result?.mode === 'ANON' && (
              <div className="whitespace-pre-wrap text-black">
                {result.pseudonymizedText.split(/(\[.*?\])/g).map((part, i) => 
                  part.startsWith('[') ? <span key={i} className="text-red-600 font-bold bg-red-50 px-1 border-b-2 border-red-200">{part}</span> : part
                )}
              </div>
            )}
            {mode === 'REVERT' && result?.mode === 'REVERT' && <div className="whitespace-pre-wrap border-l-8 border-black pl-8 text-black italic bg-gray-50/50 p-6">{result?.originalText}</div>}
            {!result && status === ProcessStatus.IDLE && (
              <div className="h-full flex items-center justify-center opacity-5 select-none grayscale">
                 <span className="text-[20px] font-black uppercase tracking-[2.5em] -rotate-90">Ready_To_Process</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PANEL INFERIOR: GESTIÓN DE REGLAS */}
      <div className={`flex flex-col bg-white border border-black shadow-sm overflow-hidden transition-all duration-500 ease-in-out ${expandedPanel === 'ENTITIES' ? 'flex-[10] mt-0 fixed inset-x-8 bottom-20 top-20 z-[60]' : 'flex-[1.2] mt-4'}`}>
        <div className="h-12 border-b border-black flex items-center justify-between px-10 bg-gray-100 shrink-0">
           <div className="flex items-center space-x-4">
              <button onClick={() => toggleExpand('ENTITIES')} className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-sm" title="Maximizar Tabla">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${expandedPanel === 'ENTITIES' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 11l7-7 7 7M5 19l7-7 7 7" /></svg>
              </button>
              <span className="text-[11px] font-black uppercase tracking-widest text-black">Tabla de Claves</span>
           </div>
           <div className="flex items-center space-x-8">
              <div className="flex bg-white border border-gray-300 rounded-sm p-1 overflow-hidden">
                 <input placeholder="Original" value={newForcedOrig} onChange={e => setNewForcedOrig(e.target.value)} className="text-[10px] font-bold px-3 py-1 outline-none border-r border-gray-100 w-32" />
                 
                 <div className="flex items-center border-r border-gray-100 pr-1">
                    <input 
                      placeholder="Alias" 
                      value={newForcedPlac} 
                      onChange={e => setNewForcedPlac(e.target.value)} 
                      className="text-[10px] font-bold px-3 py-1 outline-none w-24" 
                    />
                    <button 
                      onClick={generateAutoAlias} 
                      title="Generar Alias Aleatorio"
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                 </div>

                 <button onClick={addForcedSubstitution} className="bg-black text-white px-4 py-1 text-[10px] font-black uppercase hover:bg-red-600 transition-colors rounded-r-sm">Añadir</button>
              </div>
              <button 
                onClick={() => { onReset(); setIgnoredValues([]); setForcedEntities([]); setMappingFile(null); setFileName(null); setInputText(''); }} 
                className="text-[10px] font-black uppercase text-gray-400 hover:text-red-600 transition-colors"
                title="Reinicia todo el entorno de trabajo"
              >
                Reset
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-white min-h-0 scrollbar-thin">
           <div className={`grid gap-4 ${expandedPanel === 'ENTITIES' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'}`}>
              {ignoredValues.map((value, idx) => (
                <div key={`ignored-${idx}`} className="flex flex-col p-4 bg-gray-50 border border-dashed border-gray-200 opacity-60 hover:opacity-100 transition-all group relative rounded-sm">
                   <button onClick={() => unignoreValue(idx)} className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">REST.</button>
                   <span className="text-[8px] font-black uppercase text-gray-400 mb-2">EXCLUIDO</span>
                   <span className="text-[11px] font-black uppercase bg-gray-200 text-gray-500 px-2 py-1 text-center truncate mb-2 rounded-sm">IGNORED</span>
                   <span className="text-[12px] font-bold text-gray-400 text-center truncate">{value}</span>
                </div>
              ))}
              {forcedEntities.map((entity, idx) => (
                <div key={`forced-${idx}`} className="flex flex-col p-4 bg-red-50 border border-red-100 hover:border-red-600 transition-all group relative rounded-sm">
                   <button onClick={() => removeForced(idx)} className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">X</button>
                   <span className="text-[8px] font-black uppercase text-red-600 mb-2">FORZADA</span>
                   <span className="text-[11px] font-black uppercase bg-red-600 text-white px-2 py-1 text-center truncate mb-2 rounded-sm">{entity.placeholder}</span>
                   <span className="text-[12px] font-bold text-gray-800 text-center truncate">{entity.originalValue}</span>
                </div>
              ))}
              {((mode === 'ANON' ? result?.entitiesFound : mappingFile) || []).filter(e => !e.forced).map((entity, idx) => (
                <div key={`auto-${idx}`} className="flex flex-col p-4 bg-white border border-gray-200 hover:border-black transition-all group relative rounded-sm">
                   <button onClick={() => ignoreValue(entity.originalValue)} className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity" title="Ignorar esta entidad">IGN.</button>
                   <span className="text-[8px] font-black uppercase text-gray-400 bg-gray-50 px-2 py-0.5 mb-2 w-fit rounded-sm">{entity.type}</span>
                   <span className="text-[11px] font-black uppercase bg-black text-white px-2 py-1 text-center truncate mb-2 rounded-sm">{entity.placeholder}</span>
                   <span className="text-[12px] font-bold text-gray-800 text-center truncate">{entity.originalValue}</span>
                </div>
              ))}
              {!(forcedEntities.length || ignoredValues.length || (mode === 'ANON' ? result?.entitiesFound : mappingFile)?.length) && (
                <div className="col-span-full h-24 flex flex-col items-center justify-center opacity-10 border border-dashed border-gray-200 rounded-sm">
                   <span className="text-[10px] font-black uppercase tracking-[1em]">Vault_Empty</span>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Pseudonymizer;
