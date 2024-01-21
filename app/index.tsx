import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Button, View, YStack } from 'tamagui';
import { useLoadingStore } from '../store';

export default function Homepage() {
  const router = useRouter();
  const { show } = useLoadingStore((state) => ({
    show: state.showLoading
  }));

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
      <View bg={'$color1'} height={'100%'}>
        <SafeAreaView
          style={{
            flex: 1
          }}
        >
          <YStack
            space={'$4'}
            padding="$4"
            position="absolute"
            bottom="$0"
            w={'100%'}
            bg={'$color1'}
          >
            {/* <Button
              onPress={() => {
                show('This is message when loading');
              }}
              size={'$5'}
            >
              Loading
            </Button> */}
            <Button
              size={'$5'}
              onPress={() => {
                router.push('/(auth)/Login');
              }}
            >
              Login
            </Button>
            <Button
              onPress={() => {
                router.push('/(auth)/SignUp');
              }}
              size={'$5'}
            >
              Sign Up
            </Button>
            <Button
              onPress={() => {
                router.push('/(home)');
              }}
              size={'$5'}
            >
              Home
            </Button>
          </YStack>
        </SafeAreaView>
      </View>
    </>
  );
}
