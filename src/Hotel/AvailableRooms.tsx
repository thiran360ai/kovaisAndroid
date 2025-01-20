import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, FlatList,Alert } from 'react-native';

const AvailableRoomsScreen = () => {
  const [selectedRooms, setSelectedRooms] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const roomCost = 2000; // Cost per room

  const roomData = [
    {
      id: '1',
      type: 'Single',
      ac: true,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_ipwGuR5qXU3_9sHz4xDrItG5ikf-Pm0YQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx7wmWP_PA3vZAQqj1Dem8NtHdtU63XJpwaw&s',
      ],
    },
    {
      id: '2',
      type: 'Single',
      ac: false,
      images: [
        'https://thumbs.dreamstime.com/b/hotel-rooms-8146308.jpg',
        'https://dec1osz9a7g7e.cloudfront.net/O-Hotel-Goa-New-O-Hotel-Goa-New-deluxeandroom1.jpg',
      ],
    },
    {
      id: '3',
      type: 'Double',
      ac: true,
      images: [
        'https://thumbs.dreamstime.com/b/luxury-hotel-room-master-bedroom-creative-ai-design-background-instagram-facebook-wall-painting-photo-wallpaper-backgrounds-325040660.jpg',
        'https://dec1osz9a7g7e.cloudfront.net/O-Hotel-Goa-New-O-Hotel-Goa-New-deluxeandroom1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOwKx7dPv6Q8WkA3ZmEnDFab0hNV1Q35MGQ&s',
      ],
    },
    {
      id: '4',
      type: 'Double',
      ac: false,
      images: [
        'https://t4.ftcdn.net/jpg/07/89/06/73/360_F_789067311_c15AwuIYVm9VLVQfJWON6rmP9f2FUV0T.jpg',
        'https://via.placeholder.com/150/FFFF00',
      ],
    },
  ];

  const handleIncrement = (id) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const calculateTotal = () => {
    return Object.entries(selectedRooms).reduce(
      (total, [id, count]) => total + count * roomCost,
      0
    );
  };

  const showMoreImages = (images) => {
    setCurrentImages(images);
    setModalVisible(true);
  };

  const handleCashPayment = () => {
    // Logic for cash payment
    Alert.alert(`Cash payment of ₹${calculateTotal()} confirmed!`);
  };

  const handleOnlinePayment = () => {
    // Logic for online payment
    Alert.alert(`Redirecting to online payment for ₹${calculateTotal()}...`);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Available Rooms</Text> */}
      <FlatList
        data={roomData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.roomType}>
              {item.type} Room - {item.ac ? 'AC' : 'Non-AC'}
            </Text>
            <Image source={{ uri: item.images[0] }} style={styles.roomImage} />
            <TouchableOpacity
              style={styles.moreImagesButton}
              onPress={() => showMoreImages(item.images)}
            >
              <Text style={styles.moreImagesText}>More Images</Text>
            </TouchableOpacity>
            <View style={styles.counterContainer}>
              <TouchableOpacity style={styles.counterButton} onPress={() => handleDecrement(item.id)}>
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.roomCount}>{selectedRooms[item.id] || 0}</Text>
              <TouchableOpacity style={styles.counterButton} onPress={() => handleIncrement(item.id)}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>

      {/* Payment Buttons */}
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={handleCashPayment}>
          <Text style={styles.paymentButtonText}>Pay Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.paymentButton, styles.onlineButton]} onPress={handleOnlinePayment}>
          <Text style={styles.paymentButtonText}>Pay Online</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for More Images */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={currentImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.modalImage} />}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'fff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  roomType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Added color property
  },
  
  roomImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  moreImagesButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  moreImagesText: {
    color: '#3498db',
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  counterButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  counterText: {
    color: '#fff',
    fontSize: 18,
  },
  roomCount: {
    fontSize: 18,
    color: 'black', // Added color property
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'black', // Added color property
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  onlineButton: {
    backgroundColor: '#2980b9',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AvailableRoomsScreen;