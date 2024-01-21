import { forwardRef, useRef, useState } from 'react';
import { Input, XStack } from 'tamagui';

const OTPInputCell = forwardRef(
  (
    props: {
      value: number;
      onChange: (value: number) => void;
      onRemove: () => void;
      autoFocus?: boolean;
    },
    ref: any
  ) => {
    return (
      <Input
        ref={ref}
        flex={1}
        fontSize={'$6'}
        textAlign="center"
        maxLength={1}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        onChangeText={(text) => {
          if (text.length !== 1) {
            return;
          }

          const value = parseInt(text);
          if (!isNaN(value)) {
            props.onChange(value);
          }
        }}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace') {
            props.onRemove();
          }
        }}
        autoFocus={props.autoFocus}
        selectTextOnFocus
      />
    );
  }
);

interface OTPInputProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export function OTPInput({
  onChange: setOTP = () => {},
  value: otp = []
}: OTPInputProps) {
  const refs = useRef<any[]>([]);

  return (
    <XStack space="$4" justifyContent="center">
      {Array.from({ length: 6 }).map((_, index) => (
        <OTPInputCell
          ref={(ref) => {
            refs.current[index] = ref;
          }}
          key={index}
          value={otp[index]}
          onChange={(value) => {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);

            if (index < 5) {
              refs.current[index + 1].focus();
            }
          }}
          onRemove={() => {
            const newOTP = [...otp];
            newOTP[index] = undefined;
            setOTP(newOTP);

            if (index > 0) {
              refs.current[index - 1].focus();
            }
          }}
          autoFocus={index === 0}
        />
      ))}
    </XStack>
  );
}
