import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { MoviesContext } from "../contexts/moviesContext";
import PageTemplate from "../components/templateMovieListPage";
import { useQueries, useQuery } from "react-query";
import { getMovie } from "../api/movies-api";
import {getUser} from "../api/users-api"
import Spinner from '../components/spinner'
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage = () => {
  const {mustWatch: moviesIdContext } = useContext(MoviesContext);
  const { token, username } = useContext(UserContext)
  const user = useQuery(username, () => getUser(username));
  
  const data = user.data
  
  const mustwatch = data && data.mustWatch
  
  let movieIds = moviesIdContext.length > 0 ? moviesIdContext : (mustwatch ? mustwatch : [])

  // Create an array of queries and run in parallel.
  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie"+movieId],
        queryFn: () => getMovie(movieId, token),
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatch movie={movie} />
          </>
        );
      }}
    />
  );
};

export default MustWatchMoviesPage;