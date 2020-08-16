// @flow
import * as React from 'react';

import Context from './Context';

type Props = {|
  children?: React.Node,
  name: string,
  deprecation?: boolean,
  fallback?: React.Node,
|};

const LdFeature = ({
  children = null,
  name,
  deprecation = false,
  fallback = null,
}: Props): React.Node => {
  const client = React.useContext(Context);
  const { flags } = client;

  if (!flags) return fallback;

  const isEnabled = flags[name];
  if (!isEnabled && !deprecation) return null;

  return children;
};

export default LdFeature;
