import { ActivityIndicator } from 'react-native';
import { Text, View, YStack } from 'tamagui';
import { useLoadingStore } from '../store';

export function LoadingScreen() {
  const { loading, message } = useLoadingStore((state) => ({
    loading: state.loading,
    message: state.message
  }));

  return (
    loading && (
      <YStack
        space={'$4'}
        position={'absolute'}
        top="$0"
        bottom="$0"
        left="$0"
        right="$0"
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        zIndex={100}
      >
        <View
          position={'absolute'}
          width={'100%'}
          height={'100%'}
          bg={'$color12'}
          opacity={0.8}
        />
        <ActivityIndicator size="large" />
        <Text fontSize={'$4'} color={'$color1'}>
          {message ?? 'Loading...'}
        </Text>
      </YStack>
    )
  );
}
