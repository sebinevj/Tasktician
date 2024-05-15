const express = require('express');
const router = express.Router();
router.use(express.json());

const TimeblockDAO = require('../db/TimeblockDAO');

const {TokenMiddleware} = require('../middleware/TokenMiddleware');

// Create a new timeblock section on the calendar.
router.post('/:userID', TokenMiddleware, async (req, res) => {
    const userID = parseInt(req.params.userID);
    const { text, startTime, day, startHeight} = req.body;

    /*
    if (!startTime || !endTime) {
        return res.status(400).json({ error: 'The start and end times of your timeblock are required.' });
    }

    // dayID is assigned to be an integer 1-365 based on what day of the year we are on.
    // weekID is calculated based on the dayID.
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayID = Math.floor(diff / oneDay) + 1; // Day of the year (1 to 365 or 366).

    const timeblockData = {
        user_id: userID,
        day_id: dayID,
        week_id: Math.ceil(dayID / 7), // Calculate week ID based on day ID.
        start_time: startTime,
        end_time: endTime
    };
    */

    try {
        const newTimeblock = await TimeblockDAO.createTimeblock({userID, text, startTime, day, startHeight});
        res.json({newTimeblock});
    } catch (err) {
        console.error('Error creating timeblock:', err);
        res.status(500).json({ err: 'Failed to create timeblock.' });
    }
});

// Retrieve all the timeblocks for that day on the calendar.
router.get('/:day/:userID', TokenMiddleware, async  (req, res) => {
    const userID = parseInt(req.params.userID);
    const day = parseInt(req.params.day);

    try {
        const timeblocks = await TimeblockDAO.getTimeblocksByUserId(userID, day);
        console.log("timeblocks api", timeblocks)
        res.json({ timeblocks });
    } catch (err) {
        console.error('Error retrieving timeblocks:', err);
        res.status(500).json({ err: 'Failed to retrieve timeblocks.' });
    }
});

router.delete('/:timeblockID', TokenMiddleware, (req, res) => {
    const timeblockID = parseInt(req.params.timeblockID);
    console.log("IN DELETE TIMEBLOCK")
    TimeblockDAO.deleteTimeblock(timeblockID).then(timeblock => {
        console.log(timeblock)
        res.json(timeblock);
    }).catch(err => {
        console.error('Error getting TODO items:', err);
        res.status(500).json({ error: 'Failed to get TODO items.' });
    });
});


module.exports = router;