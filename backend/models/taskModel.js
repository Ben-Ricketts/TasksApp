const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: [true, "please enter a task to complete"],
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
