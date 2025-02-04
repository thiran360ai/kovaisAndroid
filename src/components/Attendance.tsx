import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';

const AttendanceScreen = () => {
  const permanentLocation = { latitude: 11.447674, longitude: 77.454854 }; // Permanent location (for check-in/out)
  const [location, setLocation] = useState('');
  const [completedDays, setCompletedDays] = useState({
    '2024-11-26': { selected: true, selectedColor: '#FF0000', location: 'Gopichettipalayam' }, // Absent
    '2024-11-27': { selected: true, selectedColor: '#4CAF50', location: 'Gopichettipalayam' }, // Present
  });
  const [checkedIn, setCheckedIn] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const handleCheckInOut = async () => {
    const today = moment().format('YYYY-MM-DD');
    const currentTime = moment();
    const checkInDeadline = moment(today).hour(10).minute(0).second(0);
    const checkOutStart = moment(today).hour(16).minute(0).second(0);

    try {
      const userLocation = await getCurrentLocation(); // Fetch user's current location
      const distance = getDistance(userLocation, permanentLocation); // Calculate distance

      if (distance > 100) {
        Alert.alert(
          'Location Error',
          'You must be within 100 meters of the specified location to check in or out.'
        );
        return;
      }

      if (!location) {
        Alert.alert('Please enter your location');
        return;
      }

      if (!checkedIn) {
        if (currentTime.isAfter(checkInDeadline)) {
          Alert.alert('Check-in is allowed only before 10:00 AM');
          return;
        }

        const newCompletedDays = {
          ...completedDays,
          [today]: { selected: true, selectedColor: '#FFD700', location },
        };
        setCompletedDays(newCompletedDays);
        setCheckedIn(true);
        setCurrentDate(today);

        Alert.alert(`Checked in at ${location}`);
      } else {
        if (currentTime.isBefore(checkOutStart)) {
          Alert.alert('Check-out is allowed only after 4:00 PM');
          return;
        }

        const newCompletedDays = {
          ...completedDays,
          [today]: { selected: true, selectedColor: '#4CAF50', location },
        };
        setCompletedDays(newCompletedDays);
        setCheckedIn(false);
        setCurrentDate('');

        Alert.alert(`Checked out from ${location}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch your location. Please try again.');
      console.error(error);
    }
  };

  const markDays = () => {
    const today = moment();
    const updatedDays = { ...completedDays };

    for (const date in completedDays) {
      if (completedDays[date].selected) {
        updatedDays[date].selectedColor = completedDays[date].selectedColor || '#4CAF50';
      } else {
        updatedDays[date].selectedColor = '#FF0000';
      }
    }

    for (let i = 1; i <= 360; i++) {
      const pastDate = today.clone().subtract(i, 'days').format('YYYY-MM-DD');
      if (!updatedDays[pastDate]) {
        updatedDays[pastDate] = { selected: false, selectedColor: '#FF0000' };
      }
    }

    return updatedDays;
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.headerText}>Attendance Tracker</Text> */}
      <Calendar
        markedDates={markDays()}
        style={styles.calendar}
        theme={{
          calendarBackground: '#f9f9f9',
          textSectionTitleColor: '#2C2C2C',
          todayTextColor: '#1976D2',
          dayTextColor: '#444',
          selectedDayBackgroundColor: '#FFD700',
          selectedDayTextColor: '#fff',
        }}
      />
      <TextInput
        style={styles.locationInput}
        placeholder="Enter your location"
        placeholderTextColor="#888"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        style={checkedIn ? styles.checkOutButton : styles.checkInButton}
        onPress={handleCheckInOut}
      >
        <Text style={styles.buttonText}>
          {checkedIn ? 'Check Out' : 'Check In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDEDED',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  locationInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 20,
    color:'black',
  },
  checkInButton: {
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  checkOutButton: {
    height: 50,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AttendanceScreen;
