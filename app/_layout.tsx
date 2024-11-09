import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(home)/index" options={{ title: 'Easy Pay' }} />
    </Stack>
  );
}
