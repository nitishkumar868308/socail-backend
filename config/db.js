const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err.message);
    process.exit(1);
  }
  console.log("MySQL connected");
});

module.exports = db;
