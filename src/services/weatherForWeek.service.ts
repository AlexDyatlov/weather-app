import httpService from './http.service';

const weatherForWeekEndpoint = 'data/2.5/onecall';

const weatherForWeekService = {
  get: async (payload: string) => {
    const { data } = await httpService.get(weatherForWeekEndpoint + payload);
    return data;
  }
};

export default weatherForWeekService;
