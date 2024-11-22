import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [prediction, setPrediction] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}
        />
        <Button 
          label={isLoading ? "Predicting..." : "Predict Breed"}
          onPress={uploadImage}
          disabled={isLoading || !selectedImage}
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
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
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
});

// {"assets": [{"assetId": null, "base64": null, "duration": null, "exif": null, "fileName": null, "fileSize": 359362, "height": 1000, "mimeType": "image/jpeg", "pairedVideoAsset": null, "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/EE19CCEE-A353-4CC1-93AC-CEF1595F9C3E/Library/Caches/ExponentExperienceData/@anonymous/MyNewApp-3abaffea-e108-483d-bbd4-e73c7ce01ece/ImagePicker/9A2A2ECB-CC92-481C-8080-C6EC49A95DD3.jpg", "width": 1000}], "canceled": false}
//this is the object :D
