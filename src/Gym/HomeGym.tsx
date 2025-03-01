import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, Animated, Dimensions, Image,ScrollView,Modal,} from 'react-native';

const ContactList = ({navigation}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-Dimensions.get('window').width));
  const [activeView, setActiveView] = useState('Active');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ Name: '', TimeSlot: '', Status: 'Active', Plan: '', Amount: '' });
  const [showAttendanceView, setShowAttendanceView] = useState(false);

  const [contacts, setContacts] = useState<{id:number;purchaseddate:string;status:string}>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  
         const fetchData = async () => {
           try {
             const response = await fetch('https://a716-59-97-51-97.ngrok-free.app/app/get/gym/orders/');
             if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
             }
             const data = await response.json();
             setContacts(data);
             console.log(contacts,"from gym page");
             
             
           } catch (error) {
             Alert.alert('Error', 'Failed to fetch data. Please try again.');
             console.error(error);
           }finally{
             setLoading(false);
             console.log(contacts,"from gym page");
             
           }
         };
         fetchData();
       }, []);
  useEffect(() => {
    updateContactStatuses();
  }, []);

  const handleCardPress = (serviceName) => {
    navigation.navigate(serviceName);
  };
  const handleLogOutPress = () => {
    Alert.alert('LogOut Successful!')
    navigation.navigate('LoginPage');
  };
  
  const handleBuyProducts = (name) => {
    Alert.alert(`Welcome! ${name}`)
    navigation.navigate('Order');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(sidebarAnimation, {
      toValue: sidebarVisible ? -Dimensions.get('window').width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const updateContactStatuses = () => {
    const currentDate = new Date();
    const updatedContacts = contacts.map((contact) => {
      const planDurations = {
        Monthly: 30,
        Quarterly: 150,
        Yearly: 360,
      };
      const planDuration = planDurations[contact.plan];
      const purchasedDate = new Date(contact.purchaseddate);
      const daysSincePurchase = Math.floor((currentDate - purchasedDate) / (1000 * 60 * 60 * 24));

      if (daysSincePurchase > planDuration) {
        return { ...contact, status: 'InActive' };
      }
      return contact;
    });

    setContacts(updatedContacts);
  };


  const handleButtonPress = (viewName) => {
    setShowAttendanceView(false); 
    setActiveView(viewName);
  };


  const handlePayPress = (id) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
  
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, purchaseddate: currentDate, status: 'Active' } // Update purchasedDate and Status
          : contact
      )
    );
  
    Alert.alert('Success', 'Payment received, date of pay updated!');
  };
  

  const toggleAttendanceView = () => {
    setActiveView(null);
    setShowAttendanceView(true);
  };

  const handleAddContact = () => {
    if (!newContact.Name || !newContact.TimeSlot || !newContact.Plan || !newContact.Amount) {
      Alert.alert('Error', 'Please fill all fields before adding a new contact.');
      return;
    }

    setContacts([
      ...contacts,
      {
        id: contacts.length + 1,
        Name: newContact.Name,
        TimeSlot: newContact.TimeSlot,
        Status: 'Active',
        Plan: newContact.Plan,
        Amount: parseInt(newContact.Amount),
        Attendance: 'Present',
        purchasedDate: new Date().toISOString().split('T')[0], // Set the current date
      },
    ]);

    setNewContact({ Name: '', TimeSlot: '', Status: 'Active', Plan: '', Amount: '' });
    setAddModalVisible(false);
    Alert.alert('Success', 'New contact added successfully!');
  };

  const toggleAttendance = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, Attendance: contact.Attendance === 'Present' ? 'Absent' : 'Present' }
          : contact
      )
    );
  };

  const filteredContacts = contacts.filter((contact) => contact.status === activeView);
  console.log(filteredContacts,"filtered contacts");

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>GYM</Text>
        <TouchableOpacity onPress={toggleSidebar} style={styles.navbarButton}>
          <Text style={styles.hamburgerText}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.center}>
          <TouchableOpacity onPress={toggleAttendanceView} style={styles.actionButton}>
            <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSKWl7lNqWHSAy9rUGqyBsEaG-O5eydkir1g&s' }}
                    style={styles.buttonImage}
                  />
            <Text style={styles.buttonText}>Today Present</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleButtonPress('Active')}
          style={styles.actionButton}
        >
          <Image
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCLZClQNLzhL9ewuUb_17BfOFGriYSyZAcgRjt-eAL0IWtntB-E-zg00Rtf8ILwg-49IM&usqp=CAU' }}
                  style={styles.buttonImage}
                />
          <Text style={styles.buttonText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPress('InActive')}
          style={styles.actionButton}
        >
          <Image
                  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi_6aVAeiA8sWn5UDasKP51yx8niO3OgaJzw&s' }}
                  style={styles.buttonImage}
                />
          <Text style={styles.buttonText}>Inactive</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setAddModalVisible(true)} style={styles.actionButton}>
            <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnNFEQK7KktO8RtWAZTZ8u93gm5myu4_ylHg&s' }}
                    style={styles.buttonImage}
                  />
            <Text style={styles.buttonText}>Add New Joiner</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleButtonPress('TotalRevenue')} style={styles.actionButton}>
            <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6aw0Ei-pTy9d08gPDE56c0E-BnywEOLdtg&s' }}
                    style={styles.buttonImage}
                />
            <Text style={styles.buttonText}>Total Revenue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Total Revenue */}
      {activeView === 'TotalRevenue' && (
        <View style={styles.revenueCard}>
          <Text style={styles.cardTitle1}>Total Revenue</Text>
          <Text style={styles.revenueAmount}>
            ₹{contacts.reduce((sum, contact) => sum + (parseFloat(contact.amount)||0), 0)}
          </Text>
        </View>
      )}

      {/* Attendance View */}
      {showAttendanceView && (
  <ScrollView style={styles.contentContainer}>
    <View style={styles.listContainer}>
      {contacts.map((contact) => (
        <View key={contact.id} style={styles.card}>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{contact.id}</Text>
            <Text style={styles.cardText}>Time Slot: {contact.timeslot}</Text>
            <Text style={styles.cardText}>Plan: {contact.plan}</Text>
            <Text
              style={[
                styles.cardText,
                contact.Attendance === 'Present' ? { color: '#4CAF50' } : { color: '#FF6B6B' },
              ]}
            >
              {contact.Attendance}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleAttendance(contact.id)}
            style={[
              styles.actionButton,
              contact.Attendance === 'Present' ? { backgroundColor: '#FF6B6B' } : { backgroundColor: '#4CAF50' },
            ]}
          >
            <Text style={styles.buttonText}>
              {contact.Attendance === 'Present' ? 'Absent' : 'Present'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  </ScrollView>
)}

      {/* Contact List */}
      {!showAttendanceView && (
        <ScrollView style={styles.contentContainer}>
        {filteredContacts.map((contact) => (
          <View key={contact.id} style={styles.card}>
              <Text style={styles.cardTitle}>{contact.name}</Text>
              <Text style={styles.cardText}>Time Slot: {contact.timeslot}</Text>
              <Text style={styles.cardText}>Plan: {contact.plan}</Text>
              <Text style={styles.cardText}>Status: {contact.status}</Text>
              <Text style={styles.cardText}>Date of Pay: {contact.purchaseddate}</Text>
              <Text style={styles.cardText}>Amount: ₹{contact.amount}</Text>

              {contact.status === 'Active' && (
                <TouchableOpacity style={styles.saveButton} onPress={()=>handleBuyProducts(contact.Name)}>
                  <Text style={styles.saveButtonText}>Buy Products</Text>
                </TouchableOpacity>
              )}
              {contact.status === 'InActive' && (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handlePayPress(contact.id)} // Pass the Uid of the contact
                >
                  <Text style={styles.saveButtonText}>Pay</Text>
                </TouchableOpacity>
              )}

          </View>
        ))}
      </ScrollView>
      )}

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnimation }]}>
        <View style={styles.employeeInfo}>
          <Image
            source={{
              uri: 'https://cdn.fluxai.studio/user/clzl13azr0000dmksscucxkmy/flux-schnell/cm1a3ihyi0001qez5lcgq7inz_0.png',
            }}
            style={styles.profilePic}
          />
          <Text style={styles.employeeName}>John</Text>
          <Text style={styles.employeeId}>Employee ID: 1704</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleCardPress('Attendance')}>
          <Text style={styles.menuText}>Attendance</Text>
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

      {/* Add Contact Modal */}
      <Modal
        transparent={true}
        visible={addModalVisible}
        animationType="fade"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter the Details</Text>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#A9A9A9"
              value={newContact.Name}
              onChangeText={(text) => setNewContact({ ...newContact, Name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Time Slot"
              placeholderTextColor="#A9A9A9"
              value={newContact.TimeSlot}
              onChangeText={(text) => setNewContact({ ...newContact, TimeSlot: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Plan (e.g., Monthly)"
              placeholderTextColor="#A9A9A9"
              value={newContact.Plan}
              onChangeText={(text) => setNewContact({ ...newContact, Plan: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Amount"
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              value={newContact.Amount}
              onChangeText={(text) => setNewContact({ ...newContact, Amount: text })}
              style={styles.input}
            />
              <TouchableOpacity style={styles.saveButton} onPress={handleAddContact}>
                <Text style={styles.saveButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: '#FF6B6B' }]}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    position: 'relative',
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
  center: {
    flexDirection: 'row', // Maintains the row layout
    justifyContent: 'center', // Horizontally center the items
    alignItems: 'center', // Vertically center the items
    marginBottom: 20, // Optional margin if required
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
    marginVertical: 5,
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
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    color: 'black', // Text color is black
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  revenueCard: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 20,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  revenueAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardTitle1: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  attendanceButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  attendanceButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  presentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  absentButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  attendanceButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ContactList; 