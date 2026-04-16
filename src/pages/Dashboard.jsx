import React from 'react';
import TarjetaMenu from '../components/TarjetaMenu';
import { FilePlus, History, Users, Settings } from 'lucide-react';


import logo from "../assets/logo_rs.png";
import imgFondo from "../assets/fondo_obra.jpg";
import imgPresupuesto from "../assets/servicio_presupuesto.jpg";
import imgHistorial from "../assets/servicio_historial.png";
import imgClientes from "../assets/servicio_clientes.jpg";
import imgConfig from "../assets/servicio_configuracion.jpg";

const Dashboard = () => {
  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative flex flex-col font-sans"
      style={{ backgroundImage: `url(${imgFondo})` }}
    >
    
      <div className="absolute inset-0 bg-slate-950/75 z-0"></div>

   
      <header className="relative z-10 w-full p-8 flex items-center justify-start bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-6">
        
          <div className="relative">
            <img src={logo} alt="RS" className="h-24 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </div>
          
          <div className="flex flex-col border-l-4 border-cyan-500 pl-6">
          
            <span className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500 italic leading-none">
              RS
            </span>
            <p className="text-cyan-400 text-xs font-bold tracking-[0.5em] mt-2 uppercase pl-1">
              PROYECTOS & PRESUPUESTOS
            </p>
          </div>
        </div>
      </header>

    
      <main className="relative z-10 flex-grow flex items-center justify-center p-10">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TarjetaMenu titulo="Nuevo Presupuesto" Icono={FilePlus} ruta="/nuevo" imagenFondo={imgPresupuesto} />
          <TarjetaMenu titulo="Historial de Obras" Icono={History} ruta="/historial" imagenFondo={imgHistorial} />
          <TarjetaMenu titulo="Base de Clientes" Icono={Users} ruta="/clientes" imagenFondo={imgClientes} />
          <TarjetaMenu titulo="Panel de Control" Icono={Settings} ruta="/config" imagenFondo={imgConfig} />
        </div>
      </main>

    
      <footer className="relative z-10 w-full p-10 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="text-white text-xl font-black tracking-[0.2em] uppercase italic">
            Raúl Silva
          </p>
          <p className="text-cyan-500 text-[10px] font-bold tracking-[0.4em] uppercase mt-2">
            Instalaciones Sanitarias & Construcción Integral
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;