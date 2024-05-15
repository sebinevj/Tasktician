const express = require('express');
const router = express.Router();
router.use(express.json());

const TimerDAO = require('../db/TimerDAO');

const {TokenMiddleware} = require('../middleware/TokenMiddleware');

// Create a new timer.
router.post('/:userID', TokenMiddleware, (req, res) => {
    const userID = parseInt(req.params.userID);
    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {
        return res.status(400).json({ error: 'Both start and end time are required fields.' });
    }
    
    TimerDAO.createTimer(userID, start_time, end_time).then(timer => {
        console.log('Timer created:', timer);
        res.status(201).json({ timer });
    }).catch(err => {
        console.error('Error creating timer:', err);
        res.status(500).json({ error: 'Failed to create timer.' });
    });
});

// Get the timers for a specific user.
router.get('/:userID', TokenMiddleware, (req, res) => {
    const userID = parseInt(req.params.userID);

    TimerDAO.getTimersByUserId(userID).then(timers => {
        if (timers.length === 0) {
            return res.status(404).json({ error: 'Timers not found for the specified user.' });
        }
        res.json({ timers });
    }).catch(err => {
        console.error('Error retrieving timers:', err);
        res.status(500).json({ error: 'Failed to retrieve timers.' });
    });
});

// // Get a specific timer.
// router.get('/:timerID', TokenMiddleware, (req, res) => {
//     const timerID = parseInt(req.params.timerID);
//     const timer = timers.find(timer => timer.timerID === timerID);

//     if (!timer) return res.status(404).json({ error: 'Timer not found.' });

//     res.json(timer);
// });

module.exports = router;