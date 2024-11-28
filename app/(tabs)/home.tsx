import { View, Text } from "react-native";
import Logout from '@/components/Logout';
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfilePicture from "@/components/ProfilePicture";
import { useState, useEffect } from "react";
import { getUser, getLeaderboard } from "@/api";
import { useAuth } from '@/contexts/AuthContext';

type Props = {
  imageUri: string;
  onEditPress: (newAvatarUrl: string) => void;
};

type LeaderboardEntry = {
  user_id: number;
  username: string;
  total_pictures: number;
  unique_breeds_found: number;
  score: number;
};

export default function Home() {
  const { userId } = useAuth();
  const [profileImage, setProfileImage] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const loadUserProfile = async () => {
    if (!userId) return;
    const userData = await getUser(Number(userId));
    setProfileImage(userData.avatar_url);
  };

  const loadLeaderboard = async () => {
    const leaderboardData = await getLeaderboard();
    setLeaderboard(leaderboardData);
  };

  const handleAvatarUpdate = (newAvatarUrl: string) => {
    setProfileImage(newAvatarUrl);
  };

  useEffect(() => {
    loadUserProfile();
    loadLeaderboard();
  }, [userId]);

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView>
        <View className="p-4 items-center">
          <ProfilePicture 
            imageUri={profileImage} 
            onEditPress={handleAvatarUpdate} 
          />
          <Text className="text-white text-2xl font-bold mt-4">Welcome!</Text>
        </View>

        <Text className="text-white text-2xl font-bold text-center py-4">
          Top Dog Catchers
        </Text>

        <View className="w-full md:w-[50%] self-center">
          {leaderboard.map((entry, index) => (
            <View
              key={entry.user_id}
              className="bg-gray-800 rounded-xl mb-4 p-4 mx-4 flex-row justify-between items-center"
            >
              <View className="w-12 h-12 bg-green-600 rounded-full items-center justify-center mr-4">
                <Text className="text-white text-lg font-bold">
                  #{index + 1}
                </Text>
              </View>

              <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                  {entry.username}
                </Text>
                <Text className="text-white/80 mt-1">
                  Caught {entry.total_pictures} dogs
                </Text>
                <Text className="text-white/80">
                  Found {entry.unique_breeds_found} breeds
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-white text-lg font-bold">
                  {entry.score}
                </Text>
                <Text className="text-white/80 text-sm">points</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}