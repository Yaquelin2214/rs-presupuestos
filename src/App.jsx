import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. IMPORTACIÓN: Asegúrate de que esta línea exista y apunte al archivo correcto
import Dashboard from './pages/Dashboard'; 
import PresupuestoVendida from './pages/PresupuestoVendida';
import PresupuestoSimple from './pages/PresupuestoSimple';
import Historial from './pages/Historial';
import Clientes from './pages/Clientes';
import Configuracion from './pages/Configuracion';
import VerPresupuesto from './pages/VerPresupuesto';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100 w-full">
        <Routes>
          {/* 2. USO: Aquí es donde fallaba porque no encontraba la definición */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Las nuevas rutas que creamos */}
          <Route path="/nueva-vendida" element={<PresupuestoVendida />} />
          <Route path="/nueva-simple" element={<PresupuestoSimple />} />
          
          {/* El resto de tus páginas */}
          <Route path="/historial" element={<Historial />} />
          <Route path="/ver/:id" element={<VerPresupuesto />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/config" element={<Configuracion />} />
          
          {/* Si alguien se pierde, lo mandamos al Dashboard con tus fotos */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;