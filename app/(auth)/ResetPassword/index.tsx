// @refresh reset
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import {
  VerifyPurpose,
  resendVerifyCode,
  resetPassword
} from '../../../api/auth';
import { Form } from '../../../components/Form';
import { useLoadingStore } from '../../../store';
import { EnterEmail } from './screens/EnterEmail';
import { EnterNewPassword } from './screens/EnterNewPassword';
import { EnterVerificationCode } from './screens/EnterVerificationCode';

const Schema = z
  .object({
    email: z.string().email(),
    verificationCode: z.array(z.coerce.number()).length(6).nonempty(),
    password: z.string().min(8),
    repeatPassword: z.string()
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
  });

export default function ResetPassword() {
  const router = useRouter();

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Password reset successful!',
        text2: 'You can now login with your new password.'
      });

      router.push('/(auth)/Login');
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Failed to reset password!',
        text2: 'Please try again.'
      });
    }
  });

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

  const onReset = asyncAction(
    async (data: z.infer<typeof Schema>) =>
      await resetPasswordMutation.mutateAsync({
        email: data.email,
        password: data.password,
        code: data.verificationCode.join('')
      }),
    'Resetting your password...'
  );

  const onResendCode = asyncAction(
    async (data: z.infer<typeof Schema>) =>
      await sendCodeMutation.mutateAsync({
        email: data.email,
        purpose: VerifyPurpose.RESET_PASSWORD
      }),
    'Sending verification code...'
  );

  return (
    <Form.Provider
      schema={Schema}
      defaultValues={{
        email: '',
        verificationCode: [],
        password: '',
        repeatPassword: ''
      }}
    >
      <Form.Screen onNext={onResendCode} validationFields={['email']}>
        <EnterEmail />
      </Form.Screen>
      <Form.Screen validationFields={['verificationCode']}>
        <EnterVerificationCode />
      </Form.Screen>
      <Form.Screen
        onNext={onReset}
        validationFields={['password', 'repeatPassword']}
      >
        <EnterNewPassword />
      </Form.Screen>
    </Form.Provider>
  );
}
