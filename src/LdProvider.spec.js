// @flow
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  LdProvider,
  useLdFlag,
} from '.';

jest.useFakeTimers();

describe('useLdFlag', () => {
  it('renders nothing before loading', () => {
    const fakeClient = {
      on: () => {},
      allFlags: jest.fn(() => ({ test: true })),
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
        async
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
    };

    const { container } = render(
      <LdProvider
        client={fakeClient}
      />,
    );

    expect(container.textContent).toBe('');
  });

  it('will keep waiting until flags are returned', () => {
    const fakeClient = {
      on: () => {},
      allFlags: jest.fn(),
    };
    fakeClient.allFlags
      .mockReturnValueOnce({})
      .mockReturnValueOnce({ test: true });

    const { container } = render(
      <LdProvider
        client={fakeClient}
      >
        <div>
          loaded
        </div>
      </LdProvider>,
    );

    expect(container.textContent).toBe('');
    jest.advanceTimersByTime(1);
    expect(container.textContent).toBe('loaded');
    jest.advanceTimersByTime(1);
  });

  it('does not try to get flags if no client is provided', () => {
    const originalSetInterval = window.setInterval;
    window.setInterval = jest.fn();
    const { container } = render(
      <LdProvider>
        <div>
          loaded
        </div>
      </LdProvider>,
    );

    expect(container.textContent).toBe('');
    expect(window.setInterval).not.toHaveBeenCalled();
    window.setInterval = originalSetInterval;
  });
});
