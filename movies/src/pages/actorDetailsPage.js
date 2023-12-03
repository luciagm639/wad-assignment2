import React, {useContext} from "react";
import { UserContext } from '../contexts/userContext'
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorDetails/";
import TemplateActorPage from "../components/templateActorPage";
import { getActor } from '../api/movies-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const ActorPage = (props) => {
  const { token } = useContext(UserContext)
  const { id } = useParams();
  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor"+id],
    () => getActor(id, token)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <TemplateActorPage actor={actor} title={actor.name}>
            <ActorDetails actor={actor} />
          </TemplateActorPage>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorPage;