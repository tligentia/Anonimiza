import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Pseudonymizer from './components/Pseudonymizer';
import Footer from './components/Footer';
import LegalConsent from './components/LegalConsent';
import AboutModal from './components/AboutModal';
import ComplianceModal from './components/ComplianceModal';
import HelpModal from './components/HelpModal';
import Toast from './components/Toast';
import { ProcessStatus, PseudonymizationResult, Entity } from './types';
import { processLocalContent, reversePseudonymization } from './services/localProcessor';

const STORAGE_KEY = 'anonimiza_privado_session';

const App: React.FC = () => {
  const [mode, setMode] = useState<'ANON' | 'REVERT'>('ANON');
  const [status, setStatus] = useState<ProcessStatus>(ProcessStatus.IDLE);
  const [result, setResult] = useState<PseudonymizationResult | null>(null);
  const [inputText, setInputText] = useState('');
  const [forcedEntities, setForcedEntities] = useState<Entity[]>([]);
  const [ignoredValues, setIgnoredValues] = useState<string[]>([]);
  const [mappingFile, setMappingFile] = useState<Entity[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLegal, setShowLegal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCompliance, setShowCompliance] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.forcedEntities) setForcedEntities(parsed.forcedEntities);
        if (parsed.ignoredValues) setIgnoredValues(parsed.ignoredValues);
        if (parsed.inputText) setInputText(parsed.inputText);
        if (parsed.mappingFile) setMappingFile(parsed.mappingFile);
      } catch (e) {
        console.error("Error cargando sesión previa");
      }
    }

    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const hasConsented = localStorage.getItem('anonimiza_privado_consent');
    if (!isDev && !hasConsented) {
      setShowLegal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      mode, 
      forcedEntities, 
      ignoredValues,
      inputText,
      mappingFile
    }));
  }, [mode, forcedEntities, ignoredValues, inputText, mappingFile]);

  const notify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const handleProcess = useCallback(async (content: string) => {
    if (!content.trim()) {
      notify("El texto está vacío", "error");
      return;
    }
    setStatus(ProcessStatus.PROCESSING);
    setError(null);
    
    const startTime = performance.now();
    try {
      await new Promise(r => setTimeout(r, 600)); 
      const data = await processLocalContent(content, forcedEntities, ignoredValues);
      const endTime = performance.now();
      
      setResult({
        ...data,
        processingTime: Math.round(endTime - startTime),
        mode: 'ANON'
      });
      setStatus(ProcessStatus.COMPLETED);
      notify("Procesamiento completado con éxito", "success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de procesamiento");
      setStatus(ProcessStatus.ERROR);
      notify("Fallo en el procesado local", "error");
    }
  }, [forcedEntities, ignoredValues]);

  const handleRestore = useCallback(async (content: string, mapping: Entity[]) => {
    if (!content.trim() || !mapping.length) {
      notify("Faltan datos o mapa de restauración", "error");
      return;
    }
    setStatus(ProcessStatus.PROCESSING);
    
    const startTime = performance.now();
    await new Promise(r => setTimeout(r, 400));
    const restored = reversePseudonymization(content, mapping);
    const endTime = performance.now();
    
    setResult({
      pseudonymizedText: content,
      originalText: restored,
      entitiesFound: mapping,
      processingTime: Math.round(endTime - startTime),
      mode: 'REVERT'
    });
    setStatus(ProcessStatus.COMPLETED);
    notify("Texto original restaurado", "success");
  }, []);

  const handleReset = useCallback(() => {
    setStatus(ProcessStatus.IDLE);
    setResult(null);
    setError(null);
    notify("Sesión reiniciada", "info");
  }, []);

  const handleModeChange = useCallback((newMode: 'ANON' | 'REVERT') => {
    if (mode === 'ANON' && newMode === 'REVERT') {
      if (result?.pseudonymizedText) setInputText(result.pseudonymizedText);
      if (result?.entitiesFound) setMappingFile(result.entitiesFound);
    } else if (mode === 'REVERT' && newMode === 'ANON') {
      if (result?.originalText) setInputText(result.originalText);
    }
    
    setMode(newMode);
    setResult(null);
    setError(null);
    setStatus(ProcessStatus.IDLE);
    notify(`Modo ${newMode === 'ANON' ? 'Anonimizar' : 'Restaurar'} activo`, "info");
  }, [mode, result]);

  return (
    <div className="app-container bg-white text-black flex flex-col h-[100dvh] overflow-hidden">
      <LegalConsent isOpen={showLegal} onClose={() => setShowLegal(false)} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <ComplianceModal isOpen={showCompliance} onClose={() => setShowCompliance(false)} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <Header 
        mode={mode} 
        setMode={handleModeChange} 
        onLogoClick={() => setShowAbout(true)} 
        onHelpClick={() => setShowHelp(true)}
      />
      
      <main className="flex-1 min-h-0 overflow-hidden relative">
        <div className="container mx-auto px-8 py-4 max-w-screen-2xl h-full flex flex-col min-h-0">
          <Pseudonymizer 
            mode={mode}
            status={status}
            result={result}
            error={error}
            inputText={inputText}
            setInputText={setInputText}
            mappingFile={mappingFile}
            setMappingFile={setMappingFile}
            forcedEntities={forcedEntities}
            setForcedEntities={setForcedEntities}
            ignoredValues={ignoredValues}
            setIgnoredValues={setIgnoredValues}
            onProcess={handleProcess}
            onRestore={handleRestore}
            onReset={handleReset}
            setStatus={setStatus}
            onNotify={notify}
          />
        </div>
      </main>

      <Footer 
        result={result} 
        onOpenLegal={() => setShowLegal(true)} 
        onOpenCompliance={() => setShowCompliance(true)}
      />
    </div>
  );
};

export default App;