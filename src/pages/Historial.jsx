import { useState, useEffect } from 'react';
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
      const lista = await presupuestoService.listar();
      setPresupuestos(lista);
    } catch (error) {
      console.error(error);
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
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
      <div className="absolute inset-0 bg-slate-950/70 z-0"></div>

      <div className="relative z-10 max-w-6xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-8 font-medium uppercase text-xs tracking-wider"
        >
          <ArrowLeft size={16}/> Volver al Panel
        </button>
        
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <Table className="text-emerald-600" size={32}/> Historial de Presupuestos
        </h1>
        
        {cargando ? (
          <div className="mt-16 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
          </div>
        ) : presupuestos.length === 0 ? (
          <div className="mt-10 p-16 border-2 border-dashed border-slate-200 rounded-2xl text-center">
            <p className="text-slate-400 text-lg italic">No hay presupuestos guardados todavía.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 text-left text-xs uppercase tracking-widest">Cliente</th>
                  <th className="p-4 text-left text-xs uppercase tracking-widest">Teléfono</th>
                  <th className="p-4 text-left text-xs uppercase tracking-widest">Modalidad</th>
                  <th className="p-4 text-right text-xs uppercase tracking-widest">Total</th>
                  <th className="p-4 text-left text-xs uppercase tracking-widest">Fecha</th>
                  <th className="p-4 text-center text-xs uppercase tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {presupuestos.map((pres, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-semibold text-slate-800">
                      {pres.cliente?.nombre || 'Sin nombre'}
                    </td>
                    <td className="p-4 text-slate-600">
                      {pres.cliente?.telefono || '-'}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        pres.modo === 'vendida' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {pres.modo === 'vendida' ? 'Obra Integral' : 'Servicio'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-emerald-600">
                      ${pres.total?.toLocaleString('es-CL') || 0}
                    </td>
                    <td className="p-4 text-slate-600">
                      {formatearFecha(pres.fecha)}
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => navigate(`/ver/${pres.id}`)}
                        className="text-emerald-600 hover:text-emerald-800 p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Ver detalle"
                      >
                        <FileText size={18} />
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