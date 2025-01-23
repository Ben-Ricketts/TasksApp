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

exports.getTask = async (req, res) => {
  try {
    const findTask = await Task.findById(req.params.id);
    console.log(req.params.id);
    res.status(200).json({
      message: "Task found",
      Task: findTask,
    });
  } catch (err) {
    res.status(400).json({
      message: "error finding item",
      Error: err,
    });
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
  try {
    const id = req.params.id;
    console.log(id);
    const deleteTask = await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "delete sucessfully",
      result: deleteTask,
    });
  } catch (err) {
    res.status(400).json({
      message: "failed to delete",
      error: err,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, {status}, {new: true})
    if(!updatedTask){
        return res.status(404).json({message: "Task not found"})
    }
    res.status(200).json(updatedTask)
  }catch (err) {
    res.status(400).json({
      message: "failed to update",
      error: err,
    });
  }
}
