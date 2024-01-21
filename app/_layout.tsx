import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from '../context/Provider';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic
} from '@expo-google-fonts/dm-sans';
import { HeaderBackButton } from '../components/Button';
import Toast from 'react-native-toast-message';
import { LoadingScreen } from '../components/LoadingScreen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [fontsLoaded] = useFonts({
  //   DMSans_400Regular,
  //   DMSans_400Regular_Italic,
  //   DMSans_500Medium,
  //   DMSans_500Medium_Italic,
  //   DMSans_700Bold,
  //   DMSans_700Bold_Italic
  // });

  const [fontsLoaded] = useFonts({
    DMSans: require('../assets/fonts/DMSans.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
          headerLeft: HeaderBackButton
        }}
      ></Stack>
      <LoadingScreen />
      <Toast keyboardOffset={100} type="success" />
    </Provider>
  );
}
