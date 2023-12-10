import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getUser, updateUser } from "../../api/users-api";
import { useQuery } from "react-query";
import { UserContext } from "../../contexts/userContext";
import { MoviesContext } from "../../contexts/moviesContext";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { username } = useContext(UserContext)
  const user = useQuery(username, () => getUser(username));
  
  const data = user.data
 
  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    context.addToFavorites(movie)
    data.favorites = [...data.favorites, movie.id]
    console.log(data)
    await updateUser(data._id, data)
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;