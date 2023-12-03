import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { getPopularMovies } from "../api/movies-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch'
import { Grid, Pagination } from "@mui/material";

const PopularMoviesPage = (props) => {
  const { token } = useContext(UserContext)
  const { data, error, isLoading, isError } = useQuery('popular', () => getPopularMovies(1, token))
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
      const data = await getPopularMovies(value, token);

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

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={movies}
        action={(movie) => {
          return <AddToMustWatchIcon movie={movie} />
        }}
      />
      <Grid container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Pagination count={10} variant="outlined" color="secondary" onChange={handleChangePage} />
      </Grid>
    </>
  );
};
export default PopularMoviesPage;