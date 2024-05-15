const express = require('express');
const router = express.Router();
router.use(express.json());

const ProgressDAO = require('../db/ProgressDAO');
const GoalDAO = require('../db/GoalDAO');

const {TokenMiddleware} = require('../middleware/TokenMiddleware');

// Get the weekly progress of the user.
router.get('/:userID', TokenMiddleware, async (req, res) => {
    const userId = req.params.userID;

    try {
        const progress = await ProgressDAO.getProgressByUserId(userId);

        if (!progress) {
            let newProgress =  await ProgressDAO.createProgress({user_id:userId, points:0, hours_studied:0, study_goal:0 });
            console.log("New added progress", newProgress); 
            res.json({goals: [], ...newProgress});
        }

        console.log(progress)

        let progressGoals = await GoalDAO.getGoalsByProgressId(progress.progress_id);

        console.log(progressGoals)

        const newProgress = {
            goals: progressGoals,
            ...progress
        }

        console.log(newProgress)

        res.json(newProgress);
    } catch (error) {
        console.error('Error retrieving progress:', error);
        res.status(500).json({ error: 'Failed to retrieve progress.' });
    }
});

//update progress
router.put('/:userID', TokenMiddleware, async (req, res) => {
    const userId = req.params.userID;
    const newStudied = req.body.studied;
    const newStudyGoal = req.body.studyGoal;
    const points = req.body.points;

    try {
        const progress = await ProgressDAO.getProgressByUserId(userId);

        const newProgress = await ProgressDAO.updateProgress(progress.progress_id, {user_id: userId, points, hours_studied: newStudied, study_goal: newStudyGoal})

        res.json(newProgress);
    } catch (error) {
        console.error('Error retrieving progress:', error);
        res.status(500).json({ error: 'Failed to retrieve progress.' });
    }
});

// Create the weekly goals of the user.
router.post('/:userID', TokenMiddleware, async (req, res) => {
    const userID = parseInt(req.params.userID);
    const text = req.body.goal;

    try {

        // Retrieve progress entry for the user.
        const progress = await ProgressDAO.getProgressByUserId(userID);

        if (!progress) {
            return res.status(404).json({ error: 'Weekly progress not found for the specified user.' });
        }

        // Create goals and associate them with the progress.
        const newGoal = await GoalDAO.createGoal({ progress_id: progress.progress_id, text});

        res.json({newGoal});
    } catch (error) {
        console.error('Error creating weekly goals:', error);
        res.status(500).json({ error: 'Failed to create weekly goals.' });
    }
});

// Add goal
router.post('/goals/:userID', TokenMiddleware, async (req, res) => {
    const userID = parseInt(req.params.userID);
    const goal = req.body.text;
    try {
        // Retrieve progress entry for the user.
        const progress = await ProgressDAO.getProgressByUserId(userID);

        if (!progress) {
            return res.status(404).json({ error: 'Weekly progress not found for the specified user.' });
        }

        const newGoal = await GoalDAO.createGoal(progress.progress_id, goal);

        res.json({id:newGoal})
        
    } catch (error) {
        console.error('Error updating weekly goals:', error);
        res.status(500).json({ error: 'Failed to update weekly goals.' });
    }
});

//remove goal
router.delete('/goals/:goalID', TokenMiddleware, async (req, res) => {
    const goalID = parseInt(req.params.goalID);
    GoalDAO.deleteGoal(goalID).then(goal => {
        console.log(goal)
        res.json(goal);
    }).catch(err => {
        console.error('Error getting goal items:', err);
        res.status(500).json({ error: 'Failed to get goal items.' });
    });

})

module.exports = router;