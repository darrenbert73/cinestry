import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const Switch = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
`;

const Track = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 44px;
  height: 24px;
  background: var(--muted);
  border: 1px solid var(--muted);
  border-radius: 999px;
  position: relative;
  outline: none;
  transition: background 0.2s ease;
  cursor: pointer;

  &:after {
    content: '☀️';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: var(--card);
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 1;
    transition: transform 0.2s ease;
  }

  &:checked {
    background: var(--text);
  }

  &:checked:after {
    content: '🌙';
    transform: translateX(20px);
  }
`;

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <Switch aria-label="Toggle theme">
      <Track role="switch" aria-checked={isDark} checked={isDark} onChange={toggleTheme} />
    </Switch>
  );
};
