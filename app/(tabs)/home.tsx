import { View, Text, StyleSheet } from "react-native";
import ProfilePicture from "@/components/ProfilePicture";
import { useState, useEffect } from "react";
import { getUser } from "@/api";

export default function Home() {
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    const loadUserProfile = async () => {
      const userData = await getUser(1);
      setProfileImage(userData.avatar_url);
    };

    loadUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <ProfilePicture imageUri={profileImage} onEditPress={() => {}} />
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Hi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    alignItems: "center",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 24,
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
