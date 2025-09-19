import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/svg/search-icon.svg';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  width: 600px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const Input = styled.input`
  padding: 12px 14px 12px 40px;
  border-radius: 8px;
  border: 1px solid var(--muted);
  background: var(--card);
  color: var(--text);
  width: 100%;

  &::placeholder {
    color: var(--muted);
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  display: flex;
  align-items: center;
`;

const Button = styled.button<{ disabled?: boolean }>`
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background: ${({ disabled }) => (disabled ? 'gray' : 'var(--accent)')};
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const SearchPrefix = styled(SearchIcon)`
  width: 20px;
  height: 20px;
  color: var(--accent);
`;

interface Props {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchBar: React.FC<Props> = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  };

  const isEmpty = query.trim() === '';

  return (
    <Container>
      <Form role="search" aria-label="Movie search" onSubmit={submit}>
        <InputWrapper>
          <IconWrapper>
            <SearchPrefix />
          </IconWrapper>
          <Input
            type="search"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search movies"
          />
        </InputWrapper>
        <Button type="submit" disabled={isEmpty} aria-label="Search">
          Search
        </Button>
      </Form>
    </Container>
  );
};
