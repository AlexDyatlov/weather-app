import { Ref, forwardRef } from 'react';

import SvgIcon from '../svgIcon/svgIcon';

interface TextFieldProps {
  name: string;
  placeholder: string;
  value: string;
  label: string;
  onChange: (target: { name: string; value: string }) => void;
  onFocus: () => void;
  loader?: boolean;
}

const TextField = forwardRef(
  (
    { name, label, placeholder, value, loader, onChange, onFocus }: TextFieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ name: target.name, value: target.value });
    };

    return (
      <div className="relative">
        <label className="mb-1 block text-lg text-[#505050]" htmlFor={name}>
          {label}
        </label>
        <input
          className="text-leading-5 w-full rounded-[5px] border border-[#C2C2C2] px-[18px]
            py-2 placeholder:text-[16px] placeholder:text-[#C1C1C1] focus:outline-none
            focus-visible:border-transparent focus-visible:shadow-[0_0_0_2px_#3b82f6]
          "
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          value={value}
          autoComplete="on"
          onChange={handleChange}
          onFocus={onFocus}
          ref={ref}
        />
        {loader && (
          <SvgIcon
            className="absolute bottom-2.5 right-[15px] animate-spin text-black"
            name="loader"
            size="20"
            data-testid="icon-loader"
          />
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
