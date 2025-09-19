import React from 'react';
import styled from 'styled-components';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 8px 0;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--muted);
  font-size: 18px;
`;

interface Props {
  movies: Movie[];
  onSelect: (id: string) => void;
  hasSearched?: boolean;
  loading?: boolean;
}

export const MovieList: React.FC<Props> = ({
  movies,
  onSelect,
  hasSearched = false,
  loading = false,
}) => {
  if (!hasSearched) return null;

  if (!loading && movies.length === 0) {
    return <NoResults>No results found. Try a different search term.</NoResults>;
  }
  if (loading) return null;

  return (
    <Grid aria-label="Search results">
      {movies.map((m) => (
        <MovieCard key={m.imdbID} movie={m} onSelect={onSelect} />
      ))}
    </Grid>
  );
};
