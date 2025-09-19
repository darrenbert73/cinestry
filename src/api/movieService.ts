import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Movie, MovieDetails } from '../types/movie';
import { validateQuery } from '../helper/searchValidator';

const API_KEY = process.env.REACT_APP_OMDB_KEY || '';
const BASE_URL = 'https://www.omdbapi.com/';

const fetchMovies = async (query: string): Promise<Movie[]> => {
  const safeQuery = validateQuery(query);
  if (!safeQuery) return [];
  const { data } = await axios.get(BASE_URL, {
    params: { s: safeQuery, apikey: API_KEY },
  });
  return data.Search || [];
};

const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const { data } = await axios.get(BASE_URL, {
    params: { i: id, apikey: API_KEY, plot: 'full' },
  });
  return data;
};

export const useMovies = (query: string) =>
  useQuery<Movie[]>({
    queryKey: ['movies', query],
    queryFn: () => fetchMovies(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 10,
  });

export const useMovieDetails = (id: string | null) =>
  useQuery<MovieDetails>({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
