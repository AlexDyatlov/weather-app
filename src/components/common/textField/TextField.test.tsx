import { fireEvent, render, screen } from '@testing-library/react';
import TextField from './textField';

describe('TextField component', () => {
  let handleChange: jest.Mock<(params: { name: string; value: string }) => void>;
  let handleFocus: jest.Mock<() => void>;

  const renderComponent = (loader = false) => {
    render(
      <TextField
        label="Введите название города"
        name="city"
        placeholder="Город"
        value="London"
        loader={loader}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    );
  };

  beforeEach(() => {
    handleChange = jest.fn();
    handleFocus = jest.fn();
    renderComponent();
  });

  it('renders correct props', () => {
    const labelElement = screen.getByText(/Введите название города/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName.toLowerCase()).toBe('label');
  });

  it('calls onChange when typing in input', () => {
    const input = screen.getByPlaceholderText('Город');
    fireEvent.change(input, { target: { value: 'Санкт-Петербург' } });

    expect(handleChange).toHaveBeenCalledWith({ name: 'city', value: 'Санкт-Петербург' });
  });

  it('calls onFocus when input is focused', () => {
    const input = screen.getByPlaceholderText('Город');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('shows loader icon when loader prop is true', () => {
    renderComponent(true);

    expect(screen.getByTestId('icon-loader')).toBeInTheDocument();
  });
});
