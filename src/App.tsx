import { useEffect, useState } from 'react';

import weatherService from './services/weather.service';
import coordinatesService from './services/coordinates.service';

import useGeoLocation from './hooks/useGeoLocation';

function App() {
  const [data, setData] = useState();
  const [location, setLocation] = useState();
  const { coordinates, error } = useGeoLocation();
  const coordinatesParams = `?q=Санкт-Петербург&limit=5&appid=${import.meta.env.VITE_API_KEY}`;
  const weatherParams = `?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&lang=ru&exclude=alerts&appid=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      if (coordinates.lat && coordinates.long) {
        const content = await weatherService.get(weatherParams);
        setData(content);
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

  return (
    <>
      <h1>Title</h1>
    </>
  );
}

export default App;
