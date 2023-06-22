import Title from '../../common/title/title';

import { displayFullDate } from '../../../utils/displayDate';

import { ICurrentWeather, IWeather } from '../../../@types/currentWeather.interface';

const CurrentWeather = ({ icon, description, ...rest }: IWeather) => {
  const data = rest as unknown as ICurrentWeather;

  return (
    <>
      <Title className="mb-7 text-3xl font-medium" tag="div">
        {data.name}, {data.sys.country}{' '}
        <span className="inline-block text-base font-normal">{displayFullDate(data.dt)}</span>
      </Title>

      <div className="mb-8 border-l-2 border-l-[#0ea5e9] pl-4">
        <div className="mb-2 flex items-end">
          <p className="text-lg">
            Температура воздуха{' '}
            <span className="inline-block text-[30px] font-medium leading-none">
              {Math.round(data.main.temp)}°C
            </span>
          </p>
          <div className="h-12 w-12">
            <img
              className="object-cover"
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              aria-hidden="true"
              alt="Иконка погоды"
            />
          </div>
        </div>
        <div className="mb-2 text-lg">
          <span className="inline-block font-medium">Влажность</span> {data.main.humidity}%
        </div>
        <div className="text-lg">
          <span className="inline-block font-medium">Облачность</span> {data.clouds.all}%,{' '}
          {description}
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
