// @flow
import * as React from 'react';

import { Provider } from './Context';
import type { FlagsT } from './Context';

type SettingsT = {|
  [string]: {|
    current: boolean, previous: boolean,
  |},
|};

type Props = {|
  children?: React.Node,
  client: {
    on: (string, Function) => void,
    allFlags: () => FlagsT,
    ...
  },
  async?: boolean,
|};

const LdProvider = ({
  children = null,
  client,
  async = false,
}: Props): React.Node => {
  const [flags, setFlags] = React.useState<FlagsT | void>();

  React.useEffect(() => {
    const mapToCurrentFlags = (
      settings: SettingsT,
    ) => (
      Object.keys(settings).reduce((prev, cur: string) => {
        // eslint-disable-next-line
        prev[cur] = settings[cur].current;
        return prev;
      }, {})
    );

    client.on('ready', () => {
      setFlags(client.allFlags());
    });
    client.on('change', (settings: SettingsT) => {
      setFlags((pFlags) => ({
        ...pFlags,
        ...mapToCurrentFlags(settings),
      }));
    });
  }, []);

  if (!flags && !async) return null;

  return (
    <Provider
      value={{
        async,
        flags,
      }}
    >
      {children}
    </Provider>
  );
};

export default LdProvider;
