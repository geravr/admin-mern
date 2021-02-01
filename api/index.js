const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");

// Create express server
const app = express();

// DataBase
dbConnection();

// Parser body
app.use(express.json());

// Routes
app.use("/api/v1/auth", require("./routes/auth"));

// Listen requests
app.listen(process.env.PORT, () => {
  console.log("Running server");
});
