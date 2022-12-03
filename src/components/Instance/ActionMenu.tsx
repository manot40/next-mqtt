import { memo } from 'react';

import { useRouter } from 'next/router';
import { useInstance } from 'stores';
import { useDisclosure } from '@mantine/hooks';

import { IconTrash, IconDotsVertical, IconEdit } from '@tabler/icons';
import { ActionIcon, Menu, Modal } from '@mantine/core';
import CreateInstance from './CreateInstance';

type Props = {} & Instance;

const ActionMenu: React.FC<Props> = ({ name, clientOpts: opts }) => {
  const { replace } = useRouter();
  const [modal, setModal] = useDisclosure(false);

  const deleteInstance = useInstance((state) => state.remove);

  const handleDelete = () => {
    deleteInstance(opts.clientId);
    replace('/');
  };

  return (
    <>
      <Menu withArrow shadow="sm">
        <Menu.Target>
          <ActionIcon>
            <IconDotsVertical {...iconProps} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item color="dark" icon={<IconEdit {...iconProps} />} onClick={setModal.open}>
            Edit Instance
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash {...iconProps} />} onClick={handleDelete}>
            Delete Instance
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal title={`Edit ${name}`} opened={modal} onClose={setModal.close}>
        <CreateInstance
          isEdit
          onSubmitted={setModal.close}
          defaultWillValue={opts.will}
          defaultMetaValue={{ name, ...opts }}
        />
      </Modal>
    </>
  );
};

const iconProps = { size: 18, stroke: 1.66 };

export default memo(ActionMenu);
