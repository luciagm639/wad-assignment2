import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Get user by username
router.get('/:username', async (req, res) => {
    console.log(req.params.username)
    const user = await User.findByUserName(req.params.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'User not found.' });
    }
    res.status(200).json(user);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }

    if (req.query.action === 'register') {
        try {
            await registerUser(req, res);
        } catch (error) {
            // Log the error and return a generic error message
            console.error(error);
            res.status(500).json({ success: false, msg: 'User already created' });
        }
    } else {
        try {
            await authenticateUser(req, res);
        } catch (error) {
            // Log the error and return a generic error message
            console.error(error);
            res.status(500).json({ success: false, msg: 'Internal server error.' });
        }
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

async function registerUser(req, res) {
    // Add input validation logic here

    const validUsn = validateUsername(req.body.username)
    if (!validUsn) {
        res.status(401).json({ success: false, msg: 'Invalid username.' });
    }

    const validPswd = validatePassword(req.body.password)
    if (validPswd) {
        await User.create(req.body);
        res.status(201).json({ success: true, msg: 'User successfully created.' });
    } else {
        res.status(401).json({ success: false, msg: 'Invalid password.' });
    }
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

function validateUsername (username) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(username)
}

function validatePassword (passw) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(passw)
}

export default router;