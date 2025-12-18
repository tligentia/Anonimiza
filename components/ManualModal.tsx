import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, RefreshCcw, FileText, Scale, Cpu, Check, AlertTriangle, Menu, X, ChevronRight, Eye, Server, Database } from 'lucide-react';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll spy to update active section within the modal
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const sections = ['intro', 'filosofia', 'modos', 'motor', 'vault', 'compliance'];
      const scrollPosition = scrollContainerRef.current.scrollTop + 150;

      for (const section of sections) {
        const element = document.getElementById(`man-${section}`);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container && isOpen) {
      container.addEventListener('scroll', handleScroll);
      // Trigger initial check
      handleScroll();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(`man-${id}`);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center w-full px-4 py-3 text-left transition-all border-l-4 ${
        activeSection === id
          ? 'border-red-600 bg-gray-100 text-black font-bold'
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-black'
      }`}
    >
      <Icon size={18} className="mr-3" />
      <span className="uppercase tracking-wide text-xs font-black">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[150] bg-white flex flex-col md:flex-row overflow-hidden animate-fadeIn">
      
      {/* Botón Cerrar (Desktop) */}
      <button 
        onClick={onClose}
        className="hidden lg:flex absolute top-6 right-8 z-[170] bg-black text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-xl hover:scale-110 items-center justify-center"
      >
        <X size={24} strokeWidth={3} />
      </button>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-white border-b-2 border-black px-4 py-3 flex justify-between items-center shrink-0">
        <div className="font-black text-xl tracking-tighter">Anonimiza<span className="text-red-600">.</span></div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button onClick={onClose} className="ml-4 text-red-600">
            <X size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-white border-r-2 border-black transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:top-0 shrink-0`}>
        <div className="h-full flex flex-col">
          <div className="p-8 border-b-2 border-black hidden lg:block">
            <h1 className="font-black text-2xl tracking-tighter">Anonimiza<span className="text-red-600">.</span></h1>
            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-black">Manual de Usuario</p>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-8 space-y-1">
            <NavItem id="intro" label="Inicio" icon={Shield} />
            <NavItem id="filosofia" label="Filosofía Zero-Trust" icon={Lock} />
            <NavItem id="modos" label="Flujo de Trabajo" icon={RefreshCcw} />
            <NavItem id="motor" label="Motor de Detección" icon={Cpu} />
            <NavItem id="vault" label="El Vault" icon={Database} />
            <NavItem id="compliance" label="Compliance Legal" icon={Scale} />
          </nav>

          <div className="p-8 border-t-2 border-black bg-gray-50">
            <div className="text-[10px] font-mono text-gray-400 font-bold uppercase">
              <p>Versión 25.12B</p>
              <p className="mt-1">© Tligent · 2024</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto bg-white scroll-smooth pt-16 lg:pt-0 selection:bg-red-100 selection:text-red-900"
      >
        {/* Intro Section */}
        <section id="man-intro" className="min-h-[80vh] flex flex-col justify-center px-8 lg:px-24 py-16 border-b border-gray-100">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 mb-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em]">
              Soberanía de Datos Absoluta
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-black mb-8 leading-[0.9] tracking-tighter">
              Sus datos nunca <br/>
              abandonan su <span className="text-red-600">dispositivo</span>.
            </h2>
            <p className="text-xl lg:text-2xl text-gray-500 max-w-2xl leading-relaxed border-l-8 border-red-600 pl-8 mb-12 font-medium">
              Anonimiza es la estación documental jurídica que ejecuta toda la lógica de detección y anonimización directamente en su navegador. Cero servidores externos. Cero APIs de terceros.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="border-2 border-gray-100 p-8 hover:border-black transition-all group">
                <Server className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="font-black uppercase text-sm mb-3">100% Local</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">Procesamiento en memoria volátil. Nada se guarda.</p>
              </div>
              <div className="border-2 border-gray-100 p-8 hover:border-black transition-all group">
                <Shield className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="font-black uppercase text-sm mb-3">Privacidad por Diseño</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">Arquitectura Edge Computing sin dependencias.</p>
              </div>
              <div className="border-2 border-gray-100 p-8 hover:border-black transition-all group">
                <RefreshCcw className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="font-black uppercase text-sm mb-3">Reversible</h3>
                <p className="text-xs text-gray-400 font-bold uppercase">Restaure documentos con fidelidad absoluta.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filosofía Section */}
        <section id="man-filosofia" className="px-8 lg:px-24 py-32 bg-gray-50/50 border-b border-gray-100">
          <div className="max-w-4xl">
            <h3 className="text-3xl font-black mb-16 flex items-center tracking-tighter uppercase">
              <span className="w-10 h-10 bg-red-600 text-white flex items-center justify-center text-sm mr-6 font-black">01</span>
              FILOSOFÍA DE SEGURIDAD
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-10 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black uppercase text-sm tracking-widest mb-6 flex items-center">
                  <Server className="mr-3 text-red-600" /> Edge Computing
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  A diferencia de las herramientas en la nube, la lógica vive en el cliente. Su navegador es el servidor. Esto elimina el riesgo de interceptación en tránsito.
                </p>
              </div>
              
              <div className="bg-white p-10 border-2 border-gray-200 hover:border-black transition-all">
                <h4 className="font-black uppercase text-sm tracking-widest mb-6 flex items-center">
                  <Database className="mr-3 text-gray-400" /> Memoria Volátil
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Los archivos se procesan en la memoria RAM y se eliminan instantáneamente al cerrar la pestaña o recargar. No hay persistencia.
                </p>
              </div>

              <div className="bg-white p-10 border-2 border-gray-200 hover:border-black transition-all">
                <h4 className="font-black uppercase text-sm tracking-widest mb-6 flex items-center">
                  <X className="mr-3 text-gray-400" /> Cero APIs Externas
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  No enviamos su texto a OpenAI, Google o Azure para ser procesado. El motor de regex y heurística es propietario y local.
                </p>
              </div>
              
              <div className="bg-white p-10 border-2 border-gray-200 hover:border-black transition-all">
                <h4 className="font-black uppercase text-sm tracking-widest mb-6 flex items-center">
                  <Lock className="mr-3 text-gray-400" /> Soberanía Total
                </h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Cumple con los niveles más exigentes de control de datos. Usted decide qué entra y qué sale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modos Section */}
        <section id="man-modos" className="px-8 lg:px-24 py-32 border-b border-gray-100">
           <div className="max-w-5xl">
            <h3 className="text-3xl font-black mb-16 flex items-center tracking-tighter uppercase">
              <span className="w-10 h-10 bg-red-600 text-white flex items-center justify-center text-sm mr-6 font-black">02</span>
              MODOS DE OPERACIÓN
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* MODO ANON */}
              <div className="space-y-8">
                <div className="inline-block px-4 py-1.5 border-2 border-black text-black text-[10px] font-black uppercase tracking-widest">
                  Modo Anon (Transformar)
                </div>
                <h4 className="text-3xl font-black tracking-tight">Proteja para compartir</h4>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  El sistema identifica entidades sensibles y las sustituye por marcadores técnicos únicos (ej. <code className="bg-gray-100 px-1 rounded text-red-600 font-bold">[NOMBRE_1]</code>).
                </p>
                
                <div className="bg-gray-50 p-8 font-mono text-xs border-l-8 border-gray-300">
                  <div className="mb-2 text-gray-400 font-bold">// Entrada</div>
                  <div className="mb-4 text-gray-600">El cliente, <span className="bg-red-100 text-red-800 px-1">Juan Pérez</span> con DNI <span className="bg-red-100 text-red-800 px-1">12345678A</span> firmó...</div>
                  <div className="flex justify-center my-4 text-red-600 animate-bounce">↓</div>
                  <div className="mb-2 text-gray-400 font-bold">// Salida</div>
                  <div className="text-black font-bold">El cliente, <span className="bg-black text-white px-1">[NOMBRE_1]</span> con DNI <span className="bg-black text-white px-1">[DNI_1]</span> firmó...</div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-xs font-black uppercase tracking-widest"><FileText size={18} className="mr-3 text-red-600"/> Texto Anonimizado (.txt)</div>
                  <div className="flex items-center text-xs font-black uppercase tracking-widest"><FileText size={18} className="mr-3 text-red-600"/> Mapa JSON (Llave)</div>
                </div>
              </div>

              {/* MODO REVERT */}
              <div className="space-y-8 lg:pl-20 lg:border-l-2 border-gray-100">
                <div className="inline-block px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                  Modo Revert (Restaurar)
                </div>
                <h4 className="text-3xl font-black tracking-tight">Recupere el original</h4>
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  Cargue el texto anonimizado y su "Mapa de Transformación" JSON correspondiente para recuperar los datos.
                </p>

                <div className="bg-black text-white p-10 font-mono text-xs rounded-sm relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><RefreshCcw size={80}/></div>
                  <p className="mb-6 font-black uppercase text-[10px] tracking-widest text-red-500">Requiere carga simultánea:</p>
                  <ul className="space-y-4 text-xs font-bold uppercase tracking-tight">
                    <li className="flex items-center"><ChevronRight size={14} className="mr-2 text-red-600"/> Texto Anonimizado</li>
                    <li className="flex items-center"><ChevronRight size={14} className="mr-2 text-red-600"/> Archivo JSON (Mapa de llaves)</li>
                  </ul>
                  <div className="mt-8 pt-8 border-t border-gray-800 text-green-500 flex items-center font-black uppercase text-[10px] tracking-widest">
                    <Check size={16} className="mr-3"/> Fidelidad del 100% garantizada
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Motor Section */}
        <section id="man-motor" className="px-8 lg:px-24 py-32 bg-gray-50/50 border-b border-gray-100">
          <div className="max-w-4xl">
            <h3 className="text-3xl font-black mb-12 flex items-center tracking-tighter uppercase">
              <span className="w-10 h-10 bg-red-600 text-white flex items-center justify-center text-sm mr-6 font-black">03</span>
              MOTOR DE DETECCIÓN
            </h3>
            <p className="text-xl text-gray-500 font-medium mb-16 leading-relaxed">
              Utiliza patrones complejos (RegEx) y heurística avanzada para identificar un amplio espectro de entidades sensibles sin salir del navegador.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "ID Personales", desc: "Emails, Teléfonos", icon: <Eye className="text-red-600"/> },
                { title: "ID Legales", desc: "DNI, NIE, CIF, IBAN", icon: <Scale className="text-red-600"/> },
                { title: "Temporal", desc: "Fechas numéricas y textuales", icon: <RefreshCcw className="text-red-600"/> },
                { title: "Jurídico", desc: "Empresas (S.L., S.A.), Nombres propios", icon: <Shield className="text-red-600"/> },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 border-b-8 border-gray-200 hover:border-red-600 transition-all group">
                  <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-8 bg-white border-2 border-black">
              <h4 className="font-black uppercase text-[10px] tracking-widest mb-6 text-gray-400">Formatos Compatibles</h4>
              <div className="flex flex-wrap gap-4">
                <span className="px-5 py-2.5 bg-gray-100 text-[10px] font-black uppercase tracking-widest border-2 border-gray-200">PDF (vía PDF.js)</span>
                <span className="px-5 py-2.5 bg-gray-100 text-[10px] font-black uppercase tracking-widest border-2 border-gray-200">DOCX (vía Mammoth.js)</span>
                <span className="px-5 py-2.5 bg-gray-100 text-[10px] font-black uppercase tracking-widest border-2 border-gray-200">TXT / MD</span>
              </div>
            </div>
          </div>
        </section>

        {/* Vault Section */}
        <section id="man-vault" className="px-8 lg:px-24 py-32 border-b border-gray-100">
           <div className="max-w-4xl">
            <h3 className="text-3xl font-black mb-12 flex items-center tracking-tighter uppercase">
              <span className="w-10 h-10 bg-red-600 text-white flex items-center justify-center text-sm mr-6 font-black">04</span>
              EL VAULT (CONTROL FINAL)
            </h3>
            
            <div className="flex flex-col md:flex-row gap-16">
              <div className="flex-1 space-y-8">
                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                  La automatización no es perfecta. El panel <strong>Vault</strong> le otorga la última palabra antes de exportar. Revise cada detección y decida.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="mt-1 mr-4 min-w-[24px] h-[24px] bg-black text-white flex items-center justify-center text-[10px] font-black">1</div>
                    <div>
                      <h5 className="font-black uppercase text-[11px] mb-1">Visualizar</h5>
                      <p className="text-sm text-gray-500 font-medium">Lista completa de datos detectados y sus alias asignados.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-4 min-w-[24px] h-[24px] bg-red-600 text-white flex items-center justify-center text-[10px] font-black">2</div>
                    <div>
                      <h5 className="font-black uppercase text-[11px] mb-1">Ignorar (IGN)</h5>
                      <p className="text-sm text-gray-500 font-medium">Restaure al instante falsos positivos (ej. un nombre de ciudad común).</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mt-1 mr-4 min-w-[24px] h-[24px] bg-gray-400 text-white flex items-center justify-center text-[10px] font-black">3</div>
                    <div>
                      <h5 className="font-black uppercase text-[11px] mb-1">Forzar</h5>
                      <p className="text-sm text-gray-500 font-medium">Añada reglas manuales para términos específicos que el sistema omitió.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* UI Mockup */}
              <div className="flex-1 bg-gray-50 p-8 border-2 border-black font-mono text-[10px] uppercase font-bold relative">
                 <div className="absolute top-0 right-0 p-2 text-gray-200 pointer-events-none">VAULT_PREVIEW</div>
                 <div className="grid grid-cols-3 gap-2 border-b-2 border-black pb-4 mb-6 text-gray-400">
                   <span>Dato</span>
                   <span>Alias</span>
                   <span className="text-right">Acción</span>
                 </div>
                 <div className="grid grid-cols-3 gap-2 items-center mb-4 bg-white p-2 border border-gray-100 shadow-sm">
                   <span className="text-red-900">Jesús de Pablos</span>
                   <span className="text-gray-400">[NOMBRE_1]</span>
                   <div className="text-right"><span className="border-b border-black cursor-pointer hover:bg-black hover:text-white px-1">IGNORAR</span></div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 items-center mb-4 bg-white p-2 border border-gray-100 shadow-sm">
                   <span className="text-red-900">Tligent S.L.</span>
                   <span className="text-gray-400">[EMPRESA_1]</span>
                   <div className="text-right"><span className="border-b border-black cursor-pointer hover:bg-black hover:text-white px-1">IGNORAR</span></div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 items-center opacity-40">
                   <span className="line-through">Madrid</span>
                   <span className="text-gray-400">[CIUDAD_1]</span>
                   <div className="text-right"><span className="bg-black text-white px-2 py-1">RESTAURAR</span></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section id="man-compliance" className="px-8 lg:px-24 py-32 bg-black text-white">
          <div className="max-w-4xl">
             <h3 className="text-3xl font-black mb-16 flex items-center tracking-tighter uppercase">
              <span className="w-10 h-10 bg-white text-black flex items-center justify-center text-sm mr-6 font-black">05</span>
              COMPLIANCE BY DESIGN
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border border-gray-800 p-10 hover:border-red-600 transition-colors">
                <h4 className="text-red-500 font-black uppercase text-xs tracking-widest mb-4">RGPD (EU)</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Cumple con los principios de minimización y seguridad al evitar transferencias a terceros por diseño local.</p>
              </div>
              <div className="border border-gray-800 p-10 hover:border-red-600 transition-colors">
                <h4 className="text-red-500 font-black uppercase text-xs tracking-widest mb-4">LOPDGDD (ES)</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Garantiza derechos ARSOPOL ofreciendo control total sobre el procesamiento documental sin intervención externa.</p>
              </div>
              <div className="border border-gray-800 p-10 hover:border-red-600 transition-colors">
                <h4 className="text-red-500 font-black uppercase text-xs tracking-widest mb-4">EU IA-ACT</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Sistema de riesgo mínimo/limitado por su naturaleza determinista y procesamiento íntegramente local.</p>
              </div>
              <div className="border border-gray-800 p-10 hover:border-red-600 transition-colors">
                <h4 className="text-red-500 font-black uppercase text-xs tracking-widest mb-4">RD 729/2023</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Alineado con obligaciones de implementación ética y segura de automatización en territorio español.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t-2 border-black px-8 lg:px-24 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
               <h1 className="font-black text-3xl tracking-tighter mb-2">Anonimiza<span className="text-red-600">.</span></h1>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Estación Documental Jurídica</p>
            </div>
            <div className="mt-12 md:mt-0 text-left md:text-right">
              <p className="text-xs text-gray-600 font-bold uppercase tracking-tight">Desarrollado por <span className="text-black font-black">Jesús de Pablos</span> para <span className="text-red-600 font-black">Tligent</span>.</p>
              <div className="flex items-center justify-start md:justify-end mt-4 space-x-6 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                <span className="hover:text-black cursor-default transition-colors">React</span>
                <span className="hover:text-black cursor-default transition-colors">Tailwind</span>
                <span className="hover:text-black cursor-default transition-colors">PDF.js</span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default ManualModal;