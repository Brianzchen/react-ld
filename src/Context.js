// @flow
import * as React from 'react';

export type FlagsT = {|
  [string]: any,
|}

export type ContextT = {|
  async: boolean,
  flags: FlagsT | void,
|};

const LdContext: React.Context<ContextT> = React.createContext<ContextT>({
  async: false,
  flags: {},
});

export const {
  Provider,
  Consumer,
} = LdContext;

export default LdContext;
