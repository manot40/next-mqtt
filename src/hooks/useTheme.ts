import { useMemo } from 'react';
import { useLocalStorage, useColorScheme } from '@mantine/hooks';

export function useTheme() {
  const systemTheme = useColorScheme();

  const [chosen, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>({
    key: 'theme',
    defaultValue: 'system',
    getInitialValueInEffect: true,
  });

  const toggleTheme = () => {
    switch (chosen) {
      case 'light':
        return setTheme('dark');
      case 'dark':
        return setTheme('system');
      case 'system':
        return setTheme('light');
    }
  };

  // eslint-disable-next-line
  const theme = useMemo(() => (chosen === 'system' ? systemTheme : chosen), [chosen]);

  return { theme, chosen, toggleTheme, setTheme };
}
