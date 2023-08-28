import { perksArr } from "./PerksArr";

interface SelectedPerkProps {
  selected: string[];
  onChange: (name: string[]) => void;
}

export const SelectPerks: React.FC<SelectedPerkProps> = ({
  selected,
  onChange,
}) => {
  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([
        ...selected.filter((selectedName: string) => selectedName !== name),
      ]);
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
      {perksArr.map((perk, index) => (
        <label
          htmlFor={perk.title}
          className="flex gap-2 items-center border p-3 rounded-md cursor-pointer"
          key={index}
        >
          <input
            type="checkbox"
            checked={selected.includes(perk.title)}
            id={perk.title}
            name={perk.title}
            onChange={handleCheckboxClick}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 32 32"
            strokeWidth="1.25"
            stroke="currentColor"
            className="w-5 h-5 object-cover"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={perk.icon} />
          </svg>
          <span>{perk.title}</span>
        </label>
      ))}
    </div>
  );
};
