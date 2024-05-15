const express = require('express');
const router = express.Router();

const crypto = require('crypto');

const UserDAO = require('../db/UserDAO');

const {TokenMiddleware, removeToken, generateToken} = require('../middleware/TokenMiddleware');

router.post('/login', (req, res) => {
    console.log("At login");
    console.log(req.body.username);
    if(req.body.username && req.body.password) {
        UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
            console.log("User", user)
            if (user.code == "401" || user.code == "400") {
                res.json(user);
                return;
            }
            let result = {
                user: user
            }
            generateToken(req, res, user);

            console.log("Token generated");
        
            res.json(result);
        }).catch(err => {
            console.log("Error", err);
            res.json({code: 401, error: "Error with authentication "});
        });
      }
      else {
        res.status(401).json({error: 'Not authenticated'});
        }
})

router.get('/logout', (req, res) => {
    removeToken(req, res);
    res.json({success: true});
});

router.get('/current', TokenMiddleware, (req, res) => {
    if (!req.user.id) {
      res.status(401).json({status: 401, error: req.user});
    }
    res.json(req.user);
});

router.post('/register', (req, res) => {
    console.log('POST request received for /register.');
    console.log("Body", req.body)
    const { userName, email, password, firstName, lastName } = req.body;
    console.log(userName, email, password)

    if (!email || !password || !userName) {
        return res.status(400).json({ error: 'Email, username, and password fields are required.' });
    }
    UserDAO.checkIfDuplicate(userName).then(result => {
        console.log("RES", result)
        if (result.duplicate === "true") {
            console.log("duplicate")
            return res.status(400).json({ error: result.message });
        }
        else {

            console.log("Salt")

            let salt = crypto.randomBytes(64).toString('hex');
            console.log(password)
            console.log(salt)
            crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
                if (err) { //problem computing digest, like hash function not available
                    console.log("Error in pass hash")
                    reject({code: 400, error: "Error: " +err});
                }

                const hashedPassword = derivedKey.toString('hex');
                console.log("hashed", hashedPassword)

                const newUser = {
                    email: email,
                    password: hashedPassword,
                    salt: salt,
                    first_name: firstName,
                    last_name: lastName,
                    username: userName
                };

                UserDAO.insertUser(newUser).then(results => {
                    console.log(results);
                    res.status(201).json({ flag: true, message: 'User account created successfully.', newId: results.insertId })

                }).catch(err => {
                    res.status(401).json({error: err});
                });
            })
        }
    })
    .catch(err => {
        res.status(401).json({error: err});
    });
})

// Retrieve all active users.
router.get('/', TokenMiddleware, (req, res) => {
    UserDAO.getAllUsers().then(users => {
        res.json({users: users});
    }).catch(err => {
        res.status(401).json({error: err});
    });
});

// Retrieve a user by ID.
router.get('/:userID', TokenMiddleware, (req, res) => {
    const userID = parseInt(req.params.userID);
    UserDAO.getUserById(userID).then(user => {
        res.json({user: user});
    }).catch(err => {
        res.status(401).json({error: err});
    });
});

module.exports = router;