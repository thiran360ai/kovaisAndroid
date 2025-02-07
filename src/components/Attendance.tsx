import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, PermissionsAndroid, Platform 
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';

const AttendanceScreen = () => {
  const permanentLocation = { latitude: 11.447674, longitude: 77.454854 };
  const [location, setLocation] = useState('');
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [completedDays, setCompletedDays] = useState({});
  const [checkedIn, setCheckedIn] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [username, setUsername] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  const getUserIdFromStorage = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmployeeId = await AsyncStorage.getItem('employeeId');
      if (!storedUsername || !storedEmployeeId) {
        Alert.alert('Error', 'No stored user information found.');
        return false;
      }
      setUsername(storedUsername);
      setEmployeeId(storedEmployeeId);
      return true;
    } catch (error) {
      console.error('Error retrieving user ID:', error);
      Alert.alert('Error', 'Failed to retrieve user information.');
      return false;
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to check in/out.',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const fetchUserLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Location access is required for check-in.');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ latitude, longitude });
        setLocation(`${latitude}, ${longitude}`);
      },
      (error) => {
        console.error("Location Error:", error);
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
    );
  };

  const handleCheckInOut = async () => {
    if (!userCoordinates) {
      Alert.alert('Location Required', 'Please fetch your location before checking in.');
      return;
    }

    const userDataAvailable = await getUserIdFromStorage();
    if (!userDataAvailable) return;

    const today = moment().format('YYYY-MM-DD');
    const currentTime = moment();
    const checkInDeadline = moment(today).hour(10).minute(0).second(0);
    const checkOutStart = moment(today).hour(16).minute(0).second(0);

    const distance = getDistance(userCoordinates, permanentLocation);
    console.log("Distance from location:", distance);

    if (!checkedIn) {
      const newCompletedDays = {
        ...completedDays,
        [today]: { selected: true, selectedColor: '#FFD700', location },
      };
      setCompletedDays(newCompletedDays);
      setCheckedIn(true);
      setCurrentDate(today);
      Alert.alert(`Checked in at ${location}`);
      sendAttendanceToBackend(today, userCoordinates.latitude, userCoordinates.longitude, "Check In");
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
      sendAttendanceToBackend(today, userCoordinates.latitude, userCoordinates.longitude, "Check Out");
    }
  };

  const sendAttendanceToBackend = async (date, latitude, longitude, status) => {
    try {
      const response = await fetch('https://2fe9-59-97-51-97.ngrok-free.app/kovais/Attendance/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          employee_attendance: employeeId,
          status,
          latitude,
          longitude,
          email: "nitish123@gmail.com",
          password: "1234"
        }),
      });

      const result = await response.json();
      console.log('Attendance Response:', result);
    } catch (error) {
      console.error('Error sending attendance:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar markedDates={completedDays} style={styles.calendar} />
      <TouchableOpacity onPress={fetchUserLocation}>
        <TextInput style={styles.locationInput} placeholder="Tap to fetch location" value={location} editable={false} />
      </TouchableOpacity>
      <TouchableOpacity style={checkedIn ? styles.checkOutButton : styles.checkInButton} onPress={handleCheckInOut}>
        <Text style={styles.buttonText}>{checkedIn ? 'Check Out' : 'Check In'}</Text>
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
    color: 'black',
    textAlign: 'center',
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
