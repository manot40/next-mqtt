import { memo, useState } from 'react';

import { useRouter } from 'next/router';
import { useInstance, useChannel, useMessage } from 'stores';

import CreateInstance from './CreateInstance';
import { FunctionEditor } from 'components/Function';
import { ActionIcon, Menu, Modal } from '@mantine/core';
import { IconTrash, IconDotsVertical, IconEdit, IconLambda } from '@tabler/icons';

const ActionMenu: React.FC<Instance> = ({ name, clientOpts: opts }) => {
  const { replace } = useRouter();
  const [modal, setModal] = useState<'instance' | 'function'>();

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
          <Menu.Item icon={<IconEdit {...iconProps} />} onClick={() => setModal('instance')}>
            Edit Instance
          </Menu.Item>
          <Menu.Item icon={<IconLambda {...iconProps} />} onClick={() => setModal('function')}>
            Functions
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item color="red" icon={<IconTrash {...iconProps} />} onClick={handleDelete}>
            Delete Instance
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <InstanceEditor name={name} opts={opts} active={modal === 'instance'} onClose={() => setModal(undefined)} />
      <FunctionEditor name={name} opts={opts} active={modal === 'function'} onClose={() => setModal(undefined)} />
    </>
  );
};

type InstanceEditorProps = {
  name: string;
  opts: ClientOpts;
  active: boolean;
  onClose: () => void;
};

function InstanceEditor({ name, opts, active, onClose }: InstanceEditorProps) {
  return (
    <Modal title={`Edit ${name}`} opened={active} onClose={onClose}>
      <CreateInstance isEdit onSubmitted={onClose} defaultWillValue={opts.will} defaultMetaValue={{ name, ...opts }} />
    </Modal>
  );
}

const iconProps = { size: 18, stroke: 1.77 };

export default memo(ActionMenu);
