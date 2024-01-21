import { Bell, ShoppingBag } from '@tamagui/lucide-icons';
import { Slot, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Text, View, XStack } from 'tamagui';
import { HeaderBackButton, StyledButton } from '../../components/Button';
export default function MainLayout() {
  return (
    <View flex={1} bg={'$color1'}>
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <Stack.Screen
          options={{
            title: 'Home',
            headerRight(props) {
              return (
                <XStack space={'$3'}>
                  <StyledButton isIcon icon={<Bell size={24} />} />
                  <StyledButton isIcon icon={<ShoppingBag size={24} />} />
                </XStack>
              );
            },
            headerLeft: HeaderBackButton
          }}
        />

        <Slot />
      </SafeAreaView>
    </View>
  );
}
