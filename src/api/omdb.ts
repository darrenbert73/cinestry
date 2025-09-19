import axios from 'axios';
import { Movie, MovieDetails } from '../types/movie';
//import { clearConfigCache } from 'prettier';

const API_KEY = process.env.REACT_APP_OMDB_KEY || '';
const BASE_URL = 'https://www.omdbapi.com/';

const cache = new Map<string, Movie[]>();
const detailsCache = new Map<string, MovieDetails>();

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (cache.has(query)) return cache.get(query)!;
  const { data } = await axios.get(BASE_URL, {
    params: { s: query, apikey: API_KEY },
  });

  const results: Movie[] = data.Search || [];
  cache.set(query, results);
  return results;
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  if (detailsCache.has(id)) {
    return detailsCache.get(id)!;
  }

  const { data } = await axios.get(BASE_URL, {
    params: { i: id, apikey: API_KEY, plot: 'full' },
  });

  detailsCache.set(id, data);
  return data;
};
