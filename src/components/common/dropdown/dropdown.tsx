import { Ref, forwardRef } from 'react';
import cs from 'classnames';

import { ICity } from '../../../@types/city.interface';

import Title from '../title/title';

interface DropdownProps {
  show: boolean;
  options: ICity[];
  onGetPosition: (target: { lat: number; long: number }) => void;
}

const Dropdown = forwardRef(
  ({ show, options, onGetPosition }: DropdownProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        className={cs(
          'invisible absolute left-0 mt-2 w-full overflow-hidden rounded-[5px] border border-[#C2C2C2] bg-white/95 opacity-0 ring-0 transition-[visibility,opacity] duration-200 ease-in-out',
          {
            '!visible opacity-100': show
          }
        )}
        ref={ref}
      >
        {options.length > 0 ? (
          <ul className="w-full">
            {options.map((item, index) => (
              <li key={index}>
                <button
                  className="flex w-full items-center gap-2 px-[18px] py-2 transition-colors duration-300 ease-in-out hover:bg-slate-200"
                  type="button"
                  onClick={() => onGetPosition({ lat: item.lat, long: item.lon })}
                >
                  {item.name}, {item.country}
                  <img
                    src={`https://openweathermap.org/images/flags/${item.country.toLowerCase()}.png`}
                    alt="Флаг страны"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Title className="px-[18px] py-4 text-2xl font-medium text-red-500" tag="p">
            Город не найден!
          </Title>
        )}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
