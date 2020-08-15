// @flow
import * as React from 'react';

import useLdFlag from './useLdFlag';

type Props = {|
  children?: React.Node,
  name: string,
  deprecation?: boolean,
|};

const LdFeature = ({
  children = null,
  name,
  deprecation = false,
}: Props): React.Node => {
  const isEnabled = useLdFlag(name);

  if (!isEnabled && !deprecation) return null;

  return children;
};

export default LdFeature;
