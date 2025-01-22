const Task = require("../models/taskModel");

exports.getTasks = async (req, res) => {
  try {
    const findTasks = await Task.find();

    res.status(200).json({
      message: "Items found",
      tasks: findTasks,
    });
  } catch (err) {
    res.status(400).json({
      message: "failed",
      err: err,
    });
    console.log(err);
  }
};

exports.postTasks = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);

    res.status(200).json({
      message: "Succesfully posted",
      newPost: newTask,
    });
  } catch (err) {
    res.status(400).json({
      message: "something went wrong",
      error: err,
    });
  }
};

exports.deleteTask = async (req, res) => {
  res.send("working");
};
