import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Ionicons from '@expo/vector-icons/Ionicons'; 



export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false); 


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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      Alert.alert('Success', 'Logged in successfully!');
      router.push('/(tabs)/home'); 
    } catch (error: any) {
      setPassword('')
      Alert.alert('Error:', 'Email or password incorrect!'); 
    }
  };

 
  const handleNavigateToForgotPassword = () => {
    router.push('./forgot-password'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome! Login below:</Text>

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
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>


      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Add TouchableOpacity for navigation to the Register screen */}
      <TouchableOpacity onPress={() => router.push('./register')}>
        <Text style={styles.registerText}>Don't have an account? Register here!</Text>
      </TouchableOpacity>
      {/* Forgot Password Link */}
      <TouchableOpacity onPress={handleNavigateToForgotPassword}>
        <Text style={styles.registerText}>Forgot password?</Text>
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
    textDecorationLine: 'underline', // Makes it look like a clickable link
  },
});
