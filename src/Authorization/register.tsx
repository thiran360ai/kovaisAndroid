import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';

const SignUpPage = ({ navigation }) => {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Function to validate email format
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // ✅ Handle user signup
  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address!');
      return;
    }

    setLoading(true);

    try {
      // ✅ Replace with your latest ngrok URL
      const apiUrl = 'https://c47d-59-97-51-97.ngrok-free.app/kovais/create-employee/';

      console.log('Sending request to:', apiUrl);
      console.log('Request Payload:', { username, email, password });

      const response = await axios.post(
        apiUrl,
        { username, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000, // ✅ Set a timeout (10s) to prevent hanging requests
        }
      );

      console.log('API Response:', response.data);
      setLoading(false);

      if (response.status === 201) {
        Alert.alert('Sign Up Successful!', `Welcome, ${username}`);
        navigation.navigate('LoginPage');
      } else {
        Alert.alert('Registration Failed', response.data.message || 'Please try again');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);

      let errorMessage = 'Something went wrong. Please try again later.';

      // ✅ Handle different types of errors
      if (error.response) {
        // Server responded but with an error status
        console.error('Server Error:', error.response.data);
        errorMessage = error.response.data.message || 'Server error occurred.';
      } else if (error.request) {
        // Request made, but no response received (e.g., API down)
        console.error('Network Error:', error.request);
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else {
        // Other errors
        console.error('Unexpected Error:', error.message);
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087579.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="username"
          placeholderTextColor="#888"
          style={styles.input}
          value={username}
          onChangeText={setusername}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
      </View>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.signUpButtonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.registerLink}> Log In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signUpButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#333',
  },
  registerLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default SignUpPage;
