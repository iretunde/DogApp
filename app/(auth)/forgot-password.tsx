import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router'; // Import the useRouter hook from expo-router

export default function ForgotPassword() {
  const router = useRouter(); // Initialize the router
  const [isModalVisible, setModalVisible] = useState(false); // State to control the modal visibility

  // Define the onPress handler for navigating to the login screen
  const handleNavigateToLogin = () => {
    router.push('/');  
  };

  // Define the onPress handler for navigating to the register screen
  const handleNavigateToRegister = () => {
    router.push('/(auth)/register');  
  };

  // Define the onPress handler for showing the modal
  const handleSubmit = () => {
    setModalVisible(true); // Show the modal when the Submit button is clicked
  };

  // Define the onPress handler for closing the modal
  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Enter your email address"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      {/* Green Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Add TouchableOpacity for navigation to the Login screen */}
      <TouchableOpacity onPress={handleNavigateToLogin}>
        <Text style={styles.linkText}>Have an account? Login here!</Text>
      </TouchableOpacity>

      {/* Add TouchableOpacity for navigation to the Register screen */}
      <TouchableOpacity onPress={handleNavigateToRegister}>
        <Text style={styles.linkText}>Register now</Text>
      </TouchableOpacity>

      {/* Modal for the confirmation message */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Thanks for submitting. We will add the relevant authentication functionality later.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // Same background color as the login screen
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 40,
    fontWeight: 'bold', // Make the heading bold
  },
  inputGroup: {
    width: '50%',  // Center the input group horizontally
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%', // Input takes full width of the container
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
    backgroundColor: '#1e1e1e',
  },
  submitButton: {
    backgroundColor: '#4CAF50', // Green background for submit button
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
  linkText: {
    marginTop: 20,
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline', // Makes it look like a clickable link
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
