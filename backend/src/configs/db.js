const mongoose = require("mongoose");
const { DB_URL } = require("../secrect");

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database is connected....");

    // checking databse connectin error
    mongoose.connection.on("error", (error) => {
      console.log("database connection error", error);
    });
  } catch (error) {
    console.log("database is not connected....");
  }
};

module.exports = dbConnection;
