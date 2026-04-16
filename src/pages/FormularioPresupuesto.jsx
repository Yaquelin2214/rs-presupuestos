import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft, Plus, FileText, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Input from '../components/Input'; 
import FilaItem from '../components/FilaItem';

// Assets
import imgFondo from "../assets/fondo_obra.jpg";
import logo from "../assets/logo_rs.png";

// Firebase (importamos la db que configuraremos luego)
// import { db } from '../firebaseConfig';
// import { collection, addDoc } from "firebase/firestore";

const FormularioPresupuesto = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  // Estados del formulario
  const [cliente, setCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState([{ cantidad: 1, descripcion: '', precio: 0 }]);

  const manejarCambio = (index, campo, valor) => {
    const nuevosItems = [...items];
    nuevosItems[index][campo] = (campo === 'cantidad' || campo === 'precio') ? Number(valor) : valor;
    setItems(nuevosItems);
  };

  const agregarFila = () => setItems([...items, { cantidad: 1, descripcion: '', precio: 0 }]);
  const eliminarFila = (index) => setItems(items.filter((_, i) => i !== index));
  const subtotal = items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

  // --- LÓGICA PARA GENERAR PDF ---
  const generarDocumento = async () => {
    if (!cliente) return alert("Por favor, ingresa el nombre del cliente");
    setCargando(true);

    try {
      const doc = new jsPDF();
      
      // Encabezado Profesional
      doc.addImage(logo, 'PNG', 15, 10, 25, 20);
      doc.setFontSize(18);
      doc.text("RS CONSTRUCCIÓN", 45, 18);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Instalaciones Sanitarias e Ingeniería Civil", 45, 23);
      doc.text("Raúl Silva - +56 9 XXXX XXXX", 45, 28);

      // Línea divisoria cian
      doc.setDrawColor(34, 211, 238);
      doc.setLineWidth(1);
      doc.line(15, 35, 195, 35);

      // Datos del Cliente
      doc.setTextColor(0);
      doc.setFont(undefined, 'bold');
      doc.text(`CLIENTE: ${cliente.toUpperCase()}`, 15, 45);
      doc.setFont(undefined, 'normal');
      doc.text(`TELÉFONO: ${telefono}`, 15, 52);
      doc.text(`FECHA: ${fecha}`, 150, 45);

      // Tabla de ítems
      const tableRows = items.map(item => [
        item.cantidad,
        item.descripcion,
        `$${item.precio.toLocaleString()}`,
        `$${(item.cantidad * item.precio).toLocaleString()}`
      ]);

      doc.autoTable({
        startY: 60,
        head: [['CANT.', 'DESCRIPCIÓN', 'P. UNITARIO', 'TOTAL']],
        body: tableRows,
        headStyles: { fillColor: [31, 41, 55] },
        styles: { fontSize: 9 },
      });

      // Total
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`TOTAL PRESUPUESTO: $${subtotal.toLocaleString()}`, 115, finalY);

      // Pie de página
      doc.setFontSize(8);
      doc.setFont(undefined, 'italic');
      doc.text("Este presupuesto tiene una validez de 15 días corridos.", 15, finalY + 20);

      // Guardar PDF
      doc.save(`Presupuesto_${cliente.replace(/\s+/g, '_')}.pdf`);

      // AQUÍ IRÁ LA FUNCIÓN DE FIREBASE PARA GUARDAR EN LA NUBE
      // await addDoc(collection(db, "presupuestos"), { cliente, telefono, fecha, total: subtotal });

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4 py-12"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
      <div className="absolute inset-0 bg-slate-950/75 z-0"></div>

      <div className="relative z-10 max-w-5xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-cyan-600 mb-8 transition-colors uppercase text-xs font-bold tracking-widest">
          <ArrowLeft size={16} /> Volver
        </button>

        <h2 className="text-4xl font-black text-gray-800 mb-8 italic uppercase tracking-tighter border-b-2 border-slate-100 pb-4">
          Nuevo Presupuesto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Input label="Cliente" placeholder="Nombre completo" value={cliente} onChange={(e) => setCliente(e.target.value)} />
          <Input label="Teléfono" placeholder="+56 9..." value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <Input label="Fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div className="overflow-x-auto mb-8 border border-slate-100 rounded-xl">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-4 text-left text-xs uppercase tracking-widest">Cant.</th>
                <th className="p-4 text-left text-xs uppercase tracking-widest">Descripción</th>
                <th className="p-4 text-left text-xs uppercase tracking-widest">P. Unit.</th>
                <th className="p-4 text-left text-xs uppercase tracking-widest">Subtotal</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item, index) => (
                <FilaItem key={index} index={index} item={item} onChange={manejarCambio} onRemove={eliminarFila} />
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={agregarFila} 
          className="flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-xl hover:bg-cyan-50 hover:text-cyan-700 transition-all font-bold uppercase text-xs tracking-widest"
        >
          <Plus size={18} /> Agregar Ítem
        </button>

        <div className="mt-12 border-t-2 border-slate-100 pt-8 flex flex-col items-end">
          <div className="w-full md:w-80 space-y-4">
            <div className="flex justify-between text-3xl font-black text-cyan-600 border-b-4 border-cyan-100 pb-4">
              <span>TOTAL:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={generarDocumento}
              disabled={cargando}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-600 disabled:bg-slate-400 transition-all shadow-xl"
            >
              {cargando ? <Loader2 className="animate-spin" /> : <FileText size={22} />}
              {cargando ? "PROCESANDO..." : "GENERAR PDF OFICIAL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPresupuesto;