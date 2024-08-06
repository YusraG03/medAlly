import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ title: 'Results' }} />
      <Stack.Screen name="camera" options={{ title: 'Camera' }} />
    </Stack>
  );
}