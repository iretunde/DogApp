import { View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import CameraComponent from "@/components/Camera";
import Logout from "@/components/Logout";
import ResetPicture from "@/components/ResetPicture"
import DogID from "@/components/DogID";
import { predictBreed } from "@/api";
import { useAuth } from '@/contexts/AuthContext';

const PlaceholderImage = require("@/assets/images/background-image.png");

type Prediction = {
  breed: string;
  confidence: number;
};

export default function Camera() {
  const { userId } = useAuth();
  const insets = useSafeAreaInsets();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
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
    if (!selectedImage || !userId) return;
    setIsLoading(true);
    try {
      let imageFile = Platform.OS === "web"
        ? await (await fetch(selectedImage)).blob()
        : {
            uri: Platform.OS === "ios" ? selectedImage.replace("file://", "") : selectedImage,
            type: "image/jpeg",
            name: "image.jpg",
          };
  
      const result = await predictBreed(imageFile, userId);
      setPredictions(result.data.predictions.predictions);
    } catch (error: any) {
      console.error(error);
      alert("Failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (showCamera) {
    return <CameraComponent onPhotoCapture={handlePhotoCapture} />;
  }

  return (
    <View
      className="flex-1 bg-gray-900"
      style={{
        paddingTop: Math.max(insets.top, 16),
      }}
    >
      {selectedImage && predictions.length > 0 ? (
        <DogID image={selectedImage} predictions={predictions} />
      ) : (
        <View className="flex-1 items-center justify-center pb-8">
          <View className="mb-24">
            <ImageViewer
              imgSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
          </View>
          <View className="items-center">
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <View style={{ height: 12 }} />
            <Button
              theme="primary"
              label="Take a photo"
              onPress={() => setShowCamera(true)}
            />
            <View style={{ height: 12 }} />
            <Button
              label={isLoading ? "Predicting..." : "Predict Breed"}
              onPress={uploadImage}
              disabled={isLoading || !selectedImage}
            />
          </View>
        </View>
      )}
    </View>
  );
}

