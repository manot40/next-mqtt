import { memo } from 'react';

import { Autocomplete, type AutocompleteProps } from '@mantine/core';

import { useChannel } from 'stores';

type Props = {
  clientId: string;
} & Omit<AutocompleteProps, 'data'>;

const Component = ({ clientId, ...rest }: Props) => {
  const channel = useChannel((state) => state.data)[clientId];
  return <Autocomplete {...rest} data={(channel || []).map((chan) => chan.topic)} />;
};

export const TopicAutocomplete = memo(Component);
