import { useInstance } from 'stores';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';

import Link from 'next/link';
import { IconPlus } from '@tabler/icons';
import { Tabs, Text, Flex, Modal, createStyles } from '@mantine/core';

import { CreateInstance } from 'components/Instance';

export default function InstanceTab() {
  const { query } = useRouter();
  const { tab, tabsList } = useStyles().classes;
  const [modal, setModal] = useDisclosure(false);

  const instances = useInstance((state) => state.data);

  const TabItems = instances.map(({ name, clientOpts }) => (
    <Link href={`/${clientOpts.clientId}`} key={clientOpts.clientId}>
      <Tabs.Tab value={clientOpts.clientId}>{name || 'Blank'}</Tabs.Tab>
    </Link>
  ));

  return (
    <Flex align="center" gap={8}>
      <Tabs defaultValue={query.clientId as string} classNames={{ tab, tabsList }}>
        <Tabs.List>{TabItems}</Tabs.List>
      </Tabs>
      <Flex onClick={setModal.open} py={18} style={{ cursor: 'pointer' }} align="center" h={24}>
        <IconPlus size={16} stroke={1.33} />
        {!instances.length && (
          <Text ml={4} size={12} component="span">
            New Instance
          </Text>
        )}
      </Flex>
      <Modal title="New Instance" opened={modal} onClose={setModal.close}>
        <CreateInstance onSubmitted={setModal.close} />
      </Modal>
    </Flex>
  );
}

const useStyles = createStyles(() => ({
  tabsList: {
    borderBottom: '0 !important',
    '>a': {
      color: 'inherit',
      textDecoration: 'inherit',
    },
  },

  tab: {
    height: 38,
    fontWeight: 400,
    borderBottom: 1,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: 'transparent',
      borderBottom: '1px solid #C0C0C0',
    },

    '&[data-active]': {
      fontWeight: 600,
      borderBottom: '1px solid #228be6',
    },
  },
}));
