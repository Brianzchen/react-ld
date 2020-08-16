// @flow
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  LdProvider,
  useLdFlag,
} from '.';

describe('useLdFlag', () => {
  it('renders nothing before loading', () => {
    const fakeClient = {
      on: () => {},
      allFlags: jest.fn(() => ({})),
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
      allFlags: jest.fn(() => ({})),
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
      allFlags: jest.fn(() => ({})),
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
      allFlags: jest.fn(() => ({})),
    };

    const { container } = render(
      <LdProvider
        client={fakeClient}
      />,
    );

    expect(container.textContent).toBe('');
  });
});
