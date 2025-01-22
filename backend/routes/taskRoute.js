const express = require("express");
const taskRoute = require("../controllers/taskController");
const router = express.Router();

router
  .route("/")
  .get(taskRoute.getTasks)
  .post(taskRoute.postTasks)
  .delete(taskRoute.deleteTask);

module.exports = router;
