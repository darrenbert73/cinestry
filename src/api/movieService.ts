import axios from 'axios';
import { Movie, MovieDetails } from '../types/movie';

const API_KEY = process.env.REACT_APP_OMDB_KEY || '';
const BASE_URL = 'https://www.omdbapi.com/';

const cache: Map<string, Movie[]> = new Map(JSON.parse(localStorage.getItem('movieCache') || '[]'));
const detailsCache: Map<string, MovieDetails> = new Map(
  JSON.parse(localStorage.getItem('detailsCache') || '[]'),
);

const saveCache = () => {
  localStorage.setItem('movieCache', JSON.stringify(Array.from(cache.entries())));
  localStorage.setItem('detailsCache', JSON.stringify(Array.from(detailsCache.entries())));
};

/**
 * This is a search function to get a list of movies from an external API and cache it
 * @param query string value
 * @returns List of movies that match the string
 */
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const cached = cache.get(query);
  if (cached) {
    return cached;
  }

  const { data } = await axios.get(BASE_URL, {
    params: { s: query, apikey: API_KEY },
  });

  const results: Movie[] = data.Search || [];
  cache.set(query, results);
  saveCache();
  return results;
};

/**
 * Gets the movie details by passing the movie id passed from the list
 * @param id id for the movie
 * @returns a json object of movie details
 */
export const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  const cached = detailsCache.get(id);
  if (cached) {
    return cached;
  }

  const { data } = await axios.get(BASE_URL, {
    params: { i: id, apikey: API_KEY, plot: 'full' },
  });

  if (!data) return null;

  detailsCache.set(id, data);
  saveCache();
  return data;
};
