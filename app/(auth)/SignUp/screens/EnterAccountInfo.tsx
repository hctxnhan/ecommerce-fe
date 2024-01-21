import { Button, Heading, Label, Text, XStack, YStack } from 'tamagui';
import { Form, useMultiStepForm } from '../../../../components/Form';
import { Link } from 'expo-router';
import { Input } from '../../../../components/Input';

export function EnterAccountInfo() {
  const {
    form: { control }
  } = useMultiStepForm();
  return (
    <YStack h={'100%'} space="$4" position="relative">
      <Heading fontSize={'$10'} lineHeight={'$10'}>
        Sign up new account today
      </Heading>

      <YStack space="$3" justifyContent="space-between">
        <YStack>
          <Label fontSize={'$5'} htmlFor="name">
            Name
          </Label>
          <Input
            textContentType="name"
            id="name"
            placeholder="Enter your name"
            control={control}
            name="name"
          />
        </YStack>
        <YStack>
          <Label fontSize={'$5'} htmlFor="email">
            Email
          </Label>
          <Input
            textContentType="emailAddress"
            id="email"
            placeholder="Enter your email"
            name="email"
            control={control}
          />
        </YStack>
        <YStack>
          <Label fontSize={'$5'} htmlFor="password">
            Password
          </Label>
          <Input
            secureTextEntry
            textContentType="newPassword"
            id="password"
            placeholder="Enter your password"
            name="password"
            control={control}
          />
          <Form.FieldError name="password" />
        </YStack>
        <YStack>
          <Label fontSize={'$5'} htmlFor="repeat-password">
            Repeat password
          </Label>
          <Input
            secureTextEntry
            textContentType="newPassword"
            id="repeat-password"
            placeholder="Verify your password"
            name="repeatPassword"
            control={control}
          />
          <Form.FieldError name="repeatPassword" />
        </YStack>

        <Form.Trigger marginTop="$6" asChild>
          <Button size={'$5'}>Sign up</Button>
        </Form.Trigger>
      </YStack>
      <XStack
        justifyContent="flex-end"
        position="absolute"
        bottom={0}
        width={'100%'}
      >
        <Link href="/(auth)/Login">
          <Text color={'$blue10'} fontSize={'$4'} lineHeight={'$4'}>
            Login
          </Text>
        </Link>
      </XStack>
    </YStack>
  );
}
