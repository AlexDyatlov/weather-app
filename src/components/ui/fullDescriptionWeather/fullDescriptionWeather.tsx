import { IWeekWeather } from '../../../@types/weekWeather.interface';

const FullDescriptionWeather = ({ ...rest }) => {
  const item = rest as IWeekWeather;

  return (
    <>
      <p>
        Облачность {item.clouds}%, {item.weather[0].description}{' '}
      </p>
      <p>Влажность {item.humidity} %</p>
      <p>Скорость ветра {item.wind_speed.toFixed(1)} метр/сек</p>
      <div className="pb-4">
        <ul className="flex gap-3 border-b border-b-slate-400 pb-2 text-center">
          <li className="w-full max-w-[180px]"></li>
          <li className="w-full max-w-[80px]">Утро</li>
          <li className="w-full max-w-[80px]">День</li>
          <li className="w-full max-w-[80px]">Вечер</li>
          <li className="w-full max-w-[80px]">Ночь</li>
        </ul>
        <ul>
          <li className="flex gap-3 py-2 text-center">
            <div className="w-full max-w-[180px] text-left">Температура:</div>
            <div className="w-full max-w-[80px]">{Math.round(item.temp.morn)}°C</div>
            <div className="w-full max-w-[80px]">{Math.round(item.temp.day)}°C</div>
            <div className="w-full max-w-[80px]">{Math.round(item.temp.eve)}°C</div>
            <div className="w-full max-w-[80px]">{Math.round(item.temp.night)}°C</div>
          </li>
          <li className="flex gap-3 text-center">
            <div className="w-full max-w-[180px] text-left">Ощущается как:</div>
            <div className="w-full max-w-[80px]">{Math.round(item.feels_like.morn)}°C</div>
            <div className="w-full max-w-[80px]">{Math.round(item.feels_like.day)}°C</div>
            <div className="w-full max-w-[80px]">{Math.round(item.feels_like.eve)}°C</div>
            <div className="w-full max-w-[80px]">{Math.round(item.feels_like.night)}°C</div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FullDescriptionWeather;
