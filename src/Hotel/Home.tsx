import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-Dimensions.get('window').width));

  const [rooms] = useState([
    { Uid: 1, Name: 'Room 1', Status: 'Booked' },
    { Uid: 2, Name: 'Room 2', Status: 'Available' },
    { Uid: 3, Name: 'Room 3', Status: 'Booked' },
    { Uid: 4, Name: 'Room 4', Status: 'Available' },
    { Uid: 5, Name: 'Room 5', Status: 'Booked' },
  ]);

  const handleLogOutPress = () => {
    Alert.alert('LogOut Successful!');
    navigation.navigate('LoginPage');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(sidebarAnimation, {
      toValue: sidebarVisible ? -Dimensions.get('window').width : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const countBookedRooms = rooms.filter((room) => room.Status === 'Booked').length;
  const countAvailableRooms = rooms.filter((room) => room.Status === 'Available').length;

  const todayRevenue = 1000; // Example static revenue for today
  const totalRevenue = 5000; // Example total revenue

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>HOTEL</Text>
        <TouchableOpacity onPress={toggleSidebar} style={styles.navbarButton}>
          <Text style={styles.hamburgerText}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Booked Rooms</Text>
            <Text style={styles.cardValue}>{countBookedRooms}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Available Rooms</Text>
            <Text style={styles.cardValue}>{countAvailableRooms}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Revenue</Text>
            <Text style={styles.cardValue}>₹{todayRevenue}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Revenue</Text>
            <Text style={styles.cardValue}>₹{totalRevenue}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnimation }]}>
        <View style={styles.employeeInfo}>
          <Image
            source={{ uri: 'https://www.gemoo-resource.com/tools/img/ai_image_portrait_8@2x.png' }}
            style={styles.profilePic}
          />
          <Text style={styles.employeeName}>Jeevitha</Text>
          <Text style={styles.employeeId}>Employee ID: 1047</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BookedRooms')}>
          <Text style={styles.menuText}>Booked Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AvailableRooms')}>
          <Text style={styles.menuText}>Available Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Accommodated Rooms')}>
          <Text style={styles.menuText}>Accomadated Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TodaysRevenue')}>
          <Text style={styles.menuText}>Today's Revenue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BookingHistory')}>
          <Text style={styles.menuText}>Booking History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Attendance')}>
          <Text style={styles.menuText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogOutPress}>
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  navbar: {
    height: 70,
    backgroundColor: '#34495E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left',
  },
  hamburgerText: {
    fontSize: 30,
    color: '#ECF0F1',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '75%',
    height: '100%',
    backgroundColor: '#2C3E50',
    paddingTop: 40,
    paddingHorizontal: 20,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  employeeInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  employeeId: {
    fontSize: 16,
    color: '#BDC3C7',
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
  },
  menuText: {
    fontSize: 18,
    color: '#ECF0F1',
  },
});

export default HomePage;
