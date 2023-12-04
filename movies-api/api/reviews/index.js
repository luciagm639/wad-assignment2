import Review from './reviewModel';
import reviewModel from '../reviews/reviewModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

// Get reviews
router.get('/', asyncHandler(async (req, res) => {
    const id = req.params.id;
    let review = await reviewModel.find();
    if (review) {
        res.status(200).json(review);
    } else {
        review = await getMovie(id)
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ message: 'The reviews you requested could not be found.', status_code: 404 });
        }
    }
}));

// Get review
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    let review = await reviewModel.findByReviewDBId(id);
    if (review) {
        res.status(200).json(review);
    } else {
        res.status(404).json({ message: 'The review you requested could not be found.', status_code: 404 });
    }
}));

// Create review
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.movie || !req.body.content || !req.body.author) {
            return res.status(400).json({ success: false, msg: 'Author, movie and content are required.' });
        }
        // Extract data from the request body
        const { author, content, movie } = req.body;
        const created_at = new Date().toISOString();

        // Create a new review
        const newReview = new Review({ author, content, movie, created_at });

        // Save the review to the database
        await newReview.save();
        res.status(201).json({ success: true, msg: 'Review successfully created.' });
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

export default router;