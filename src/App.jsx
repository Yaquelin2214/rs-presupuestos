import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import FormularioPresupuesto from './pages/FormularioPresupuesto';
import Historial from './pages/Historial';
import Clientes from './pages/Clientes';
import Configuracion from './pages/Configuracion';

function App() {
  return (
    <Router>
      {/* bg-slate-100 da el color de fondo a todo el sitio */}
      <div className="min-h-screen bg-slate-100 w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nuevo" element={<FormularioPresupuesto />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/config" element={<Configuracion />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;