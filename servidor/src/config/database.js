const mysql = require('mysql2')
const { promisify } = require('util')

const env = require('dotenv')
env.config()

const database = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
}

const pool = mysql.createPool(database)

pool.getConnection((err, conn) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TOO MANY CONNECTIONS')
    }
    if (err.code === 'ECONREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED')
    }
  }
  if (conn) {
    conn.release()
    console.log('Database connected')
    return
  }
})

pool.query = promisify(pool.query)

module.exports = pool
