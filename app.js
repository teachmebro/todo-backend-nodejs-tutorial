// import express
const express = require("express");
//import mongoose
const mongoose = require("mongoose");
// import dotenv
const dotenv = require("dotenv");
const cors = require("cors");

// routers
const todoRouter = require("./routes/todoRoutes");

// load environment variable
dotenv.config({ path: ".env" });

// read env variable using process.env.<your_env_variable_name>
const PORT = process.env.PORT;
const dbURI = process.env.DATABASE_URL;

// making connection object
const connect = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connecting with database
connect.then(
  (db) => {
    console.log("Connected Successfully to Mongodb Server");
  },
  (err) => {
    console.log(err);
  }
);

// initialize express app
const app = express();

app.use(cors());
app.use(express.json()); // parse JSON data into JS object
app.use(express.urlencoded({ extended: false })); //allows you to accept form submitted data

// sending a hello response on visiting http://localhost:3000/
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hi I am Server", data: "no data on this endpoint" });
});

app.use("/todos", todoRouter);

// listening for any HTTP requests on PORT 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
