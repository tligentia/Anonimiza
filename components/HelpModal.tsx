
import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: "01",
      title: "Carga de Datos",
      desc: "Importa un archivo (PDF, DOCX, TXT) o pega directamente el texto legal en el panel izquierdo. El procesamiento es 100% local."
    },
    {
      num: "02",
      title: "Configuración",
      desc: "Añade reglas manuales en la 'Tabla de Claves' si necesitas forzar alias específicos o ignorar términos detectados por el motor."
    },
    {
      num: "03",
      title: "Procesamiento",
      desc: "Haz clic en 'PROCESAR'. El sistema analizará el contenido en la RAM de tu navegador y generará la versión protegida."
    },
    {
      num: "04",
      title: "Exportación",
      desc: "Copia el texto final o descárgalo junto al Mapa JSON. El Mapa es necesario si quieres revertir el proceso más adelante."
    }
  ];

  return (
    <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-4xl w-full shadow-[20px_20px_0px_rgba(0,0,0,0.1)] rounded-sm overflow-hidden">
        <div className="bg-black text-white p-6 flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-[0.3em]">Guía de Operación Anonimiza Privado</h2>
          <button onClick={onClose} className="hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="group space-y-4">
              <div className="text-5xl font-black text-gray-300 group-hover:text-red-600 transition-colors border-b-4 border-gray-100 group-hover:border-red-600 pb-2 leading-none">
                {s.num}
              </div>
              <h3 className="text-[12px] font-black uppercase text-black tracking-widest">{s.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 border-t border-gray-200">
          <div className="flex items-start space-x-4 bg-white p-4 border border-gray-200 rounded-sm">
            <div className="bg-red-600 text-white p-2 rounded-full shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <p className="text-[10px] text-gray-600 font-bold uppercase leading-normal">
              Recuerda: El Mapa JSON es tu llave privada. Sin él, la reversión de los datos en el modo "Anónimo" será técnicamente imposible. No compartas este archivo con terceros.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <button 
              onClick={onClose}
              className="bg-black text-white px-12 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-[4px_4px_0px_rgba(217,0,0,0.3)] hover:shadow-none"
            >
              Comenzar a Trabajar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
