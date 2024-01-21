import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { GetRef, InputProps, Input as TamaguiInput } from 'tamagui';

export const Input = forwardRef<
  GetRef<typeof TamaguiInput>,
  InputProps & {
    name: string;
    control?: ReturnType<typeof useFormContext>['control'];
    onChange?: (value: string) => void;
  }
>((props, ref) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue}
      render={({ field }) => (
        <TamaguiInput
          {...props}
          {...field}
          onChangeText={field.onChange}
          ref={ref}
        />
      )}
    />
  );
});
