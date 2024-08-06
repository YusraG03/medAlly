import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="results" 
        options={{ 
          title: 'Results', 
          headerBackTitle: 'Back'  // or 'Home' if you prefer
        }} 
      />
    </Stack>
  );
}
