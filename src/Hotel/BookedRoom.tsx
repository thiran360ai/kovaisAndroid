import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';

// Sample data for booked rooms
type Room = {
  id: number;
  name: string;
  type: string;
  guest: string;
  checkIn: string;
  checkOut: string;
  checkInTime: string;
  cost: string;
  paymentMode: string;
  image: string;
  hotelImage: string;
  status: 'paid' | 'pending'; // Restrict status to valid values
};


const BookedRoomsScreen: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookedRooms,setBookedRooms] = useState([]);
    const [loading,setLoading] =useState(true);
  
useEffect(() => {

       const fetchData = async () => {
         try {
           const response = await fetch('https://f1e9-59-97-51-97.ngrok-free.app/kovais/filter_hotel_order_by_status/?status=Checked In');
           if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
           }
           const data = await response.json();
           setBookedRooms(data);
           console.log(bookedRooms,"from saloon page");
           
           
         } catch (error) {
           Alert.alert('Error', 'Failed to fetch data. Please try again.');
           console.error(error);
         }finally{
           setLoading(false);
           console.log(bookedRooms,"from saloon page");
           
         }
       };
       fetchData();
     }, []);

  const handlePayment = (roomName: string, paymentMode: string) => {
    Alert.alert(
      'Your are already checked In',
      `Payment for ${roomName} is marked as ${paymentMode}.`,
      [{ text: 'OK', onPress: () => console.log('Alert Closed') }]
    );
  };
   const handleCheckin = async (roomId, customerId, orderId) => {
      Alert.alert(
        'Checkout Confirmation',
        `Are you sure you want to checkin room number ${roomId}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                const response = await fetch(`https://f1e9-59-97-51-97.ngrok-free.app/kovais/hotel/update/?customer_id=${customerId}&order_id=${orderId}`, {
                  method: 'PUT',  // Change this to 'POST' if your API requires it
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ status: 'Checked In' }),
                });
    
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Remove the checked-out room from the state
                setBookedRooms((prevRooms) => prevRooms.filter(room => room.roomNumber !== roomId));
                Alert.alert('Success', `Room ${roomId} has been checked In.`);
              } catch (error) {
                Alert.alert('Error', 'Failed to checkout. Please try again.');
                console.error(error);
              }
            },
          },
        ]
      );
    };
   

  return (
    <View style={styles.container}>
      {selectedRoom ? (
        <View style={styles.card}>
          <Image source={{ uri: selectedRoom.hotelImage }} style={styles.hotelImage} />
          <Text style={styles.roomName}>{selectedRoom.guest}</Text>
          {/* Remove Check-In button */}
          <Text style={styles.detail}>Cost: ₹{selectedRoom.cost}</Text>
          <Text style={styles.detail}>Payment Mode: {selectedRoom.paymentMode}</Text>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => setSelectedRoom(null)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {bookedRooms.map((room) => (
            <View key={room.id} style={styles.card}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.detail}>Type: {room.category}</Text>
              <Text style={styles.detail}>Guest: {room.guest}</Text>
              <Text style={styles.detail}>Check-In Time: {room.checkInTime}</Text>

              {/* Display "Paid" label or payment buttons */}
              {room.status !== 'paid' ? (
  <View>
    <Text style={[styles.detail, styles.paidText]}>Paid</Text>
    <TouchableOpacity
      style={[styles.button, styles.checkInButton]}
      onPress={() =>handleCheckin(room.roomNumber, room.customer_id, room.id)}
    >
      <Text style={styles.buttonText}>Check In</Text>
    </TouchableOpacity>
  </View>
) : (
  <View style={styles.paymentButtons}>
    <TouchableOpacity
      style={[styles.button, styles.cashButton]}
      onPress={() => handlePayment(room.name, 'Cash')}
    >
      <Text style={styles.buttonText}>Cash</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, styles.onlinePayButton]}
      onPress={() => handlePayment(room.name, 'Online Pay')}
    >
      <Text style={styles.buttonText}>Online Pay</Text>
    </TouchableOpacity>
  </View>
)}


              <TouchableOpacity
                style={[styles.button, styles.moreInfoButton]}
                onPress={() => setSelectedRoom(room)}
              >
                <Text style={styles.buttonText}>More Info</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};


export default BookedRoomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f3',
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  roomName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  paidText: {
    color: '#f39c12', // Bright amber to match the Paid button style
    fontWeight: '700',
    fontSize: 16,
    marginTop: 6,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#d6d6d6',
  },
  button: {
    backgroundColor: '#1abc9c',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  moreInfoButton: {
    backgroundColor: '#3498db',
    flex: 1,
    marginHorizontal: 5,
  },
  cashButton: {
    backgroundColor: '#e67e22', // Orange for Cash button
    flex: 1,
    marginRight: 5,
  },
  onlinePayButton: {
    backgroundColor: '#2980b9', // Blue for Online Pay button
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  paymentButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'red',
    marginTop: 15,
  },
  detailView: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hotelImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
});
