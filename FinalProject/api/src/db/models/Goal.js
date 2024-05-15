module.exports = class Goal {
    goal_id = null;
    text = null;

    constructor(data) {
        this.goal_id = data.goal_id;
        this.text = data.text;
    }

    toJSON() {
        return {
            goal_id: this.goal_id,
            text: this.text
        }
    }
}