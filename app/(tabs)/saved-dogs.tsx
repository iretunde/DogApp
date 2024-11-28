import { View } from "react-native";
import SavedDogsComponent from "@/components/SavedDogs";
import { useLocalSearchParams } from "expo-router";
import Logout from "@/components/Logout";

export default function SavedDogsScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  return (
    <View className="flex-1">
      <Logout />
      <SavedDogsComponent
        userId={userId ? parseInt(userId) : undefined}
        isOwnProfile={!userId}
      />
    </View>
  );
}
