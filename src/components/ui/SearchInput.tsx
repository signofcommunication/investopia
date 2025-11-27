import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className="max-w-xl mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder={placeholder || "Cari istilah..."}
      />
    </div>
  );
};

export default SearchInput;
