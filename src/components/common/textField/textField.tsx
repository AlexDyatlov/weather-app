interface TextFieldProps {
  name: string;
  placeholder: string;
  value: string;
  label: string;
  onChange: (target: { name: string; value: string }) => void;
}

const TextField: React.FC<TextFieldProps> = ({ name, label, placeholder, value, onChange }) => {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div>
      <label className="block text-xl text-[#505050]" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full text-leading-5 rounded-[5px] border border-[#C2C2C2] px-[18px] py-2 placeholder:text-[16px] placeholder:text-[#C1C1C1] focus:outline-none focus-visible:border-transparent focus-visible:shadow-[0_0_0_2px_#3b82f6]"
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        autoComplete="on"
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
