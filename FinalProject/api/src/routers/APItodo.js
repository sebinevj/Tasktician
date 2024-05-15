const express = require('express');
const router = express.Router();
router.use(express.json());

const TodoDAO = require('../db/TodoDAO');

const {TokenMiddleware} = require('../middleware/TokenMiddleware');

// Create a new TODO item.
router.post('/:userID', TokenMiddleware, (req, res) => {
    const userID = parseInt(req.params.userID);
    const { text } = req.body;
    const created = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(created)

    if (text) {
        TodoDAO.createTodo(userID, text, created).then(results => {
            console.log("Afftected rows", results.affectedRows)
            if (results.affectedRows != 1) {
                return res.status(500).json({ error: 'Failed to create TODO item.' });
            }
            res.json({ id: results.insertId});
        }).catch(err => {
            console.error('Error creating TODO item:', err);
            res.status(500).json({ error: 'Failed to create TODO item.' });
        });
    } else {
        res.status(400).json({error: 'No TODO text received.'});
    }
});

// Retrieve all TODO components of given user ID.
router.get('/:userID', TokenMiddleware, (req, res) => {
    const userID = parseInt(req.params.userID);

    TodoDAO.getTodosByUserId(userID).then(todos => {
        console.log(todos)
        res.json(todos);
    }).catch(err => {
        console.error('Error getting TODO items:', err);
        res.status(500).json({ error: 'Failed to get TODO items.' });
    });
});


router.delete('/:todoID', TokenMiddleware, (req, res) => {
    const todoID = parseInt(req.params.todoID);
    console.log("IN DELETE")
    TodoDAO.deleteTodo(todoID).then(todo => {
        console.log(todo)
        res.json(todo);
    }).catch(err => {
        console.error('Error getting TODO items:', err);
        res.status(500).json({ error: 'Failed to get TODO items.' });
    });
});

module.exports = router;