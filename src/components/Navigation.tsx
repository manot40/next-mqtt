import { createStyles, Container, Group, Text, Flex } from '@mantine/core';

import ThemeToggler from './ThemeToggler';
import { InstanceList } from './Instance';

type HeaderTabsProps = {};

export default function Navigation({}: HeaderTabsProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Flex justify="space-between">
          <Group position="apart">
            <Text weight={600}>FlexiMQ</Text>
          </Group>
          <Group position="apart">
            <ThemeToggler />
          </Group>
        </Flex>
      </Container>
      <Container>
        <InstanceList />
      </Container>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#FFF',
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
  },

  mainSection: {
    [theme.fn.smallerThan('md')]: {
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.md,
    },
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
}));
