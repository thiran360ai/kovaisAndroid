import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,Animated, Dimensions, Alert } from 'react-native';

const AdminDashboard = ({ navigation }) => {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-Dimensions.get('window').width));

  const handleCardPress = (serviceName) => {
    navigation.navigate(serviceName);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(sidebarAnimation, {
      toValue: sidebarVisible ? -Dimensions.get('window').width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleLogOutPress = () => {
    Alert.alert('LogOut Successful!')
    navigation.navigate('LoginPage');
  };

  const handleEmployeeDataPress = () => {
    navigation.navigate('EmployeeData'); // Replace 'EmployeeData' with the correct screen name
  };

  return (
    <View style={styles.container}>

      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Admin</Text>
        <TouchableOpacity onPress={toggleSidebar} style={styles.navbarButton}>
          <Text style={styles.hamburgerText}>≡</Text>
        </TouchableOpacity>
      </View>
      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnimation }]}>
      <View style={styles.employeeInfo}>
          <Image
            source={require('./../images/Kovais-removebg-preview.png')}
            style={styles.profilePic}
          />
          <Text style={styles.employeeName}>Kovies</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('AdminEmployeeData')}>
          <Text style={styles.menuText}>Service Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('TaskModule')}>
          <Text style={styles.menuText}>Task Module</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleLogOutPress()}>
          <Text style={styles.menuText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>


      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.servicesContainer}>
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => handleCardPress('Hotel')}
          >
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JdR16tirislPeE2_-POpojAc1GeTaxZtXA&s',
              }}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceName}>Hotel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => handleCardPress('Salon')}
          >
            <Image
              source={{
                uri: 'https://imgmedia.lbb.in/media/2023/08/64e4591aa468d12ae074c586_1692686618876.jpg',
              }}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceName}>Saloon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => handleCardPress('Spa')}
          >
            <Image
              source={{
                uri: 'https://c4.wallpaperflare.com/wallpaper/61/8/941/women-mood-brunette-candle-wallpaper-preview.jpg',
              }}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceName}>Spa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => handleCardPress('Gym')}
          >
            <Image
              source={{
                uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/09/09/16/women-gym.jpg?width=1200',
              }}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceName}>Gym</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.employeeButton} onPress={handleEmployeeDataPress}>
        <Text style={styles.employeeButtonText}>Employee Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 260,
    backgroundColor: '#FFFFFF',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  navbar: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Spread items across the navbar
    paddingHorizontal: 15, // Spacing on left and right
    borderBottomWidth: 1, // Optional: adds a bottom border
    borderBottomColor: '#E0E0E0', // Color for bottom border
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Color for title
    textAlign: 'left',
    flex: 1, // Push the title to the center
    paddingLeft: 10,
  },
  navbarButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  navbarButtonText: {
    fontSize: 16,
    color: '#007BFF', // Button text color (adjust as needed)
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    alignItems: 'center',
  },
  serviceImage: {
    width: '100%',
    height: 150,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    color: '#343a40',
  },
  employeeButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  employeeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 5,
    right: 20,
    padding: 10,
  },
  hamburgerText: {
    fontSize: 24,
    color: '#333', // Color for hamburger icon
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    elevation: 2,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  employeeInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007BFF', // Accent color
  },
  employeeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
});

export default AdminDashboard;
