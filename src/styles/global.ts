import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {

    --bg:rgb(2, 3, 3); 
    --text: #e5e7eb;
    --muted: #9ca3af;
    --card: #1f2937; 
    --accent: #73A5C6; 
    --accent2: #FACC15; 
    --focus: #FACC15;
    --scrollbar-bg: transparent;
    --scrollbar-thumb: rgba(255, 255, 255, 0.2);
    --scrollbar-thumb-hover: rgba(255, 255, 255, 0.35);
  }

  [data-theme='light'] {
    --bg: #ffffff; 
    --text: #111827;
    --muted: #6b7280;
    --card: #f3f4f6;
    --accent: #73A5C6; 
    --accent2: #FACC15; 
    --focus: #FACC15;
  }
    

  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji";
    background: var(--bg);
    color: var(--text);
  }

  a { color: var(--accent); }
  button { font: inherit; }
  :focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--scrollbar-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
  }

  * {
    scrollbar-width: thin;           
    scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-bg);
  }
`;
