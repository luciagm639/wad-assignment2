import React, { useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { getMovies } from "../api/movies-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { Grid, Pagination } from "@mui/material";
import { useState } from "react";

const HomePage = (props) => {
  const { token } = useContext(UserContext)
  
  let { data, error, isLoading, isError } = useQuery('discover', () => getMovies(1, token))

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const handleChangePage = async (e, value) => {
    try {
      // Realiza tu consulta y obtén los datos
      const data = await getMovies(value, token);

      if (data && data.results) {
        setMovies(data.results);
      }
      console.log(data)
      // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error(error);
      //TODO
    }
  }

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      <Grid container style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        <Pagination count={10} variant="outlined" color="secondary" onChange={handleChangePage} />
      </Grid>
    </>
  );
};
export default HomePage;