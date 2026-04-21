const FilaItem = ({ item, index, onChange, onRemove, modo }) => {
  const unidades = ['m2', 'ml', 'kg', 'Global', 'Und'];
  
  const subtotal = item.cantidad * (item.precioMaterial + item.precioManoObra);

  return (
    <tr className="border-b hover:bg-slate-50 transition-colors">
      <td className="p-2 w-20">
        <input 
          type="number" 
          value={item.cantidad} 
          onChange={(e) => onChange(index, 'cantidad', e.target.value)}
          className="w-full border border-slate-200 p-2 rounded-lg text-right font-mono focus:ring-2 focus:ring-cyan-500 outline-none"
        />
      </td>
      <td className="p-2 w-16">
        <select 
          value={item.unidad} 
          onChange={(e) => onChange(index, 'unidad', e.target.value)}
          className="w-full border border-slate-200 p-2 rounded-lg text-center font-semibold focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
        >
          {unidades.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </td>
      <td className="p-2">
        <input 
          type="text" 
          placeholder="Descripción del trabajo"
          value={item.descripcion} 
          onChange={(e) => onChange(index, 'descripcion', e.target.value)}
          className="w-full border border-slate-200 p-2 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
        />
      </td>
      {modo === 'vendida' && (
        <td className="p-2 w-28">
          <input 
            type="number" 
            placeholder="0"
            value={item.precioMaterial} 
            onChange={(e) => onChange(index, 'precioMaterial', e.target.value)}
            className="w-full border border-slate-200 p-2 rounded-lg text-right font-mono focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </td>
      )}
      <td className="p-2 w-28">
        <input 
          type="number" 
          placeholder="0"
          value={item.precioManoObra} 
          onChange={(e) => onChange(index, 'precioManoObra', e.target.value)}
          className="w-full border border-slate-200 p-2 rounded-lg text-right font-mono focus:ring-2 focus:ring-cyan-500 outline-none"
        />
      </td>
      <td className="p-2 font-bold text-slate-700 text-right pr-4 w-28">
        ${subtotal.toLocaleString()}
      </td>
      <td className="p-2 text-center w-12">
        <button onClick={() => onRemove(index)} className="text-slate-400 hover:text-red-500 transition-colors">
          ✕
        </button>
      </td>
    </tr>
  );
};

export default FilaItem;