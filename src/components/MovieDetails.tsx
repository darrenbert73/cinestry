import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import styled from 'styled-components';
import { MovieDetails as MovieDetailsType } from '../types/movie';
import { LoadingSpinner } from './Spinner';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
`;

const Panel = styled.div`
  background: var(--card);
  color: var(--text);
  width: min(720px, 92vw);
  max-height: 90vh;
  overflow: auto;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 90vw;
    max-height: 85vh;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 95vw;
    max-height: 80vh;
    border-radius: 8px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const Close = styled.button`
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 18px;
`;

const Content = styled.div`
  display: grid;
  gap: 10px;
  padding: 16px;
  line-height: 1.6;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const MetaCard = styled.div`
  background: var(--accent);
  color: white;
  padding: 6px 12px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

const Summary = styled.h4`
  margin: 0;
`;

const SummaryText = styled.div`
  text-align: justify;
`;

const RatingsPanel = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const ImdbRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 14px;
`;

interface Props {
  details: MovieDetailsType | null;
  onClose: () => void;
  loading?: boolean;
}

export const MovieDetails: React.FC<Props> = ({ details, onClose, loading = false }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!details && !loading) return null;

  return (
    <Backdrop role="dialog" aria-modal="true" aria-labelledby="movie-title" onClick={onClose}>
      <Panel onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <LoadingSpinner size="small" message="Loading movie details..." />
        ) : details ? (
          <>
            <Header>
              <Title id="movie-title">
                {details.Title} ({details.Year})
              </Title>
              <Close aria-label="Close" onClick={onClose}>
                ×
              </Close>
            </Header>
            <Content>
              <RatingsPanel>
                <Meta>
                  <MetaCard>Rated: {details.Rated}</MetaCard>
                  <MetaCard>{details.Runtime}</MetaCard>
                  <MetaCard>{details.Genre}</MetaCard>
                </Meta>
                {details.imdbRating && details.imdbRating !== `'N/A'` && (
                  <ImdbRating>
                    IMDB Rating:
                    <Star size={16} fill="gold" stroke="gold" />
                    {details.imdbRating}
                  </ImdbRating>
                )}
              </RatingsPanel>
              <Summary>Summary</Summary>
              <SummaryText>{details.Plot}</SummaryText>
              <div>
                <a
                  href={`https://www.imdb.com/title/${details.imdbID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official site
                </a>
              </div>
            </Content>
          </>
        ) : null}
      </Panel>
    </Backdrop>
  );
};
