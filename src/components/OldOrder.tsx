import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

// Dynamic Calculation of Barber Data
const barberData = {
  "2025-01-27": {
    details: [
      { name: "John Doe", service: "Haircut", AmountOfpay: 500, payment: "Online" },
      { name: "Jane Smith", service: "Shaving", AmountOfpay: 500, payment: "Cash" },
    ],
  },
  "2025-01-29": {
    details: [
      { name: "Mike Ross", service: "Beard Trim", AmountOfpay: 500, payment: "Cash" },
      { name: "Rachel Green", service: "Hair Spa", AmountOfpay: 500, payment: "Online" },
    ],
  },
  "2025-01-28": {
    details: [
      { name: "Harvey Specter", service: "Haircut", AmountOfpay: 500, payment: "Online" },
      { name: "Donna Paulsen", service: "Hair Color", AmountOfpay: 500, payment: "Cash" },
    ],
  },
};

// Add calculated fields (earnings and customers)
Object.keys(barberData).forEach((date) => {
  const dayData = barberData[date];
  const totalEarnings = dayData.details.reduce((sum, customer) => sum + customer.AmountOfpay, 0);
  barberData[date].earnings = totalEarnings;
  barberData[date].customers = dayData.details.length;
});

const BarberStatsPage = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formats as 'YYYY-MM-DD'
  };
  const [selectedDate, setSelectedDate] = useState(getCurrentDate);
  const [data, setData] = useState(barberData);

  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    const today = new Date();
    const selectedDate = new Date(selectedDateString);

    if (selectedDate > today) {
      Alert.alert("Future Date Selected", "You've selected a future date.", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    } else {
      setSelectedDate(selectedDateString);
    }
  };

  const renderCustomerItem = ({ item }) => (
    <View style={styles.customerCard}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.statText}>Service: {item.service}</Text>
      <Text style={styles.statText}>Amount: ₹{item.AmountOfpay}</Text>
      <Text style={styles.statText}>Payment: {item.payment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* <Text style={styles.title}>Performance Dashboard</Text> */}
            <Calendar
              style={styles.calendar}
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, marked: true },
              }}
              theme={{
                selectedDayBackgroundColor: '#3498db',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#e74c3c',
                textDayFontSize: 16,
                textMonthFontSize: 16,
              }}
            />
            {data[selectedDate] ? (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{selectedDate}</Text>
                <Text style={styles.statText}>
                  Customers: {data[selectedDate].customers}
                </Text>
                <Text style={styles.statText}>
                  Earnings: ₹{data[selectedDate].earnings}
                </Text>
              </View>
            ) : (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{selectedDate}</Text>
                <Text style={styles.statText}>No tasks completed</Text>
              </View>
            )}
            <Text style={styles.title}>Customer Details</Text>
          </>
        }
        data={data[selectedDate]?.details || []}
        renderItem={renderCustomerItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafc',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#34495e',
    textTransform: 'capitalize',
    lineHeight: 34,
  },
  calendar: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    borderLeftColor: '#007BFF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333333',
  },
  statText: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 6,
  },
  list: {
    flex: 1,
  },
  customerCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default BarberStatsPage;
