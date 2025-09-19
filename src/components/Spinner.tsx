import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--muted);
  border-top: 4px solid var(--accent);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SpinnerSmall = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid var(--muted);
  border-top: 3px solid var(--accent);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

interface Props {
  size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<Props> = ({ size = 'large' }) => {
  const SpinnerComponent = size === 'small' ? SpinnerSmall : Spinner;

  return (
    <SpinnerContainer>
      <div style={{ textAlign: 'center' }}>
        <SpinnerComponent />
        {/* {message && <div style={{ marginTop: '12px', color: 'var(--muted)' }}>{message}</div>} */}
      </div>
    </SpinnerContainer>
  );
};
