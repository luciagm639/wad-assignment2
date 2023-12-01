import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [rateFilter, setRateFilter] = useState("1");
    const [order, setOrder] = useState("2");
    const genreId = Number(genreFilter);

    function sortIfNeccessary(movieList) {
        if (order === 1) {
            return movieList.sort((m1, m2) => { 
                let date1 = new Date(m1.release_date)
                let date2 = new Date(m2.release_date)
                return date1 - date2 
            })
        }
        if (order === 2) {
            return movieList.sort((m1, m2) => { 
                let date1 = new Date(m1.release_date)
                let date2 = new Date(m2.release_date)
                return date2 - date1 
            })
        }
        if (order === 3) {
            return movieList.sort((m1, m2) => {
                if (m1.title < m2.title) {
                    return -1
                }
                if (m1.title > m2.title) {
                    return 1
                }
                return 0
            })
        }
        if (order === 4) {
            return movieList.sort((m1, m2) => {
                if (m1.title > m2.title) {
                    return -1
                }
                if (m1.title < m2.title) {
                    return 1
                }
                return 0
            })
        }
        return movieList
    }


    let displayedMovies = sortIfNeccessary(movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        })
        .filter((m) => {
            return rateFilter <= m.vote_average;
        }));

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        if (type === "genre") setGenreFilter(value);
        if (type === "rate") setRateFilter(value);
        else setOrder(value);
    };

    return (
        <Grid container sx={{ padding: '20px' }}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
        </Grid>
    );
}
export default MovieListPageTemplate;