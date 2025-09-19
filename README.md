# Cinestry 🎬

A React-based Movie Explorer that lets you search for movies, view detailed information, and check IMDb ratings in a clean and responsive interface.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Testing](#testing)
- [Contributing](#contributing)
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

Live demo: [https://yourappdomain.com](https://yourappdomain.com)

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

## Usage

i. Type a movie name in the search bar and hit Enter

ii. Click a movie to see full details

iii. Toggle between light and dark themes using the switch

## Technologies

i. React & TypeScript

ii. Styled-components

iii. Axios for API requests

iv. OMDb API

v. Jest & React Testing Library for unit tests

## Testing

1. Run tests with:
   ```bash
   npm test
   ```
