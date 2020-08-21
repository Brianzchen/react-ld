// @flow
import * as React from 'react';

import Context from './Context';

type Props = {|
  children: (variation: any) => React.Node,
  feature: string,
|};

const LdMultiVariate = ({
  children,
  feature,
}: Props): React.Node => {
  const client = React.useContext(Context);
  const { flags } = client;

  const variation = flags?.[feature];

  return children(variation);
};

export default LdMultiVariate;
