import { Link } from 'expo-router';
import { Button, Heading, Label, Text, YStack } from 'tamagui';
import { Form, useMultiStepForm } from '../../../../components/Form';
import { OTPInput } from '../../../../components/OTPInput';
import { Controller } from 'react-hook-form';
import { StyledButton } from '../../../../components/Button';

export function EnterVerificationCode() {
  const {
    form: { control },
    isFieldValid
  } = useMultiStepForm();

  return (
    <YStack h={'100%'} space="$4" position="relative">
      <Heading fontSize={'$10'} lineHeight={'$10'}>
        Sign up new account today
      </Heading>
      <Text color={'$gray10Dark'} fontSize={'$5'} marginBottom={'$6'}>
        We have sent verification code to your email. Please enter the code
        below.
      </Text>
      <YStack space="$3" justifyContent="space-between">
        <YStack>
          <Label fontSize={'$5'} htmlFor="email">
            Verification code
          </Label>

          <Controller
            render={({ field: { onChange, value } }) => (
              <OTPInput value={value} onChange={onChange} />
            )}
            name="verificationCode"
            control={control}
          />
        </YStack>

        <Form.Trigger asChild marginTop="$6" disabled>
          <StyledButton isDisabled size={'$5'}>
            Submit
          </StyledButton>
        </Form.Trigger>

        <Text textAlign="center" fontSize={'$4'} lineHeight={'$4'}>
          Not received?{' '}
          <Link href="/(auth)/Login">
            <Text color={'$blue10'}>Send again.</Text>
          </Link>
        </Text>
      </YStack>
    </YStack>
  );
}
