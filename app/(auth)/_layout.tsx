import { Slot, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { View } from 'tamagui';

export default function RootLayout() {
  return (
    <View height={'100%'} bg={'$color1'} padding="$4">
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <Slot />
      </SafeAreaView>
    </View>
  );
}
