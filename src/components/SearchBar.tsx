import React, { useState } from 'react';
import styled from 'styled-components';

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

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid var(--muted);
  background: var(--card);
  color: var(--text);
`;

const Button = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  background: var(--accent);
  color: white;
  cursor: pointer;
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

  return (
    <Container>
      <Form role="search" aria-label="Movie search" onSubmit={submit}>
        <Input
          type="search"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search movies"
        />
        <Button type="submit" aria-label="Search">
          Search
        </Button>
      </Form>
    </Container>
  );
};
