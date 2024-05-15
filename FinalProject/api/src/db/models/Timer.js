module.exports = class Timer {
    timer_id = null;
    user_id = null;
    start_time = null;
    end_time = null;

    constructor(data) {
        this.timer_id = data.timer_id;
        this.user_id = data.user_id;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
    }

    toJSON() {
        return {
            timer_id: this.timer_id,
            user_id: this.user_id,
            start_time: this.start_time,
            end_time: this.end_time
        }
    }
}