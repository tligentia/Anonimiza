
import React from 'react';
import { PseudonymizationResult } from '../types';

interface FooterProps {
  result: PseudonymizationResult | null;
}

const Footer: React.FC<FooterProps> = ({ result }) => {
  // En modo restauración, el texto final relevante es el originalText (el restaurado).
  // En modo anonimización, el texto final relevante es el pseudonymizedText.
  const targetText = result?.mode === 'REVERT' ? result.originalText : result?.pseudonymizedText;
  const wordCount = targetText ? targetText.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const entitiesCount = result?.entitiesFound?.length || 0;

  return (
    <footer className="bg-black text-white z-50 shrink-0 border-t border-gray-800">
      <div className="container mx-auto px-10 h-24 flex justify-between items-center max-w-screen-2xl">
        {/* Estadísticas de procesamiento dinámicas - Aumentadas */}
        <div className="flex items-center space-x-16">
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Contenido Procesado</span>
            <span className="text-2xl font-bold font-mono text-white leading-none">
              {wordCount} <span className="text-xs text-gray-500 font-sans uppercase font-black ml-1">Palabras</span>
            </span>
          </div>
          <div className="h-12 w-[1px] bg-gray-800"></div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em] mb-1">
              {result?.mode === 'REVERT' ? 'Datos Recuperados' : 'Datos Protegidos'}
            </span>
            <span className="text-2xl font-bold font-mono text-white leading-none">
              {entitiesCount} <span className="text-xs text-gray-500 font-sans uppercase font-black ml-1">Entidades</span>
            </span>
          </div>
          <div className="h-12 w-[1px] bg-gray-800"></div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Latencia Motor</span>
            <span className="text-2xl font-bold font-mono text-white leading-none">
              {result?.processingTime || 0} <span className="text-xs text-gray-500 font-sans uppercase font-black ml-1">ms</span>
            </span>
          </div>
        </div>

        {/* Créditos y Certificación - Aumentados */}
        <div className="flex items-center space-x-12">
          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-2">Created by</span>
            <a 
              href="https://jesus.depablos.es/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg font-black uppercase text-white hover:text-red-500 transition-all border-b-4 border-red-600 pb-1"
            >
              jesus de Pablos
            </a>
          </div>
          <div className="flex items-center space-x-4 bg-red-900/20 px-6 py-3 border border-red-500/30 rounded-sm">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="text-xs font-black uppercase tracking-tighter text-gray-200">Seguridad: Memoria Aislada, Proceso 100% local</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
