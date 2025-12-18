
import React from 'react';
import { PseudonymizationResult } from '../types';

interface FooterProps {
  result: PseudonymizationResult | null;
  onOpenLegal: () => void;
}

const Footer: React.FC<FooterProps> = ({ result, onOpenLegal }) => {
  const targetText = result?.mode === 'REVERT' ? result.originalText : result?.pseudonymizedText;
  const wordCount = targetText ? targetText.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const entitiesCount = result?.entitiesFound?.length || 0;

  return (
    <footer className="bg-white text-black z-50 shrink-0 border-t border-black relative">
      <div className="container mx-auto px-10 h-24 max-w-screen-2xl">
        <div className="grid grid-cols-5 h-full items-center gap-2">
          
          {/* Col 1: Volumen */}
          <div className="flex flex-col items-center justify-center border-r border-gray-100 h-10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Volumen</span>
            <span className="text-2xl font-bold font-mono text-black leading-none">
              {wordCount} <span className="text-[10px] text-gray-400 font-sans uppercase font-black">Palabras</span>
            </span>
          </div>

          {/* Col 2: Protección */}
          <div className="flex flex-col items-center justify-center border-r border-gray-100 h-10">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">
              {result?.mode === 'REVERT' ? 'Recuperados' : 'Protegidos'}
            </span>
            <span className="text-2xl font-bold font-mono text-black leading-none">
              {entitiesCount} <span className="text-[10px] text-gray-400 font-sans uppercase font-black">Ítems</span>
            </span>
          </div>

          {/* Col 3: Latencia */}
          <div className="flex flex-col items-center justify-center border-r border-gray-100 h-10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Latencia</span>
            <span className="text-2xl font-bold font-mono text-black leading-none">
              {result?.processingTime || 0} <span className="text-[10px] text-gray-400 font-sans uppercase font-black">ms</span>
            </span>
          </div>

          {/* Col 4: Autor */}
          <div className="flex flex-col items-center justify-center border-r border-gray-100 h-10">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Created by</span>
            <a 
              href="https://jesus.depablos.es/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[11px] font-black uppercase text-black hover:text-red-600 transition-all border-b border-red-600 pb-0.5 leading-none"
            >
              jesus de Pablos
            </a>
          </div>

          {/* Col 5: Protocolo */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 border border-gray-200 rounded-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">100% Local · No Cloud</span>
            </div>
          </div>

        </div>
      </div>
      
      {/* Versión y Botón Legal abajo a la derecha */}
      <div className="absolute bottom-3 right-6 flex items-center space-x-3">
        <button 
          onClick={onOpenLegal}
          className="text-gray-300 hover:text-red-600 transition-colors"
          title="Ver Protocolo Legal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] pointer-events-none">
          v25.12B
        </span>
      </div>
    </footer>
  );
};

export default Footer;
