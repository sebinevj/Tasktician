const db = require('./DBconnection');
const Progress = require('./models/Progress');

// Create a new progress entry.
function createProgress(progressData) {
    const { user_id, points, hours_studied, study_goal } = progressData;
    return db.query('INSERT INTO progress (user_id, points, hours_studied, study_goal) VALUES (?, ?, ?, ?)', [user_id, points, hours_studied, study_goal])
        .then((result) => {
            const { insertId } = result;
            return new Progress({ progress_id: insertId, user_id, points, hours_studied, study_goal });
        });
}

// Get the progress entry for a specific user.
function getProgressByUserId(userId) {
    return db.query('SELECT * FROM progress WHERE user_id = ? LIMIT 1', [userId])
        .then(({ results }) => {
            if (results.length === 0) {
                return null; // No progress entry found for the user.
            }
            const progressData = results[0];
            return new Progress(progressData);
        });
}

// Update an existing progress entry.
function updateProgress(progressId, progressData) {
    const { points, hours_studied, study_goal } = progressData;
    return db.query('UPDATE progress SET points = ?, hours_studied = ?, study_goal = ? WHERE progress_id = ?', [points, hours_studied, study_goal, progressId])
        .then(() => {
            return new Progress({ progress_id: progressId, user_id: progressData.user_id, points, hours_studied, study_goal });
        });
}

// Delete a progress entry by its ID.
function deleteProgress(progressId) {
    return db.query('DELETE FROM progress WHERE progress_id = ?', [progressId]);
}

module.exports = {
    createProgress: createProgress,
    getProgressByUserId: getProgressByUserId,
    updateProgress: updateProgress,
    deleteProgress: deleteProgress
};