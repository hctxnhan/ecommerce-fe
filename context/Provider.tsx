import { TamaguiProvider, TamaguiProviderProps } from 'tamagui';
import appConfig from '../tamagui.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider
      config={appConfig}
      disableInjectCSS
      defaultTheme={'light'}
      {...rest}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
  );
}
