const express = require("express");
const taskRoute = require("../controllers/taskController");
const router = express.Router();

router.route("/").get(taskRoute.getTasks).post(taskRoute.postTasks);

router.route("/:id").get(taskRoute.getTask).delete(taskRoute.deleteTask);

module.exports = router;
