import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { useQuery } from "react-query";
import { UserContext } from "../../contexts/userContext";
import { getUser, updateUser } from "../../api/users-api";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { username } = useContext(UserContext)
  const user = useQuery(username, () => getUser(username));
  
  const data = user.data

  const handleAddToMustWatch = async (e) => {
    e.preventDefault();
    context.addToMustWatch(movie)
    data.mustWatch = [...data.mustWatch, movie.id]
    console.log(data)
    await updateUser(data._id, data)
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;