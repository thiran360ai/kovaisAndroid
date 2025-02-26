import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, Button } from 'react-native';

const AdminPanel = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://f1e9-59-97-51-97.ngrok-free.app/kovais/total-employees/';

  // Fetch employee data
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      console.log(data);
      
      // Update the employees state
      setEmployees(data || []); // Assuming `data.users` contains the employee array
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees by search query
  const filteredEmployees = employees.filter(employee =>
    employee.username?.toLowerCase().includes(search.toLowerCase()) ||
    employee.role?.toLowerCase().includes(search.toLowerCase()) ||
    employee.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Save employee (Add or Edit)
  const handleSaveEmployee = async () => {
    if (!currentEmployee.username.trim() || !currentEmployee.email.trim()) {
      Alert.alert('Error', 'Username and Email are required.');
      return;
    }

    if (currentEmployee.id) {
      // Update employee
      try {
        const response = await fetch(
          `https://f1e9-59-97-51-97.ngrok-free.app/kovais/update-employee/?employee_id=${currentEmployee.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentEmployee),
          }
        );

        if (response.ok) {
          setEmployees(prev =>
            prev.map(emp => (emp.id === currentEmployee.id ? currentEmployee : emp))
          );
          Alert.alert('Success', 'Employee updated successfully!');
        } else {
          const errorMessage = await response.text();
          Alert.alert('Error', `Failed to update: ${errorMessage}`);
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong.');
        console.error('Update Error:', error);
      }
    } else {
      // Create employee
      try {
        const response = await fetch('https://f1e9-59-97-51-97.ngrok-free.app/kovais/create-employee/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentEmployee),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();
        if (data.success) {
          setEmployees([...employees, data.employee]); // Ensure response contains `employee`
          Alert.alert("Success", "Employee Added Successfully");
        } else {
          Alert.alert('Error', 'Failed to add employee.');
        }
      } catch (error) {
        Alert.alert('Error', `Something went wrong: ${error.message}`);
      }
    }

    setModalVisible(false);
    setCurrentEmployee(null);
  };
// Delete employee function
  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Employee',
      'Are you sure you want to delete this employee?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `https://f1e9-59-97-51-97.ngrok-free.app/kovais/delete-employee/?employee_id=${id}`, 
                {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' }
                }
              );
  
              if (response.ok) {
                // Remove the employee from the local state
                setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
              } else {
                Alert.alert('Error', 'Failed to delete the employee. Please try again.');
              }
            } catch (error) {
              Alert.alert('Error', 'Something went wrong. Please check your connection.');
              console.error('Delete Error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  const renderEmployee = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.employeeName}>{item.username}</Text>
      <Text style={styles.employeeDetails}>Email: {item.email}</Text>
      <Text style={styles.employeeDetails}>Role: {item.role}</Text>
      <Text style={styles.employeeDetails}>Mobile: {item.mobile}</Text>
      <Text style={styles.employeeDetails}>Location: {item.location}</Text>
      <Text style={styles.employeeDetails}>First Name: {item.first_name}</Text>
      <Text style={styles.employeeDetails}>Last Name: {item.last_name}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setCurrentEmployee(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Details</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by username, role, or email"
        placeholderTextColor={'#555'}
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployee}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setCurrentEmployee({
            username: '',
            email: '',
            role: '',
            password: '',
            location: '',
            first_name: '',
            last_name: '',
            mobile:'',
          });
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Add Employee</Text>
      </TouchableOpacity>

      {/* Modal for Add/Edit */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentEmployee?.id ? 'Edit Employee' : 'Add Employee'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Username"
              placeholderTextColor={'#555'}
              value={currentEmployee?.username}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, username: text,mobile:'9952977811' })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              placeholderTextColor={'#555'}
              value={currentEmployee?.email}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, email: text })
              }
              keyboardType="email-address"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Role"
              placeholderTextColor={'#555'}
              value={currentEmployee?.role}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, role: text })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              placeholderTextColor={'#555'}
              value={currentEmployee?.password}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, password: text })
              }
              keyboardType="phone-pad"
            />
             <TextInput
              style={styles.modalInput}
              placeholder="Mobile Number"
              placeholderTextColor={'#555'}
              value={currentEmployee?.mobile}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, mobile: text })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Location"
              placeholderTextColor={'#555'}
              value={currentEmployee?.location}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, location: text })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="First Name"
              placeholderTextColor={'#555'}
              value={currentEmployee?.first_name}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, first_name: text })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last Name"
              placeholderTextColor={'#555'}
              value={currentEmployee?.last_name}
              onChangeText={text =>
                setCurrentEmployee({ ...currentEmployee, last_name: text })
              }
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEmployee}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue-gray background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50', // Rich dark gray
    fontFamily: 'Roboto',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#7f8c8d', // Neutral gray
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#ecf0f1', // Soft light gray
    color: '#000', // Black text
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff', // White card background
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#2c3e50', // Dark shadow for depth
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderWidth: 0.5,
    borderColor: '#d6eaf8', // Subtle border
  },
  employeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e', // Dark gray for readability
    marginBottom: 8,
  },
  employeeDetails: {
    fontSize: 15,
    color: '#2c3e50', // Consistent with the card's dark theme
    marginBottom: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#3498db', // Vibrant blue for edit
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Rich red for delete
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
  },
  addButton: {
    backgroundColor: '#27ae60', // Deep green for Add Employee
    paddingVertical: 12, // Reduced padding for compactness
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 15, // Reduced vertical margin
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ffffff', // Clean white modal
    padding: 25,
    borderRadius: 15,
    elevation: 6,
    shadowColor: '#2c3e50', // Dark shadow for modal
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#bdc3c7', // Light gray border
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15, // Adjusted spacing
    backgroundColor: '#ecf0f1', // Subtle light background
    color: '#000', // Black input text
    fontSize: 16,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#1abc9c', // Fresh green for save
    paddingVertical: 14, // Slightly larger for a professional look
    borderRadius: 12, // Smooth corners for modern design
    alignItems: 'center',
    marginTop: 12,
    elevation: 4, // Subtle shadow effect
    shadowColor: '#16a085', // Matching shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c', // Vibrant red for cancel
    paddingVertical: 14, // Slightly larger for consistency
    borderRadius: 12, // Smooth corners for modern design
    alignItems: 'center',
    marginTop: 12,
    elevation: 4, // Subtle shadow effect
    shadowColor: '#c0392b', // Matching shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: '#ffffff', // White text for clarity
    fontWeight: '600', // Semi-bold for better readability
    fontSize: 16,
    textTransform: 'uppercase', // Professional all-caps styling
  },
});

export default AdminPanel;
