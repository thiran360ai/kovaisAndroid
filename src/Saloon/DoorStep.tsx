import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

const DoorstepService = () => {
  const [selectedService, setSelectedService] = useState('Function');
  const [functionCardStates, setFunctionCardStates] = useState({});
  const [funeralCardStates, setFuneralCardStates] = useState({});

  const functionData = [
    { id: '1', date: '2024-11-28', timeSlot: '10:00 AM - 12:00 PM', name: 'John Doe', address: '123 Street, City', mobile: '9876543210' },
    { id: '2', date: '2024-11-29', timeSlot: '02:00 PM - 04:00 PM', name: 'Jane Smith', address: '456 Avenue, City', mobile: '8765432109' },
  ];

  const funeralData = [
    { id: '1', date: '2024-11-30', timeSlot: '08:00 AM - 10:00 AM', name: 'Robert Brown', address: '789 Road, City', mobile: '7654321098' },
    { id: '2', date: '2024-12-01', timeSlot: '03:00 PM - 05:00 PM', name: 'Emily Davis', address: '321 Lane, City', mobile: '6543210987' },
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleCardState = (id, state, serviceType) => {
    if (serviceType === 'Function') {
      setFunctionCardStates((prevStates) => ({
        ...prevStates,
        [id]: state,
      }));
    } else if (serviceType === 'Funeral') {
      setFuneralCardStates((prevStates) => ({
        ...prevStates,
        [id]: state,
      }));
    }
  };

  const renderCard = ({ item }, serviceType) => {
    const currentState =
      serviceType === 'Function'
        ? functionCardStates[item.id] || 'Accept'
        : funeralCardStates[item.id] || 'Accept';

    return (
      <View style={styles.card}>
        <Text style={styles.cardText}>Date: {item.date}</Text>
        <Text style={styles.cardText}>Time Slot: {item.timeSlot}</Text>
        <Text style={styles.cardText}>Name: {item.name}</Text>
        <Text style={styles.cardText}>Address: {item.address}</Text>
        <Text style={styles.cardText}>Mobile: {item.mobile}</Text>

        {currentState === 'Accept' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCardState(item.id, 'Accept Payment', serviceType)}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        )}

        {currentState === 'Accept Payment' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCardState(item.id, 'Payment Options', serviceType)}
          >
            <Text style={styles.buttonText}>Accept Payment</Text>
          </TouchableOpacity>
        )}

        {currentState === 'Payment Options' && (
          <View style={styles.paymentButtonContainer}>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handleCardState(item.id, 'Complete', serviceType)}
            >
              <Text style={styles.buttonText}>Online</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => handleCardState(item.id, 'Complete', serviceType)}
            >
              <Text style={styles.buttonText}>Cash</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentState === 'Complete' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.completedButton]}
            onPress={() => handleCardState(item.id, 'Completed', serviceType)}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}

        {currentState === 'Completed' && (
          <View style={[styles.actionButton, styles.completedButton]}>
            <Text style={styles.buttonText}>Completed</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Doorstep Service</Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedService === 'Function' && styles.selectedButton]}
          onPress={() => handleServiceSelect('Function')}
        >
          <Text style={styles.buttonText}>Function</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedService === 'Funeral' && styles.selectedButton]}
          onPress={() => handleServiceSelect('Funeral')}
        >
          <Text style={styles.buttonText}>Funeral</Text>
        </TouchableOpacity>
      </View>

      {selectedService && (
        <>
          <Text style={styles.subHeader}>Available {selectedService} Services</Text>
          <FlatList
            data={selectedService === 'Function' ? functionData : funeralData}
            renderItem={(item) => renderCard(item, selectedService)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            nestedScrollEnabled={true} // Allow inner list to scroll independently
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F9', // Light gray background for better readability
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50', // Dark gray for a professional look
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498DB', // Professional blue tone
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000', // Add subtle shadow for depth
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Shadow for Android
  },
  selectedButton: {
    backgroundColor: '#1A73E8', // Slightly darker blue for selected state
  },
  buttonText: {
    color: '#FFFFFF', // White text for contrast
    fontSize: 16,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E', // Neutral dark tone for headings
    marginVertical: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 50, // Extra space at the bottom for better UX
  },
  card: {
    backgroundColor: '#FFFFFF', // Clean white background for cards
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E4E7', // Subtle border
    shadowColor: '#000', // Subtle shadow for depth
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2, // Shadow for Android
  },
  cardText: {
    fontSize: 16,
    color: '#2C3E50', // Dark gray text for readability
    marginBottom: 8,
    lineHeight: 22, // Better spacing for text
  },
  actionButton: {
    backgroundColor: '#27AE60', // Vibrant green for actions
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  completedButton: {
    backgroundColor: '#BDC3C7', // Subtle gray for completed state
  },
  paymentButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  paymentButton: {
    backgroundColor: '#F39C12', // Eye-catching orange for payment options
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

export default DoorstepService;
