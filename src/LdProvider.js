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
  /**
   * Children to render
   */
  children?: React.Node,
  /**
   * Instance of a Launch Darkly client
   */
  client?: {
    on: (string, Function) => void,
    allFlags: () => FlagsT,
    waitForInitialization: () => Promise<void>,
    ...
  },
  /**
   * Whether the children should render before the client has returns the list of flags
   */
  async?: boolean,
  /**
   * An object list of flags and their respective return value, useful for mock testing
   */
  stubbedFlags?: {
    [key: string]: any,
  },
|};

const LdProvider = ({
  children = null,
  client,
  async = false,
  stubbedFlags,
}: Props): React.Node => {
  const [flags, setFlags] = React.useState<FlagsT | void>(stubbedFlags);

  React.useEffect(() => {
    if (!client || stubbedFlags) return;

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
      setFlags((pFlags) => ({
        ...pFlags,
        ...mapToCurrentFlags(settings),
      }));
    });
  }, [client, stubbedFlags]);

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
