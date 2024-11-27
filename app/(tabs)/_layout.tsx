import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="saved-dogs"
        options={{
          headerShown: false, 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
            name={focused ? "bookmark" : "bookmark-outline"}
            color={color}
            size={24}
            />
          ),
        }}
        />
      
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false, 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          headerShown: false, // Hide the title in the header
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="camera"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
