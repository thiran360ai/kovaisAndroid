import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';

const TaskModule = () => {
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Clean reception area', employee: 'John Doe', status: 'Pending' },
    { id: '2', description: 'Prepare room 101', employee: 'Jane Smith', status: 'Pending' },
    { id: '3', description: 'Sanitize spa equipment', employee: 'Emily Davis', status: 'Completed' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskEmployee, setNewTaskEmployee] = useState('');

  // Function to add a new task
  const addTask = () => {
    if (newTaskDescription.trim() === '' || newTaskEmployee.trim() === '') {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    const newTask = {
      id: (tasks.length + 1).toString(),
      description: newTaskDescription,
      employee: newTaskEmployee,
      status: 'Pending',
    };
    setTasks([...tasks, newTask]);
    setModalVisible(false);
    setNewTaskDescription('');
    setNewTaskEmployee('');
    Alert.alert('Success', 'Task added successfully!');
  };

  const updateTaskStatus = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: status === 'Pending' ? 'Completed' : 'Verified' } : task
    );
    setTasks(updatedTasks);
    Alert.alert('Success', `Task marked as ${status === 'Pending' ? 'Completed' : 'Verified'}.`);
  };

  const renderTask = ({ item }) => (
    <View style={[styles.taskCard, item.status === 'Completed' && styles.completedCard]}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.employeeName}>Assigned to: {item.employee}</Text>
        <Text style={styles.taskStatus}>Status: {item.status}</Text>
      </View>
      <View style={styles.actionButtons}>
        {item.status === 'Pending' && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => updateTaskStatus(item.id, 'Pending')}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
        {item.status === 'Completed' && (
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={() => updateTaskStatus(item.id, 'Completed')}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
      />

      {/* FAB Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal for creating a new task */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Task</Text>

            <TextInput
              style={styles.input}
              placeholder="Task Description"
              placeholderTextColor='#bbb'
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Assign to Employee"
              placeholderTextColor='#bbb'
              value={newTaskEmployee}
              onChangeText={setNewTaskEmployee}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={addTask}
              >
                <Text style={styles.buttonText}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  taskList: {
    paddingBottom: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedCard: {
    backgroundColor: '#e6f9e6',
  },
  taskInfo: {
    flex: 1,
  },
  taskDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  employeeName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 14,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  verifyButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#4caf50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000',
    marginBottom: 16,
  },
  input: {
    height: 40,
    color:'#000',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
});

export default TaskModule;
