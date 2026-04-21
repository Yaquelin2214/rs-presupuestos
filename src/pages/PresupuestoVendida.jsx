import React, { useState } from 'react';
import { Save, Plus, ArrowLeft, FileText, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { presupuestoService } from '../services/PresupuestoService';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFPresupuesto from '../components/PDFPresupuesto';
import imgFondo from "../assets/fondo_obra.jpg";

const PresupuestoVendida = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [cliente, setCliente] = useState({ nombre: '', telefono: '', direccion: '' });
  const [materiales, setMateriales] = useState([{ cant: '', desc: '', precio: '', total: 0 }]);
  const [manoObra, setManoObra] = useState([{ cant: '', detalle: '', precio: '', total: 0 }]);

  const updateRow = (index, field, value, type) => {
    const list = type === 'mat' ? [...materiales] : [...manoObra];
    list[index][field] = value;
    if (field === 'cant' || field === 'precio') {
      const c = parseFloat(list[index].cant) || 0;
      const p = parseFloat(list[index].precio) || 0;
      list[index].total = c * p;
    }
    type === 'mat' ? setMateriales(list) : setManoObra(list);
  };

  const eliminarMaterial = (index) => {
    const list = materiales.filter((_, i) => i !== index);
    setMateriales(list.length ? list : [{ cant: '', desc: '', precio: '', total: 0 }]);
  };

  const eliminarMO = (index) => {
    const list = manoObra.filter((_, i) => i !== index);
    setManoObra(list.length ? list : [{ cant: '', detalle: '', precio: '', total: 0 }]);
  };

  const subtotalMateriales = materiales.reduce((acc, i) => acc + i.total, 0);
  const subtotalManoObra = manoObra.reduce((acc, i) => acc + i.total, 0);
  const totalGeneral = subtotalMateriales + subtotalManoObra;

  const guardarPresupuesto = async () => {
    if (!cliente.nombre) return alert("Ingresa el nombre del cliente");
    setCargando(true);
    const datos = {
      clienteNombre: cliente.nombre,
      clienteTelefono: cliente.telefono,
      clienteDireccion: cliente.direccion,
      materiales,
      manoObra,
      subtotalMateriales,
      subtotalManoObra,
      totalFinal: totalGeneral,
      tipo: 'vendida',
      fecha: new Date().toISOString()
    };
    const res = await presupuestoService.crear(datos);
    if (res.success) alert("Presupuesto guardado");
    setCargando(false);
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative p-4 py-12 flex items-center justify-center" style={{ backgroundImage: `url(${imgFondo})` }}>
      <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
      <div className="relative z-10 max-w-5xl w-full bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-white/20">
        
        <div className="flex justify-between items-start mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-emerald-600 uppercase text-xs font-black"><ArrowLeft size={18}/> Volver</button>
          <div className="text-right">
            <h1 className="text-2xl font-black text-gray-800 tracking-tighter">RS GESTIÓN</h1>
            <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.3em]">Obra Integral</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
          <input className="p-3 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-emerald-500" placeholder="Cliente" value={cliente.nombre} onChange={(e) => setCliente({...cliente, nombre: e.target.value})} />
          <input className="p-3 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-emerald-500" placeholder="Teléfono" value={cliente.telefono} onChange={(e) => setCliente({...cliente, telefono: e.target.value})} />
          <input className="p-3 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-emerald-500" placeholder="Dirección" value={cliente.direccion} onChange={(e) => setCliente({...cliente, direccion: e.target.value})} />
        </div>

        {/* Sección Materiales */}
        <section className="mb-10">
          <h3 className="text-xs font-black text-emerald-600 mb-4 uppercase tracking-widest flex items-center gap-2">
            <span className="bg-emerald-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">1</span> Detalle Materiales
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full bg-white border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-[10px] uppercase">
                  <th className="p-3 w-20 text-center">Cant.</th>
                  <th className="p-3 text-left">Descripción</th>
                  <th className="p-3 w-32 text-right">Precio Unit.</th>
                  <th className="p-3 w-32 text-right">Total</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-50">
                    <td className="p-2"><input type="number" className="w-full text-center font-bold text-emerald-600 border-none bg-transparent focus:ring-0" value={item.cant} onChange={(e) => updateRow(idx, 'cant', e.target.value, 'mat')} /></td>
                    <td className="p-2"><input type="text" className="w-full border-none bg-transparent focus:ring-0" placeholder="Material..." value={item.desc} onChange={(e) => updateRow(idx, 'desc', e.target.value, 'mat')} /></td>
                    <td className="p-2"><input type="number" className="w-full text-right border-none bg-transparent focus:ring-0" value={item.precio} onChange={(e) => updateRow(idx, 'precio', e.target.value, 'mat')} /></td>
                    <td className="p-3 text-right font-bold text-slate-700 bg-slate-50/30">${item.total.toLocaleString('es-CL')}</td>
                    <td className="p-2 text-center"><button onClick={() => eliminarMaterial(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => setMateriales([...materiales, { cant: '', desc: '', precio: '', total: 0 }])} className="mt-3 text-emerald-600 font-black text-[10px] uppercase flex items-center gap-1 hover:bg-emerald-50 p-2 rounded-lg transition-all"><Plus size={14}/> Añadir Material</button>
        </section>

        {/* Sección Mano de Obra */}
        <section className="mb-10">
          <h3 className="text-xs font-black text-blue-600 mb-4 uppercase tracking-widest flex items-center gap-2">
             <span className="bg-blue-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px]">2</span> Labor Técnica
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full bg-white border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white text-[10px] uppercase">
                  <th className="p-3 w-20 text-center">Cant.</th>
                  <th className="p-3 text-left">Detalle de Trabajo</th>
                  <th className="p-3 w-32 text-right">Precio Unit.</th>
                  <th className="p-3 w-32 text-right">Total</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {manoObra.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-50">
                    <td className="p-2"><input type="number" className="w-full text-center font-bold text-blue-600 border-none bg-transparent focus:ring-0" value={item.cant} onChange={(e) => updateRow(idx, 'cant', e.target.value, 'mo')} /></td>
                    <td className="p-2"><input type="text" className="w-full border-none bg-transparent focus:ring-0" placeholder="Servicio..." value={item.detalle} onChange={(e) => updateRow(idx, 'detalle', e.target.value, 'mo')} /></td>
                    <td className="p-2"><input type="number" className="w-full text-right border-none bg-transparent focus:ring-0" value={item.precio} onChange={(e) => updateRow(idx, 'precio', e.target.value, 'mo')} /></td>
                    <td className="p-3 text-right font-bold text-slate-700 bg-slate-50/30">${item.total.toLocaleString('es-CL')}</td>
                    <td className="p-2 text-center"><button onClick={() => eliminarMO(idx)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={() => setManoObra([...manoObra, { cant: '', detalle: '', precio: '', total: 0 }])} className="mt-3 text-blue-600 font-black text-[10px] uppercase flex items-center gap-1 hover:bg-blue-50 p-2 rounded-lg transition-all"><Plus size={14}/> Añadir Labor</button>
        </section>

        {/* Totales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-8 mt-10">
          <div className="bg-slate-50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
            <p className="text-emerald-600 text-[10px] uppercase font-black mb-1">Total Materiales</p>
            <p className="text-2xl font-black text-slate-700">${subtotalMateriales.toLocaleString('es-CL')}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-blue-100 shadow-sm">
            <p className="text-blue-600 text-[10px] uppercase font-black mb-1">Total Mano de Obra</p>
            <p className="text-2xl font-black text-slate-700">${subtotalManoObra.toLocaleString('es-CL')}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-700">
            <p className="text-emerald-400 text-[10px] uppercase font-black mb-1">Total Proyecto</p>
            <p className="text-3xl font-black text-white">${totalGeneral.toLocaleString('es-CL')}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button onClick={guardarPresupuesto} disabled={cargando} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase hover:bg-slate-800 shadow-lg transition-all">
            {cargando ? 'Guardando...' : ' Guardar'}
          </button>
          <PDFDownloadLink 
            document={<PDFPresupuesto datos={{clienteNombre: cliente.nombre, clienteTelefono: cliente.telefono, clienteDireccion: cliente.direccion, materiales, manoObra, subtotalMateriales, subtotalManoObra, totalFinal: totalGeneral}} tipo="vendida" />} 
            fileName={`Cotizacion_${cliente.nombre}.pdf`}
          >
            <button className="w-full md:w-auto bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-lg transition-all"><FileText size={18}/>  Descargar PDF</button>
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default PresupuestoVendida;