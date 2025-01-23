import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import TaskButton from "./TasksButton";
import CreateTask from "./CreateTask";
import axios from "axios";
// import DeviceInfo from "react-native-device-info";

function ToDoItems({ task, setTask }) {
  const renderServer = "https://todoapp-ec4e.onrender.com/api/tasks";
  
  // Handlers

  const updateTaskStatus = async (taskId, newStatus) => {
    console.log('updateTaskStatus called with:', { taskId, newStatus });
    try {
      console.log('Making PATCH request to:', `${renderServer}/${taskId}`);
      const response = await axios.patch(`${renderServer}/${taskId}`, {
        status: newStatus
      });
      console.log('PATCH response:', response.data);
      
      // Update local state with the updated task
      setTask(prevTasks => {
        console.log('Previous tasks:', prevTasks);
        const updatedTasks = prevTasks.map(task => 
          task._id === taskId ? response.data : task
        );
        console.log('Updated tasks:', updatedTasks);
        return updatedTasks;
      });
    } catch (err) {
      console.log("Error updating task status:", err.message);
      console.log("Full error:", err);
    }
  };
  

  const startButtonHandler = (task) => {
    console.log(task._id);
    updateTaskStatus(task._id, "in progress");
  };
  // Delete request
  const deleteTaskHandler = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://todoapp-ec4e.onrender.com/api/tasks/${id}`
      );
      console.log("Task deleted:", response.data);
      setTask(task.filter((t) => t._id !== id));
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  return (
    <View style={styles.container}>
      {task.map((t, index) => (
        <View key={index} style={styles.tasksContainer}>
          <Text>{t.task}</Text>
          <View style={styles.buttonContainer}>
            <Button title="start" color="green" onPress={() => startButtonHandler(t)} />
            <Button title="update" />
            <Button
              title="delete"
              color="red"
              onPress={() => deleteTaskHandler(t._id)}
            />
          </View>
        </View>
      ))}
    </View>
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
  tasksContainer: {
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    width: "90%",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

// {task.map((t, index) => (
//   <View key={index} style={styles.tasksContainer}>
//     <Text>{t.task}</Text>

export default ToDoItems;
