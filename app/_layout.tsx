import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(auth)/index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(auth)/register" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(auth)/forgot-password" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="+not-found" 
      />
    </Stack>
  );
}
