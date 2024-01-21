import { axiosInstance } from './axiosInstance';

export enum VerifyPurpose {
  SIGN_UP = 'SIGN_UP',
  RESET_PASSWORD = 'RESET_PASSWORD'
}

export function signUp({
  email,
  name,
  password
}: {
  email: string;
  name: string;
  password: string;
}) {
  return axiosInstance.post('/auth/sign-up', {
    email,
    name,
    password,
    confirmPassword: password
  });
}

export function verifyCode({ email, code }: { email: string; code: string }) {
  return axiosInstance.post('/auth/verify-signup', null, {
    params: {
      email,
      code
    }
  });
}

export function signIn({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  return axiosInstance.post('/auth/sign-in', {
    email,
    password
  });
}

export function resetPassword({
  email,
  code,
  password
}: {
  email: string;

  code: string;
  password: string;
}) {
  return axiosInstance.post('/auth/reset-password', {
    email,
    code,
    password
  });
}

export function resendVerifyCode({
  email,
  purpose
}: {
  email: string;
  purpose: VerifyPurpose;
}) {
  return axiosInstance.post('/auth/resend-verify-code', null, {
    params: {
      email,
      purpose
    }
  });
}
