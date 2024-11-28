import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress?: () => void; 
};

export default function ResetPicture({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.resetButton}>
      <Ionicons name="refresh-outline" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    padding: 10, // Add padding for a touch-friendly area
    alignItems: "center", // Center the icon
    justifyContent: "center", // Center the icon
  },
});
