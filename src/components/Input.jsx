const Input = ({ label, type = "text", placeholder, value, onChange, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-slate-200 bg-slate-50 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:bg-white outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
      />
    </div>
  );
};

export default Input;