import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import imgFondo from "../assets/fondo_obra.jpg"; 

const Configuracion = () => {
  const navigate = useNavigate();
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
      
      <div className="absolute inset-0 bg-slate-950/70 z-0"></div>

      
      <div className="relative z-10 max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} /> Volver al Inicio
        </button>
        
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <Settings className="text-slate-600" size={32} /> Configuración del Sistema
        </h1>
        
        <div className="mt-8 space-y-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-slate-600 font-medium">
              Ajustes de datos de la empresa, logo y formatos de PDF.
            </p>
            <p className="text-slate-400 text-sm mt-2 italic">
              Próximamente: Podrás editar aquí el nombre de la empresa y el eslogan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;