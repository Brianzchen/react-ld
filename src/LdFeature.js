// @flow
import * as React from 'react';

import Context from './Context';

type Props = {|
  children?: React.Node,
  feature: string,
  deprecation?: boolean,
  fallback?: React.Node,
|};

const LdFeature = ({
  children = null,
  feature,
  deprecation = false,
  fallback = null,
}: Props): React.Node => {
  const client = React.useContext(Context);
  const { flags } = client;

  if (!flags) return fallback;

  const isEnabled = flags[feature];
  if (!isEnabled && !deprecation) return null;
  if (isEnabled && deprecation) return null;

  return children;
};

export default LdFeature;
