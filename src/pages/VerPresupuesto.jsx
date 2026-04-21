import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, FileText } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';

import PDFPresupuesto from '../components/PDFPresupuesto'; 
import { presupuestoService } from '../services/PresupuestoService';
import imgFondo from "../assets/fondo_obra.jpg";

const VerPresupuesto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [presupuesto, setPresupuesto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [generando, setGenerando] = useState(false);

  useEffect(() => {
    cargarPresupuesto();
  }, [id]);

  const cargarPresupuesto = async () => {
    setCargando(true);
    try {
      const datos = await presupuestoService.obtenerPorId(id);
      setPresupuesto(datos);
    } catch (error) {
      console.error("Error al cargar:", error);
    } finally {
      setCargando(false);
    }
  };

  const generarPDF = async () => {
    if (!presupuesto) return;
    setGenerando(true);
    try {
      const datosParaPDF = {
        clienteNombre: presupuesto.clienteNombre || presupuesto.cliente?.nombre || '---',
        clienteTelefono: presupuesto.clienteTelefono || presupuesto.cliente?.telefono || '---',
        clienteDireccion: presupuesto.clienteDireccion || presupuesto.direccion || presupuesto.cliente?.direccion || 'No especificada',
        materiales: presupuesto.materiales || [],
        manoObra: presupuesto.manoObra || presupuesto.items || [],
        totalFinal: presupuesto.totalFinal || presupuesto.total || 0
      };

      const pdfBlob = await pdf(
        <PDFPresupuesto 
          datos={datosParaPDF} 
          tipo={presupuesto.tipo || (presupuesto.modo === 'vendida' ? 'vendida' : 'simple')} 
        />
      ).toBlob();

      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Presupuesto_${datosParaPDF.clienteNombre.replace(/\s+/g, '_')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error PDF:", error);
      alert("Hubo un error al generar el PDF");
    } finally {
      setGenerando(false);
    }
  };

  if (cargando) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );

  if (!presupuesto) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-xl font-bold text-slate-800">Presupuesto no encontrado</h2>
      <button 
        onClick={() => navigate('/historial')} 
        className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold"
      >
        Volver al historial
      </button>
    </div>
  );

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative p-4 py-12 flex items-center justify-center"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 z-0"></div>
      
      <div className="relative z-10 max-w-4xl w-full bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-white/20">
        <button 
          onClick={() => navigate('/historial')} 
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-black uppercase text-xs tracking-widest transition-colors"
        >
          <ArrowLeft size={16} /> Volver al Historial
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4 border-b border-slate-100 pb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">RS GESTIÓN</h1>
            <p className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mt-1">
              {presupuesto.tipo === 'vendida' ? 'Obra Mano de Obra Vendida' : 'Presupuesto Mano de Obra'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha de Registro</p>
            <p className="font-bold text-slate-700">
              {presupuesto.fecha ? new Date(presupuesto.fecha).toLocaleDateString('es-CL') : 'Reciente'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Cliente y Contacto</h3>
            <p className="text-xl font-black text-slate-800">{presupuesto.clienteNombre || presupuesto.cliente?.nombre || '---'}</p>
            <p className="text-slate-500 font-bold text-sm mt-1">{presupuesto.clienteTelefono || presupuesto.cliente?.telefono || '---'}</p>
            <p className="text-slate-400 text-xs mt-2 italic">
              {presupuesto.clienteDireccion || presupuesto.direccion || presupuesto.cliente?.direccion || "Sin dirección registrada"}
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl text-right flex flex-col justify-center">
             <h3 className="text-[10px] font-black text-blue-400 uppercase mb-1 tracking-widest">Total a Pagar</h3>
             <p className="text-4xl font-black text-white italic">
               ${(presupuesto.totalFinal || presupuesto.total || 0).toLocaleString('es-CL')}
             </p>
          </div>
        </div>

        <button 
          onClick={generarPDF}
          disabled={generando}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${
            generando 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
          }`}
        >
          {generando ? <Loader2 className="animate-spin" /> : <FileText size={20} />}
          {generando ? "Preparando Archivo..." : "Generar y Descargar PDF"}
        </button>

        <p className="text-center text-[10px] text-slate-400 mt-6 uppercase font-bold tracking-widest">
          RS Gestión - Sistema de Control de Presupuestos v2.0
        </p>
      </div>
    </div>
  );
};

export default VerPresupuesto;