const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

//require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
const data = fs.readFileSync(path.join(__dirname, "../config/databaseConfig.json"));
const dbConfig = JSON.parse(data);

let connection;

exports.getDatabaseConnection = () => {
    if(!connection) {
        connection = mysql.createPool({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port,
            database: dbConfig.database,
        })
    }
    return connection;
};

exports.query = (query, params = []) => {
  return new Promise((resolve, reject) => {
    if(!connection) {
      connection = exports.getDatabaseConnection();
    }
    connection.query(query, params, (err, results, fields) => {
      if(err) {
        reject(err);
        return;
      }
      resolve({
        results: results,
        fields: fields
      })
    })
  });
};

exports.close = () => {
  if(connection) {
    connection.end();
    connection = null;
  }
};