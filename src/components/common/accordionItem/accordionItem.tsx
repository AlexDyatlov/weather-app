import { IWeatherWeek } from '../../../App';
import { displayDate } from '../../../utils/displayDate';

interface AccordionItemProps {
  item: IWeatherWeek;
  children: React.ReactNode;
  visible: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, children, visible, onToggle }) => {
  return (
    <li className="border-b border-b-[#b2b2b2]">
      <button
        className="flex w-full items-center py-2 gap-2"
        type="button"
        aria-expanded={visible}
        onClick={onToggle}
      >
        {displayDate(item.dt)}
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            width="50"
            height="50"
            alt=""
          />
        </div>
        {Math.round(item.temp.max)} / {Math.round(item.temp.min)}°C
      </button>
      <div
        className={`invisible box-content h-0 overflow-hidden text-left opacity-0 transition-[visibility,opacity] duration-300 ease-in-out ${
          visible ? '!visible h-[auto] opacity-100' : ''
        }`}
        aria-hidden={visible}
      >
        {children}
      </div>
    </li>
  );
};

export default AccordionItem;
