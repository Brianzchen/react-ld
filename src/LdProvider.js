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
    if (!client) return () => {};

    const mapToCurrentFlags = (
      settings: SettingsT,
    ) => (
      Object.keys(settings).reduce((prev, cur: string) => {
        // eslint-disable-next-line
        prev[cur] = settings[cur].current;
        return prev;
      }, {})
    );

    // Use setInterval instead of on('ready') because in between
    // setting up the client and creating the react tree
    // The ready function could have already been called.
    // This would be expected if the React tree is lazy loaded.
    const readyInterval = setInterval(() => {
      const allFlags = client.allFlags();
      if (Object.keys(allFlags).length > 0) {
        clearInterval(readyInterval);
        setFlags(allFlags);
      }
    }, 0);
    client.on('change', (settings: SettingsT) => {
      setFlags((pFlags) => ({
        ...pFlags,
        ...mapToCurrentFlags(settings),
      }));
    });

    return () => {
      clearInterval(readyInterval);
    };
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
