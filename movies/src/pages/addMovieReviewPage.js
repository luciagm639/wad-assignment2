import React, {useContext} from "react";
import { UserContext } from "../contexts/userContext";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/movies-api";
import Spinner from "../components/spinner";

const WriteReviewPage = (props) => {
  const { token } = useContext(UserContext)
  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery("movie"+movieId, () => getMovie(movieId, token));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;