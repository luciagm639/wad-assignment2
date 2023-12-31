import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import MovieRecommendations from "../movieRecommendations";
import MovieActors from "../movieActors";


const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper
        component="ul"
        sx={{ ...root }}
      >
        {
          movie.genres
          &&
          <li>
            <Chip label="Genres" sx={{ ...chip }} color="primary" />
          </li>
          &&
          movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{ ...chip }} />
            </li>
          ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        {
          movie.runtime
          &&
          <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        }
        {
          movie.revenue
          &&
          <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
          />
        }
        {
          movie.vote_average
          &&
          movie.vote_count
          &&
          <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count}`}
          />
        }
        {
          movie.release_date
          &&
          <Chip label={`Released: ${movie.release_date}`} />
        }
      </Paper>
      <Paper
        component="ul"
        sx={{ ...root }}
      >
        {
          movie.production_countries &&
          <li>
            <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
          </li>
          &&
          movie.production_countries.map((c) => (
            <li key={c.name}>
              <Chip label={c.name} sx={{ ...chip }} />
            </li>
          ))
        }
      </Paper>
      <Typography variant="h5" component="h3">
        Actors
      </Typography>
      <Paper
        sx={{ ...root }}
      >
        <MovieActors movie={movie} ></MovieActors>
      </Paper>
      <Typography variant="h5" component="h3">
        Recommendations
      </Typography>
      <Paper
        sx={{ ...root }}
      >
        <MovieRecommendations movie={movie} ></MovieRecommendations>
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;