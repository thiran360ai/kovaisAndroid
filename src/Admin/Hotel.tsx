import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const HotelAdminPage = () => {
  // Array with room details including type, status, and price
  const rooms = [
    { id: 1, type: 'Single', status: 'Booked', price: 2000 },
    { id: 2, type: 'Double', status: 'Available', price: 3000 },
    { id: 3, type: 'Single', status: 'Booked', price: 2000 },
    { id: 4, type: 'Double', status: 'Available', price: 3000 },
    { id: 5, type: 'Single', status: 'Booked', price: 2000 },
    { id: 6, type: 'Double', status: 'Available', price: 3000 },
    { id: 7, type: 'Single', status: 'Available', price: 2000 },
    { id: 8, type: 'Double', status: 'Available', price: 3000 },
    { id: 9, type: 'Single', status: 'Booked', price: 2000 },
    { id: 10, type: 'Double', status: 'Booked', price: 3000 },
  ];

  const totalRooms = rooms.length;
  const bookedRooms = rooms.filter((room) => room.status === 'Booked');
  const availableRooms = totalRooms - bookedRooms.length;
  const totalCashCollected = bookedRooms.reduce((total, room) => total + room.price, 0); // Sum up the prices of booked rooms

  return (
    <View style={styles.container}>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Rooms</Text>
          <Text style={styles.cardValue}>{totalRooms}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rooms Booked</Text>
          <Text style={styles.cardValue}>{bookedRooms.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Available Rooms</Text>
          <Text style={styles.cardValue}>{availableRooms}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cash Collected</Text>
          <Text style={styles.cardValue}>₹{totalCashCollected}</Text>
        </View>
      </View>

      {/* Action Button */}
      {/* <TouchableOpacity
        style={styles.manageButton}
        onPress={() => alert('Manage Rooms')}
      >
        <Text style={styles.buttonText}>Manage Rooms</Text>
      </TouchableOpacity> */}
      <Text style={styles.Title}>Manage Rooms</Text>
      {/* Scrollable Room List */}
      <ScrollView contentContainerStyle={styles.roomList} showsVerticalScrollIndicator={false}>
        {rooms.map((room) => (
          <View
            key={room.id}
            style={[
              styles.roomItem,
              room.status === 'Booked' && styles.bookedRoom,
            ]}
          >
            <Text style={styles.roomText}>Room {room.id}</Text>
            <Text style={styles.roomType}>Type: {room.type}</Text>
            <Text style={styles.roomPrice}>Price: ₹{room.price}</Text>
            <Text style={styles.roomStatus}>
              {room.status === 'Booked' ? '🔴 Booked' : '🟢 Available'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom:10,
  },
  manageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roomItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
  },
  bookedRoom: {
    backgroundColor: '#ffc107',
  },
  roomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
  },
  roomType: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  roomPrice: {
    fontSize: 14,
    color: '#28a745',
    marginTop: 5,
  },
  roomStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#495057',
  },
});

export default HotelAdminPage;
