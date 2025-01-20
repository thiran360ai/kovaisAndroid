import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SpaAdminPage = () => {
  const [contacts, setContacts] = useState([
    { Uid: 1, Name: 'Vikraam', TimeSlot: 1, Status: 'Pending', Amount: 2000 },
    { Uid: 2, Name: 'Gokul', TimeSlot: 2, Status: 'Pending', Amount: 1000 },
    { Uid: 3, Name: 'Raja', TimeSlot: 1, Status: 'Paid', Amount: 1500 },
    { Uid: 4, Name: 'Rani', TimeSlot: 1, Status: 'Completed', Amount: 3000 },
    { Uid: 5, Name: 'Raja', TimeSlot: 1, Status: 'Paid', Amount: 1500 },
    { Uid: 6, Name: 'Rani', TimeSlot: 1, Status: 'Completed', Amount: 3000 },
  ]);

  const totalOrders = contacts.length;
  const pendingOrders = contacts.filter((order) => order.Status === 'Pending').length;
  const paidOrders = contacts.filter((order) => order.Status === 'Paid').length;
  const completedOrders = contacts.filter((order) => order.Status === 'Completed').length;
  const totalRevenue = contacts.reduce((acc, order) => acc + order.Amount, 0);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.summaryContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Orders</Text>
            <Text style={styles.cardValue}>{totalOrders}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pending Orders</Text>
            <Text style={styles.cardValue}>{pendingOrders}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Paid Orders</Text>
            <Text style={styles.cardValue}>{paidOrders}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Completed Orders</Text>
            <Text style={styles.cardValue}>{completedOrders}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Revenue</Text>
            <Text style={styles.cardValue}>₹{totalRevenue}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.orderList}>
          {contacts.map((order) => (
            <View
              key={order.Uid}
              style={[
                styles.orderItem,
                order.Status === 'Completed'
                  ? styles.completedOrder
                  : order.Status === 'Paid'
                  ? styles.paidOrder
                  : styles.pendingOrder,
              ]}
            >
              <Text style={styles.orderText}>Order #{order.Uid}</Text>
              <Text style={styles.orderDetails}>Name: {order.Name}</Text>
              <Text style={styles.orderDetails}>Pay: ₹{order.Amount}</Text>
              <Text style={styles.orderStatus}>Status: {order.Status}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5', // Light background
  },
  container: {
    paddingHorizontal: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff', // White card background
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  cardTitle: {
    fontSize: 16,
    color: '#333333', // Dark text
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Orange highlight #ff9800
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  orderList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  orderItem: {
    width: '48%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
    shadowColor: '#aaa',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  completedOrder: {
    backgroundColor: '#c8e6c9', // Soft green for completed
  },
  paidOrder: {
    backgroundColor: '#bbdefb', // Soft blue for paid
  },
  pendingOrder: {
    backgroundColor: '#fff59d', // Soft yellow for pending
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
  orderDetails: {
    fontSize: 14,
    color: '#555555', // Dark gray text
    marginTop: 5,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 5,
  },
});

export default SpaAdminPage;
