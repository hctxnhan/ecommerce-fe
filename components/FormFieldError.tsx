import { Text } from 'tamagui';

export function FormFieldError({ errorMessage }: { errorMessage?: string }) {
  return errorMessage ? (
    <Text color={'$red10'} fontSize={'$3'}>
      {errorMessage}
    </Text>
  ) : null;
}
