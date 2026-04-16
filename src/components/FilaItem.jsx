const FilaItem = ({ item, index, onChange, onRemove }) => {
  return (
    <tr className="border-b">
      <td className="p-2">
        <input 
          type="number" 
          value={item.cantidad} 
          onChange={(e) => onChange(index, 'cantidad', e.target.value)}
          className="w-16 border p-1 rounded"
        />
      </td>
      <td className="p-2">
        <input 
          type="text" 
          placeholder="Descripción del trabajo"
          value={item.descripcion} 
          onChange={(e) => onChange(index, 'descripcion', e.target.value)}
          className="w-full border p-1 rounded"
        />
      </td>
      <td className="p-2">
        <input 
          type="number" 
          placeholder="0.00"
          value={item.precio} 
          onChange={(e) => onChange(index, 'precio', e.target.value)}
          className="w-28 border p-1 rounded"
        />
      </td>
      <td className="p-2 font-semibold text-gray-700">
        ${(item.cantidad * item.precio).toFixed(2)}
      </td>
      <td className="p-2 text-center">
        <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700">
          ✕
        </button>
      </td>
    </tr>
  );
};

export default FilaItem;