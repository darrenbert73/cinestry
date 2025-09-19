import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MovieDetails } from '../MovieDetails';
import { MovieDetails as MovieDetailsType } from '../../types/movie';

const mockDetails: MovieDetailsType = {
  Title: 'Matrix',
  Year: '1999',
  Rated: 'R',
  Runtime: '136 min',
  Genre: 'Action, Sci-Fi',
  Plot: 'A computer hacker learns the truth about reality.',
  imdbID: 'tt0133093',
  imdbRating: '8.7',
  Website: 'https://www.imdb.com/title/tt0133093/',
  Released: '',
  Director: '',
  Poster: '',
  Type: '',
};

describe('MovieDetails', () => {
  it('does not render when details and loading are null/false', () => {
    const onClose = jest.fn();
    const { container } = render(<MovieDetails details={null} loading={false} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders loading spinner when loading is true', () => {
    const onClose = jest.fn();
    render(<MovieDetails details={null} loading={true} onClose={onClose} />);
    expect(screen.getByText(/loading movie details/i)).toBeInTheDocument();
  });

  it('renders details panel with movie information', () => {
    const onClose = jest.fn();
    render(<MovieDetails details={mockDetails} onClose={onClose} />);

    expect(screen.getByText(/Matrix/i)).toBeInTheDocument();
    expect(screen.getByText(/A computer hacker learns the truth/i)).toBeInTheDocument();
    expect(screen.getByText('Rated: R')).toBeInTheDocument();
    expect(screen.getByText('136 min')).toBeInTheDocument();
    expect(screen.getByText('Action, Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText(/IMDB Rating/i)).toBeInTheDocument();
  });

  it('calls onClose when clicking the backdrop', () => {
    const onClose = jest.fn();
    render(<MovieDetails details={mockDetails} onClose={onClose} />);
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when clicking inside the panel', () => {
    const onClose = jest.fn();
    render(<MovieDetails details={mockDetails} onClose={onClose} />);
    const panel = screen.getByText(/Matrix/i).closest('div');
    if (panel) {
      fireEvent.click(panel);
    }
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape', () => {
    const onClose = jest.fn();
    render(<MovieDetails details={mockDetails} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
