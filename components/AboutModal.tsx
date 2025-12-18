
import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const url = "https://anonimiza.tligent.com/";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&color=000000&bgcolor=ffffff&format=svg`;

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-2xl w-full shadow-[20px_20px_0px_rgba(0,0,0,0.3)] flex flex-col rounded-sm overflow-hidden relative">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-red-600 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-12 flex flex-col items-center text-center space-y-8">
          
          {/* Título e Identificador */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Acceso Directo</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-black">ANONIMIZA</h2>
          </div>

          {/* QR Code Grande */}
          <div className="p-4 bg-white border border-black rounded-sm shadow-sm">
            <img 
              src={qrUrl} 
              alt="QR Code de Acceso" 
              className="w-64 h-64 md:w-80 md:h-80 select-none pointer-events-none"
              loading="lazy"
            />
          </div>

          {/* URL Grande */}
          <div className="space-y-3 w-full">
            <div className="bg-gray-50 border border-black py-5 px-8 rounded-sm overflow-hidden flex justify-center">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg md:text-2xl font-mono font-bold text-red-600 hover:text-black transition-colors whitespace-nowrap"
                title={url}
              >
                {url}
              </a>
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Escanea el código para compartir la herramienta</p>
          </div>

        </div>

        {/* Footer del Modal */}
        <div className="bg-black text-white py-3 px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span>Versión 25.12B</span>
          <span className="text-red-600">Secure Environment</span>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;
