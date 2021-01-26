// import mongoose
const mongoose = require("mongoose");

// reference to Schema from mongoose
const Schema = mongoose.Schema;

// creating and defining the schema
const todoSchema = new Schema(
  {
    taskID: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// use the schema to create a model
var Todos = mongoose.model("Todo", todoSchema);

// export the Todos model to use inside other modules(js files)
module.exports = Todos;
