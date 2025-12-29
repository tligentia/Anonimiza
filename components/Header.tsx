
import React from 'react';
import { AppMenu } from './AppMenu';

interface HeaderProps {
  mode: 'ANON' | 'REVERT';
  setMode: (mode: 'ANON' | 'REVERT') => void;
  onLogoClick?: () => void;
  onHelpClick?: () => void;
  onManualClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, setMode, onLogoClick, onHelpClick, onManualClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 z-50 shrink-0">
      <div className="container mx-auto px-8 h-16 flex justify-between items-center max-w-screen-2xl">
        {/* Brand */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={onLogoClick}
          title="Ver QR y Acceso Directo"
        >
          <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center rotate-45 transition-transform group-hover:scale-110">
             <span className="text-red-600 font-black text-sm -rotate-45">A</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-black tracking-widest uppercase group-hover:text-red-600 transition-colors">Anonimiza Privado</span>
            <span className="text-[8px] text-red-600 font-bold uppercase tracking-tighter">Local Processor</span>
          </div>
        </div>

        {/* Translator Style Selector */}
        <div className="flex items-center bg-gray-50 border border-gray-200 p-1 rounded-sm">
          <button 
            onClick={() => setMode('ANON')}
            className={`px-6 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${
              mode === 'ANON' 
              ? 'bg-white text-red-600 border border-gray-200 shadow-sm' 
              : 'text-gray-400 hover:text-black'
            }`}
          >
            Anonimizar
          </button>
          <div className={`px-2 text-black transition-transform duration-300 ease-in-out ${mode === 'REVERT' ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <button 
            onClick={() => setMode('REVERT')}
            className={`px-6 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${
              mode === 'REVERT' 
              ? 'bg-white text-black border border-gray-200 shadow-sm' 
              : 'text-gray-400 hover:text-black'
            }`}
          >
            Restaurar
          </button>
        </div>

        {/* Action Buttons & Status */}
        <div className="flex items-center space-x-6">
           <button 
             onClick={onManualClick}
             className="flex items-center space-x-2 text-[9px] font-black uppercase text-black hover:text-red-600 transition-colors bg-gray-50 px-3 py-1.5 border border-gray-200 rounded-sm hover:border-black"
             title="Abrir Manual de Operación"
           >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Manual</span>
           </button>
           
           <div className="border-l border-gray-100 pl-4">
             <AppMenu />
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
