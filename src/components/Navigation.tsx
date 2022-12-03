import { createStyles, Container, Group, Text } from '@mantine/core';

import InstanceTab from './InstancesTab';

type HeaderTabsProps = {};

export default function Navigation({}: HeaderTabsProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Text weight={600}>FlexiMQ</Text>
        </Group>
      </Container>
      <Container>
        <InstanceTab />
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
