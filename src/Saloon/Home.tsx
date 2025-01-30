import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Animated, Dimensions, Image, ScrollView, Modal } from 'react-native';
import axios from 'axios';
const ContactList = ({ navigation }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-Dimensions.get('window').width));
  const [activeView, setActiveView] = useState('Total Orders');
  const [selectedForPayment, setSelectedForPayment] = useState(null);
  const [contacts, setContacts] = useState([]);


  const handleCardPress = (serviceName) => {
    navigation.navigate(serviceName);
  };
  const handleLogOutPress = () => {
    Alert.alert('LogOut Successful!')
    navigation.navigate('LoginPage');
  };

  const [loading,setLoading] =useState(true);
   useEffect(() => {

       const fetchData = async () => {
         try {
           const response = await fetch('https://a716-59-97-51-97.ngrok-free.app/app/get/saloon/orders/');
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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(sidebarAnimation, {
      toValue: sidebarVisible ? -Dimensions.get('window').width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCheckIn = () => {
    Alert.alert('Check-In Successful!', 'You have checked in.');
  };
  

  const calculateTotalCash = () => {
    return contacts
      .filter((contact) => contact.payment_status === 'Paid' || contact.payment_status === 'Completed')
      .reduce((total, contact) => total +(parseFloat(contact.amount)||0), 0);
  };
  

  const handleButtonPress = (viewName) => {
    setActiveView(viewName);
  };

  const updateContactStatus = (uid, newStatus, paymentMode = null) => {
    if (newStatus === 'SelectPayment') {
      setSelectedForPayment(uid); // Show payment options
    } else {
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === 1
            ? { ...contact, payment_status: newStatus, payment_type: paymentMode }
            : contact
        )
      );
      setSelectedForPayment(null); // Reset payment selection
    }
  };
  

  const pendingOrders = contacts.filter((contact) => contact.payment_status === 'Pending');
  const paidOrders = contacts.filter((contact) => contact.payment_status === 'Paid');
  const completedOrders = contacts.filter((contact) => contact.payment_status === 'Completed');
  const totalCash = contacts
    .filter((contact) => contact.payment_status === 'Paid' || contact.payment_status === 'Completed')
    .reduce((sum, contact) => sum + contact.amount, 0);
if(contacts.length > 0) {
  console.log(contacts.length);
  


  return (
    <View style={styles.container}>
    
      <View style={styles.navbar}>
      
          <Text style={styles.navbarTitle}>SALOON</Text>

          <TouchableOpacity onPress={toggleSidebar} style={styles.navbarButton}>
          <Text style={styles.hamburgerText}>≡</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.topButton1}>
          <TouchableOpacity onPress={handleCheckIn} style={styles.checkInButton}>
          <Text style={styles.checkInText}>Check-In</Text>
        </TouchableOpacity>
        </View> */}  
        


        <View style={styles.buttonsContainer}>
  <View style={styles.row}>
    <TouchableOpacity
      onPress={() => handleButtonPress('Total Orders')}
      style={styles.actionButton}
    >
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_3JbyZGjlp6ELwPwDppFCYXZVjPVnyyeEQ&s' }}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Total Orders</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleButtonPress('Total Pending')}
      style={styles.actionButton}
    >
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpmIJN6vQN1a9RLBkJRP0LccZoBWJchxwhpA&s' }}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Total Pending</Text>
      
    </TouchableOpacity>
  </View>
  <View style={styles.row}>
    <TouchableOpacity
      onPress={() => handleButtonPress('Total Completed')}
      style={styles.actionButton}
    >
      <Image
        source={{ uri: 'https://media.istockphoto.com/id/1460619599/vector/completed-stamp-vector-round-icon-and-seal-on-a-white-isolated-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=cIhmVxiAecHlVVVtoa23uPgLZRyCkrIWaZEL4uMI-lo=' }}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Total Completed</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleButtonPress('Total Cash Collected')}
      style={styles.actionButton}
    >
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_4vtYXHBl-ub5hdV4gRp-UIWT0uKhUInvZg&s' }}
        style={styles.buttonImage}
      />
      <Text style={styles.buttonText}>Total Cash</Text>
    </TouchableOpacity>
  </View>
</View>



      <ScrollView style={styles.contentContainer}>
        {activeView === 'Total Orders' && (
          <View style={styles.listContainer}>
            {contacts.map((contact) => (
              <View key={contact.id} style={styles.card}>
                <Text style={styles.cardTitle}>name:{contact.username}</Text>
                <Text style={styles.cardText}>Time Slot: {contact.time }</Text>
                <Text style={styles.cardText}>Service: {contact.services}</Text>
                <Text style={styles.cardText}>Status: {contact.payment_status}</Text>
                <Text style={styles.cardText}>Payment: {contact.payment_type}</Text>
                <Text style={styles.cardText}>Amount: ₹{contact.amount}</Text>
                <TouchableOpacity
                  style={[styles.cardButton, { backgroundColor: 'green' }]}
                  onPress={() => {
                    updateContactStatus(contact.id, 'Completed');
                    Alert.alert('Order Completed', `${contact.amount}'s order is marked as completed.`);
                  }}
                >
                  <Text style={styles.cardButtonText}>Complete Order</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

{activeView === 'Total Pending' && (
  <View style={styles.listContainer}>
    {pendingOrders.map((contact) => (
      <View key={contact.id} style={styles.card}>
        <Text style={styles.cardTitle}>username:{contact.username}</Text>
        <Text style={styles.cardText}>Time Slot: {contact.time}</Text>
        <Text style={styles.cardText}>Status: {contact.payment_status}</Text>
        <Text style={styles.cardText}>Service: {contact.services}</Text>
        <Text style={styles.cardText}>Amount: ₹{contact.amount}</Text>

        {selectedForPayment === contact.id ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[styles.cardButton, { backgroundColor: 'green' }]}
              onPress={() => {
                updateContactStatus(contact.Uid, 'Paid', 'Cash');
                Alert.alert('Payment Received', `₹${contact.amount} received in Cash.`);
              }}
            >
              <Text style={styles.cardButtonText}>Cash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardButton, { backgroundColor: 'blue' }]}
              onPress={() => {
                updateContactStatus(contact.Uid, 'Paid', 'Online');
                Alert.alert('Payment Received', `₹${contact.Amount} received Online.`);
              }}
            >
              <Text style={styles.cardButtonText}>Online Pay</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: 'orange' }]}
            onPress={() => updateContactStatus(contact.id, 'SelectPayment')}
          >
            <Text style={styles.cardButtonText}>Accept Payment</Text>
          </TouchableOpacity>
        )}
      </View>
    ))}
  </View>
)}


        {activeView === 'Total Completed' && (
          <View style={styles.listContainer}>
            {completedOrders.map((contact) => (
              <View key={contact.id} style={styles.card}>
                <Text style={styles.cardTitle}>{contact.username}</Text>
                <Text style={styles.cardText}>Time Slot: {contact.time}</Text>
                <Text style={styles.cardText}>Service: {contact.services}</Text>
                <Text style={styles.cardText}>Status: {contact.payment_status}</Text>
                <Text style={styles.cardText}>Payment: {contact.payment_type}</Text>
                <Text style={styles.cardText}>Amount: ₹{contact.amount}</Text>
                <TouchableOpacity style={[styles.cardButton, { backgroundColor: 'gray' }]} disabled>
                  <Text style={styles.cardButtonText}>Completed</Text>
                </TouchableOpacity>
              </View>
            ))}
            
          </View>
        )}

{activeView === 'Total Cash Collected' && (
  <View style={styles.listContainer}>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Total Cash Collected:</Text>
      <Text style={styles.cardText}>₹{totalCash}</Text>
    </View>
  </View>
)}
      </ScrollView>

      <Animated.View style={[styles.sidebar, { left: sidebarAnimation }]}>
        <View style={styles.employeeInfo}>
          <Image
            source={{ uri: 'https://cdn.fluxai.studio/user/clzl13azr0000dmksscucxkmy/flux-schnell/cm1a3ihyi0001qez5lcgq7inz_0.png' }}
            style={styles.profilePic}
          />
          <Text style={styles.employeeName}>John</Text>
          <Text style={styles.employeeId}>Employee ID: 1704</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('Attendance')}>
          <Text style={styles.menuText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('DoorStep')}>
          <Text style={styles.menuText}>Door Step</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('OldOrder')}>
          <Text style={styles.menuText}>Old Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('History')}>
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('Help')}>
          <Text style={styles.menuText}>Help?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleLogOutPress()}>
          <Text style={styles.menuText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Light neutral background
    position: 'relative',
  },
  buttonContainer: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden', // Ensures the image stays within rounded borders
    backgroundColor: '#f1f1f1',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
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
  topButtons: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topButton1: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop:15,
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
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Adjust color as needed
    textAlign: 'center',
    marginTop: 10, // Adjust spacing as needed
  },
  
  checkInButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    right: -100,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  checkInText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#17A2B8', // Teal for action buttons
    flex: 0.48,
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    padding:10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contentContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333333',
  },
  listItem: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  employeeId: {
    fontSize: 14,
    color: '#777777',
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
  cardButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.48, // Adjust button width
    marginHorizontal: 5,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileModal: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6B6B', // Red for the close button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  
});

export default ContactList; 