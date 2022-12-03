import { useMemo } from 'react';
import { useLocalStorage, useColorScheme } from '@mantine/hooks';

export function useTheme() {
  const defaultValue = useColorScheme();

  const [chosen, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>({
    key: 'theme',
    defaultValue,
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

  const theme = useMemo(() => (chosen === 'system' ? 'dark' : chosen), [chosen]);

  return { theme, chosen, toggleTheme, setTheme };
}
