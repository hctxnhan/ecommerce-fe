import { Controller } from 'react-hook-form';
import { Heading, Label, Text, YStack } from 'tamagui';
import { StyledButton } from '../../../../components/Button';
import { Form, useMultiStepForm } from '../../../../components/Form';
import { OTPInput } from '../../../../components/OTPInput';
import { useLoadingStore } from '../../../../store';
import Toast from 'react-native-toast-message';
import { VerifyPurpose, resendVerifyCode } from '../../../../api/auth';
import { useMutation } from '@tanstack/react-query';

export function EnterVerificationCode() {
  const {
    form: { control, getValues }
  } = useMultiStepForm();

  const sendCodeMutation = useMutation({
    mutationFn: resendVerifyCode,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Verification code sent!',
        text2: 'Please check your email for the verification code.'
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Failed to send verification code!',
        text2: 'Please try again.'
      });
    }
  });

  const asyncAction = useLoadingStore((state) => state.asyncAction);

  const onResendCode = asyncAction(async () => {
    await sendCodeMutation.mutateAsync({
      email: getValues('email'),
      purpose: VerifyPurpose.RESET_PASSWORD
    });
  }, 'Sending verification code...');

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
          <Form.FieldError name="verificationCode" />
        </YStack>

        <Form.Trigger asChild marginTop="$6">
          <StyledButton size={'$5'}>Submit</StyledButton>
        </Form.Trigger>

        <Text textAlign="center" fontSize={'$5'} lineHeight={'$4'}>
          Not received?{' '}
          <StyledButton onPress={onResendCode} isLink>
            Send again.
          </StyledButton>
        </Text>
      </YStack>
    </YStack>
  );
}
