import React from 'react';
import { Link } from 'react-router-dom';

const TarjetaMenu = ({ titulo, Icono, ruta, imagenFondo }) => {
  return (
    <Link 
      to={ruta} 
      className="relative group h-80 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/5"
    >
     
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: `url(${imagenFondo})` }}
      ></div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-cyan-950/90 group-hover:via-cyan-900/40 transition-all duration-500"></div>

    
      <div className="absolute inset-0 z-20 p-8 flex flex-col items-center justify-end text-center transition-all duration-500 group-hover:justify-center">
        
     
        <div className="absolute top-1/2 -translate-y-12 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-6 transition-all duration-500 ease-out">
          <Icono size={56} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" strokeWidth={1.2} />
        </div>

    
        <div className="transform transition-transform duration-500 group-hover:translate-y-8">
            <h3 className="text-xl font-black text-white uppercase tracking-wider drop-shadow-lg">
              {titulo}
            </h3>
            
            
            <div className="w-8 h-[3px] bg-cyan-500 mt-2 mx-auto rounded-full transition-all duration-500 group-hover:w-20 shadow-[0_0_10px_#22d3ee]"></div>
        </div>
      </div>
    </Link>
  );
};

export default TarjetaMenu;