import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="./account/login" options={{ title: 'Results' }} />
      <Stack.Screen name="./account/sign-up" options={{ title: 'Camera' }} />
    </Stack>
  );
}