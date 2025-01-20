import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const AdminEmployeeData = ({navigation}) => {
  const [selectedField, setSelectedField] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);

  // Dummy data for employees
  const employees = [
    { id: 1, name: 'Alice', field: 'Salon' },
    { id: 2, name: 'Bob', field: 'Hotel' },
    { id: 3, name: 'Charlie', field: 'Spa' },
    { id: 4, name: 'David', field: 'Gym' },
    { id: 5, name: 'Eve', field: 'Saloon' },
    { id: 6, name: 'Frank', field: 'Hotel' },
    { id: 7, name: 'Grace', field: 'Spa' },
    { id: 8, name: 'Hannah', field: 'Gym' },
  ];

  const fields = [
    { name: 'Saloon', image: 'https://c0.wallpaperflare.com/preview/732/98/492/beauty-salon-hair-dresser-table-furniture.jpg' },
    { name: 'Hotel', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg' },
    { name: 'Spa', image: 'https://img.freepik.com/free-photo/room-with-massage-tables-wall-with-lights-it_188544-36461.jpg' },
    { name: 'Gym', image: 'https://t3.ftcdn.net/jpg/06/08/15/70/360_F_608157087_rBf2VNQ44p6Q1mONjxbZFLQ4HHzdqWrD.jpg' },
  ];

  // Handle field selection
  const handleFieldSelection = (field) => {
    setSelectedField(field);
    const filteredEmployees = employees.filter(
      (employee) => employee.field === field
    );
    setEmployeeList(filteredEmployees);
  };

  const renderEmployeeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EmployeeOrders', { id: item.id, name: item.name })}
    >
      <Text style={styles.employeeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {fields.map((field, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageButton}
            onPress={() => handleFieldSelection(field.name)}
          >
            <ImageBackground
              source={{ uri: field.image }}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <Text style={styles.imageText}>{field.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>

      {selectedField && (
        <View style={styles.employeeContainer}>
          <Text style={styles.subTitle}>
            Employees in {selectedField}:
          </Text>
          {employeeList.length > 0 ? (
            <FlatList
              data={employeeList}
              renderItem={renderEmployeeItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
            />
          ) : (
            <Text style={styles.noEmployeesText}>
              No employees found in this field.
            </Text>
          )}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageButton: {
    width: '48%', // Two items per row
    aspectRatio: 1, // Makes the button square
    marginBottom: 15,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 15,
  },
  imageText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds transparency
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
  employeeContainer: {
    marginTop: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#007BFF', // Accent for cards
  },
  employeeName: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '500',
  },
  noEmployeesText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AdminEmployeeData;
