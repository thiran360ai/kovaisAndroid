import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const HistoryScreen = () => {
  const [contacts, setContacts] = useState([
    { Uid: 1, Name: 'Vikraam', TimeSlot: 1,service: "Shaving",payment: "Online", Status: 'Completed', Amount: 2000 },
    { Uid: 2, Name: 'Gokul', TimeSlot: 9,service: "Shaving",payment: "Cash", Status: 'Completed', Amount: 1000 },
    { Uid: 3, Name: 'Raja', TimeSlot: 10,service: "Shaving",payment: "Online", Status: 'Completed', Amount: 1500 },
    { Uid: 4, Name: 'Rani', TimeSlot: 11,service: "Shaving",payment: "Cash", Status: 'Completed', Amount: 3000 },
    { Uid: 5, Name: 'Gokul', TimeSlot: 12,service: "Shaving",payment: "Online", Status: 'Completed', Amount: 1000 },
    { Uid: 6, Name: 'Raja', TimeSlot: 2,service: "Shaving",payment: "Cash", Status: 'Completed', Amount: 1500 },
    { Uid: 7, Name: 'Rani', TimeSlot: 4,service: "Shaving",payment: "Online", Status: 'Completed', Amount: 3000 },
  ]);

  // Calculate total amount collected
  const totalAmount = contacts.reduce((sum, item) => sum + item.Amount, 0);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Customer Details</Text> */}
      {contacts.length === 0 ? (
        <Text style={styles.emptyText}>No completed orders found.</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.Uid.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardTitle}>{item.Name}</Text>
              <Text style={styles.cardText}>Time Slot: {item.TimeSlot}</Text>
              <Text style={styles.cardText}>Service: {item.service}</Text>
              <Text style={styles.cardText}>Payment: {item.payment}</Text>
              <Text style={styles.cardText}>Status: {item.Status}</Text>
              <Text style={styles.cardAmount}>Amount: ₹{item.Amount}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Display Total Amount Collected at the bottom */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount Collected:</Text>
        <Text style={styles.totalAmount}>₹{totalAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333333',
  },
  cardText: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 6,
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F8A70', // A color for amounts that looks fresh
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E03C31', // Highlighted red color for total amount
    marginTop: 10,
  },
});

export default HistoryScreen;
