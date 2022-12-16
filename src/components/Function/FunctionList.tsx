import type { ScriptDefinition } from 'stores/useScript';

import { memo } from 'react';

import { Empty } from 'components/reusable';
import { Title, Text, ScrollArea, Stack, Card, createStyles } from '@mantine/core';

type Props = {
  focus?: ScriptDefinition;
  onFocusChange?: (script: ScriptDefinition) => void;
  data?: ScriptDefinition[];
};

const FunctionList: React.FC<Props> = ({ focus, onFocusChange, data }) => {
  return (
    <ScrollArea w="100%">
      {data ? (
        <Stack>
          {data.map((script) => (
            <div key={script.id} onClick={() => onFocusChange?.(script)}>
              <ScriptCard data={script} active={focus?.id === script.id} />
            </div>
          ))}
        </Stack>
      ) : (
        <Empty title="Function not defined" />
      )}
    </ScrollArea>
  );
};

type ScriptCardProps = {
  data: ScriptDefinition;
  active?: boolean;
};

const ScriptCard = memo(function Comp({ active, data }: ScriptCardProps) {
  const { card: cardStyle, active: cardActive } = useStyles().classes;
  return (
    <Card withBorder className={`${cardStyle} ${active ? cardActive : ''}`}>
      <Text weight={500}>{data.name}</Text>
      <Text size={14}>
        Executed on <code>{data.runOn}</code>
      </Text>
    </Card>
  );
});

const useStyles = createStyles((t) => ({
  card: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    ':hover': {
      filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
    },
  },

  active: {
    color: t.colors.gray[0],
    backgroundColor: t.colors.blue[6],
  },
}));

export default memo(FunctionList);
