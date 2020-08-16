// @flow
import * as React from 'react';

import { Provider } from './Context';
import type { FlagsT } from './Context';

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
    client.on('ready', () => {
      setFlags(client.allFlags());
    });
    client.on('change', (settings) => {
      setFlags((pFlags) => ({
        ...pFlags,
        ...settings,
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
