import { Public_Sans } from '@next/font/google';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider, type MantineThemeOverride } from '@mantine/core';

import { useTheme } from 'hooks';

import AuthProvider from 'components/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <AuthProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={themeFactory(theme)}>
        <NotificationsProvider>{children}</NotificationsProvider>
      </MantineProvider>
    </AuthProvider>
  );
}

const publicSans = Public_Sans({ subsets: ['latin'] });

const themeFactory: (color: 'light' | 'dark') => MantineThemeOverride = (colorScheme) => ({
  colorScheme,
  fontFamily: publicSans.style.fontFamily,
  globalStyles: (theme) => ({
    body: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0] },
  }),
});
