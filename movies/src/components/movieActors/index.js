import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext"
import ActorList from "../actorList";
import { getMovieActors } from "../../api/movies-api";
import Spinner from '../spinner';
import { useQuery } from "react-query";
import { Grid } from "@mui/material";

function MovieActors({ movie }) {
    const { token } = useContext(UserContext)
    const nameOfQuery = movie.title + 'Actors'
    const { data, error, isLoading, isError } = useQuery(nameOfQuery, () => getMovieActors(movie.id, token))

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    let actors = data.slice(0, 10);

    return (
        <Grid container spacing={2}>
            <ActorList
                actors={actors}>
            </ActorList>
        </Grid>
    );
}
export default MovieActors;