import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from "react-native";

function CreateTask({ addTaskHandler }) {
  const [text, setText] = useState("");

  const handleInputChange = (input) => {
    setText(input);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      addTaskHandler(text);
      setText(""); // Clear the input field after successful submission
    } else {
      Alert.alert("Error", "Task cannot be empty");
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.inputField}
        value={text}
        onChangeText={handleInputChange}
        placeholder="Enter task"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderColor: "green",
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
});

export default CreateTask;
