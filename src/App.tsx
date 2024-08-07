import { useCallback, useEffect, useRef, useState } from 'react';

import weatherService from './services/weather.service';
import coordinatesService from './services/coordinates.service';
import weatherForWeekService from './services/weatherForWeek.service';

import useGeoLocation from './hooks/useGeoLocation';
import useDebounce from './hooks/useDebounce';

import { ICity } from './@types/city.interface';
import { IWeekWeather } from './@types/weekWeather.interface';
import { ICurrentWeather } from './@types/currentWeather.interface';

import AccordionItem from './components/common/accordionItem/accordionItem';
import Container from './components/common/container/container';
import Title from './components/common/title/title';
import TextField from './components/common/textField/textField';
import Description from './components/ui/description/description';
import FullDescriptionWeather from './components/ui/fullDescriptionWeather/fullDescriptionWeather';
import CurrentWeather from './components/ui/currentWeather/currentWeather';
import Dropdown from './components/common/dropdown/dropdown';
import Alert from './components/common/alert/alert';
import AlertMessage from './components/common/alert/alertMessage';

function App() {
  const [getCoordinates, setGetCoordinates] = useState<{ lat: number; long: number }>();
  const [city, setCity] = useState({
    city: ''
  });
  const [data, setData] = useState<ICurrentWeather>();
  const [dataWeek, setDataWeek] = useState<{ daily: IWeekWeather[] }>();
  const [errorData, setErrorData] = useState<string | null>(null);
  const [location, setLocation] = useState<ICity[]>();
  const { coordinates, error } = useGeoLocation({ selectedCoordinates: getCoordinates });
  const [accordion, setAccordion] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const controllerRef = useRef<AbortController | null>();
  const popUpRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const coordinatesParams = `?q=${city.city}&limit=5&appid=${import.meta.env.VITE_API_KEY}`;
  const weatherParamsCommon = `&units=metric&lang=ru&exclude=alerts,minutely,hourly&appid=${
    import.meta.env.VITE_API_KEY
  }`;
  const weatherParams = `?lat=${coordinates.lat}&lon=${coordinates.long}${weatherParamsCommon}`;
  const searchCity = useDebounce(city.city, 500);

  controllerRef.current = new AbortController();

  const handleGetCities = useCallback(async () => {
    setSpinner(true);
    const objLocation = await coordinatesService.get(coordinatesParams);
    setLocation(objLocation);
    setSpinner(false);

    controllerRef.current = null;
  }, [coordinatesParams]);

  const handleGetPositionCity = (target: { lat: number; long: number }) => {
    setGetCoordinates(target);
    setShowPopUp(false);
  };

  const handleToggleAccordion = (index: number) => {
    if (accordion === index) {
      return setAccordion(0);
    }

    return setAccordion(index);
  };

  const handleChange = (target: { name: string; value: string }) => {
    setCity((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setShowPopUp(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (coordinates.lat && coordinates.long) {
          const content = await weatherService.get(weatherParams);
          const contentWeatherWeek = await weatherForWeekService.get(weatherParams);
          setData(content);
          setDataWeek(contentWeatherWeek);
        }
      } catch (error) {
        if (error instanceof Error) {
          setErrorData(error.message);
        }
      }
    };

    fetchData();
  }, [coordinates, getCoordinates, weatherParams]);

  useEffect(() => {
    if (searchCity || city.city.trim().length < 0) handleGetCities();

    return controllerRef.current?.abort();
  }, [searchCity, city.city, handleGetCities]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popUpRef.current &&
        inputRef.current &&
        !popUpRef.current.contains(e.target as Node) &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowPopUp(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPopUp]);

  if (error) {
    return (
      <Container>
        Ошибка: {error}
        <Alert>
          <AlertMessage type="error" message={error} />
        </Alert>
      </Container>
    );
  }

  if (!coordinates.lat && !coordinates.long) {
    return (
      <Container>
        <div>Загрузка...</div>
      </Container>
    );
  }

  return (
    <>
      <header>
        <Container>
          <Title className="mb-7 text-3xl font-medium" tag="h1">
            Приложение Погода — онлайн-прогноз
          </Title>
          <Description />
          <div className="relative mb-8 max-w-xl">
            <TextField
              label="Введите название города"
              name="city"
              value={city.city}
              onChange={handleChange}
              onFocus={() => setShowPopUp(true)}
              placeholder="Город"
              ref={inputRef}
              loader={spinner}
            />
            {location && (
              <Dropdown
                show={showPopUp}
                ref={popUpRef}
                options={location}
                onGetPosition={handleGetPositionCity}
              />
            )}
          </div>
          {data && <CurrentWeather {...data} />}
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
                <ul className="max-w-[700px] border-t border-t-black">
                  {dataWeek.daily.map((item, index) => (
                    <AccordionItem
                      item={item}
                      visible={accordion === index}
                      key={index}
                      onToggle={() => handleToggleAccordion(index)}
                    >
                      <FullDescriptionWeather {...item} />
                    </AccordionItem>
                  ))}
                </ul>
              </>
            )}
            <Alert>
              <AlertMessage type="success" message="Геолокация включена" />
              {errorData && <AlertMessage type="error" message={errorData} />}
            </Alert>
          </Container>
        </section>
      </main>
    </>
  );
}

export default App;
