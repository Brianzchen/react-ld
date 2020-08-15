// @flow
import * as React from 'react';

import LdContext from './Context';

export default function useLdFlag(name: string): boolean {
  const client = React.useContext(LdContext);
  const flag = client[name];

  return flag;
}
