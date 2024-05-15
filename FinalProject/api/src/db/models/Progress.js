module.exports = class Progress {
    progress_id = null;
    user_id = null;
    points = null;
    hours_studied = null;
    study_goal = null;

    constructor(data) {
        this.progress_id = data.progress_id;
        this.user_id = data.user_id;
        this.points = data.points;
        this.hours_studied = data.hours_studied;
        this.study_goal = data.study_goal;
    }

    toJSON() {
        return {
            progress_id: this.progress_id,
            user_id: this.user_id,
            points: this.points,
            hours_studied: this.hours_studied,
            study_goal: this.study_goal
        }
    }
};