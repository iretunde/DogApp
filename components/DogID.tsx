import { View, Text, Image } from "react-native";

type DogIDProps = {
  image: string;
  predictions: {
    breed: string;
    confidence: number;
  }[];
}

export default function DogID({ image, predictions }: DogIDProps) {
  return (
    <View className="items-center p-4 w-full">
      <View className="rounded-2xl overflow-hidden mb-6">
        <Image 
          source={{ uri: image }} 
          className="w-[380px] h-[500px]"
          resizeMode="contain"
        />
      </View>
      <View className="bg-white/20 rounded-lg p-4 w-full max-w-[40rem]">
        {predictions?.map((pred, index) => (
          <View key={index}>
            <View className="flex-row justify-between py-3">
              <Text className="text-white text-lg capitalize flex-1 pr-4">
                {pred.breed.replace(/_/g, ' ')}
              </Text>
              <Text className="text-white text-lg">
                {pred.confidence.toFixed(1)}%
              </Text>
            </View>
            {index < predictions.length - 1 && (
              <View className="h-[1px] bg-white/20" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}