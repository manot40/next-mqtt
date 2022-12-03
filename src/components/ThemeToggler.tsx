import { useTheme } from 'hooks';

import { UnstyledButton } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons';

export default function ThemeToggler() {
  const { chosen, toggleTheme } = useTheme();

  const Icon = (() => {
    switch (chosen) {
      case 'light':
        return IconSun;
      case 'dark':
        return IconMoon;
      default:
        return IconDeviceDesktop;
    }
  })();

  return (
    <UnstyledButton onClick={toggleTheme}>
      <Icon size={20} />
    </UnstyledButton>
  );
}
