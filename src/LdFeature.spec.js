// @flow
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  LdProvider,
  LdFeature,
} from '.';

describe('<LdFeature', () => {
  it('renders the feature only when true', () => {
    // const fakeClient = {
    //   on: (key, callback) => {
    //     if (key === 'ready') {
    //       callback();
    //     }
    //   },
    //   allFlags: jest.fn(() => ({
    //     enableTest: true,
    //   })),
    // };
    // const App = () => (
    //   <div data-testid="element">
    //     <LdFeature feature="enableTest">
    //       <div data-testid="enabled">
    //         enabled feature
    //       </div>
    //     </LdFeature>
    //     <LdFeature feature="enableTest" deprecation>
    //       <div data-testid="disabled">
    //         disabled feature
    //       </div>
    //     </LdFeature>
    //   </div>
    // );

    // const { getByTestId } = render(
    //   <LdProvider
    //     client={fakeClient}
    //     async
    //   >
    //     <App />
    //   </LdProvider>,
    // );

    // expect(getByTestId('enabled')).not.toBe(null);
    // expect(getByTestId('disabled')).toBe(null);
  });

  it('renders the feature if false and deprecation is true', () => {

  });

  it('does not render the feature when feature is true and deprecation is true', () => {

  });
});
