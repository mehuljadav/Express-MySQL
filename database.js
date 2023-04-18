const mysql = require('mysql2');
require('dotenv').config();

// creating pool instead of mysql.createConnection
// A connection pool is a cache of database connections that can be reused by multiple client requests.
// Rather than creating a new database connection for every request.

const pool = mysql
      .createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
      })
      .promise();

// promise () helps to have a Async code all time in controllers

module.exports = pool;
