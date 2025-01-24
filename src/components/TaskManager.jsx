import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import ToDoItems from './ToDoItems';
import CreateTask from './CreateTask';
import TaskButton from './TasksButton';
import axios from 'axios';
import { getDeviceId } from '../utils/deviceId';

function TaskManager() {
  const renderServer = 'https://todoapp-ec4e.onrender.com/api/tasks';
  const [message, setMessage] = useState('tasks');
  const [task, setTask] = useState([]);
  const [filteredTasks, setFilteredTask] = useState(task);
  const [deviceId, setDeviceId] = useState(null);

  // Initialize device ID
  useEffect(() => {
    const initDeviceId = async () => {
      const id = await getDeviceId();
      console.log('Device ID initialized:', id);
      setDeviceId(id);
    };
    initDeviceId();
  }, []);

  // Handlers

  const tasksHandler = () => {
    console.log(task.map(t => t.status));
    const tasks = task.filter(t => t.status === 'tasks');
    setFilteredTask(tasks);
  };

  const progressHandler = () => {
    console.log(task.map(t => t.status === 'in progress'));
    const inProgressTasks = task.filter(t => t.status === 'in progress');
    setFilteredTask(inProgressTasks);
  };

  const completeHandler = () => {
    const completeTasks = task.filter(t => t.status === 'complete');
    setFilteredTask(completeTasks);
  };

  // GET REQUEST
  useEffect(() => {
    const fetchItem = async () => {
      if (!deviceId) return;
      try {
        console.log('Fetching tasks for device:', deviceId);
        const response = await axios.get(
          `${renderServer}?deviceId=${deviceId}`
        );
        const taskValues = response.data.tasks;
        console.log('Retrieved tasks:', taskValues);
        setTask(taskValues);
      } catch (err) {
        console.log('error receiving data:', err);
      }
    };

    fetchItem();
  }, [deviceId]);

  // POST REQUEST
  const addTaskHandler = async newTask => {
    if (!deviceId) return;
    try {
      console.log('Creating task for device:', deviceId);
      const response = await axios.post(renderServer, {
        task: newTask,
        status: 'tasks',
        deviceId: deviceId,
      });
      console.log('Created task:', response.data);
      // setTask([...task, response.data.newPost]); // Update the state with the new task
    } catch (err) {
      console.log('error posting data:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={message === 'tasks' ? styles.header : ''}>{message}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ToDoItems task={filteredTasks} setTask={setTask} />
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
    marginTop: '15%',
    marginBottom: '15%',
    padding: 0,
    borderColor: 'red',
    alignItems: 'center',
    borderWidth: 2,
  },
  header: {
    color: 'red',
    fontSize: 50,
    textTransform: 'uppercase',
    width: '80%',
    textAlign: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default TaskManager;
