import React from "react";
import ActorList from "../actorList";
import { getMovieActors } from "../../api/tmdb-api";
import Spinner from '../spinner';
import { useQuery } from "react-query";
import { Grid } from "@mui/material";

function MovieActors({ movie }) {
    const nameOfQuery = movie.title + 'Actors'
    //console.log(nameOfQuery)
    const { data, error, isLoading, isError } = useQuery(nameOfQuery, () => getMovieActors(movie.id))

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    let actors = data.slice(0,10);

    return (
        <Grid container spacing={2}>
            <ActorList
                actors={actors}>
            </ActorList>
        </Grid>
    );
}
export default MovieActors;