# Cinestry 🎬

Cinestry is a React-based web app that allows users to search for movies, view details, and explore ratings using the OMDb API. The app features a responsive UI, dynamic theming (light/dark), and provides an intuitive interface for discovering movie information.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Testing](#testing)
- [Design Notes](#designnotes)
- [License](#license)

---

## Features

- Search movies by title using the OMDb API
- View detailed movie information including IMDb rating, genre, runtime, and plot
- Light & dark theme toggle
- Responsive design
- Caching for faster subsequent searches

---

## Demo

Live demo: [https://cinestry.vercel.app/](https://cinestry.vercel.app/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/darrenbert73/cinestry.git
   cd cinestry
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
3. Create a .env file in the root with your OMDb API key:
   REACT_APP_OMDB_KEY=your_api_key_here
4. Start the development server:
   ```bash
   npm start
   ```
5. Open http://localhost:3000 to view it.

## Usage

1. Type a movie name in the search bar and hit Enter

2. Click a movie to see full details

3. Toggle between light and dark themes using the switch

## Technologies

1. React & TypeScript

2. Styled-components

3. Axios for API requests

4. OMDb API

5. Jest & React Testing Library for unit tests

## Testing

1. Unit test suites have been created for two components under a seperate folder
   i. Search Bar component
   ii. Movie details overlay component.
2. Run tests with:
   ```bash
   npm test
   ```

## Design Notes

1. Architecture:
   i. React functional components with hooks for state management.

   ii. Context API for theme management.

   iii. Styled-components for modular and theme-aware styling.

   iv. Axios for API requests.

   v. Jest – for running unit tests and mocking modules.
