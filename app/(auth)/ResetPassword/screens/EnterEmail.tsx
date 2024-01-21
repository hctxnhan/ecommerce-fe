import { Button, Heading, Input, Label, Text, YStack } from 'tamagui';
import { Form, useMultiStepForm } from '../../../../components/Form';
import { Link } from 'expo-router';
import { Controller } from 'react-hook-form';

export function EnterEmail() {
  const {
    form: { control }
  } = useMultiStepForm();
  return (
    <YStack h={'100%'} space="$4" position="relative">
      <Heading fontSize={'$10'} lineHeight={'$10'}>
        Reset password{' '}
      </Heading>
      <Text color={'$gray10Dark'} fontSize={'$5'} marginBottom={'$6'}>
        Enter your email below to receive your password reset verification code.
      </Text>
      <YStack space="$3" justifyContent="space-between">
        <YStack>
          <Label fontSize={'$5'} htmlFor="email">
            Email
          </Label>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Input
                textContentType="emailAddress"
                id="email"
                placeholder="Enter your email"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
            control={control}
          />
          <Form.FieldError name="email" />
        </YStack>

        <Form.Trigger asChild marginTop="$6">
          <Button size={'$5'}>
            Send code
          </Button>
        </Form.Trigger>

        <Text textAlign="center" fontSize={'$4'} lineHeight={'$4'}>
          Not intended?{' '}
          <Link href="/(auth)/Login">
            <Text color={'$blue10'}>Back to login.</Text>
          </Link>
        </Text>
      </YStack>
    </YStack>
  );
}
