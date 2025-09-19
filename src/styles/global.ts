import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Dark theme defaults */
    --bg:rgb(2, 3, 3); /* dark grey */
    --text: #e5e7eb;
    --muted: #9ca3af;
    --card: #1f2937; /* slightly lighter card */
    --accent: #73A5C6; /* primary */
    --accent2: #FACC15; /* secondary primary (yellow) */
    --focus: #FACC15;
  }

  [data-theme='light'] {
    --bg: #ffffff; /* white */
    --text: #111827;
    --muted: #6b7280;
    --card: #f3f4f6;
    --accent: #73A5C6; /* primary */
    --accent2: #FACC15; /* secondary primary (yellow) */
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
`;
