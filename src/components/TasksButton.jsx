import React, { useState } from "react";
import { Button, SafeAreaView, Text, StyleSheet, View } from "react-native";

function TaskButton(props) {
  return (
    <SafeAreaView style={styles.buttonContainer}>
      <Button title="Tasks" onPress={props.tasks} />
      <Button title="In Progress" onPress={props.progress} />
      <Button title="Complete" onPress={props.complete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "blue",
    borderWidth: 2,
  },
});

export default TaskButton;
