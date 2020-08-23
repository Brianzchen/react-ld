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
  client?: {
    on: (string, Function) => void,
    allFlags: () => FlagsT,
    waitForInitialization: () => Promise<void>,
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
    if (!client) return;

    const mapToCurrentFlags = (
      settings: SettingsT,
    ) => (
      Object.keys(settings).reduce((prev, cur: string) => {
        // eslint-disable-next-line
        prev[cur] = settings[cur].current;
        return prev;
      }, {})
    );

    client.waitForInitialization().then(() => {
      setFlags(client.allFlags());
    });
    client.on('change', (settings: SettingsT) => {
      setFlags((pFlags: SettingsT) => ({
        ...pFlags,
        ...mapToCurrentFlags(settings),
      }));
    });
  }, [client]);

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
