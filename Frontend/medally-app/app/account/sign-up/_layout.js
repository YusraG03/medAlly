import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Credentials' }} />
      <Stack.Screen name="general-information" options={{ title: 'General Info' }} />
      <Stack.Screen name="physical-habits" options={{ title: 'Physical Habits' }} />
      <Stack.Screen name="medical-history-one" options={{ title: 'Medical (1/2)' }} />
      <Stack.Screen name="medical-history-two" options={{ title: 'Medical (2/2)' }} />
      <Stack.Screen name="nutrition-habits" options={{ title: 'Nutrition Habits' }} />
    </Stack>
  );
}