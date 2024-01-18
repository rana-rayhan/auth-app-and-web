require("dotenv").config();

//
// server port and env variable
const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "http://localhost:27017";

const SMTP_USERNAME = process.env.SMTP_NAME;
const SMTP_PASSWORD = process.env.SMTP_PWD;
//
//
// exporting module
module.exports = {
  port,
  DB_URL,
  SMTP_USERNAME,
  SMTP_PASSWORD,
};
