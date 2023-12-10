import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUser, updateUser } from "../../api/users-api";
import { useQuery } from "react-query";
import { UserContext } from "../../contexts/userContext";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { username } = useContext(UserContext)
  const user = useQuery(username, () => getUser(username));

  const data = user.data

  const handleRemoveFromMustWatch = async (e) => {
    e.preventDefault();
    context.removeFromMustWatch(movie);
    data.mustWatch = data.mustWatch.filter(
      (mId) => mId !== movie.id
    )
    await updateUser(data._id, data)
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromMustWatch}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;