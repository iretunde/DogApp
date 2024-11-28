import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { editUserAvatar } from "@/api";

type Props = {
  imageUri: string;
  onEditPress: (newAvatarUrl: string) => void;
};

export default function ProfilePicture({ imageUri, onEditPress }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    setIsUploading(true);
    try {
      const imageFile = Platform.OS === "web" 
        ? await (await fetch(uri)).blob()
        : {
            uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
            type: "image/jpeg",
            name: "avatar.jpg",
          };

      const updatedUser = await editUserAvatar(1, imageFile);
      onEditPress(updatedUser.avatar_url);
    } catch (error: any) {
      console.error(error);
      alert("Failed to update profile picture: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        contentFit="cover"
      />
      <TouchableOpacity 
        style={[styles.editButton, isUploading && styles.editButtonDisabled]}
        onPress={pickImage}
        disabled={isUploading}
      >
        <AntDesign name={isUploading ? "loading1" : "edit"} size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 100,
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonDisabled: {
    backgroundColor: "#A5D6A7",
  }
});
