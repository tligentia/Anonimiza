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
    <footer className="bg-white border-t border-gray-200 z-50 shrink-0">
      <div className="container mx-auto px-6 h-16 max-w-screen-2xl flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
        
        {/* Left Section: Badges */}
        <div className="flex items-center space-x-3">
          <div className="bg-red-50 text-red-700 px-3 py-1.5 rounded-sm border border-red-100 flex items-center shadow-sm">
            <span>v25.12E</span>
          </div>
          
          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-sm border border-green-100 flex items-center shadow-sm justify-center">
            {result?.processingTime ? (
               <div className="flex items-center space-x-3 px-1">
                 <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span>{result.processingTime} ms</span>
                 </div>
                 <div className="w-px h-2 bg-green-200"></div>
                 <span>{wordCount} Palabras</span>
                 <div className="w-px h-2 bg-green-200"></div>
                 <span>{entitiesCount} {result.mode === 'REVERT' ? 'Recuperados' : 'Anonimizados'}</span>
               </div>
            ) : (
               <div className="flex items-center space-x-2 px-1 min-w-[100px] justify-center">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                 <span>System Ready</span>
               </div>
            )}
          </div>
        </div>

        {/* Right Section: Links & Branding */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenLegal} 
            className="text-gray-400 hover:text-black transition-colors hidden sm:block"
          >
            Cookies y Privacidad
          </button>
          
          <button 
            onClick={onOpenCompliance}
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Protocolo</span>
            <span className="text-blue-600">✓</span>
          </button>

          <div className="h-4 w-px bg-gray-200 mx-2 hidden sm:block"></div>

          <div className="flex items-center space-x-1 hidden sm:flex">
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