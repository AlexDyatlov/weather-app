import { ITemperature } from './temperature.interface';
import { IWeather } from './currentWeather.interface';

export interface IWeekWeather {
  clouds: number;
  humidity: number;
  dt: string;
  temp: ITemperature;
  feels_like: ITemperature;
  weather: IWeather[];
  wind_speed: number;
}
