const db = require('./DBconnection');
const Goal = require('./models/Goal');

// Create a new goal.
function createGoal(progressId, text) {
    return db.query('INSERT INTO goal (text) VALUES (?)', [text])
        .then(({results}) => {
            console.log("Insert into goal", results)
            const goal_id = results.insertId;
            return db.query('INSERT INTO progress_goal (progress_id, goal_id) VALUES (?, ?)', [progressId, goal_id])
                .then(({results}) => {
                    console.log("Insert into progress_goal", results);
                    return goal_id;
                })
        });
}

// Get a goal by its ID.
function getGoalById(goalId) {
    return db.query('SELECT * FROM goal WHERE goal_id = ?', [goalId])
        .then(({ results }) => {
            if (results.length === 0) throw new Error('Goal not found');
            return new Goal(results[0]);
        });
}

// Update an existing goal.
function updateGoal(goalId, goalData) {
    const { progress_id, text } = goalData;
    return db.query('UPDATE goal SET progress_id = ?, text = ? WHERE goal_id = ?', [progress_id, text, goalId])
        .then(() => {
            return new Goal({ goal_id: goalId, progress_id, text });
        });
}

function getGoalsByProgressId(progressId) {
    return db.query('SELECT goal.goal_id, goal.text FROM goal JOIN progress_goal ON goal.goal_id = progress_goal.goal_id JOIN progress ON progress.progress_id = progress_goal.progress_id WHERE progress.progress_id = ?;', [progressId])
    .then(({results}) => {
        console.log("Result", results)
        const goalList = results.map(goal => {
            console.log(goal)
            return new Goal({ goal_id: goal.goal_id, text: goal.text })
        })
        
        return goalList;
    });
}

// Delete a goal by its ID.
function deleteGoal(goalId) {
    return db.query('DELETE FROM progress_goal WHERE goal_id = ?', [goalId]).then(() => {
        return db.query('DELETE FROM goal WHERE goal_id = ?', [goalId]).then(({results}) => {
            console.log("DELETE", results);
            return results;
        });
    });
}

module.exports = {
    createGoal: createGoal,
    getGoalById: getGoalById,
    updateGoal: updateGoal,
    deleteGoal: deleteGoal,
    getGoalsByProgressId: getGoalsByProgressId
};