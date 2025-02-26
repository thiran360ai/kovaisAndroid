import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

const AccommodatedRoomsScreen = ({ route }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://f1e9-59-97-51-97.ngrok-free.app/kovais/filter_hotel_order_by_status/?status=Checked In');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheckout = async (roomId, customerId, orderId) => {
    Alert.alert(
      'Checkout Confirmation',
      `Are you sure you want to checkout room number ${roomId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await fetch(`https://f1e9-59-97-51-97.ngrok-free.app/kovais/hotel/update/?status=checked_out`, {
                method: 'PUT',  // Change this to 'POST' if your API requires it
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Checked Out' }),
              });
  
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
  
              // Remove the checked-out room from the state
              setRooms((prevRooms) => prevRooms.filter(room => room.roomNumber !== roomId));
              Alert.alert('Success', `Room ${roomId} has been checked out.`);
            } catch (error) {
              Alert.alert('Error', 'Failed to checkout. Please try again.');
              console.error(error);
            }
          },
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
     <FlatList
  data={rooms}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.roomCard}>
      <Text style={styles.roomNumber}>Room Number: {item.roomNumber}</Text>
      <Text style={styles.roomType}>Room Type: {item.category}</Text>
      <Text style={styles.customerName}>Customer: {item.customer}</Text>
      <Text style={styles.checkoutTime}>Checkout Time: {item.checkoutTime}</Text>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => handleCheckout(item.roomNumber, item.customer_id, item.id)}
      >
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  )}
/>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  roomCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  roomNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#34495e',
  },
  roomType: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#7f8c8d',
  },
  customerName: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 5,
  },
  checkoutTime: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccommodatedRoomsScreen;
