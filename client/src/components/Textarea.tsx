interface TextareaProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <>
      <label htmlFor="description" className="text-md font-semibold">
        {label}
      </label>
      <textarea
        className=""
        name="description"
        id="description"
        placeholder={label}
        cols={Number(30)}
        rows={Number(3)}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setValue(e.target.value)
        }
      />
    </>
  );
};
