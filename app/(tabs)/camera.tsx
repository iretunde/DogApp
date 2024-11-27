import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import CameraComponent from "@/components/Camera";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Camera() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [prediction, setPrediction] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select an image.");
    }
  };

  const handlePhotoCapture = (photo: any) => {
    setSelectedImage(photo.uri);
    setShowCamera(false);
  };

  const uploadImage = async () => {
    if (!selectedImage) return alert("Select image first");
  
    setIsLoading(true);
    try {
      const formData = new FormData();
  
      if (Platform.OS === 'web') {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append('file', blob, 'image.jpg');
      } else {
        formData.append('file', {
          uri: Platform.OS === 'ios' ? selectedImage.replace('file://', '') : selectedImage,
          type: 'image/jpeg',
          name: 'image.jpg'
        } as any);
      }
  
      const result = await fetch('https://sorei9240-dog-id-api.hf.space/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!result.ok) {
        const error = await result.text();
        throw new Error(error);
      }
      setPrediction((await result.json()).predictions);
    } catch (error: any) {
      console.error(error);
      alert('Failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (showCamera) {
    return <CameraComponent onPhotoCapture={handlePhotoCapture} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.buttonGroup}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
            style={styles.button}
          />
          <Button
            theme="primary"
            label="Take a photo"
            onPress={() => setShowCamera(true)}
            style={styles.button}
          />
        </View>
        
        {/* Add some space here between the buttons */}
        <View style={styles.spaceBetweenButtons}></View>
        
        {/* Predict Breed button */}
        <Button 
          label={isLoading ? "Predicting..." : "Predict Breed"}
          onPress={uploadImage}
          disabled={isLoading || !selectedImage}
          style={styles.predictButton} // Apply custom style to this button
        />
        
        {prediction && (
          <ScrollView style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              {JSON.stringify(prediction, null, 2)}
            </Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    paddingTop: 50, // Adjusted padding for the top of the screen
  },
  imageContainer: {
    flex: 1,
    marginBottom: 0, // Removed margin to make the buttons appear directly below the image
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    paddingTop: 0, // Removed paddingTop to reduce gap between image and buttons
  },
  buttonGroup: {
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center', // Center buttons horizontally
    gap: 5, // Reduced gap to bring buttons closer together
    width: '80%', // Limit width of button group to ensure it stays within bounds
  },
  button: {
    width: '100%', // Make buttons take up the full width of the button group
  },

  spaceBetweenButtons: {
    height: 5, // Reduced height for smaller gap
  },
  predictionContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffffff20",
    borderRadius: 8,
    maxHeight: 200,
  },
  predictionText: {
    color: "#ffffff",
    fontSize: 16,
  },
  predictButton: {
    marginTop: 10,  // Reduced margin to bring button closer
  },
});
