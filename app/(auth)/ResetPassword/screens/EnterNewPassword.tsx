import { Button, Heading, Input, Label, Text, YStack } from 'tamagui';
import { Form, useMultiStepForm } from '../../../../components/Form';
import Toast from 'react-native-toast-message';
import { Controller } from 'react-hook-form';

export function EnterNewPassword() {
  const {
    form: { control }
  } = useMultiStepForm();

  return (
    <YStack h={'100%'} space="$4" position="relative">
      <Heading fontSize={'$10'} lineHeight={'$10'}>
        Reset password{' '}
      </Heading>
      <Text color={'$gray10Dark'} fontSize={'$5'} marginBottom={'$6'}>
        We have sent verification code to your email. Please enter the code
        below.
      </Text>
      <YStack space="$3" justifyContent="space-between">
        <YStack>
          <Label fontSize={'$5'} htmlFor="password">
            Password
          </Label>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry
                textContentType="newPassword"
                id="password"
                placeholder="Enter your password"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            control={control}
          />
          <Form.FieldError name="password" />
        </YStack>
        <YStack>
          <Label fontSize={'$5'} htmlFor="repeat-password">
            Repeat password
          </Label>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Input
                secureTextEntry
                textContentType="newPassword"
                id="repeat-password"
                placeholder="Verify your password"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="repeatPassword"
            control={control}
          />
          <Form.FieldError name="repeatPassword" />
        </YStack>

        <Form.Trigger asChild marginTop="$6">
          <Button size={'$5'}>Reset password</Button>
        </Form.Trigger>
      </YStack>
    </YStack>
  );
}
