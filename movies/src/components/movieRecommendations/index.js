import React from "react";
import MovieList from "../movieList";
import AddToMustWatchIcon from "../cardIcons/addToMustWatch"
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from '../spinner';
import { useQuery } from "react-query";
import { Grid } from "@mui/material";

function MovieRecommendations({ movie }) {
    const nameOfQuery = movie.id + 'Recommendations'
    const { data, error, isLoading, isError } = useQuery(nameOfQuery, () => getMovieRecommendations(movie.id))

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    if(data.length == 0){
        return <h2>No recommendations yet...</h2>
    }
    let displayedMovies = data.slice(0,10)

    return (
        <Grid container spacing={2}>
            <MovieList
                action={(movie) => {
                    return <AddToMustWatchIcon movie={movie} />
                }}
                movies={displayedMovies}>

            </MovieList>
        </Grid>
    );
}
export default MovieRecommendations;