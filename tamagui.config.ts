import { config } from '@tamagui/config/v2';

import { createTamagui, createFont } from 'tamagui';

const fonts = {
  body: createFont({
    ...config.fonts.body,
    family: 'DMSans'
  }),
  heading: createFont({
    ...config.fonts.heading,
    family: 'DMSans'
  })
};

const appConfig = createTamagui({
  ...config,
  fonts,
});

export type AppConfig = typeof appConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig;
