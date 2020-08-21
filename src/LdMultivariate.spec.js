// @flow
import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { LdProvider, LdMultivariate } from '.';

describe('<LdMultivariate', () => {
  it('renders the render prop', (done) => {
    const hook = jest.fn();
    const fakeClient = {
      on: () => {},
      allFlags: jest.fn(() => ({
        enableTest: 'test',
      })),
      waitForInitialization: jest.fn(() => new Promise((resolve) => {
        resolve();
        hook();
      })),
    };
    const App = () => (
      <div data-testid="element">
        <LdMultivariate feature="enableTest">
          {(variation) => {
            if (variation === 'test') return '123';
            return '234';
          }}
        </LdMultivariate>
      </div>
    );

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
      >
        <App />
      </LdProvider>,
    );

    waitFor(() => expect(hook).toHaveBeenCalled()).then(() => {
      expect(getByTestId('element').textContent).toBe('123');
      done();
    });
  });
});
