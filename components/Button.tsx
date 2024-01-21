import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { Button, styled } from 'tamagui';

export const StyledButton = styled(Button, {
  variants: {
    isIcon: {
      true: {
        padding: '$2',
        borderRadius: 9999,
        backgroundColor: '$color1',
        color: '$color12'
      }
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed'
      }
    },
    isLink: {
      true: {
        backgroundColor: 'transparent',
        padding: 0,
        color: '$blue10',
        fontSize: '$4',
        pressStyle: {
          backgroundColor: 'transparent',
          border: 'none'
        }
      }
    }
  } as const
});

export function HeaderBackButton() {
  const router = useRouter();
  return (
    <StyledButton
      isIcon
      onPress={() => {
        router.back();
      }}
      icon={<ArrowLeft size={24} />}
    />
  );
}
