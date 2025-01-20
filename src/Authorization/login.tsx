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

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email.trim() === 'admin') { //&& password.trim() === '123'
      Alert.alert('Login Successful!', `Welcome, ${email}`);
      navigation.navigate('Dashboard'); // Navigate to Admin Dashboard page
    } else if (email.trim() === 'salon') {
      Alert.alert('Login Successful!', `Welcome, ${email}`);
      navigation.navigate('SalonHome'); // Navigate to GYM Dashboard page
    } else if (email.trim() === 'gym') {
      Alert.alert('Login Successful!', `Welcome, ${email}`);
      navigation.navigate('GymHome'); // Navigate to GYM Dashboard page
    }else if (email.trim() === 'spa') {
      Alert.alert('Login Successful!', `Welcome, ${email}`);
      navigation.navigate('SpaHome'); // Navigate to Spa Dashboard page
    }else if (email.trim() === 'hotel') {
      Alert.alert('Login Successful!', `Welcome, ${email}`);
      navigation.navigate('HotelHome'); // Navigate to Spa Dashboard page
    } else {
      Alert.alert('Invalid LogIn');
    }
    
    // Clear input fields after login attempt
    setEmail('');
    setPassword('');
  };

  const handleForgotPassword = () => {
    Alert.alert('Reset Password', 'Forgot password functionality coming soon.');
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
        <Text style={styles.title}>LogIn</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            style={[styles.input, styles.passwordInput]}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Text style={styles.showPasswordText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
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
    color:'black',
    borderColor: '#ddd',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  showPasswordText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
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

export default LoginPage;
