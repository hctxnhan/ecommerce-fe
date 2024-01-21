import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { signUp, verifyCode } from '../../../api/auth';
import { Form } from '../../../components/Form';
import { EnterAccountInfo } from './screens/EnterAccountInfo';
import { EnterVerificationCode } from './screens/EnterVerificationCode';
import { useLoadingStore } from '../../../store';

const Schema = z
  .object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(8, 'Password must be at least 8 characters'),
    repeatPassword: z.string({
      required_error: 'Repeat password is required'
    }),
    verificationCode: z
      .array(z.coerce.number())
      .length(6, 'Verification code must be 6 digits')
      .nonempty()
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword']
  });

export default function SignUp() {
  const router = useRouter();
  const asyncAction = useLoadingStore((state) => state.asyncAction);

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Verification code sent!',
        text2: 'Please check your email for the verification code.'
      });
    },
    onError: (error) => {
      const errorMessages = (error as AxiosError).response?.data['message'];
      Toast.show({
        type: 'error',
        text1: 'Failed to sign up!',
        text2: errorMessages
      });
    }
  });

  const sendCodeMutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      router.push('/(auth)/Login');
      Toast.show({
        type: 'success',
        text1: 'Sign up successful!',
        text2: 'You can now login with your new account.'
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Verification code is invalid!',
        text2: 'Please check your email for the verification code.'
      });
    }
  });

  const sendInfo = asyncAction(
    async (data: z.infer<typeof Schema>) =>
      await signUpMutation.mutateAsync({
        email: data.email,
        name: data.name,
        password: data.password
      }),
    'Checking email availability...'
  );

  const sendVerificationCode = asyncAction(
    async (data: z.infer<typeof Schema>) => {
      await sendCodeMutation.mutateAsync({
        email: data.email,
        code: data.verificationCode.join('')
      });
    },
    'Verifying code...'
  );

  return (
    <Form.Provider
      schema={Schema}
      defaultValues={{
        email: '',
        name: '',
        verificationCode: [],
        password: '',
        repeatPassword: ''
      }}
    >
      <Form.Screen
        validationFields={['email', 'name', 'password', 'repeatPassword']}
        onNext={sendInfo}
      >
        <EnterAccountInfo />
      </Form.Screen>
      <Form.Screen
        validationFields={['verificationCode']}
        onNext={sendVerificationCode}
      >
        <EnterVerificationCode />
      </Form.Screen>
    </Form.Provider>
  );
}
