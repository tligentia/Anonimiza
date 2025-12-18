
import React, { useState } from 'react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  if (!isOpen) return null;

  const pages = [
    // Diapositiva 1
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn">
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none">
        SOBERANÍA DE DATOS <span className="text-red-600">ABSOLUTA.</span>
      </h1>
      <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">ANON_CORE: La Estación Documental Jurídica.</p>
      <div className="pt-12">
        <div className="text-8xl font-black flex items-center">
          ANON<span className="text-red-600 border-b-8 border-red-600">_</span>CORE
        </div>
      </div>
    </div>,

    // Diapositiva 2
    <div className="space-y-12 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase border-l-8 border-black pl-6">PROCESAMIENTO 100% LOCAL.</h2>
      <p className="text-lg text-gray-600 leading-relaxed font-medium">A diferencia de las herramientas de IA en la nube, <span className="text-black font-black">ANON_CORE</span> ejecuta toda la lógica de detección y anonimización directamente en su navegador. Cero datos enviados a servidores externos. Cero APIs de terceros.</p>
      <div className="grid grid-cols-2 gap-12 pt-8">
        <div className="border-2 border-green-500 p-8 rounded-sm bg-green-50/30 flex flex-col items-center text-center">
          <div className="text-green-600 font-black mb-4 uppercase text-xs">ANON_CORE</div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="mt-4 font-black uppercase text-[10px] tracking-widest">Entorno Seguro</span>
        </div>
        <div className="border-2 border-red-200 p-8 rounded-sm opacity-40 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center rotate-45 pointer-events-none">
             <div className="w-full h-1 bg-red-600 opacity-20"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center -rotate-45 pointer-events-none">
             <div className="w-full h-1 bg-red-600 opacity-20"></div>
          </div>
          <div className="text-gray-400 font-black mb-4 uppercase text-xs">OTRAS IA (CLOUD)</div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span className="mt-4 font-black uppercase text-[10px] tracking-widest">Riesgo de Fuga</span>
        </div>
      </div>
    </div>,

    // Diapositiva 3
    <div className="space-y-10 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase">NUESTRA FILOSOFÍA DE SEGURIDAD.</h2>
      <div className="grid grid-cols-1 gap-6 pt-6">
        {[
          { t: "EDGE COMPUTING", d: "Toda la lógica se ejecuta en su navegador, no en la nube.", i: "💻" },
          { t: "CERO DEPENDENCIAS EXTERNAS", d: "No se utilizan APIs de terceros para el procesamiento de texto.", i: "🔗" },
          { t: "MEMORIA VOLÁTIL", d: "Los archivos se procesan en la memoria RAM y se eliminan al cerrar la pestaña.", i: "🧠" },
          { t: "SOBERANÍA TOTAL", d: "Cumple con los niveles más exigentes de soberanía y control de datos.", i: "🏰" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start space-x-6 p-4 border border-gray-100 hover:border-black transition-all group">
            <span className="text-4xl">{item.i}</span>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-1 group-hover:text-red-600 transition-colors">{item.t}</h3>
              <p className="text-xs text-gray-500 font-bold leading-normal">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Diapositiva 4
    <div className="space-y-12 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase text-center">FLUJO DE TRABAJO REVERSIBLE.</h2>
      <div className="flex flex-col items-center justify-center space-y-12 pt-10">
        <div className="flex items-center space-x-12">
          <div className="text-center">
            <div className="w-20 h-24 border-2 border-black rounded-sm flex items-center justify-center text-3xl font-bold bg-white mb-2">📄</div>
            <span className="text-[10px] font-black uppercase">Original</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-red-600 uppercase mb-2">Modo ANON</span>
            <div className="w-32 h-1 bg-red-600 relative">
              <div className="absolute -right-1 -top-1 w-3 h-3 bg-red-600 rotate-45"></div>
            </div>
          </div>
          <div className="flex space-x-4">
             <div className="text-center">
               <div className="w-20 h-24 border-2 border-black rounded-sm flex items-center justify-center text-3xl font-bold bg-gray-50 mb-2">🔒</div>
               <span className="text-[10px] font-black uppercase">Protegido</span>
             </div>
             <div className="text-center">
               <div className="w-20 h-24 border-2 border-black border-dashed rounded-sm flex items-center justify-center text-3xl font-bold bg-red-50 mb-2">{"{;}"}</div>
               <span className="text-[10px] font-black uppercase text-red-600">Mapa JSON</span>
             </div>
          </div>
        </div>
        <div className="flex items-center space-x-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
          <div className="flex space-x-4">
             <div className="w-20 h-24 border-2 border-black rounded-sm flex items-center justify-center text-3xl font-bold bg-gray-50 mb-2">🔒</div>
             <div className="w-20 h-24 border-2 border-black border-dashed rounded-sm flex items-center justify-center text-3xl font-bold bg-red-50 mb-2">{"{;}"}</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-gray-500 uppercase mb-2">Modo REVERT</span>
            <div className="w-32 h-1 bg-gray-400 relative">
              <div className="absolute -left-1 -top-1 w-3 h-3 bg-gray-400 rotate-45"></div>
            </div>
          </div>
          <div className="w-20 h-24 border-2 border-black rounded-sm flex items-center justify-center text-3xl font-bold bg-white mb-2">📄</div>
        </div>
      </div>
    </div>,

    // Diapositiva 5 (Detalle Modo ANON)
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase">MODO ORIGINAL (ANON).</h2>
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 border-l-4 border-red-600">
          <h3 className="text-[11px] font-black uppercase mb-2">Objetivo</h3>
          <p className="text-sm font-bold text-gray-600">Convertir un documento sensible en una versión segura y protegida para compartir.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-4">
           <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-gray-400">Entrada</span>
              <div className="p-4 bg-white border border-gray-200 text-xs font-serif leading-relaxed">
                El cliente, <span className="bg-red-600 text-white px-1">Juan Pérez</span> con DNI <span className="bg-red-600 text-white px-1">12345678A</span>...
              </div>
           </div>
           <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-red-600">Resultado</span>
              <div className="p-4 bg-white border border-black text-xs font-serif leading-relaxed">
                El cliente, <span className="text-red-600 font-bold">[NOMBRE_1]</span> con DNI <span className="text-red-600 font-bold">[DNI_1]</span>...
              </div>
           </div>
        </div>
      </div>
    </div>,

    // Diapositiva 6 (Detalle Modo REVERT)
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase">MODO ANÓNIMO (REVERT).</h2>
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 border-l-4 border-black">
          <h3 className="text-[11px] font-black uppercase mb-2">Objetivo</h3>
          <p className="text-sm font-bold text-gray-600">Revertir la anonimización para recuperar los datos originales cuando sea necesario.</p>
        </div>
        <div className="flex items-center justify-center space-x-8 pt-8">
           <div className="text-4xl">📄 + {"{;}"}</div>
           <div className="text-3xl text-red-600">➜</div>
           <div className="text-center p-4 border-2 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <span className="text-xs font-black uppercase">Restauración 100%</span>
           </div>
        </div>
        <p className="text-[11px] text-center text-gray-400 font-bold uppercase tracking-widest pt-8">Garantiza una fidelidad absoluta con el documento de partida.</p>
      </div>
    </div>,

    // Diapositiva 7 (Motor)
    <div className="space-y-10 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase">MOTOR DE DETECCIÓN ESPECIALIZADO.</h2>
      <div className="grid grid-cols-2 gap-8">
        {[
          { t: "Personales", d: "Emails, Teléfonos.", i: "@" },
          { t: "Legales", d: "DNI, NIE, CIF, IBAN.", i: "🆔" },
          { t: "Temporal", d: "Fechas (varios formatos).", i: "📅" },
          { t: "Jurídicos", d: "Empresas (SL, SA, etc).", i: "🏢" },
          { t: "Nombres", d: "Heurística basada en tratamientos.", i: "👤" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 border-b border-gray-100 pb-4">
             <span className="text-2xl text-red-600">{item.i}</span>
             <div>
               <h3 className="text-xs font-black uppercase">{item.t}</h3>
               <p className="text-[10px] text-gray-500 font-bold">{item.d}</p>
             </div>
          </div>
        ))}
      </div>
    </div>,

    // Diapositiva 8 (Control)
    <div className="space-y-10 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase">TABLA DE CLAVES: CONTROL FINAL.</h2>
      <p className="text-sm font-bold text-gray-500">El panel 'Vault' le ofrece una supervisión completa y la capacidad de refinar los resultados.</p>
      <div className="space-y-6 pt-4">
         <div className="flex items-center space-x-4">
            <span className="text-red-600 font-black">👁️</span>
            <p className="text-xs font-medium"><span className="font-black">Visualizar:</span> Revise la lista completa de alias asignados.</p>
         </div>
         <div className="flex items-center space-x-4">
            <span className="text-red-600 font-black">❌</span>
            <p className="text-xs font-medium"><span className="font-black">Ignorar (IGN):</span> Restaure valores identificados por error.</p>
         </div>
         <div className="flex items-center space-x-4">
            <span className="text-red-600 font-black">➕</span>
            <p className="text-xs font-medium"><span className="font-black">Forzar:</span> Añada reglas manuales para términos específicos.</p>
         </div>
      </div>
    </div>,

    // Diapositiva 9 (Formatos)
    <div className="space-y-12 animate-fadeIn text-center">
      <h2 className="text-3xl font-black uppercase">COMPATIBILIDAD NATIVA.</h2>
      <div className="grid grid-cols-3 gap-8 pt-8">
         <div className="flex flex-col items-center group">
            <div className="w-16 h-20 bg-red-600 text-white flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">PDF</div>
            <span className="text-[10px] font-black uppercase">Memoria vía PDF.js</span>
         </div>
         <div className="flex flex-col items-center group">
            <div className="w-16 h-20 bg-black text-white flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">DOCX</div>
            <span className="text-[10px] font-black uppercase">Lector Mammoth.js</span>
         </div>
         <div className="flex flex-col items-center group">
            <div className="w-16 h-20 bg-gray-100 border border-black text-black flex items-center justify-center font-black text-xl mb-4 group-hover:scale-110 transition-transform">TXT</div>
            <span className="text-[10px] font-black uppercase">Lectura Directa</span>
         </div>
      </div>
    </div>,

    // Diapositiva 10 (Compliance)
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-black uppercase">COMPLIANCE BY DESIGN.</h2>
      <div className="grid grid-cols-2 gap-4">
         {[
           { t: "RGPD", d: "Minimización y transferencia cero." },
           { t: "LOPDGDD", d: "Control total de derechos ARSOPOL." },
           { t: "IA-ACT", d: "Sistema de riesgo mínimo (Local)." },
           { t: "RD 729/2023", d: "Implementación ética en España." }
         ].map((item, idx) => (
           <div key={idx} className="p-4 border border-black bg-white">
              <h3 className="text-lg font-black text-red-600 mb-1">{item.t}</h3>
              <p className="text-[10px] font-bold text-gray-500 leading-tight uppercase">{item.d}</p>
           </div>
         ))}
      </div>
    </div>,

    // Diapositiva 11 (Rendimiento)
    <div className="flex flex-col items-center justify-center h-full space-y-12 animate-fadeIn">
       <div className="text-center space-y-4">
          <h2 className="text-3xl font-black uppercase">RENDIMIENTO SIN FRICCIONES.</h2>
          <p className="text-gray-400 font-bold uppercase text-[10px]">Velocidad de procesamiento:</p>
       </div>
       <div className="text-8xl md:text-9xl font-black text-red-600 leading-none">
          &lt; 500ms
       </div>
       <div className="text-[10px] font-black uppercase tracking-[0.5em] text-black">Analista Eficiente</div>
    </div>,

    // Diapositiva 12 (Definitiva)
    <div className="space-y-12 animate-fadeIn">
       <h2 className="text-3xl font-black uppercase text-center">LA ESTACIÓN DEFINITIVA.</h2>
       <div className="grid grid-cols-3 gap-8 text-center pt-8">
          <div>
            <div className="text-4xl mb-4">🏰</div>
            <h3 className="text-[11px] font-black uppercase mb-2">1. Soberanía</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Datos nunca fuera de control.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🎛️</div>
            <h3 className="text-[11px] font-black uppercase mb-2">2. Control</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Flujo reversible y vault.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-[11px] font-black uppercase mb-2">3. Diseño</h3>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Construido para cumplir.</p>
          </div>
       </div>
    </div>,

    // Diapositiva 13 (Cierre)
    <div className="flex flex-col items-center justify-center h-full text-center space-y-10 animate-fadeIn">
       <div className="text-6xl font-black uppercase">ANON<span className="text-red-600">_</span>CORE</div>
       <p className="text-lg font-bold text-gray-600 uppercase tracking-widest">Privacidad por Diseño. Seguridad por Defecto.</p>
       <div className="space-y-2 pt-12">
          <p className="text-[10px] font-black uppercase text-gray-300">Desarrollado por <span className="text-red-600">Jesús de Pablos</span> para <span className="text-black">Tligent</span>.</p>
          <p className="text-[9px] font-bold text-gray-200 uppercase tracking-tighter">v25.12B | React · Tailwind · PDF.js · Mammoth</p>
       </div>
    </div>
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10">
      <div className="bg-white max-w-5xl w-full h-full max-h-[85vh] rounded-sm overflow-hidden flex flex-col relative shadow-[30px_30px_0px_rgba(217,0,0,0.4)] border-2 border-black">
        
        {/* Header de navegación */}
        <div className="bg-black text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-6">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Manual Técnico Operativo</span>
             <div className="h-4 w-px bg-gray-800"></div>
             <span className="text-[11px] font-mono font-bold text-gray-400">PÁGINA {String(currentPage + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}</span>
          </div>
          <button onClick={onClose} className="hover:text-red-500 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="w-full h-1.5 bg-gray-100 shrink-0">
           <div 
             className="h-full bg-red-600 transition-all duration-500 ease-out"
             style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
           ></div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 p-10 md:p-20 overflow-hidden bg-white select-none">
          {pages[currentPage]}
        </div>

        {/* Footer de navegación */}
        <div className="p-8 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center space-x-3 px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm border-2 border-black ${currentPage === 0 ? 'opacity-20 grayscale cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Anterior</span>
          </button>

          <div className="flex space-x-2">
            {pages.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === currentPage ? 'bg-red-600 scale-150' : 'bg-gray-200 hover:bg-black'}`}
              ></div>
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className={`flex items-center space-x-3 px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm border-2 border-black bg-black text-white ${currentPage === pages.length - 1 ? 'opacity-20 grayscale cursor-not-allowed' : 'hover:bg-red-600 hover:border-red-600'}`}
          >
            <span>Siguiente</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualModal;
