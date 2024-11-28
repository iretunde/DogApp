import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import CameraComponent from "@/components/Camera";
import Logout from "@/components/Logout";
import ResetPicture from "@/components/ResetPicture";

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
    } 
  };

  const handlePhotoCapture = (photo: any) => {
    setSelectedImage(photo.uri);
    setShowCamera(false);
  };

  const handleResetPicture = () => {
    setSelectedImage(undefined)
  }

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
      <Logout></Logout>
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
          
          {/* ResetPicture positioned using flexbox for better responsiveness */}
          <View style={styles.resetButtonContainer}>
          </View>

          <Button
            theme="primary"
            label="Take a photo"
            onPress={() => setShowCamera(true)}
            style={[styles.button, styles.buttonSpacing]} // Reduced spacing
          />
        </View>

        <Button 
          label={isLoading ? "Predicting..." : "Predict Breed"}
          onPress={uploadImage}
          disabled={isLoading || !selectedImage}
          style={styles.predictButton}
        />
        <ResetPicture onPress={handleResetPicture} />

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
    paddingTop: 50,
  },
  imageContainer: {
    marginBottom: 20, // Space between the image and buttons
  },
  footerContainer: {
    width: "100%", 
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonGroup: {
    flexDirection: "column", 
    alignItems: "center", 
    gap: 0.1, // Reduced gap between buttons
    width: "80%",
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 20, // Add horizontal padding for content
    alignItems: "center",  // Center the text inside the button
  },
  buttonSpacing: {
    marginTop: 1, // Reduced space between buttons
  },
  resetButtonContainer: {
    // Use flexbox to make positioning work better on both web and mobile
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Ensure buttons are placed side by side
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
    marginTop: 30,
    paddingHorizontal: 20, // Ensures consistent padding for this button too
  },
});
