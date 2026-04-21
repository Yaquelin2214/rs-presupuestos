import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Table, Loader2, FileText, Trash2 } from 'lucide-react';
import { presupuestoService } from '../services/PresupuestoService';
import imgFondo from "../assets/fondo_obra.jpg";

const Historial = () => {
  const navigate = useNavigate();
  const [presupuestos, setPresupuestos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPresupuestos();
  }, []);

  const cargarPresupuestos = async () => {
    setCargando(true);
    try {
      // Usamos el método correcto del servicio
      const lista = await presupuestoService.obtenerTodos(); 
      setPresupuestos(lista);
    } catch (error) {
      console.error("Error al cargar:", error);
    } finally {
      setCargando(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4 py-10"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
      <div className="absolute inset-0 bg-slate-950/70 z-0"></div>

      <div className="relative z-10 max-w-6xl w-full bg-white shadow-2xl rounded-3xl p-8 md:p-12">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-8 font-black uppercase text-xs tracking-wider"
        >
          <ArrowLeft size={16}/> Volver al Panel
        </button>
        
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <Table className="text-emerald-600" size={32}/> Historial de Presupuestos
        </h1>
        
        {cargando ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Cargando registros...</p>
          </div>
        ) : presupuestos.length === 0 ? (
          <div className="mt-10 p-16 border-2 border-dashed border-slate-200 rounded-3xl text-center">
            <p className="text-slate-400 text-lg italic">No hay presupuestos guardados todavía.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 text-left text-[10px] uppercase tracking-widest">Cliente</th>
                  <th className="p-4 text-left text-[10px] uppercase tracking-widest">Teléfono</th>
                  <th className="p-4 text-left text-[10px] uppercase tracking-widest">Tipo</th>
                  <th className="p-4 text-right text-[10px] uppercase tracking-widest">Total</th>
                  <th className="p-4 text-left text-[10px] uppercase tracking-widest">Fecha</th>
                  <th className="p-4 text-center text-[10px] uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {presupuestos.map((pres, index) => (
                  <tr key={pres.id || index} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black text-slate-700 uppercase text-xs">
                      {/* CORRECCIÓN: Usar clienteNombre */}
                      {pres.clienteNombre || 'Sin nombre'}
                    </td>
                    <td className="p-4 text-slate-500 text-xs font-medium">
                      {/* CORRECCIÓN: Usar clienteTelefono */}
                      {pres.clienteTelefono || '-'}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        pres.tipo === 'vendida' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {/* CORRECCIÓN: Usar tipo */}
                        {pres.tipo === 'vendida' ? 'Obra Integral' : 'Servicio Simple'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-black text-slate-900 text-sm">
                      {/* CORRECCIÓN: Usar totalFinal */}
                      ${(pres.totalFinal || 0).toLocaleString('es-CL')}
                    </td>
                    <td className="p-4 text-slate-500 text-xs font-medium">
                      {formatearFecha(pres.fecha)}
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => navigate(`/ver/${pres.id}`)}
                        className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-xl transition-all"
                        title="Ver detalle"
                      >
                        <FileText size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historial;