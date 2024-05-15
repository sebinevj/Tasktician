module.exports = class Todo {
    todo_id = null;
    user_id = null;
    todo_text = null;
    created = null;

    constructor(data) {
        this.todo_id = data.todo_id;
        this.user_id = data.user_id;
        this.todo_text = data.todo_text;
        this.created = data.created;
    }

    toJSON() {
        return {
            todo_id: this.todo_id,
            user_id: this.user_id,
            todo_text: this.todo_text,
            created: this.created
        }
    }
}