import { Search } from '@tamagui/lucide-icons';
import { Input, View } from 'tamagui';
import { StyledButton } from './Button';

export function SearchBar() {
  return (
    <View
      width={'100%'}
      flexDirection={'row'}
      alignItems={'center'}
      py={'$2'}
      pl={'$4'}
      pr={'$2'}
      borderRadius={'$2'}
      borderWidth={1}
      borderColor={'$color7'}
    >
      <Input
        placeholder={'Search'}
        bg={'$color1'}
        padding={0}
        flex={1}
        borderWidth={0}
      ></Input>
      <StyledButton isIcon color={'$color7'} icon={<Search size={24} />} />
    </View>
  );
}
