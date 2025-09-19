import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);

    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with trimmed query when submitted', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText('Search movies...');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  Matrix  ' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('Matrix'); // trimmed
  });

  it('does not call onSearch if input is empty', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('accepts an initialQuery prop', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} initialQuery="Avengers" />);

    const input = screen.getByPlaceholderText('Search movies...');
    expect(input).toHaveValue('Avengers');
  });
});

describe('SearchBar with mocked API', () => {
  it('calls a mocked API function and displays results', async () => {
    const mockApi = jest.fn().mockResolvedValue([
      { Title: 'Matrix', imdbID: 'tt0133093', Year: '1999', Poster: 'N/A' },
      { Title: 'Inception', imdbID: 'tt1375666', Year: '2010', Poster: 'N/A' },
    ]);

    const handleSearch = async (query: string) => {
      const results = await mockApi(query);
      results.forEach((m: { Title: any }) => console.log('Movie:', m.Title));
    };

    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/search movies/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockApi).toHaveBeenCalledWith('Matrix');
      expect(mockApi).toHaveBeenCalledTimes(1);
    });
  });
});
