import type { ScriptDefinition } from 'stores/useScript';

import { debounce } from 'utils';
import { memo, useState, useEffect, useCallback } from 'react';

import { TopicAutocomplete } from 'components/reusable';
import { Group, Select, Text, TextInput } from '@mantine/core';

type FuncMeta = Omit<ScriptDefinition, 'id' | 'script' | 'template'>;

type FuncMetaProps = {
  value?: FuncMeta;
  clientId: string;
  onChange?: (value: FuncMeta) => void;
};

const Meta = ({ clientId, value, onChange }: FuncMetaProps) => {
  const [data, setData] = useState(value || ({} as FuncMeta));
  const [executeWhen, setWhen] = useState<FuncMeta['when']>(value?.message ? 'message' : 'connected');

  // eslint-disable-next-line
  const handleUpdate = useCallback(
    debounce((val: FuncMeta, isImmediate: boolean) => {
      if (isImmediate) onChange?.({ name: val.name, when: executeWhen });
      else onChange?.(val);
    }, 300),
    [onChange]
  );

  const handleChange = useCallback((value: string, key: keyof FuncMeta) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (value) setData(value);
  }, [value]);

  useEffect(() => {
    handleUpdate(data, executeWhen === 'connected');
  }, [data, executeWhen, handleUpdate]);

  return (
    <Group spacing={12}>
      <TextInput
        maw={170}
        value={data.name || ''}
        placeholder="Function name"
        onChange={(e) => handleChange(e.target.value, 'name')}
      />
      <Text>will execute when</Text>
      <Select maw={170} data={executeWhenList} value={executeWhen} onChange={setWhen as any} />
      {executeWhen === 'message' && (
        <>
          <Text>and message contains</Text>
          <TextInput
            maw={170}
            value={data.message || ''}
            placeholder="blank to any message"
            onChange={(e) => handleChange(e.target.value, 'message')}
          />
          <Text>on topic</Text>
          <TopicAutocomplete
            maw={170}
            clientId={clientId}
            value={data.topic || ''}
            placeholder="blank to any topic"
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
