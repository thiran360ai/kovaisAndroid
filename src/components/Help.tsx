import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Linking } from 'react-native';

const HelpPage = () => {
  const [query, setQuery] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleSendEmail = () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter your query before sending.');
      return;
    }

    if (!emailAddress.trim() || !/^\S+@\S+\.\S+$/.test(emailAddress)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    const mailtoURL = `mailto:vikraam17@gmail.com?subject=Employee Query&body=${encodeURIComponent(query)}`;
    
    Linking.openURL(mailtoURL)
      .then(() => {
        Alert.alert('Success', 'Your query has been sent successfully.');
        setQuery('');
        setEmailAddress('');
      })
      .catch((err) => {
        Alert.alert('Error', 'Failed to open the mail client. Please try again.');
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#aaa"
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, styles.queryInput]}
        placeholder="Type your query here..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
        multiline
        numberOfLines={6}
      />
      
      <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F0F4F8', // Subtle background color
    justifyContent: 'center',
    alignItems: 'center',
    // Gradient background effect for the whole page
    background: 'linear-gradient(135deg, #6e7fbd, #a0b8d2)', 
    borderRadius: 15, 
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1.5,
    fontFamily: 'Roboto-Bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E1E8ED', // Soft gray border color
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    color: '#2C3E50', // Dark text color for readability
    shadowColor: '#BDC3C7', // Light shadow for input box
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  queryInput: {
    height: 180,
    textAlignVertical: 'top',
    paddingTop: 12,
    fontSize: 16,
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#FFF',
    color: '#34495E', 
    marginBottom: 20,
    shadowOpacity: 0.2,
  },
  sendButton: {
    backgroundColor: '#3498DB', // Fresh blue button
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 50, // Extra rounded corners for a pill-shaped button
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Soft shadow for button lift effect
    marginTop: 20,
    transition: 'transform 0.2s ease', // Button animation on touch
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});

export default HelpPage;
