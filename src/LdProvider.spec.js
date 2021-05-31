// @flow
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  LdProvider,
  useLdFlag,
} from '.';

describe('useLdFlag', () => {
  it('renders nothing before loading', () => {
    const hook = jest.fn();
    const fakeClient = {
      on: () => {},
      allFlags: jest.fn(() => ({ test: true })),
      waitForInitialization: jest.fn(() => new Promise((resolve) => {
        resolve();
        hook();
      })),
    };

    const { queryByTestId } = render(
      <LdProvider
        client={fakeClient}
      >
        <div data-testid="element" />
      </LdProvider>,
    );

    expect(queryByTestId('element')).toBe(null);
  });

  it('renders tree if nothing has loaded and async mode is enabled', () => {
    const fakeClient = {
      on: () => {},
      allFlags: jest.fn(() => ({ test: true })),
      waitForInitialization: jest.fn(() => Promise.resolve()),
    };

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <div data-testid="test" />
      </LdProvider>,
    );

    expect(getByTestId('test')).not.toBe(null);
  });

  it('updates the flags on change', () => {
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        } else if (key === 'change') {
          callback({
            enableTest: { current: true, previous: false },
          });
        }
      },
      allFlags: jest.fn(() => ({ test: true })),
      waitForInitialization: jest.fn(() => Promise.resolve()),
    };

    const App = () => {
      const enableTest = useLdFlag('enableTest');

      return (
        <div data-testid="test">
          {enableTest ? 'true' : 'false'}
        </div>
      );
    };

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
      >
        <App />
      </LdProvider>,
    );

    expect(getByTestId('test')).not.toBe(null);
  });

  it('can accept no children', () => {
    const fakeClient = {
      on: () => {},
      allFlags: jest.fn(() => ({ test: true })),
      waitForInitialization: jest.fn(() => Promise.resolve()),
    };

    const { container } = render(
      <LdProvider
        client={fakeClient}
      />,
    );

    expect(container.textContent).toBe('');
  });

  it('does not try to get flags if no client is provided', () => {
    const { container } = render(
      <LdProvider>
        <div>
          loaded
        </div>
      </LdProvider>,
    );

    expect(container.textContent).toBe('');
  });

  it('returns a list of mock flags', () => {
    const App = () => {
      const enableTest = useLdFlag('enableTest');

      return (
        <div data-testid="test">
          {enableTest ? 'true' : 'false'}
        </div>
      );
    };

    const flags = {
      enableTest: true,
      notEnabledTest: false,
    };

    const { getByTestId } = render(
      <LdProvider
        stubbedFlags={flags}
      >
        <App />
      </LdProvider>,
    );

    expect(getByTestId('test').textContent).toBe('true');
  });

  it('ignores client when mock flags are passed', () => {
    const App = () => {
      const enableTest = useLdFlag('enableTest');

      return (
        <div data-testid="test">
          {enableTest ? 'true' : 'false'}
        </div>
      );
    };

    const flags = {
      enableTest: true,
      notEnabledTest: false,
    };

    const { getByTestId } = render(
      <LdProvider
        stubbedFlags={flags}
        client={({}: any)}
      >
        <App />
      </LdProvider>,
    );

    expect(getByTestId('test').textContent).toBe('true');
  });
});
