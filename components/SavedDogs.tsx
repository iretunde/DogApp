import { View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getDogPicsByUser, getUser } from '@/api';
import { useAuth } from '@/contexts/AuthContext'

type DogPicture = {
  picture_id: number;
  user_id: number;
  image_url: string;
  first_guess_breed: string;
  first_guess_confidence: number;
};

type Props = {
  userId?: number;
  isOwnProfile?: boolean;
};

export default function SavedDogsComponent({ userId: propUserId, isOwnProfile }: Props) {
  const { userId: authUserId } = useAuth();
  const [dogPictures, setDogPictures] = useState<DogPicture[]>([]);
  const [username, setUsername] = useState<string>("");
  
  const effectiveUserId = propUserId || authUserId;

  useEffect(() => {
    if (!effectiveUserId) return;

    const fetchDogPics = async () => {
      try {
        const response = await getDogPicsByUser(effectiveUserId);
        setDogPictures(response);
        
        if (!isOwnProfile) {
          const userData = await getUser(effectiveUserId);
          setUsername(userData.username);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchDogPics();
  }, [effectiveUserId, isOwnProfile]);

  const renderDogItem = ({ item }: { item: DogPicture }) => (
    <View className="bg-gray-800 rounded-xl mb-4 p-4 mx-4 flex-row justify-between items-center">
      {item.image_url ? (
        <View className="w-40 aspect-square rounded-lg overflow-hidden">
          <Image
            source={{ uri: item.image_url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      ) : (
        <View className="w-20 h-20 rounded-lg bg-gray-700 items-center justify-center">
          <Text className="text-gray-400">No Image</Text>
        </View>
      )}

      <View className="items-end">
        <Text className="text-white text-lg font-semibold">
          {item.first_guess_breed.replace(/_/g, " ")}
        </Text>
        <Text className="text-white/80 mt-1">
          {item.first_guess_confidence.toFixed(1)}% confidence
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <Text className="text-white text-2xl font-bold text-center py-4">
        {isOwnProfile
          ? `Your Saved Dogs (${dogPictures.length})`
          : `${username}'s Saved Dogs (${dogPictures.length})`}
      </Text>
      <View className="w-full md:w-[50%] self-center flex-1">
        <FlatList
          data={dogPictures}
          renderItem={renderDogItem}
          keyExtractor={(item) => item.picture_id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
