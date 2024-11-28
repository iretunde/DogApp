import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons'; // Correct import for Ionicons

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email address cannot be empty.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Validation Error', 'Password cannot be empty.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'User registered successfully!');
      router.push('/(tabs)/home'); // Navigate to the login screen
    } catch (error: any) {
      let errorMessage = 'Error: unknown error';
      
      // Check if the error message matches the invalid email error from Firebase
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Error: invalid email given';
      }
      console.log(error)
      Alert.alert('Error', errorMessage); // Show error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register below!</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible} // Toggle visibility
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} // Use Ionicons for the eye icon
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.registerText}>Have an account? Login here!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
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
    width: '80%', // Ensure email and password fields have the same width
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
    width: '60%', // Same width for both email and password input fields
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
    backgroundColor: '#1e1e1e',
  },
  passwordContainer: {
    position: 'relative', 
    width: '60%', 
  },
  passwordInput: {
    height: 40, 
    width: '100%', 
    paddingRight: 35, 
    backgroundColor: '#1e1e1e', 
    color: '#fff', 
    borderColor: '#fff', 
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: 10, // Align to the right of the input box
    top: '50%', // Vertically center the icon
    transform: [{ translateY: -10 }], // Adjust to perfect vertical alignment
    zIndex: 1, // Ensure the icon is on top of the input field
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
    textDecorationLine: 'underline',
  },
});
