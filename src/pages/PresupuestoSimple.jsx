import React, { useState } from 'react';
import { Save, Plus, ArrowLeft, FileText, Trash2 } from 'lucide-react';
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

  const agregarFila = () => {
    setManoObra([...manoObra, { cant: '', detalle: '', precio: '', total: 0 }]);
  };

  const eliminarFila = (index) => {
    if (manoObra.length > 1) {
      setManoObra(manoObra.filter((_, i) => i !== index));
    } else {
      setManoObra([{ cant: '', detalle: '', precio: '', total: 0 }]);
    }
  };

  const totalFinal = manoObra.reduce((acc, i) => acc + i.total, 0);

  const guardarPresupuesto = async () => {
    if (!cliente.nombre) return alert("Por favor, ingresa el nombre del cliente");
    setCargando(true);
    const datos = {
      clienteNombre: cliente.nombre,
      clienteTelefono: cliente.telefono,
      clienteDireccion: cliente.direccion,
      manoObra,
      totalFinal,
      tipo: 'simple',
      fecha: new Date().toISOString()
    };
    const res = await presupuestoService.crear(datos);
    if (res.success) alert("Presupuesto guardado exitosamente");
    setCargando(false);
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative p-4 py-12 flex items-center justify-center" style={{ backgroundImage: `url(${imgFondo})` }}>
      <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
      <div className="relative z-10 max-w-5xl w-full bg-white shadow-2xl rounded-3xl p-8 md:p-12">
        
        <div className="flex justify-between items-start mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 uppercase text-xs font-black">
            <ArrowLeft size={18}/> Volver
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter">RS GESTIÓN</h1>
            <p className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.3em]">Mano de Obra</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-slate-50 p-6 rounded-2xl">
          <input className="p-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" placeholder="Cliente" value={cliente.nombre} onChange={(e) => setCliente({...cliente, nombre: e.target.value})} />
          <input className="p-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" placeholder="Teléfono" value={cliente.telefono} onChange={(e) => setCliente({...cliente, telefono: e.target.value})} />
          <input className="p-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-500" placeholder="Ubicación" value={cliente.direccion} onChange={(e) => setCliente({...cliente, direccion: e.target.value})} />
        </div>

        <section className="mb-8">
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full bg-white border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-[10px] uppercase">
                  <th className="p-4 w-20 text-center">Cant.</th>
                  <th className="p-4 text-left">Descripción</th>
                  <th className="p-4 w-32 text-right">Unitario</th>
                  <th className="p-4 w-32 text-right">Subtotal</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody>
                {manoObra.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="p-2 text-center font-bold text-blue-600">
                        <input type="number" className="w-full text-center border-none bg-transparent focus:ring-0" value={item.cant} onChange={(e) => updateRow(idx, 'cant', e.target.value)} />
                    </td>
                    <td className="p-2">
                        <input type="text" className="w-full border-none bg-transparent focus:ring-0" placeholder="Servicio..." value={item.detalle} onChange={(e) => updateRow(idx, 'detalle', e.target.value)} />
                    </td>
                    <td className="p-2">
                        <input type="number" className="w-full text-right border-none bg-transparent focus:ring-0" value={item.precio} onChange={(e) => updateRow(idx, 'precio', e.target.value)} />
                    </td>
                    <td className="p-4 text-right font-black text-slate-700 bg-slate-50/30">${item.total.toLocaleString('es-CL')}</td>
                    <td className="p-2 text-center">
                      <button onClick={() => eliminarFila(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={agregarFila} className="mt-4 text-blue-600 font-black text-[10px] uppercase flex items-center gap-2 px-4 py-2 border-2 border-dashed border-blue-100 rounded-xl hover:bg-blue-50 transition-all">
            <Plus size={14}/> Agregar Trabajo
          </button>
        </section>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-10 mt-10">
          <div className="flex gap-3">
            <button onClick={guardarPresupuesto} disabled={cargando} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-lg hover:bg-slate-800 transition-all">
              {cargando ? 'Guardando...' : ' Guardar'}
            </button>
            <PDFDownloadLink 
              document={<PDFPresupuesto datos={{clienteNombre: cliente.nombre, clienteTelefono: cliente.telefono, clienteDireccion: cliente.direccion, manoObra, totalFinal}} tipo="simple" />} 
              fileName={`Cotizacion_MO_${cliente.nombre}.pdf`}
            >
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-all"><FileText size={18}/>  Descargar PDF</button>
            </PDFDownloadLink>
          </div>
          <div className="text-right bg-slate-900 p-6 rounded-3xl min-w-[260px] shadow-xl">
            <p className="text-blue-400 text-[10px] uppercase font-black tracking-widest mb-1">Mano de Obra Total</p>
            <p className="text-4xl font-black text-white">${totalFinal.toLocaleString('es-CL')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresupuestoSimple;