import movieModel from './movieModel';
import reviewModel from '../reviews/reviewModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getMovie,
    getTopRatedMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getActor,
    getMovieImages,
    getActorImages,
    getMovieRecommendations,
    getMovieActors,
    getActorMovies
} from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    let movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        movie = await getMovie(id)
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
        }
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query; // destructure page and limit and set default values
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    const topRated = await getTopRatedMovies(page);
    res.status(200).json(topRated);
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    const popular = await getPopularMovies(page);
    res.status(200).json(popular);
}));

router.get('/tmdb/now_playing', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    const popular = await getNowPlayingMovies(page);
    res.status(200).json(popular);
}));

// Get movie details
router.get('/actor/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const actor = await getActor(id)
    if (actor) {
        res.status(200).json(actor);
    } else {
        res.status(404).json({ message: 'The actor you requested could not be found.', status_code: 404 });
    }

}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getMovieImages(id)
    res.status(200).json(images);
}));

router.get('/actor/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getActorImages(id)
    res.status(200).json(images);
}));

// Get movie reviews
router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    let reviews = await reviewModel.findByMovieDBId(id);
    if (reviews) {
        res.status(200).json(reviews);
    } else {
        movie = await getMovie(id)
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
        }
    }
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getMovieRecommendations(id)
    res.status(200).json(images);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getMovieActors(id)
    res.status(200).json(images);
}));

// Get movie details
router.get('/actor/:id/movies', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movies = await getActorMovies(id)
    if (movies) {
        res.status(200).json(movies);
    } else {
        res.status(404).json({ message: 'The movies you requested could not be found.', status_code: 404 });
    }

}));

export default router;