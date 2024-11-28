import { Stack } from "expo-router";
import { AuthProvider } from '@/contexts/AuthContext';
import "../global.css"

export default function RootLayout() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
