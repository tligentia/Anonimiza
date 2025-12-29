import React from 'react';
import { PseudonymizationResult } from '../types';

interface FooterProps {
  result: PseudonymizationResult | null;
  onOpenLegal: () => void;
  onOpenCompliance?: () => void;
}

const Footer: React.FC<FooterProps> = ({ result, onOpenLegal, onOpenCompliance }) => {
  const targetText = result?.mode === 'REVERT' ? result.originalText : result?.pseudonymizedText;
  const wordCount = targetText ? targetText.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const entitiesCount = result?.entitiesFound?.length || 0;

  return (
    <footer className="bg-white border-t border-gray-200 z-50 shrink-0 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-6 h-16 max-w-screen-2xl flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
        
        {/* Left Section: Version */}
        <div className="flex items-center">
          <div className="bg-red-50 text-red-700 px-3 py-1.5 rounded-sm border border-red-100 flex items-center shadow-sm">
            <span>v25.12E</span>
          </div>
        </div>

        {/* Center Section: Enhanced Process Box */}
        <div className="flex-1 flex justify-center px-4">
          <div className="bg-gray-50 border border-gray-200 rounded-full px-1 py-1 flex items-center shadow-inner">
            {result?.processingTime ? (
               <div className="flex items-center">
                 {/* Latency Segment */}
                 <div className="flex items-center space-x-2 px-4 py-1 bg-white rounded-full border border-gray-100 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-gray-400">LAT:</span>
                    <span className="text-black font-mono">{result.processingTime}ms</span>
                 </div>
                 
                 <div className="w-px h-4 bg-gray-200 mx-1"></div>
                 
                 {/* Words Segment */}
                 <div className="px-4 py-1 flex items-center space-x-2">
                    <span className="text-gray-400">VOL:</span>
                    <span className="text-black font-mono">{wordCount}</span>
                    <span className="text-[8px] text-gray-300 font-bold">WDS</span>
                 </div>

                 <div className="w-px h-4 bg-gray-200 mx-1"></div>

                 {/* Converted Segment */}
                 <div className="px-4 py-1 flex items-center space-x-2">
                    <span className={result.mode === 'REVERT' ? 'text-blue-500' : 'text-red-500'}>
                      {result.mode === 'REVERT' ? 'REC:' : 'ANO:'}
                    </span>
                    <span className="text-black font-mono">{entitiesCount}</span>
                    <span className="text-[8px] text-gray-300 font-bold">OBJ</span>
                 </div>
               </div>
            ) : (
               <div className="flex items-center space-x-3 px-6 py-1 text-gray-400">
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                 <span className="tracking-[0.3em]">Sistema Local Preparado</span>
               </div>
            )}
          </div>
        </div>

        {/* Right Section: Links & Branding */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenLegal} 
            className="text-gray-400 hover:text-black transition-colors hidden sm:block hover:underline underline-offset-4 decoration-red-600/30"
          >
            Cookies y Privacidad
          </button>
          
          <button 
            onClick={onOpenCompliance}
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-2 group border border-blue-100 bg-blue-50/30 px-3 py-1.5 rounded-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Protocolo</span>
            <span className="text-blue-600 font-bold ml-1">✓</span>
          </button>

          <div className="h-4 w-px bg-gray-200 mx-2 hidden sm:block"></div>

          <div className="flex items-center space-x-1 hidden sm:flex text-[9px]">
             <a href="https://jesus.depablos.es/" target="_blank" className="font-black text-black hover:text-red-600 transition-colors">Jesús de Pablos</a>
             <span className="text-gray-300">/</span>
             <a href="https://tligent.com/" target="_blank" className="font-black text-black hover:text-red-600 transition-colors">Tligent</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;