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

export async function getNotes() {
      const [rows] = await pool.query('SELECT * FROM notes');
      return rows;
}

export async function getNote(id) {
      const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
      return rows[0];
}

export async function createNote(title, contents) {
      const [result] = await pool.query(
            `INSERT INTO notes (title, contents) VALUES (?, ?)`,
            [title, contents]
      );
      const id = result.insertId;
      return getNote(id);
}

export async function deleteNoteById(id) {
      const [result] = await pool.query('DELETE FROM notes WHERE id = ?', [id]);
      return result.affectedRows > 0;
}

module.exports = pool;
