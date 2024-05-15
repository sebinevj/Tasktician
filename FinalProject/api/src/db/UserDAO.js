const db = require('./DBconnection');

const crypto = require('crypto');

function getUserByCredentials(username, password) {
  return db.query('SELECT * FROM user WHERE username=?', [username]).then(({results}) => {
    console.log("user", results)
      if (results.length > 0) { // we found our user
        const user = results[0];
        return validatePassword(password, user);
      }
      else { // if no user with provided username
        return {code: 401, error: "Invalid username or password"};
      }
    })
}

function validatePassword(password, user) {
  console.log(password)
  console.log(user)
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, user.salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) { //problem computing digest, like hash function not available
        console.log("Error")
        reject({ code: 401, error:"Error"});
      }

      const digest = derivedKey.toString('hex');
      if (user.password == digest) {
        console.log("Good")
        resolve(getFilteredUser(user));
      }
      else {
        reject("Invalid username or password");
      }
    });
  });
}



function checkIfDuplicate(username) {
  console.log("In duplicate", username)
  return db.query('SELECT * FROM user WHERE username=?', [username]).then(({results}) => {
    console.log(results)
    if (results.length > 0) { 
      console.log("duplicate")
      return {duplicate: "true", message: "User with username already exists"};
    }
    else {
      console.log("no duplicate");
      return {duplicate: "false", message: "No user with that username"};
    }
  })
}

function getUserByUsername(username) {
  return db.query('SELECT * FROM user WHERE username=?', [username]).then(({results}) => {
    if (results) { 
      return getFilteredUser(results[0]);
    }
    else {
      return {code: "401", message: "No user with that username"};
    }
  })
}

function getUserById(id) {
  return db.query('SELECT * FROM user WHERE user_id=?', [id]).then(({results}) => {
    if (results) { 
      return getFilteredUser(results[0]);
    }
    else {
      return {code: "401", message: "No user with that id"};
    }
  })
}

function getAllUsers() {
  return db.query('SELECT * FROM user').then(({results}) => {
    console.log(results);
    return results;
  })
}

function insertUser(user) {
  const {email, password, salt, first_name, last_name, username} =  user
  console.log("Insert", user)
  return db.query('INSERT INTO user (`first_name`, `last_name`, `username`, `email`, `password`, `salt`) VALUES (?,?,?,?,?,?)', [first_name, last_name, username, email, password, salt]).then(({results}) => {
    console.log(results);
    return results;
  })
}

function getFilteredUser(user) {
  return {
    id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email
  }
}

module.exports = {
  getUserByCredentials,
  checkIfDuplicate,
  getUserByUsername,
  getUserById, 
  getAllUsers,
  insertUser
};

