import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AlertNotificationRoot } from 'react-native-alert-notification'; // Import AlertNotificationRoot

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinLight: require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AlertNotificationRoot>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </AlertNotificationRoot>
  );
}
