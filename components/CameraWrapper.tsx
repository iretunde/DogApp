import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CameraWrapper({ children, className = "" }: Props) {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className={`flex-1 bg-gray-900 ${className}`}
      style={{
        paddingTop: Math.max(insets.top, 16),
      }}
    >
      {children}
    </View>
  );
}