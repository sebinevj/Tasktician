const db = require('./DBconnection');
const Timeblock = require('./models/Timeblock');

// Create a new time block
function createTimeblock(timeblockData) {
    const { userID, text, startTime, day, startHeight} = timeblockData;
    console.log("IN create", userID, text, startTime, day, startHeight)
    return db.query('INSERT INTO timeblock (block_text, day, start_height, user_id, start_time) VALUES (?, ?, ?, ?, ?)', [text, day, startHeight, userID, startTime])
        .then(({results}) => {
            console.log(results)
            return results.insertId;
        });
}

// Get time blocks for a specific user and day.
function getTimeblocksByUserId(userId, day) {
    return db.query('SELECT * FROM timeblock WHERE user_id = ? AND day = ?', [userId, day])
        .then(({ results }) => {
            console.log(results)
            return results;
        });
}

// Update an existing time block.
function updateTimeblock(timeblockId, timeblockData) {
    const { day_id, week_id, start_time, end_time } = timeblockData;
    return db.query('UPDATE timeblock SET day_id = ?, week_id = ?, start_time = ?, end_time = ? WHERE timeblock_id = ?', [day_id, week_id, start_time, end_time, timeblockId])
        .then(() => {
            return new Timeblock({ timeblock_id: timeblockId, user_id: timeblockData.user_id, day_id, week_id, start_time, end_time });
        });
}

// Delete a time block by its ID.
function deleteTimeblock(timeblockId) {
    return db.query('DELETE FROM timeblock WHERE timeblock_id = ?', [timeblockId]);
}

module.exports = {
    createTimeblock: createTimeblock,
    getTimeblocksByUserId: getTimeblocksByUserId,
    updateTimeblock: updateTimeblock,
    deleteTimeblock: deleteTimeblock
};