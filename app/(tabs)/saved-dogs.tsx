import { View } from 'react-native';
import SavedDogsComponent from '@/components/SavedDogs';
import Logout from '@/components/Logout';

export default function SavedDogsScreen() {
  return (
    <View className="flex-1">
      <Logout />
      <SavedDogsComponent />
    </View>
  );
}