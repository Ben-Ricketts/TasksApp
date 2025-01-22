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
import DeleteTask from "./DeleteTask";
import axios from "axios";

function ToDoItems({ task }) {
  const returnId = (id) => {
    console.log(id);
  };

  return (
    <View style={styles.container}>
      {task.map((t, index) => (
        <View key={index} style={styles.tasksContainer}>
          <Text>{t.task}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="start"
              color="green"
              onPress={() => returnId(t._id)}
            />
            <Button title="update" />
            <Button title="delete" color="red" />
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

export default ToDoItems;
