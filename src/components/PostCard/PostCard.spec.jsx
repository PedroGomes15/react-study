import { render, screen } from '@testing-library/react';
import { PostCard } from '.';

const mock = {
  title: 'test',
  body: 'body test',
  id: 1,
  cover: 'img/img.png',
};

describe('<PostCard/>', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard post={mock} />);

    expect(screen.getByRole('img', { name: 'test' })).toHaveAttribute('src', 'img/img.png');

    expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument();

    expect(screen.getByText('body test')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard post={mock} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
