import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  options: SelectOption[];
  selectedValue: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean; // <-- ESTA LINHA É CRUCIAL NA INTERFACE
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  id,
  options,
  selectedValue,
  onChange,
  placeholder = "Selecione...",
  disabled = false // <-- E AQUI PARA O VALOR PADRÃO
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-bold">{label}</label>
      <select
        id={id}
        className="form-select"
        value={selectedValue}
        onChange={onChange}
        disabled={disabled} // <-- E AQUI NO ELEMENTO HTML
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;