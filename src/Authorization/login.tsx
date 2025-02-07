import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  ActivityIndicator
} from 'react-native';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    setLoading(true);

    try {
      const apiUrl = 'https://c47d-59-97-51-97.ngrok-free.app/kovais/Employee-login/';
      console.log('🔵 Sending Login Request:', { email, password });
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('🟢 API Response:', data);
      setLoading(false);

      if (data.success) {
        Alert.alert('Login Successful!', `Welcome, ${email}`);
        
        if (data.username ||data.id) {
          await AsyncStorage.setItem('username', data.username.toString());
          await AsyncStorage.setItem('employeeId', data.id.toString());

          console.log('✅ User ID Stored:', data.username,data.id);
          Alert.alert('Success', `User ID ${data.username} ${data.id}stored successfully!`);
        }
        
        const roleRoutes = {
          admin: 'Dashboard',
          gym: 'SalonHome',
          member: 'Dashboard',
          spa: 'SpaHome',
          hotel: 'HotelHome',
        };
        
        const nextScreen = roleRoutes[data.role] || null;
        if (nextScreen) {
          navigation.navigate(nextScreen);
        } else {
          Alert.alert('Error', 'Unknown role received from server.');
        }
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoading(false);
      console.error('🔴 Login Error:', error);
      let errorMessage = 'Something went wrong. Please try again later.';
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your internet connection.';
      } else if (error.message.includes('HTTP Error')) {
        errorMessage = 'Invalid email or password.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5087/5087579.png' }} style={styles.logo} />
        <Text style={styles.title}>Log In</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <View style={styles.passwordContainer}>
          <TextInput placeholder="Password" style={[styles.input, styles.passwordInput]} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.showPasswordButton} onPress={() => setShowPassword((prev) => !prev)}>
            <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
      </View>
         <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>  
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.loginButtonText}>Login</Text>}
      </TouchableOpacity> 
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerLink}> Register</Text>
        </TouchableOpacity>
      </View> 

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'center', padding: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logo: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  inputContainer: { marginBottom: 20 },
  input: { backgroundColor: '#FFF', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, fontSize: 16, marginBottom: 15, borderWidth: 1, color: 'black', borderColor: '#ddd' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  passwordInput: { flex: 1 },
  showPasswordButton: { position: 'absolute', right: 15, padding: 5 },
  showPasswordText: { color: '#007BFF', fontSize: 14, fontWeight: 'bold' },
  loginButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  loginButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
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
  forgotPasswordText: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },

});

export default LoginPage;
