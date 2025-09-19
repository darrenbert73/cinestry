import React from 'react';
import styled from 'styled-components';
import { Movie } from '../types/movie';
import defaultVideoImage from '../assets/image/default-video.jpg';

const Card = styled.article`
  background: var(--card);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(1.01);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 340px;
  object-fit: fill;
  background: var(--card);

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

const Info = styled.div`
  padding: 10px 12px;
`;

const Title = styled.h3`
  margin: 0 0 4px 0;
  font-size: 13px;

  @media (max-width: 480px) {
    font-size: 12px;
  }

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  min-height: 2.6em;
`;

const Year = styled.div`
  color: var(--muted);
  font-size: 13px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
  margin-top: 4px;
`;

interface Props {
  movie: Movie;
  onSelect: (id: string) => void;
}

export const MovieCard: React.FC<Props> = ({ movie, onSelect }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleActivate = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(movie.imdbID);
    }
  };

  const getPosterSrc = () => {
    if (movie.Poster && movie.Poster !== 'N/A' && !imageError) {
      return movie.Poster;
    }
    return defaultVideoImage;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`${movie.Title} (${movie.Year})`}
      onClick={() => onSelect(movie.imdbID)}
      onKeyDown={handleActivate}
    >
      <Poster
        src={getPosterSrc()}
        alt={movie.Poster !== 'N/A' && !imageError ? 'Movie poster' : 'No poster available'}
        onError={handleImageError}
      />
      <Info>
        <Title title={movie.Title}>{movie.Title}</Title>
        <Year>{movie.Year}</Year>
      </Info>
    </Card>
  );
};
