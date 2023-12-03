export const getMovies = (page = 1, token) => {

    return fetch(
        `http://localhost:8080/api/movies?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getUpcomingMovies = (page = 1, token) => {

    return fetch(
        `http://localhost:8080/api/movies/tmdb/upcoming?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = (token) => {

    return fetch(
        `http://localhost:8080/api/movies/tmdb/genres`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovie = (id, token) => {

    return fetch(
        `http://localhost:8080/api/movies/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getTopRatedMovies = (page, token) => {

    return fetch(
        `http://localhost:8080/api/movies/tmdb/top_rated?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPopularMovies = (page, token) => {

    return fetch(
        `http://localhost:8080/api/movies/tmdb/popular?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getNowPlayingMovies = (page, token) => {

    return fetch(
        `http://localhost:8080/api/movies/tmdb/now_playing?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getActor = (id, token) => {

    return fetch(
        `http://localhost:8080/api/movies/actor/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = (id, token) => {

    return fetch(
        `http://localhost:8080/api/movies/${id}/images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getActorImages = (id, token) => {

    return fetch(
        `http://localhost:8080/api/movies/actor/${id}/images`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = (id, token) => {

    return fetch(
        `http://localhost:8080/api/movies/${id}/reviews`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieRecommendations = (id, token) => {

    return fetch(
        `http://localhost:8080/api/movies/${id}/recommendations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};