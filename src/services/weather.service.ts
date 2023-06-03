import httpService from './http.service';

const weatherEndpoint = 'data/2.5/weather/';

const weatherService = {
  get: async (payload: string) => {
    const { data } = await httpService.get(weatherEndpoint + payload);
    return data;
  }
};

export default weatherService;
