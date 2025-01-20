import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const GymManagementPage = () => {
  const [members] = useState([
    { id: 1, name: 'John Doe', status: 'active', Purchase: 2000, payment: 'online' },
    { id: 2, name: 'Jane Smith', status: 'inactive', Purchase: 0, payment: 'Cash' },
    { id: 3, name: 'Alex Johnson', status: 'active', Purchase: 1500, payment: 'Cash' },
    { id: 4, name: 'Emily Davis', status: 'inactive', Purchase: 0, payment: 'online' },
    { id: 5, name: 'Chris Lee', status: 'active', Purchase: 3000, payment: 'online' },
    { id: 6, name: 'Sarah Brown', status: 'active', Purchase: 1000, payment: 'Cash' },
    { id: 7, name: 'Viky', status: 'active', Purchase: 2500, payment: 'online' },
    { id: 8, name: 'Muthu', status: 'active', Purchase: 6000, payment: 'Cash' },
  ]);

  const [numColumns, setNumColumns] = useState(2); // Initially 2 columns

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const activeMembers = members.filter((member) => member.status === 'active').length;
    const inactiveMembers = members.filter((member) => member.status === 'inactive').length;
    const productSales = members.reduce((total, member) => total + member.Purchase, 0);
    const totalCashOnline = members
      .filter((member) => member.payment === 'online')
      .reduce((total, member) => total + member.Purchase, 0);
    const totalCashOffline = members
      .filter((member) => member.payment === 'Cash')
      .reduce((total, member) => total + member.Purchase, 0);

    return {
      activeMembers,
      inactiveMembers,
      productSales,
      totalCashOnline,
      totalCashOffline,
    };
  }, [members]);

  const renderHeader = () => (
    <View>
      <View style={styles.summaryContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Members</Text>
          <Text style={styles.cardValue}>{stats.activeMembers}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Inactive Members</Text>
          <Text style={styles.cardValue}>{stats.inactiveMembers}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Product Sales</Text>
          <Text style={styles.cardValue}>₹{stats.productSales}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Online</Text>
          <Text style={styles.cardValue}>₹{stats.totalCashOnline}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cash</Text>
          <Text style={styles.cardValue}>₹{stats.totalCashOffline}</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Members List</Text>
    </View>
  );

  const renderMember = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.memberItem,
        item.status === 'active' ? styles.activeStatus : styles.inactiveStatus,
      ]}
    >
      <Text style={styles.memberName}>{item.name}</Text>
      <Text style={styles.memberPurchase}>Paid: ₹{item.Purchase}</Text>
      <Text style={styles.memberPayment}>Payment: {item.payment}</Text>
      <Text style={styles.memberStatus}>
        {item.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList showsVerticalScrollIndicator={false}
        key={numColumns} // Add key prop based on numColumns
        data={members}
        ListHeaderComponent={renderHeader}
        renderItem={renderMember}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns} // Two columns layout
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  listContainer: {
    paddingBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#495057',
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%', // Ensures each card takes 48% of the width (with spacing in between)
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
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
  memberItem: {
    flex: 1, // Ensures the item takes up equal space for two items per row
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
    marginHorizontal: '1%', // Adds spacing between cards
  },
  activeStatus: {
    backgroundColor: '#d4edda',
  },
  inactiveStatus: {
    backgroundColor: '#f8d7da',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
  },
  memberPurchase: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  memberPayment: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  memberStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#6c757d',
    marginTop: 5,
  },
});

export default GymManagementPage;
