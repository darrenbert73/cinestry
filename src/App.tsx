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
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  display: grid;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    gap: 8px;
  }
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
`;

const Brand = styled.div`
  display: flex;
  gap: 8px;
  // align-items: center;
  flex-shrink: 1;

  @media (max-width: 1024px) {
    gap: 6px;
  }

  @media (max-width: 768px) {
    gap: 4px;
  }

  @media (max-width: 480px) {
    gap: 2px;
    flex-direction: column; /* stack logo above title on small phones */
    align-items: center;
  }
`;

const Logo = styled(MovieIcon)`
  width: 28px;
  height: 28px;
  color: var(--accent);

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
  }

  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  text-align: left;

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    // text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SearchHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  color: var(--text);

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
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
          <Title>Cinestry - Movie Explorer</Title>
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
        <SearchHeader>Let’s Find a Movie for You</SearchHeader>
        <SearchBar onSearch={performSearch} />
        {loading && <LoadingSpinner message="Searching for movies..." />}
        {error && <div role="alert">{error}</div>}
        <MovieGrid>
          <MovieList
            movies={results}
            onSelect={setSelectedId}
            hasSearched={query.length > 0}
            loading={loading}
          />
        </MovieGrid>
      </Shell>
      <MovieDetails details={details} onClose={onCloseDetails} loading={detailsLoading} />
    </ThemeProvider>
  );
}

export default App;
