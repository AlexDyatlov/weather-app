import { useEffect, useState } from 'react';

import weatherService from './services/weather.service';
import coordinatesService from './services/coordinates.service';
import weatherForWeekService from './services/weatherForWeek.service';

import useGeoLocation from './hooks/useGeoLocation';

import { displayFullDate } from './utils/displayDate';
import AccordionItem from './components/common/accordionItem/accordionItem';
import Container from './components/common/container/container';
import Title from './components/common/title/title';

interface IWeather {
  description: string;
  icon: string;
}

interface ITemperature {
  humidity: number;
  temp: number;
}

interface ICurrentTemperature {
  min: number;
  max: number;
  day: number;
  morn: number;
  night: number;
  eve: number;
}

interface IData {
  dt: string;
  name: string;
  sys: { country: string };
  weather: IWeather[];
  clouds: { all: number };
  main: ITemperature;
}

export interface IWeatherWeek {
  clouds: number;
  humidity: number;
  dt: string;
  temp: ICurrentTemperature;
  feels_like: ICurrentTemperature;
  weather: IWeather[];
  wind_speed: number;
}

interface IWeekData {
  daily: IWeatherWeek[];
}

function App() {
  const [data, setData] = useState<IData>();
  const [dataWeek, setdataWeek] = useState<IWeekData>();
  const [location, setLocation] = useState();
  const { coordinates, error } = useGeoLocation();
  const coordinatesParams = `?q=Санкт-Петербург&limit=5&appid=${import.meta.env.VITE_API_KEY}`;
  const weatherParams = `?lat=${coordinates.lat}&lon=${
    coordinates.long
  }&units=metric&lang=ru&exclude=alerts,minutely,hourly&appid=${import.meta.env.VITE_API_KEY}`;

  const [accordion, setAccordion] = useState(0);

  const handleToggleAccordion = (index: number) => {
    if (accordion === index) {
      return setAccordion(0);
    }

    return setAccordion(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (coordinates.lat && coordinates.long) {
        const content = await weatherService.get(weatherParams);
        const contentWeatherWeek = await weatherForWeekService.get(weatherParams);
        setData(content);
        setdataWeek(contentWeatherWeek);
      }
      const objLocation = await coordinatesService.get(coordinatesParams);
      setLocation(objLocation);
    };

    fetchData();
  }, [coordinates]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!coordinates.lat && !coordinates.long) {
    return <h1>Загрузка...</h1>;
  }

  const dataWeather = data?.weather[0];
  return (
    <div className="">
      <header>
        <Container>
          {data && dataWeather && (
            <>
              <Title className="mb-7 text-3xl font-medium" tag="h1">
                Погода в {data.name}, {data.sys.country}{' '}
                <span className="inline-block text-base font-normal">
                  {displayFullDate(data.dt)}
                </span>
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
                      src={`https://openweathermap.org/img/wn/${dataWeather.icon}@2x.png`}
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
                  {dataWeather.description}
                </div>
              </div>
            </>
          )}
        </Container>
      </header>
      <main>
        <section>
          <Container>
            <Title className="mb-7 text-2xl font-medium" tag="h2">
              Прогноз погоды на неделю
            </Title>

            {dataWeek && (
              <>
                <ul className='border-t border-t-[#b2b2b2]'>
                  {dataWeek.daily.map((item, index) => (
                    <AccordionItem
                      item={item}
                      visible={accordion === index}
                      key={index}
                      onToggle={() => handleToggleAccordion(index)}
                    >
                      <p>Облачность {item.clouds}%, {item.weather[0].description} </p>
                      <p>Влажность {item.humidity} %</p>
                      <p>Скорость ветра {item.wind_speed.toFixed(1)} метр/сек</p>
                      <div className='pb-4'>
                        <ul className="flex gap-3 text-center border-b border-b-slate-400 pb-2">
                          <li className="w-full max-w-[180px]"></li>
                          <li className="w-full max-w-[80px]">Утро</li>
                          <li className="w-full max-w-[80px]">День</li>
                          <li className="w-full max-w-[80px]">Вечер</li>
                          <li className="w-full max-w-[80px]">Ночь</li>
                        </ul>
                        <ul>
                          <li className="flex gap-3 text-center py-2">
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
                    </AccordionItem>
                  ))}
                </ul>
              </>
            )}
          </Container>
        </section>
      </main>
    </div>
  );
}

export default App;
