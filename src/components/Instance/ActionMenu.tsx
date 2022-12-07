import { memo } from 'react';

import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useInstance, useChannel, useMessage } from 'stores';

import { IconTrash, IconDotsVertical, IconEdit, IconLambda } from '@tabler/icons';
import { ActionIcon, Menu, Modal } from '@mantine/core';
import CreateInstance from './CreateInstance';

type Props = {} & Instance;

const ActionMenu: React.FC<Props> = ({ name, clientOpts: opts }) => {
  const { replace } = useRouter();
  const [modal, setModal] = useDisclosure(false);

  const deleteInstance = useInstance((state) => state.remove);
  const deleteChannel = useChannel((state) => state.remove);
  const deleteMessage = useMessage((state) => state.remove);

  const handleDelete = () => {
    deleteInstance(opts.clientId);
    deleteChannel(opts.clientId);
    deleteMessage(opts.clientId);
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
          <Menu.Item icon={<IconEdit {...iconProps} />} onClick={setModal.open}>
            Edit Instance
          </Menu.Item>
          <Menu.Item icon={<IconLambda {...iconProps} />} onClick={setModal.open}>
            Functions
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
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

const iconProps = { size: 18, stroke: 1.77 };

export default memo(ActionMenu);
