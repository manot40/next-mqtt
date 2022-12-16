import type { ScriptDefinition } from 'stores/useScript';

import { memo, useState } from 'react';

import { TopicAutocomplete } from 'components/reusable';
import { Group, Select, Text, TextInput } from '@mantine/core';

type FuncMeta = Omit<ScriptDefinition, 'id' | 'script' | 'template'>;

type FuncMetaProps = {
  value?: FuncMeta;
  clientId: string;
  onChange?: (value: FuncMeta) => void;
};

const Meta = ({ clientId, value, onChange }: FuncMetaProps) => {
  const [data, setData] = useState({} as FuncMeta);

  const handleChange = (val: string, key: keyof FuncMeta) => {
    if (value && onChange) onChange({ ...value, [key]: val });
    else setData((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <Group spacing={12}>
      <TextInput
        maw={170}
        placeholder="Function name"
        value={(value ? value.name : data.name) || ''}
        onChange={(e) => handleChange(e.target.value, 'name')}
      />
      <Text>will execute when</Text>
      <Select
        maw={170}
        data={executeWhenList}
        value={(value ? value.runOn : data.runOn) || 'connected'}
        onChange={(v) => v && handleChange(v, 'runOn')}
      />
      {(value ? value.runOn : data.runOn) === 'message' && (
        <>
          <Text>and message contains</Text>
          <TextInput
            maw={170}
            placeholder="blank to any message"
            value={(value ? value.message : data.message) || ''}
            onChange={(e) => handleChange(e.target.value, 'message')}
          />
          <Text>on topic</Text>
          <TopicAutocomplete
            maw={170}
            clientId={clientId}
            placeholder="blank to any topic"
            value={(value ? value.topic : data.topic) || ''}
            onChange={(e) => handleChange(e, 'topic')}
          />
        </>
      )}
    </Group>
  );
};

const executeWhenList = [
  { label: 'Connected', value: 'connected' },
  { label: 'Disconnected', value: 'disconnected' },
  { label: 'Message Receive', value: 'message' },
];

export default memo(Meta);
