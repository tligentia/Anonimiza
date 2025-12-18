
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Pseudonymizer from './components/Pseudonymizer';
import Footer from './components/Footer';
import LegalConsent from './components/LegalConsent';
import AboutModal from './components/AboutModal';
import ComplianceModal from './components/ComplianceModal';
import { ProcessStatus, PseudonymizationResult, Entity } from './types';
import { processLocalContent, reversePseudonymization } from './services/localProcessor';

const STORAGE_KEY = 'anon_core_session';

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

  // Cargar sesión previa
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

    // Comprobar si se debe mostrar el consentimiento legal al inicio
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const hasConsented = localStorage.getItem('anon_core_consent');
    if (!isDev && !hasConsented) {
      setShowLegal(true);
    }
  }, []);

  // Guardar sesión ante cambios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      mode, 
      forcedEntities, 
      ignoredValues,
      inputText,
      mappingFile
    }));
  }, [mode, forcedEntities, ignoredValues, inputText, mappingFile]);

  const handleProcess = useCallback(async (content: string) => {
    if (!content.trim()) return;
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de procesamiento");
      setStatus(ProcessStatus.ERROR);
    }
  }, [forcedEntities, ignoredValues]);

  const handleRestore = useCallback(async (content: string, mapping: Entity[]) => {
    if (!content.trim() || !mapping.length) return;
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
  }, []);

  const handleReset = useCallback(() => {
    setStatus(ProcessStatus.IDLE);
    setResult(null);
    setError(null);
  }, []);

  const handleModeChange = useCallback((newMode: 'ANON' | 'REVERT') => {
    // Lógica de traspaso: Original (ANON) a Anónimo (REVERT)
    if (mode === 'ANON' && newMode === 'REVERT') {
      if (result?.pseudonymizedText) {
        setInputText(result.pseudonymizedText);
      }
      if (result?.entitiesFound) {
        // Preservar inventario: el resultado de ANON se convierte en el mapa para REVERT
        setMappingFile(result.entitiesFound);
      }
    } else if (mode === 'REVERT' && newMode === 'ANON') {
      if (result?.originalText) {
        setInputText(result.originalText);
      }
    }
    
    setMode(newMode);
    // Vacía la de resultado
    setResult(null);
    setError(null);
    setStatus(ProcessStatus.IDLE);
  }, [mode, result]);

  return (
    <div className="app-container bg-white text-black flex flex-col h-[100dvh] overflow-hidden">
      <LegalConsent isOpen={showLegal} onClose={() => setShowLegal(false)} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <ComplianceModal isOpen={showCompliance} onClose={() => setShowCompliance(false)} />
      <Header mode={mode} setMode={handleModeChange} onLogoClick={() => setShowAbout(true)} />
      
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
