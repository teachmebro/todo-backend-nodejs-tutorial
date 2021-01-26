// import express
const express = require("express");

//controllers
const {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  taskCompletionTime,
} = require("../controllers/todoControllers");

// initialize route using express router
const todoRoute = express.Router();

// define the /todos + / => /todos/ route to get all todos
todoRoute.route("/").get(getAllTodos).post(createTodo); // same route different method chained together
todoRoute.route("/:id").get(getTodoById).put(updateTodo).delete(deleteTodo);

// export the route
module.exports = todoRoute;
