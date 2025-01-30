import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet } from 'react-native';

const Check = () => {
  const [contacts, setContacts] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://33a1-59-97-51-97.ngrok-free.app/app/get/saloon/orders/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data. Please try again.');
        console.error(error);
      }finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContact = ({ item }) => {
    console.log(item,"from Checking Page");
    
    return (
      <View>
        {loading?(<Text>Loading</Text>):(
      <View style={styles.contactItem}>
        {/* Replace "name", "id", etc., with the actual properties of your objects */}
        <Text style={styles.contactText}>Name: {item.username}</Text>
        <Text style={styles.contactText}>username: {item.category}</Text>
        <Text style={styles.contactText}>Order: {item.username}</Text>
      </View>
      )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()} // Adjust the key if `id` is unique
        renderItem={renderContact}
        ListEmptyComponent={<Text>No data available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  contactItem: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Check;
