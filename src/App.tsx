import { useEffect, useState } from 'react';

import weatherService from './services/weather.service';
import coordinatesService from './services/coordinates.service';

function App() {
  const [data, setData] = useState();
  const [location, setLocation] = useState();
  const weatherParams = `?lat=59.938732&lon=30.316229&units=metric&lang=ru&exclude=alerts&appid=${import.meta.env.VITE_API_KEY}`;
  const coordinatesParams = `?q=Санкт-Петербург&limit=5&appid=${import.meta.env.VITE_API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      const content = await weatherService.get(weatherParams);
      const objLocation = await coordinatesService.get(coordinatesParams);
      setData(content);
      setLocation(objLocation);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Title</h1>
    </>
  );
}

export default App;
