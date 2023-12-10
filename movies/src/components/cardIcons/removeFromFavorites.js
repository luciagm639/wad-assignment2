import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUser, updateUser } from "../../api/users-api";
import { useQuery } from "react-query";
import { UserContext } from "../../contexts/userContext";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { username } = useContext(UserContext)
  const user = useQuery(username, () => getUser(username));

  const data = user.data

  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();
    context.removeFromFavorites(movie);
    data.favorites = data.favorites.filter(
      (mId) => mId !== movie.id
    )
    await updateUser(data._id, data)
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;