interface InputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputText: React.FC<InputProps> = ({
  label,
  value,
  setValue,
  placeholder,
  onKeyPress,
}) => {
  return (
    <div className="my-2">
      <label htmlFor={String(value)} className="text-md font-semibold">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        id={String(value)}
        value={value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onKeyPress={onKeyPress}
      />
    </div>
  );
};
