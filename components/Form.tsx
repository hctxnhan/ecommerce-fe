import { zodResolver } from '@hookform/resolvers/zod';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { FormTriggerProps, Form as TamaguiForm, Text } from 'tamagui';
import { ZodSchema } from 'zod';
import { FormFieldError } from './FormFieldError';

const formContext = createContext({
  currentScreen: 0,
  setCurrentScreen: (screen: number) => {},
  nextScreen: () => {},
  isFieldValid: (name: string) => false as boolean,
  form: {} as UseFormReturn<any>
});

interface FormProps {
  children: ReactNode;
  schema: ZodSchema<any>;
  defaultValues: any;
}

export function FormProvider({ children, schema, defaultValues }: FormProps) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [screenList, setScreenList] = useState<
    {
      validate: () => Promise<boolean>;
      onNext: (data: any) => Promise<void>;
    }[]
  >();
  const form = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  });

  function isFieldValid(name: string) {
    return !form.formState.errors[name];
  }

  function validateChildren() {
    const childrenArray = Array.isArray(children) ? children : [children];

    const validChildren = [FormScreen, FormNextTrigger];

    const childrenValid = childrenArray.every((child) => {
      return typeof child === 'object' && validChildren.includes(child.type);
    });

    return childrenValid;
  }

  function registerChildren() {
    const childrenArray = Array.isArray(children) ? children : [children];

    const screens = childrenArray
      .filter((child) => child.type === FormScreen)
      .map((child) => ({
        validate: async () => {
          return child.props.validationFields?.length
            ? await form.trigger(child.props.validationFields)
            : true;
        },
        onNext: child.props.onNext
      }));

    setScreenList(screens);
  }

  useEffect(() => {
    registerChildren();
  }, []);

  async function nextScreen() {
    if (screenList?.length) {
      const screen = screenList[currentScreen];
      const isValid = await screen.validate();
      if (isValid) {
        await screen?.onNext?.(form.getValues());

        if (currentScreen === screenList.length - 1) return;

        setCurrentScreen(currentScreen + 1);
      }
    }
  }

  const isChildrenValid = validateChildren();
  if (!isChildrenValid) {
    throw new Error('Form children must be a FormScreen or FormNextTrigger');
  }

  return (
    <formContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        nextScreen,
        form,
        isFieldValid
      }}
    >
      <TamaguiForm onSubmit={nextScreen}>
        {Array.isArray(children) ? children[currentScreen] : children}
      </TamaguiForm>
    </formContext.Provider>
  );
}

interface FormScreenProps {
  onNext?: (data: any) => void;
  children: ReactNode | ((props: any) => ReactNode);
  validationFields?: string[];
}

export function FormScreen({
  children,
  onNext,
  validationFields
}: FormScreenProps) {
  const context = useContext(formContext);
  if (!context) {
    throw new Error('FormScreen must be used inside a Form');
  }

  return typeof children === 'function' ? children({ context }) : children;
}

export function FieldError({ name }: { name: string }) {
  const context = useContext(formContext);
  if (!context) {
    throw new Error('FormFieldError must be used inside a Form');
  }

  return (
    <FormFieldError
      errorMessage={context.form.formState.errors[name]?.message as string}
    />
  );
}

type FormNextTriggerProps = FormTriggerProps;

export function FormNextTrigger(props: FormNextTriggerProps) {
  const context = useContext(formContext);
  if (!context) {
    throw new Error('FormNextTrigger must be used inside a Form');
  }

  return <TamaguiForm.Trigger {...props} />;
}

export function useMultiStepForm() {
  const context = useContext(formContext);
  if (!context) {
    throw new Error('useMultiStepForm must be used inside a Form');
  }

  return context;
}

export const Form = {
  Provider: FormProvider,
  Screen: FormScreen,
  Trigger: FormNextTrigger,
  FieldError: FieldError
};
