module.exports = class Timeblock {
    timeblock_id = null;
    user_id = null;
    day_id = null;
    week_id = null;
    start_time = null;
    end_time = null;

    constructor(data) {
        this.timeblock_id = data.timeblock_id;
        this.user_id = data.user_id;
        this.day_id = data.day_id;
        this.week_id = data.week_id;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
    }

    toJSON() {
        return {
            timeblock_id: this.timeblock_id,
            user_id: this.user_id,
            day_id: this.day_id,
            week_id: this.week_id,
            start_time: this.start_time,
            end_time: this.end_time
        }
    }
}