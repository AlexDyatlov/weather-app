import httpService from './http.service';

const coordinatesEndpoint = 'geo/1.0/direct';

const coordinatesService = {
  get: async (payload: string) => {
    const { data } = await httpService.get(coordinatesEndpoint + payload);
    return data;
  }
};

export default coordinatesService;
