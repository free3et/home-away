interface InputProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  placeholder: string;
}

export const InputNumber: React.FC<InputProps> = ({
  label,
  value,
  setValue,
  placeholder,
}) => {
  return (
    <div className="my-2">
      <label htmlFor={String(value)} className="text-md font-semibold">
        {label}
      </label>
      <input
        type="number"
        placeholder={placeholder}
        id={String(value)}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(+e.target.value)
        }
      />
    </div>
  );
};
