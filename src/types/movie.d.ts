export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
  }
  
  export interface MovieDetails extends Movie {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Plot: string;
    imdbRating: string;
    Website?: string;
  }
  