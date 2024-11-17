type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const InputField = ({ label, value, onChange, placeholder }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
