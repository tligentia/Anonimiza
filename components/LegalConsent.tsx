import React from 'react';

interface LegalConsentProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalConsent: React.FC<LegalConsentProps> = ({ isOpen, onClose }) => {
  const handleAccept = () => {
    localStorage.setItem('anonimiza_privado_consent', 'true');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
      <div className="bg-white border border-black max-w-2xl w-full shadow-lg flex flex-col rounded-sm overflow-hidden">
        <div className="bg-black text-white p-6 flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-widest">Protocolo Legal y de Privacidad</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh] scrollbar-thin">
          <section>
            <h3 className="text-[11px] font-black uppercase text-red-600 mb-2">1. Procesamiento 100% Local (Edge Computing)</h3>
            <p className="text-[12px] text-gray-700 leading-relaxed font-medium">
              Esta aplicación procesa sus documentos exclusivamente en la memoria RAM de su navegador. 
              <strong> Ningún fragmento de texto, nombre o dato sensible se envía, almacena o registra en servidores externos.</strong> 
              La tecnología utilizada se basa en expresiones regulares (RegEx) locales que garantizan la soberanía absoluta de sus datos.
            </p>
          </section>

          <section>
            <h3 className="text-[11px] font-black uppercase text-red-600 mb-2">2. Política de Cookies y Almacenamiento</h3>
            <p className="text-[12px] text-gray-700 leading-relaxed font-medium">
              No utilizamos cookies de seguimiento, publicidad ni análisis de terceros. El sistema utiliza únicamente 
              <code>localStorage</code> para memorizar sus preferencias de sesión (como entidades forzadas) con el fin de mejorar su experiencia de usuario. 
              Al hacer clic en aceptar, confirma que ha sido informado sobre este funcionamiento técnico.
            </p>
          </section>

          <section>
            <h3 className="text-[11px] font-black uppercase text-red-600 mb-2">3. Exención de Responsabilidad</h3>
            <p className="text-[12px] text-gray-700 leading-relaxed font-medium">
              Aunque la herramienta es altamente precisa en la identificación de patrones, el usuario es el responsable final de verificar que la anonimización cumple con sus requisitos específicos de cumplimiento legal o RGPD antes de compartir el documento resultante.
            </p>
          </section>
        </div>

        <div className="border-t border-gray-100 p-6 flex justify-end">
          <button 
            onClick={handleAccept}
            className="bg-black text-white px-10 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all rounded-sm"
          >
            Acepto el Protocolo Local
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalConsent;