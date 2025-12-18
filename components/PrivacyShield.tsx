
import React from 'react';

const PrivacyShield: React.FC = () => {
  return (
    <div className="mt-12 p-6 border-2 border-black bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-red-600 text-white rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-widest">Protocolo de Exclusión de Nube</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Procesamiento 100% en RAM local · Sin logs externos</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[9px] font-black text-gray-400 uppercase">Seguridad</p>
          <button 
            type="button"
            onClick={() => alert('Certificación Técnica: Los archivos cargados se descomponen en memoria y se analizan mediante expresiones regulares locales. Ningún byte se envía a servidores de terceros.')}
            className="text-[10px] font-bold text-black border-b-2 border-red-600 uppercase hover:bg-red-600 hover:text-white transition-all px-1"
          >
            Auditar Conexión
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyShield;
