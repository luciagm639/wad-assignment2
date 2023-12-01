import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';
import CakeIcon from '@mui/icons-material/Cake';
import Typography from "@mui/material/Typography";
import { getActorMovies } from "../../api/tmdb-api";
import MovieList from "../movieList";
import { useQuery } from "react-query";
import AddToMustWatchIcon from "../cardIcons/addToMustWatch";
import { Grid } from "@mui/material";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};


const ActorDetails = ({ actor }) => {  // Don't miss this!

  const nameOfQuery = actor.id + 'Movies'
  const { data, error, isLoading, isError } = useQuery(nameOfQuery, () => getActorMovies(actor.id))

  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<CakeIcon />} label={`${actor.birthday}`} />
        {
          actor.deathday &&
          <Chip
            icon={<SentimentVeryDissatisfiedSharpIcon />}
            label={`${actor.deathday}`}
          />
        }
      </Paper>
      <Typography variant="h5" component="h3">
        Movies
      </Typography>
      <Paper
        sx={{ ...root }}
      >
        <Grid container spacing={2}>
          {
            data && <MovieList
              movies={data}
              action={(movie) => {
                return <AddToMustWatchIcon movie={movie} />
              }}></MovieList>
          }
        </Grid>
      </Paper>
    </>
  );
};
export default ActorDetails;