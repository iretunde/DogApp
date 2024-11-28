import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; 

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isInputValid, setInputValid] = useState(false);

  const handleInputChange = (text: string) => {
    setEmail(text);
    setInputValid(text.trim().length > 0); // Check if the input field is non-empty
  };

  const handleSubmit = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      const successMessage = 'If you have a registered email with us, you will receive a password reset email shortly!';

      // Show success message depending on the platform
      if (Platform.OS === 'web') {
        window.alert(successMessage); // For web use window.alert
      } else {
        Alert.alert('Success', successMessage); // For mobile use Alert.alert
      }

      router.push('/'); // Navigate back to login screen
    } catch (error: any) {
      const errorMessage = "Invalid email given.";

      // Show error message depending on the platform
      if (Platform.OS === 'web') {
        window.alert(errorMessage); // For web use window.alert
      } else {
        Alert.alert('Error', errorMessage); // For mobile use Alert.alert
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Enter your email address"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={handleInputChange}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, !isInputValid && styles.disabledButton]} // Apply disabled styling when invalid
        onPress={handleSubmit}
        disabled={!isInputValid} // Disable button if input is empty
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.linkText}>Have an account? Login here!</Text>
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
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  inputGroup: {
    width: '50%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
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
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Greyed-out button for disabled state
  },
  linkText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
