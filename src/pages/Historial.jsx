import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Table } from 'lucide-react';
import imgFondo from "../assets/fondo_obra.jpg";

const Historial = () => {
  const navigate = useNavigate();
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
     
      <div className="absolute inset-0 bg-slate-950/70 z-0"></div>

     
      <div className="relative z-10 max-w-6xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20}/> Volver al Panel
        </button>
        
        <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3 border-b-2 border-emerald-50 pb-4">
          <Table className="text-emerald-600" size={32}/> Historial de Presupuestos
        </h1>
        
        <div className="mt-10 p-16 border-2 border-dashed border-gray-100 rounded-2xl text-center">
          <p className="text-gray-400 text-lg italic">No hay presupuestos guardados todavía.</p>
        </div>
      </div>
    </div>
  );
};

export default Historial;