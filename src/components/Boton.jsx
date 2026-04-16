const Boton = ({ children, onClick, color = 'bg-blue-600', type = 'button' }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${color} text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 transition-all shadow-sm font-medium`}
    >
      {children}
    </button>
  );
};

export default Boton;