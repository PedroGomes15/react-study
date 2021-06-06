import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '.';

describe('<Button />', () => {
  it('should render the button with the text "Load More Posts"', () => {
    const fn = jest.fn();
    render(<Button text="Load More Posts" onClick={fn} disabled={false} />);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load More Posts" onClick={fn} disabled={false} />);

    const button = screen.getByRole('button', { name: /load more posts/i });

    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disable when disable is true', () => {
    const fn = jest.fn();
    render(<Button text="Load More Posts" onClick={fn} disabled={true} />);

    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(button).toBeDisabled();
  });

  it('should be enabled when disable is false', () => {
    const fn = jest.fn();
    render(<Button text="Load More Posts" onClick={fn} disabled={false} />);

    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(button).toBeEnabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load More Posts" onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});