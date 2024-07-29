import cs from 'classnames';

import { IWeekWeather } from '../../../@types/weekWeather.interface';

import { displayDate } from '../../../utils/displayDate';

import SvgIcon from '../svgIcon/svgIcon';

interface AccordionItemProps {
  item: IWeekWeather;
  children: React.ReactNode;
  visible: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, children, visible, onToggle }) => {
  return (
    <li className="border-b border-b-black pr-2">
      <button
        className="flex w-full items-center gap-2 py-2"
        type="button"
        aria-expanded={visible}
        onClick={onToggle}
      >
        <span className="inline-block font-medium">{displayDate(item.dt)}</span>
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          width="50"
          height="50"
          alt="Иконка погоды"
          aria-hidden="true"
        />
        {Math.round(item.temp.max)} / {Math.round(item.temp.min)}°C
        <SvgIcon
          className={cs('ml-auto transition-transform duration-300 ease-in-out', {
            'rotate-180': visible
          })}
          name="arrow-down"
          size="16"
        />
      </button>
      <div
        className={cs(
          'invisible box-content h-0 overflow-hidden text-left opacity-0 transition-[visibility,opacity] duration-300 ease-in-out',
          {
            '!visible h-[auto] opacity-100': visible
          }
        )}
        aria-hidden={!visible}
      >
        {children}
      </div>
    </li>
  );
};

export default AccordionItem;
