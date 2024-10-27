import { render } from '@testing-library/react';
import FullDescriptionWeather from './fullDescriptionWeather';

import { IWeekWeather } from '../../../@types/weekWeather.interface';

const mockFullDescriptionWeatherData: IWeekWeather = {
  dt: '1722456000',
  clouds: 58,
  weather: [{ description: 'облачно с прояснениями', icon: '04d' }],
  humidity: 79,
  wind_speed: 2.69,
  temp: {
    day: 16.06,
    min: 14.3,
    max: 23.01,
    night: 15.22,
    eve: 21.01,
    morn: 14.4
  },
  feels_like: { min: 21, max: 10, day: 16.1, eve: 20.94, morn: 14.45, night: 15.2 }
};

describe('FullDescriptionWeather component', () => {
  it('render', () => {
    const { container } = render(<FullDescriptionWeather {...mockFullDescriptionWeatherData} />);
    expect(container).toMatchSnapshot();
  });
});
