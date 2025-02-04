import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

// Sample data for cash and online payments for different dates
const revenueData = {
  '2024-11-27': { cash: 200, online: 300 },
  '2024-11-26': { cash: 150, online: 250 },
  '2024-11-25': { cash: 100, online: 150 },
  // Add more dates as needed
};

const TodaysRevenueScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2024-11-27');
  const [revenue, setRevenue] = useState(revenueData[selectedDate]);

  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDate(date);
    setRevenue(revenueData[date] || { cash: 0, online: 0 });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotal = (cash: number, online: number) => cash + online;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Custom Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          current={selectedDate}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#3498db',
              selectedTextColor: '#fff',
            },
          }}
          onDayPress={handleDayPress}
          monthFormat={'yyyy MMMM'}
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: '#3498db',
            selectedDayTextColor: '#fff',
            todayTextColor: '#e74c3c',
            arrowColor: '#3498db',
            monthTextColor: '#2c3e50',
            textMonthFontWeight: 'bold',
            dayTextColor: '#34495e',
          }}
        />
      </View>

      {/* Revenue for the selected day */}
      <View style={styles.revenueContainer}>
        <Text style={styles.revenueTitle}>Revenue for {selectedDate}</Text>
        <View style={styles.revenueCard}>
          <Text style={styles.revenueText}>
            Cash Collected: {formatCurrency(revenue.cash)}
          </Text>
          <Text style={styles.revenueText}>
            Online Payment: {formatCurrency(revenue.online)}
          </Text>
          <Text style={styles.revenueText}>
            Total Revenue: {formatCurrency(calculateTotal(revenue.cash, revenue.online))}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
    justifyContent: 'center',
    paddingBottom: 30,
  },
  calendarContainer: {
    marginBottom: 40,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#fff',
    shadowColor: '#2C3E50',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingHorizontal: 10,
  },
  revenueContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#2c3e50',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
  },
  revenueTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  revenueCard: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#3498db',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  revenueText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default TodaysRevenueScreen;
