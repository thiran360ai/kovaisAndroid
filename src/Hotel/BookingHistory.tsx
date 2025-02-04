import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

const bookingData = {
  '2024-11-27': [
    {
      roomName: 'Room 101',
      roomType: 'Single',
      amount: 150,
      customerName: 'John Doe',
      customerPhone: '123-456-7890',
      customerAddress: '123 Main St, Springfield',
      checkInTime: '2024-11-27 14:00',
      checkOutTime: '2024-11-28 12:00',
      roomImage: 'https://c4.wallpaperflare.com/wallpaper/68/331/736/evening-in-luxury-water-villa-wallpaper-preview.jpg',
    },
    {
      roomName: 'Room 102',
      roomType: 'Double',
      amount: 200,
      customerName: 'Jane Smith',
      customerPhone: '987-654-3210',
      customerAddress: '456 Elm St, Springfield',
      checkInTime: '2024-11-27 15:00',
      checkOutTime: '2024-11-28 11:00',
      roomImage: 'https://www.shutterstock.com/shutterstock/videos/3498544143/thumb/1.jpg?ip=x480',
    },
  ],
  // Add more dates with booking data here
};

const BookingHistoryScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2024-11-27');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const markedDates = Object.keys(bookingData).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'blue', selected: date === selectedDate };
    return acc;
  }, {});

  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDate(date);
    setSelectedBooking(null);
  };

  const handleMorePress = (booking: any) => {
    setSelectedBooking(booking);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const renderBookingDetails = (booking: any) => {
    const isSelected = selectedBooking && selectedBooking.roomName === booking.roomName;

    return (
      <View style={[styles.bookingDetailsContainer, isSelected && styles.selectedBooking]}>
        <Image source={{ uri: booking.roomImage }} style={styles.roomImage} />
        <Text style={styles.roomName}>{booking.roomName}</Text>
        <Text style={styles.roomType}>Room Type: {booking.roomType}</Text>
        <Text style={styles.amount}>Amount: {formatCurrency(booking.amount)}</Text>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => handleMorePress(booking)}
        >
          <Text style={styles.moreButtonText}>More</Text>
        </TouchableOpacity>

        {isSelected && (
          <View style={styles.additionalDetails}>
            <Text style={styles.additionalText}>Name: {booking.customerName}</Text>
            <Text style={styles.additionalText}>Phone: {booking.customerPhone}</Text>
            <Text style={styles.additionalText}>Address: {booking.customerAddress}</Text>
            <Text style={styles.additionalText}>Check-In: {booking.checkInTime}</Text>
            <Text style={styles.additionalText}>Check-Out: {booking.checkOutTime}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Booking History</Text> */}

      <Calendar
        current={selectedDate}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        monthFormat={'yyyy MMMM'}
        style={styles.calendar}
      />

      {bookingData[selectedDate] ? (
        bookingData[selectedDate].map((booking, index) => (
          <View key={index} style={styles.bookingContainer}>
            {renderBookingDetails(booking)}
          </View>
        ))
      ) : (
        <Text style={styles.noBookingsText}>No bookings for this date.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
  },
  bookingContainer: {
    marginBottom: 20,
  },
  bookingDetailsContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  selectedBooking: {
    borderWidth: 2,
    borderColor: '#3498db',
  },
  roomImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  roomType: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
  },
  moreButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#3498db',
    borderRadius: 10,
    marginBottom: 10,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalDetails: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  additionalText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  noBookingsText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookingHistoryScreen;
