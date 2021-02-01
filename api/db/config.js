const mongoose = require("mongoose");
require("dotenv").config();

const hostDB = process.env.DATABASE_HOST;
const portDB = process.env.DATABASE_PORT;
const nameDB = process.env.DATABASE_NAME;
const userDB = process.env.DATABASE_USERNAME;
const passDB = process.env.DATABASE_PASSWORD;

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb://${userDB}:${passDB}@${hostDB}:${portDB}/${nameDB}?authSource=admin`,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    );
    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect database");
  }
};

module.exports = {
  dbConnection,
};
