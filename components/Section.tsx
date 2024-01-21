import { Link } from 'expo-router';
import { H3, ScrollView, View, XStack, YStack, Text } from 'tamagui';
import { StyledLink } from './Button';

interface SectionProps {
  title: string;
  seeMore: string;
  description?: string;
}

export function Section({ title, seeMore, description }: SectionProps) {
  return (
    <YStack>
      <XStack justifyContent="space-between" alignItems="center" space={'$2'}>
        <H3 color={'$color12'}>{title}</H3>
        <Link href="">
          <Text color={'$blue10'} fontSize={'$3'} lineHeight={'$4'}>
            See more
          </Text>
        </Link>
      </XStack>
      <Text color={'$color10'} fontSize={'$5'}>
        {description}
      </Text>
      <ScrollView
        marginTop="$4"
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces
      >
        <XStack space="$4">
          <View w={'$16'} h={200} bg={'$green10'} />
          <View w={'$16'} h={200} bg={'$blue10'} />
          <View w={'$16'} h={200} bg={'$red10'} />
          <View w={'$16'} h={200} bg={'$pink10'} />
        </XStack>
      </ScrollView>
    </YStack>
  );
}
