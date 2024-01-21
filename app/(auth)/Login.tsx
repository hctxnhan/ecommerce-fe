import { useMutation } from '@tanstack/react-query';
import { Link, Stack, useRouter } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import {
  Button,
  Form,
  Heading,
  Label,
  Text,
  XStack,
  YStack
} from 'tamagui';
import { signIn } from '../../api/auth';
import { useLoadingStore } from '../../store';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFieldError } from '../../components/FormFieldError';
import Toast from 'react-native-toast-message';
import { Input } from '../../components/Input';

const Schema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email(),
  password: z.string({
    required_error: 'Password is required'
  })
});

export default function Login() {
  const signInForm = useForm({
    resolver: zodResolver(Schema)
  });
  const router = useRouter();
  const asyncAction = useLoadingStore((state) => state.asyncAction);

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Login successful!',
        text2: 'Welcome back to MegaShop.'
      });

      router.push('/(home)/');
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to login!',
        text2: 'Please check your email and password.'
      });
    }
  });

  const onSubmit = asyncAction(
    async (data) => await signInMutation.mutateAsync(data)
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Login'
        }}
      />
      <KeyboardAvoidingView behavior="padding">
        <YStack pt="$8" h={'100%'} space="$4" position="relative">
          <Heading fontSize={'$10'} lineHeight={'$10'}>
            Welcome back to MegaShop
          </Heading>
          <Text color={'$gray10Dark'} fontSize={'$5'} marginBottom={'$6'}>
            Please login to your account to continue shopping.
          </Text>

          <Form onSubmit={signInForm.handleSubmit(onSubmit)}>
            <YStack space="$3" justifyContent="space-between">
              <YStack>
                <Label fontSize={'$5'} htmlFor="email">
                  Email
                </Label>
                <Input
                  textContentType="emailAddress"
                  id="email"
                  placeholder="Enter your email"
                  name='email'
                  control={signInForm.control}
                />
                <FormFieldError
                  errorMessage={
                    signInForm.formState.errors.email?.message as string
                  }
                />
              </YStack>
              <YStack>
                <Label fontSize={'$5'} htmlFor="password">
                  Password
                </Label>
                <Input
                  secureTextEntry
                  textContentType="password"
                  id="password"
                  placeholder="Enter your password"
                  name='password'
                  control={signInForm.control}
                />
                <FormFieldError
                  errorMessage={
                    signInForm.formState.errors.password?.message as string
                  }
                />
              </YStack>

              <Form.Trigger marginTop="$6" asChild>
                <Button size={'$5'}>Login</Button>
              </Form.Trigger>
            </YStack>
          </Form>
          <XStack
            justifyContent="space-between"
            position="absolute"
            bottom={0}
            width={'100%'}
          >
            <Link href="/(auth)/ResetPassword/">
              <Text color={'$gray10Dark'} fontSize={'$4'} lineHeight={'$4'}>
                Forgot password?
              </Text>
            </Link>
            <Link href="/(auth)/SignUp">
              <Text color={'$blue10'} fontSize={'$4'} lineHeight={'$4'}>
                Sign up
              </Text>
            </Link>
          </XStack>
        </YStack>
      </KeyboardAvoidingView>
    </>
  );
}
