import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import the useRouter hook from expo-router

export default function Login() {
  const router = useRouter(); // Initialize the router

  // Define the onPress handler for navigating to home screen
  const handleSubmit = () => {
    router.push('/(tabs)/home'); // Navigate to /tabs/home, change from /tabs/ignore to /tabs/home
  };

  // Define the onPress handler for navigating to the register screen
  const handleNavigateToRegister = () => {
    router.push('./register'); // Navigate to register.tsx in the same folder
  };

  // Define the onPress handler for navigating to the forgot password screen
  const handleNavigateToForgotPassword = () => {
    router.push('./forgot-password'); // Navigate to forgot-password.tsx in the same folder
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome! Login below:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Enter your email" style={styles.input} keyboardType="email-address" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput placeholder="Enter your password" style={styles.input} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Add TouchableOpacity for navigation to the Register screen */}
      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text style={styles.registerText}>Don't have an account? Register here!</Text>
      </TouchableOpacity>

      {/* Add TouchableOpacity for navigating to the Forgot Password screen */}
      <TouchableOpacity onPress={handleNavigateToForgotPassword}>
        <Text style={styles.registerText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    width: '80%',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    width: '30%',
  },
  input: {
    height: 40,
    width: '60%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
    backgroundColor: '#1e1e1e',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline', // Makes it look like a clickable link
  },
});
