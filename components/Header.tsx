
import React from 'react';

interface HeaderProps {
  mode: 'ANON' | 'REVERT';
  setMode: (mode: 'ANON' | 'REVERT') => void;
}

const Header: React.FC<HeaderProps> = ({ mode, setMode }) => {
  return (
    <header className="bg-white border-b border-gray-200 z-50 shrink-0">
      <div className="container mx-auto px-8 h-16 flex justify-between items-center max-w-screen-2xl">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black flex items-center justify-center rotate-45">
             <span className="text-white font-black text-sm -rotate-45">A</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-black tracking-widest uppercase">ANON_CORE</span>
            <span className="text-[8px] text-red-600 font-bold uppercase tracking-tighter">Local Processor</span>
          </div>
        </div>

        {/* Translator Style Selector: Original - Anónimo */}
        <div className="flex items-center bg-gray-100 border border-gray-200 p-1 rounded-sm">
          <button 
            onClick={() => setMode('ANON')}
            className={`px-6 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === 'ANON' 
              ? 'bg-white text-red-600 shadow-sm' 
              : 'text-gray-400 hover:text-black'
            }`}
          >
            Original
          </button>
          <div className="px-2 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <button 
            onClick={() => setMode('REVERT')}
            className={`px-6 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === 'REVERT' 
              ? 'bg-white text-black shadow-sm' 
              : 'text-gray-400 hover:text-black'
            }`}
          >
            Anónimo
          </button>
        </div>

        {/* Status Indicators */}
        <div className="hidden md:flex items-center space-x-6 text-[9px] font-black uppercase tracking-widest">
           <div className="flex items-center space-x-2">
              <span className="text-gray-300">System:</span>
              <span className="text-black">Ready</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
