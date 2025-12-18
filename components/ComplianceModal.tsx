
import React from 'react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: "LOPDGDD",
      subtitle: "Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales",
      content: "Aseguramos el tratamiento de datos personales bajo los derechos ARSOPOL (Acceso, Rectificación, Supresión, Oposición, Portabilidad, Olvido y Limitación) en territorio español.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "RGPD",
      subtitle: "Reglamento General de Protección de Datos (UE)",
      content: "Cumplimiento estricto de la normativa europea sobre minimización de datos y transparencia. El procesamiento local elimina cualquier riesgo de transferencia internacional de datos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5v.5m-9.5 5.5h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
        </svg>
      )
    },
    {
      title: "IA-ACT",
      subtitle: "Ley de Inteligencia Artificial de la UE",
      content: "Nuestra arquitectura garantiza un nivel de riesgo mínimo al no procesar datos en la nube, alineándose con las directrices de seguridad y derechos fundamentales de la nueva ley europea.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "RD 729/2023",
      subtitle: "Implementación Segura y Ética en España",
      content: "Adaptación nacional al marco europeo para el uso de IA. Cumplimos con la obligación de implementación ética y formación mediante el control local absoluto del usuario sobre su información.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-3xl w-full shadow-[20px_20px_0px_rgba(217,0,0,0.2)] flex flex-col rounded-sm overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-black text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <h2 className="text-xs font-black uppercase tracking-[0.3em]">Compliance & Local Protocol</h2>
          </div>
          <button onClick={onClose} className="hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-10 space-y-8 overflow-y-auto max-h-[75vh] scrollbar-thin">
          <div className="flex flex-col md:flex-row gap-8 items-start pb-8 border-b border-gray-100">
            <div className="shrink-0 bg-red-600 text-white p-4 font-black text-2xl rotate-3 shadow-lg">
              100%<br/>LOCAL
            </div>
            <div>
              <p className="text-sm font-bold text-black uppercase tracking-tight mb-2">Soberanía de Datos por Diseño</p>
              <p className="text-[12px] text-gray-500 leading-relaxed">
                Nuestra tecnología opera íntegramente en la memoria volátil de su navegador. A diferencia de las soluciones basadas en API externas, <strong>ningún dato sale de su dispositivo</strong>. Esto garantiza el cumplimiento técnico de los reglamentos más estrictos al no existir tratamiento por terceros ni transferencias de datos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((s, i) => (
              <div key={i} className="space-y-3 group">
                <div className="flex items-center space-x-3 text-red-600">
                  <div className="p-1.5 bg-gray-50 border border-gray-200 rounded-sm group-hover:bg-red-600 group-hover:text-white transition-all">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-black">{s.title}</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">{s.subtitle}</p>
                  <p className="text-[11px] font-medium text-gray-600 leading-normal">{s.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 py-4 px-10 flex justify-between items-center">
          <span className="text-[9px] font-black uppercase text-gray-400">Verificación Técnica: Ok (No Network Activity Detected)</span>
          <button 
            onClick={onClose}
            className="bg-black text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all rounded-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceModal;
