const db = require('./DBconnection');
const Todo = require('./models/Todo');

// Create a new TODO item.
function createTodo(user_id, text, created) {
    return db.query('INSERT INTO todo (user_id, todo_text, created) VALUES (?, ?, ?)', [user_id, text, created])
        .then(({results}) => {
            console.log("Create Todo", results)
            return results;
            //return new Todo({ todo_id: results.todo_id, user_id: results.user_id, tudo_text:results.tudo_text, created: results.created });
        });
}

// Get TODO items for a specific user.
function getTodosByUserId(userId) {
    return db.query('SELECT * FROM todo WHERE user_id = ?', [userId])
        .then(({ results }) => {
            console.log("Get todos", results)
            const todos = results.map((data) => new Todo(data));
            return todos;
        });
}

// Update an existing TODO item.
function updateTodo(todoId, todoData) {
    const { text, created } = todoData;
    return db.query('UPDATE todo SET todo_text = ?, created = ? WHERE todo_id = ?', [text, created, todoId])
        .then(({ results }) => {
            return new Todo({ todo_id, user_id, todo_text, created });
        });
}

// Delete a TODO item by its ID.
function deleteTodo(todoId) {
    console.log("In delete todo");
    return db.query('DELETE FROM todo WHERE todo_id = ?', [todoId])
    .then(({results}) => {
        console.log("DELETE", results);
        return results;
    });
}

module.exports = {
    createTodo: createTodo,
    getTodosByUserId: getTodosByUserId,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
};