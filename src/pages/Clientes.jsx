import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Phone, MapPin, User, Search } from 'lucide-react';
import { presupuestoService } from '../services/PresupuestoService';
import imgFondo from "../assets/fondo_obra.jpg"; 

const Clientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const data = await presupuestoService.obtenerTodos();
        // Extraemos solo los datos de clientes únicos basados en el nombre
        const unicos = [];
        const nombresVistos = new Set();

        data.forEach(p => {
          if (p.clienteNombre && !nombresVistos.has(p.clienteNombre.toLowerCase())) {
            nombresVistos.add(p.clienteNombre.toLowerCase());
            unicos.push({
              nombre: p.clienteNombre,
              telefono: p.clienteTelefono || 'No registrado',
              direccion: p.clienteDireccion || 'No registrada'
            });
          }
        });
        setClientes(unicos);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4 py-20" style={{ backgroundImage: `url(${imgFondo})` }}>
      <div className="absolute inset-0 bg-slate-950/70 z-0"></div>

      <div className="relative z-10 max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Encabezado */}
        <div className="p-8 md:p-12 border-b border-slate-100 bg-white">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-orange-600 transition-colors mb-6 font-black uppercase text-xs tracking-widest">
            <ArrowLeft size={18}/> Volver al Panel
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <Users className="text-orange-500" size={32}/> Directorio de Clientes
            </h1>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8 md:p-12 bg-slate-50/50">
          {cargando ? (
            <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest animate-pulse">Cargando Directorio...</div>
          ) : clientesFiltrados.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-slate-200 rounded-3xl text-center bg-white">
              <p className="text-slate-400 text-lg italic">No se encontraron clientes.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientesFiltrados.map((cliente, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black text-xl">
                      {cliente.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 uppercase text-sm leading-tight">{cliente.nombre}</h3>
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Cliente RS</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-500">
                      <Phone size={14} className="text-slate-300" />
                      <span className="text-xs font-medium">{cliente.telefono}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <MapPin size={14} className="text-slate-300" />
                      <span className="text-xs font-medium">{cliente.direccion}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clientes;