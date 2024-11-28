import { View } from 'react-native';
import SavedDogsComponent from '@/components/SavedDogs';

export default function SavedDogsScreen() {
  return (
    <View className="flex-1">
      <SavedDogsComponent />
    </View>
  );
}