import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, FileText, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { presupuestoService } from '../services/PresupuestoService';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFPresupuesto from '../components/PDFPresupuesto';
import imgFondo from "../assets/fondo_obra.jpg";

const PresupuestoSimple = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [cliente, setCliente] = useState({ nombre: '', telefono: '', direccion: '' });
  const [manoObra, setManoObra] = useState([{ cant: '', detalle: '', precio: '', total: 0 }]);
  const [totalFinal, setTotalFinal] = useState(0);

  // RECALCULAR TOTALES AUTOMÁTICAMENTE
  useEffect(() => {
    const nuevoTotal = manoObra.reduce((acc, item) => acc + (parseFloat(item.total) || 0), 0);
    setTotalFinal(nuevoTotal);
  }, [manoObra]);

  const updateRow = (index, field, value) => {
    const list = [...manoObra];
    list[index][field] = value;
    
    if (field === 'cant' || field === 'precio') {
      const c = parseFloat(list[index].cant) || 0;
      const p = parseFloat(list[index].precio) || 0;
      list[index].total = c * p;
    }
    setManoObra(list);
  };

  const guardarPresupuesto = async () => {
    if (!cliente.nombre) return alert("Por favor, ingresa el nombre del cliente");
    setCargando(true);
    try {
      const datos = {
        clienteNombre: cliente.nombre,
        clienteTelefono: cliente.telefono,
        clienteDireccion: cliente.direccion,
        manoObra,
        totalFinal,
        tipo: 'simple',
        fecha: new Date().toISOString()
      };
      await presupuestoService.crear(datos);
      alert("Presupuesto guardado exitosamente");
    } catch (error) {
      alert("Error al guardar");
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center relative p-4 py-12 flex justify-center" style={{ backgroundImage: `url(${imgFondo})` }}>
      <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
      <div className="relative z-10 max-w-5xl w-full bg-white shadow-2xl rounded-3xl p-8 md:p-12">
        <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-slate-400 hover:text-blue-600 uppercase text-xs font-black">
          <ArrowLeft size={18}/> Volver al Panel
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-slate-50 p-6 rounded-2xl">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Nombre Cliente</label>
            <input className="p-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" placeholder="Juan Pérez" value={cliente.nombre} onChange={(e) => setCliente({...cliente, nombre: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Teléfono</label>
            <input className="p-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" placeholder="+56 9..." value={cliente.telefono} onChange={(e) => setCliente({...cliente, telefono: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Dirección</label>
            <input className="p-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" placeholder="Ubicación" value={cliente.direccion} onChange={(e) => setCliente({...cliente, direccion: e.target.value})} />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-100 mb-6">
          <table className="w-full">
            <thead className="bg-slate-800 text-white text-[10px] uppercase">
              <tr>
                <th className="p-4 w-20">Cant.</th>
                <th className="p-4 text-left">Descripción del Trabajo</th>
                <th className="p-4 w-32 text-right">Precio Unit.</th>
                <th className="p-4 w-32 text-right">Subtotal</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {manoObra.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50">
                  <td className="p-2"><input type="number" className="w-full text-center font-bold text-blue-600 bg-transparent border-none focus:ring-0" value={item.cant} onChange={(e) => updateRow(idx, 'cant', e.target.value)} /></td>
                  <td className="p-2"><input type="text" className="w-full bg-transparent border-none focus:ring-0" placeholder="Ej: Instalación eléctrica..." value={item.detalle} onChange={(e) => updateRow(idx, 'detalle', e.target.value)} /></td>
                  <td className="p-2"><input type="number" className="w-full text-right bg-transparent border-none focus:ring-0" value={item.precio} onChange={(e) => updateRow(idx, 'precio', e.target.value)} /></td>
                  <td className="p-4 text-right font-black text-slate-700">${(item.total || 0).toLocaleString('es-CL')}</td>
                  <td className="p-2"><button onClick={() => setManoObra(manoObra.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={() => setManoObra([...manoObra, { cant: '', detalle: '', precio: '', total: 0 }])} className="text-blue-600 font-black text-[10px] uppercase flex items-center gap-2 mb-10">
          <Plus size={14}/> Agregar Fila
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-8">
          <div className="flex gap-3">
            <button onClick={guardarPresupuesto} disabled={cargando} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase shadow-xl hover:scale-105 transition-all">
              {cargando ? 'Guardando...' : '1. Guardar Presupuesto'}
            </button>
            <PDFDownloadLink 
              document={<PDFPresupuesto datos={{clienteNombre: cliente.nombre, clienteTelefono: cliente.telefono, clienteDireccion: cliente.direccion, manoObra, totalFinal}} tipo="simple" />} 
              fileName={`Presupuesto_${cliente.nombre || 'S_N'}.pdf`}
            >
              {({ loading }) => (
                <button className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase shadow-xl flex items-center gap-2 hover:bg-emerald-600 transition-all">
                  <FileText size={18}/> {loading ? 'Preparando...' : '2. Descargar PDF'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
          <div className="bg-slate-900 p-6 rounded-3xl min-w-[280px] shadow-2xl text-right">
            <p className="text-blue-400 text-[10px] uppercase font-black tracking-widest mb-1">Total a Pagar</p>
            <p className="text-4xl font-black text-white">${totalFinal.toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresupuestoSimple;