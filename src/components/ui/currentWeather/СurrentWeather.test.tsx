import { render, screen } from '@testing-library/react';

import CurrentWeather from './currentWeather';
import { ICurrentWeather } from '../../../@types/currentWeather.interface';

const mockInitialWeatherData: ICurrentWeather = {
  dt: '1722200244',
  name: 'Сан-Франциско',
  sys: { country: 'US' },
  weather: [{ description: 'небольшая облачность', icon: '02d' }],
  clouds: { all: 16 },
  main: { humidity: 71, temp: 20.7 }
};

const mockUpdatedWeatherData: ICurrentWeather = {
  dt: '1722267067',
  name: 'Сан-Франциско',
  sys: { country: 'US' },
  weather: [{ description: 'облачно с прояснениями', icon: '04d' }],
  clouds: { all: 75 },
  main: { humidity: 90, temp: 14.4 }
};

describe('СurrentWeather component', () => {
  it('renders initial weather data correctly', () => {
    render(<CurrentWeather {...mockInitialWeatherData} />);

    expect(screen.getByText(/Сан-Франциско, US/)).toBeInTheDocument();
    expect(screen.getByText(/Температура воздуха/)).toBeInTheDocument();
    expect(screen.getByText(/21°C/)).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === 'Влажность 71%')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'Облачность 16%, небольшая облачность'
      )
    ).toBeInTheDocument();
  });

  it('renders updated weather data correctly', () => {
    const { rerender } = render(<CurrentWeather {...mockInitialWeatherData} />);
    expect(screen.getByText(/21°C/)).toBeInTheDocument();

    rerender(<CurrentWeather {...mockUpdatedWeatherData} />);

    expect(screen.getByText(/Сан-Франциско, US/)).toBeInTheDocument();
    expect(screen.getByText(/Температура воздуха/)).toBeInTheDocument();
    expect(screen.getByText(/14°C/)).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === 'Влажность 90%')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'Облачность 75%, облачно с прояснениями'
      )
    ).toBeInTheDocument();
  });
});
