import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

const AccommodatedRoomsScreen = ({ route }) => {
  // Expanded list of accommodated rooms
  const rooms = [
    {
      id: 1,
      roomNumber: '101',
      roomType: 'Deluxe',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvOs4Yh5Wba3yZB7k16XYa66gPswJ9cqVKyZPnWbRYSKmARuj3mRfxWdE_KXEA4cF5hE0&usqp=CAU',
      customer: 'John Doe',
      checkoutTime: '12:00 PM',
    },
    {
      id: 2,
      roomNumber: '102',
      roomType: 'Standard',
      image: 'https://c0.wallpaperflare.com/preview/706/275/827/bedroom-interior-design-style.jpg',
      customer: 'Jane Smith',
      checkoutTime: '11:30 AM',
    },
    {
      id: 3,
      roomNumber: '103',
      roomType: 'Deluxe',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4zV-K0SFG0KflgxEefPFxAx3-ZLMrZh5sLMNWFL1r6w-Xuya8S79zenlhXRKE7Zs6V0&usqp=CAU',
      customer: 'Robert Brown',
      checkoutTime: '01:00 PM',
    },
    {
      id: 4,
      roomNumber: '104',
      roomType: 'Suite',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzXMCaKH0tHp6X7trPVa2utcbnuEzmfCs_5A&s',
      customer: 'Emily Davis',
      checkoutTime: '10:00 AM',
    },
    {
      id: 5,
      roomNumber: '201',
      roomType: 'Standard',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRwmRHdYhxb4Ynm-G_uqchcdVpx32YwNu0OR659u-8VAplZAJEVNR7hJn4YZTKiQ_kJGE&usqp=CAU',
      customer: 'Michael Wilson',
      checkoutTime: '02:30 PM',
    },
    {
      id: 6,
      roomNumber: '202',
      roomType: 'Deluxe',
      image: 'https://e0.pxfuel.com/wallpapers/513/342/desktop-wallpaper-room-hotel-room.jpg',
      customer: 'Laura Taylor',
      checkoutTime: '03:00 PM',
    },
    {
      id: 7,
      roomNumber: '203',
      roomType: 'Suite',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBhBSqkbg-Be2K0htir4tXSP8WSr9V282up9MBKyu29jFrH9X1_EHa3FKkRls6edPERo&usqp=CAU',
      customer: 'Chris Anderson',
      checkoutTime: '11:15 AM',
    },
    {
      id: 8,
      roomNumber: '204',
      roomType: 'Standard',
      image: 'https://c4.wallpaperflare.com/wallpaper/857/660/985/living-room-sofa-carpet-interior-wallpaper-preview.jpg',
      customer: 'Sophia Martinez',
      checkoutTime: '01:45 PM',
    },
  ];

  const handleCheckout = (roomId) => {
    Alert.alert(
      'Checkout Confirmation',
      `Are you sure you want to checkout room number ${roomId}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => console.log(`Checked out room number: ${roomId}`) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Accommodated Rooms</Text> */}
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roomCard}>
            <Text style={styles.roomNumber}>Room Number: {item.roomNumber}</Text>
            <Text style={styles.roomType}>Room Type: {item.roomType}</Text>
            <Image source={{ uri: item.image }} style={styles.roomImage} />
            <Text style={styles.customerName}>Customer: {item.customer}</Text>
            <Text style={styles.checkoutTime}>Checkout Time: {item.checkoutTime}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => handleCheckout(item.roomNumber)}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
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
  roomImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
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