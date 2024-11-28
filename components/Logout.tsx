import { TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";  
import { Ionicons } from "@expo/vector-icons";

export default function Logout() {
  const router = useRouter();  


  const handleLogoutPress = () => {
    router.replace("/");
  };

  return (
    <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: "absolute", // Absolute positioning for top right
    top: 50, // Adjust to place it at the top of the screen
    right: 20, // Adjust to place it on the right of the screen
    zIndex: 1, // Ensure it's on top of other content
  },
});
