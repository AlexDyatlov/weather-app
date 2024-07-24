import { useEffect, useState } from 'react';

export interface ICoordinates {
  lat: null | number;
  long: null | number;
}

interface IUseGeoLocationOptions {
  selectedCoordinates?: ICoordinates;
}

export default function useGeoLocation({
  selectedCoordinates = { lat: null, long: null }
}: IUseGeoLocationOptions) {
  const [coordinates, setCoordinates] = useState<ICoordinates>(selectedCoordinates);
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
  }, [geolocationAPI]);

  useEffect(() => {
    if (selectedCoordinates.lat !== null && selectedCoordinates.long !== null) {
      setCoordinates(selectedCoordinates);
    }
  }, [selectedCoordinates]);

  return { coordinates, error };
}
