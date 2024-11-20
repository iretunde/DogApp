import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useState } from "react";

import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [prediction, setPrediction] = useState()

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri, type: 'image/jpeg', name: 'dog.jpg'
      } as any)
      const response = await fetch('http://localhost:3000/predict', {
        method: 'POST',
        body: formData,
        headers: {'Content-type': 'multipart/form-data'}
      })
      const result = await response.json();
      if (result.success) {
        setPrediction(result.predictions)
        console.log(prediction);
      }
    } catch (error) {
      console.error('Error: ', error)
      alert('Upload failed.')
    }
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
        <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}
        />
        <Button label="Use this photo"/>
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
});

// {"assets": [{"assetId": null, "base64": null, "duration": null, "exif": null, "fileName": null, "fileSize": 359362, "height": 1000, "mimeType": "image/jpeg", "pairedVideoAsset": null, "type": "image", "uri": "file:///var/mobile/Containers/Data/Application/EE19CCEE-A353-4CC1-93AC-CEF1595F9C3E/Library/Caches/ExponentExperienceData/@anonymous/MyNewApp-3abaffea-e108-483d-bbd4-e73c7ce01ece/ImagePicker/9A2A2ECB-CC92-481C-8080-C6EC49A95DD3.jpg", "width": 1000}], "canceled": false}
//this is the object :D
