// @flow
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  LdProvider,
  useLdFlag,
} from '.';

describe('react-ld', () => {
  it('returns fallback value when no flag exists', () => {
    const fakeClient = {
      on: jest.fn(),
      allFlags: jest.fn(() => ({})),
    };
    const App = () => {
      const enableTest = useLdFlag('enableTest');

      return (
        <div data-testid="element">
          {enableTest ? 'true' : 'false'}
        </div>
      );
    };

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    expect(getByTestId('element').textContent).toBe('true');
  });

  it('does not rerender hook when a different flag is changed', () => {

  });

  describe('<LdFeature', () => {
    it('renders the feature only when true', () => {

    });

    it('renders the feature if false and deprecation is true', () => {

    });

    it('does not render the feature when feature is true and deprecation is true', () => {

    });
  });
});
