export interface IWeather {
  description: string;
  icon: string;
}

export interface ICurrentWeather {
  dt: string;
  name: string;
  sys: { country: string };
  weather: IWeather[];
  clouds: { all: number };
  main: { humidity: number; temp: number };
}
