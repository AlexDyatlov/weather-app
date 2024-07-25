import { render, screen, fireEvent } from '@testing-library/react';

import Description from './description';

describe('Description component', () => {
  it('renders initial text and button', () => {
    render(<Description />);

    expect(screen.getByTestId('test-text-initial')).toBeInTheDocument();
    expect(screen.getByTestId('test-btn-showmore')).toBeInTheDocument();
    expect(screen.queryByTestId('test-text-showmore')).toBeNull();
  });

  it('shows more text when the button is clicked', () => {
    render(<Description />);

    const button = screen.getByTestId('test-btn-showmore');
    fireEvent.click(button);

    expect(button).not.toBeInTheDocument();
    expect(screen.getByTestId('test-text-initial')).toBeInTheDocument();
    expect(screen.getByTestId('test-text-showmore')).toBeInTheDocument();
  });
});
