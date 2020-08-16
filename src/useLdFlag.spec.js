// @flow
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  LdProvider,
  useLdFlag,
} from '.';

jest.useFakeTimers();

describe('useLdFlag', () => {
  it('returns fallback value when no flag exists', () => {
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        }
      },
      allFlags: jest.fn(() => ({ test: true })),
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

  it('returns the field when flag is populated', () => {
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        }
      },
      allFlags: jest.fn(() => ({
        enableTest: true,
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

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    jest.advanceTimersByTime(1000);

    expect(getByTestId('element').textContent).toBe('true');
  });

  it('does not rerender hook when a different flag is changed', () => {
  });
});
