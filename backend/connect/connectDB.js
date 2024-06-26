const { Client } = require("pg");
require("dotenv").config();

const USER = process.env.USER;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;

function connectDB() {
  const client = new Client({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();

  client.query(
    `
  CREATE TABLE IF NOT EXISTS white_list (
    id SERIAL PRIMARY KEY,
    address VARCHAR(42) NOT NULL,
    added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  )
`,
    (err, res) => {
      if (err) {
        console.error("Error creating table", err);
      } else {
        console.log("Table created or already exists");
      }
    }
  );
  return client;
}

module.exports = connectDB;
