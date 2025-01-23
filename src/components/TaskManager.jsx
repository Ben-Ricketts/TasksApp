import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import ToDoItems from "./ToDoItems";
import CreateTask from "./CreateTask";
import TaskButton from "./TasksButton";
import axios from "axios";

function TaskManager() {
  const renderServer = "https://todoapp-ec4e.onrender.com/api/tasks";
  const [message, setMessage] = useState("tasks");
  const [task, setTask] = useState([]);

  const progressHandler = () => {
    setMessage("in progress");
  };

  const completeHandler = () => {
    setMessage("completed");
  };

  // GET REQUEST
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(renderServer);
        const taskValues = response.data.tasks;
        setTask(taskValues);
      } catch (err) {
        console.log("error receiving data:", err);
      }
    };

    fetchItem();
  }, []);

  // POST REQUEST
  const addTaskHandler = async (newTask) => {
    try {
      const response = await axios.post(renderServer, {
        task: newTask,
      });
      setTask([...task, response.data.newPost]); // Update the state with the new task
    } catch (err) {
      console.log("error posting data:", err);
    }
  };

  const tasksHandler = () => {
    console.log(task);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={message === "tasks" ? styles.header : ""}>{message}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ToDoItems task={task} setTask={setTask} />
      </ScrollView>
      <View>
        <CreateTask addTaskHandler={addTaskHandler} />
        <TaskButton
          tasks={tasksHandler}
          progress={progressHandler}
          complete={completeHandler}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "15%",
    marginBottom: "15%",
    padding: 0,
    borderColor: "red",
    alignItems: "center",
    borderWidth: 2,
  },
  header: {
    color: "red",
    fontSize: 50,
    textTransform: "uppercase",
    width: "80%",
    textAlign: "center",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default TaskManager;
