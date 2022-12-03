import { Box, Stack, Container } from '@mantine/core';
import Navigation from 'components/Navigation';

export default function AppLayout({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Stack>
      <Navigation />
      <Box
        sx={(theme) => ({
          padding: 42,
          width: '100%',
          [theme.fn.smallerThan('md')]: {
            padding: '18px 0px',
          },
        })}>
        <Container>{children}</Container>
      </Box>
    </Stack>
  );
}
