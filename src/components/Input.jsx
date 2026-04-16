const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default Input;