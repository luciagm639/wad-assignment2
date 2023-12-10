import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";
import { useQueries, useQuery } from "react-query";
import { getMovie } from "../api/movies-api";
import { getUser } from "../api/users-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const {favorites: moviesIdContext } = useContext(MoviesContext);
  const { token, username } = useContext(UserContext)
  const user = useQuery(username, () => getUser(username));
  
  const data = user.data
  
  const favorites = data && data.favorites
  
  let movieIds = moviesIdContext.length > 0 ? moviesIdContext : (favorites ? favorites : [])

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie" + movieId],
        queryFn: () => getMovie(movieId, token),
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;