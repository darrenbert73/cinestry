import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalStyles } from './styles/global';
import { SearchBar } from './components/SearchBar';
import { MovieList } from './components/MovieList';
import { MovieDetails } from './components/MovieDetails';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingSpinner } from './components/Spinner';
import { searchMovies, getMovieDetails } from './api/omdb';
import { Movie, MovieDetails as MovieDetailsType } from './types/movie';
import { ReactComponent as MovieIcon } from './assets/svg/movie-icon.svg';

const Shell = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  display: grid;
  gap: 16px;
`;

const TopBar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
`;

const Brand = styled.div`
  display: flex;
  gap: 8px;
`;

const Logo = styled(MovieIcon)`
  width: 28px;
  height: 28px;
  color: var(--accent);
`;

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [details, setDetails] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (q: string) => {
    setQuery(q);
    setLoading(true);
    setError(null);
    try {
      const list = await searchMovies(q);
      setResults(list);
    } catch (e) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setDetails(null);
      setDetailsLoading(false);
      return;
    }
    setDetailsLoading(true);
    let cancelled = false;
    getMovieDetails(selectedId).then((d) => {
      if (!cancelled) {
        setDetails(d);
        setDetailsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [selectedId]);

  const onCloseDetails = useCallback(() => setSelectedId(null), []);

  const header = useMemo(
    () => (
      <TopBar>
        <Brand>
          <Logo aria-hidden />
          <Title>Movie Explorer</Title>
        </Brand>
        <ThemeToggle />
      </TopBar>
    ),
    [],
  );

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Shell>
        {header}
        <SearchBar onSearch={performSearch} />
        {loading && <LoadingSpinner />}
        {error && <div role="alert">{error}</div>}
        <MovieList movies={results} onSelect={setSelectedId} hasSearched={query.length > 0} />
      </Shell>
      <MovieDetails details={details} onClose={onCloseDetails} loading={detailsLoading} />
    </ThemeProvider>
  );
}

export default App;
