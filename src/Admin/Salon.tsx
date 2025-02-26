import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SalonAdminPage = () => {
  const [contacts, setContacts] = useState([]);
  const totalOrders = contacts.length;
  const pendingOrders = contacts.filter((order) => order.payment_status === 'pending').length;
  const paidOrders = contacts.filter((order) => order.payment_status === 'paid').length;
  const completedOrders = contacts.filter((order) => order.payment_status === 'Completed').length;
  const totalRevenue = parseFloat(contacts.reduce((acc, order) => acc + order.amount, 0));
 const [loading,setLoading] =useState(true);
   useEffect(() => {

       const fetchData = async () => {
         try {
           const response = await fetch('https://262c-59-97-51-97.ngrok-free.app/kovais/get/saloon/orders/');
           if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
           }
           const data = await response.json();
           setContacts(data);
           console.log(contacts,"from saloon page");
           
           
         } catch (error) {
           Alert.alert('Error', 'Failed to fetch data. Please try again.');
           console.error(error);
         }finally{
           setLoading(false);
           console.log(contacts,"from saloon page");
           
         }
       };
       fetchData();
     }, []);

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
                  : order.payment_status === 'paid'
                  ? styles.paidOrder
                  : styles.pendingOrder,
              ]}
            >
              <Text style={styles.orderText}>Order #{order.customer_id}</Text>
              <Text style={styles.orderDetails}>Name: {order.Name}</Text>
              <Text style={styles.orderDetails}>Pay: ₹{order.amount}</Text>
              <Text style={styles.orderStatus}>Status: {order.payment_status}</Text>
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

export default SalonAdminPage;
