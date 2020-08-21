// @flow
import * as React from 'react';
import { render, waitFor } from '@testing-library/react';

import {
  LdProvider,
  useLdFlag,
} from '.';

describe('useLdFlag', () => {
  it('returns fallback value when no flag exists', () => {
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        }
      },
      allFlags: jest.fn(() => ({})),
      waitForInitialization: jest.fn(() => Promise.resolve()),
    };
    const App = () => {
      const enableTest = useLdFlag('enableTest', true);

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

  it('returns the field when flag is populated', (done) => {
    const hook = jest.fn();
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        }
      },
      allFlags: jest.fn(() => ({
        enableTest: true,
      })),
      waitForInitialization: jest.fn(() => new Promise((resolve) => {
        resolve();
        hook();
      })),
    };
    const App = () => {
      const enableTest = useLdFlag('enableTest');

      return (
        <div data-testid="element">
          {enableTest ? 'true' : 'false'}
        </div>
      );
    };

    const wrapper = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    waitFor(() => expect(hook).toHaveBeenCalled()).then(() => {
      expect(wrapper.getByTestId('element').textContent).toBe('true');
      done();
    });
  });

  it('it can return multivariate value', (done) => {
    const hook = jest.fn();
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        }
      },
      allFlags: jest.fn(() => ({
        enableTest: 'string',
      })),
      waitForInitialization: jest.fn(() => new Promise((resolve) => {
        resolve();
        hook();
      })),
    };
    const App = () => {
      const enableTest: string = useLdFlag<string>('enableTest', '');

      return (
        <div data-testid="element">
          {enableTest}
        </div>
      );
    };

    const wrapper = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    waitFor(() => expect(hook).toHaveBeenCalled()).then(() => {
      expect(wrapper.getByTestId('element').textContent).toBe('string');
      done();
    });
  });
});
