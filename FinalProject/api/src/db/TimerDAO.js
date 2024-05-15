const db = require('./DBconnection');
const Timer = require('./models/Timer');

// Create a new timer entry.
function createTimer(user_id, start_time, end_time) {
    return db.query('INSERT INTO timer (user_id, start_time, end_time) VALUES (?, ?, ?)', [user_id, start_time, end_time])
        .then((result) => {
            const { insertId } = result;
            return new Timer({ timer_id: insertId, user_id, start_time, end_time });
        });
}

// Get timers for a specific user.
function getTimersByUserId(userId) {
    return db.query('SELECT * FROM timer WHERE user_id = ? ORDER BY start_time DESC LIMIT 5', [userId])
        .then(({ results }) => {
            const timers = results.map((data) => new Timer(data));
            return timers;
        });
}

// Update an existing timer entry.
function updateTimer(timerId, timerData) {
    const { start_time, end_time } = timerData;
    return db.query('UPDATE timer SET start_time = ?, end_time = ? WHERE timer_id = ?', [start_time, end_time, timerId])
        .then(() => {
            return new Timer({ timer_id: timerId, user_id: timerData.user_id, start_time, end_time });
        });
}

// Delete a timer entry by its ID.
function deleteTimer(timerId) {
    return db.query('DELETE FROM timer WHERE timer_id = ?', [timerId]);
}

module.exports = {
    createTimer: createTimer,
    getTimersByUserId: getTimersByUserId,
    updateTimer: updateTimer,
    deleteTimer: deleteTimer
};