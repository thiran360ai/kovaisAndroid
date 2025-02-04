import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const EmployeeOrders = ({ route }) => {
  const { id, name } = route.params;

  // Dummy completed orders data
  const completedOrders = [
    { id: 1, order: 'Haircut', customer: 'John Doe', date: '2024-11-01' },
    { id: 2, order: 'Hair Coloring', customer: 'Jane Smith', date: '2024-11-05' },
    { id: 3, order: 'Shampoo and Style', customer: 'Emily Carter', date: '2024-11-10' },
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.order}</Text>
      <Text style={styles.cardText}>Customer: {item.customer}</Text>
      <Text style={styles.cardText}>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Completed Order</Text> */}
      <FlatList
        data={completedOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#edf2f7', // A light, soft background for a clean layout
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5, // Slight spacing for elegance
  },
  listContent: {
    paddingBottom: 20,
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
  gradientCard: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: 'linear-gradient(145deg, #e8f0ff, #dbe5f5)', // Soft gradient effect
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e0',
  },
}); 

export default EmployeeOrders;
