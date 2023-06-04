import { useEffect, useState } from 'react';

interface ICoordinates {
  lat: null | number;
  long: null | number;
}

export default function useGeoLocation() {
  const [coordinates, setCoordinates] = useState<ICoordinates>({
    lat: null,
    long: null
  });
  const [error, setError] = useState<string | null>(null);
  const geolocationAPI = navigator.geolocation;

  useEffect(() => {
    if (!geolocationAPI) {
      setError('API геолокации не поддерживается в вашем браузере!');
      return;
    }

    function handleSuccess(position: GeolocationPosition) {
      const { latitude, longitude } = position.coords;
      setCoordinates({ lat: latitude, long: longitude });
    }

    function handleError(error: GeolocationPositionError) {
      setError(error.message);
    }

    geolocationAPI.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { coordinates, error };
}
