// import uniquid to generate unique ids
const uniquid = require("uniquid");

// import the todo model
const Todos = require("../models/todos");

// get all todos
const getAllTodos = (req, res) => {
  // mongoose find
  Todos.find({})
    .then((todos) => {
      res.status(200); // setting 200 ok  response status
      res.setHeader("Content-Type", "application/json"); // setting header as json
      res.json({ todos: todos }); // sending data to client in JSON
    })
    .catch((err) => {
      res.status(500); // setting 500 internal server error
      res.json({ error: err }); // sending error to client in JSON
    });
};

// create task in todo
const createTodo = (req, res) => {
  const { description } = req.body;

  Todos.create({ taskID: uniquid(), description: description })
    .then((todo) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json({ status: "Todo added successfully", data: todo });
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Invalid Object Property", error: err });
    });
};

// get a single todo task
const getTodoById = (req, res) => {
  Todos.findById(req.params.id)
    .then((todo) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(todo);
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "Id did not exists", error: err });
    });
};

// update todo task
const updateTodo = (req, res, next) => {
  Todos.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    { new: true, useFindAndModify: false } //get updated result
  )
    .then((todo) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json(todo);
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "unable to update", error: err });
    });
};

// delete single todo task
const deleteTodo = (req, res, next) => {
  Todos.findByIdAndRemove(req.params.id)
    .then((response) => {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.json({
        status: "Todo deleted successfully",
        response: response,
      });
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "unable to delete", error: err });
    });
};

// export the controllers
module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
