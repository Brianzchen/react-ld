// @flow
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  LdProvider,
  LdFeature,
} from '.';

jest.useFakeTimers();

describe('<LdFeature', () => {
  it('renders the feature only when true', () => {
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
    const App = () => (
      <div data-testid="element">
        <LdFeature feature="enableTest">
          <div>
            enabled feature
          </div>
        </LdFeature>
        <LdFeature feature="enableTest" deprecation>
          <div>
            disabled feature
          </div>
        </LdFeature>
      </div>
    );

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    jest.advanceTimersByTime(1000);

    expect(getByTestId('element').textContent).toBe('enabled feature');
  });

  it('renders the feature if false and deprecation is true', () => {
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        }
      },
      allFlags: jest.fn(() => ({
        enableTest: false,
      })),
    };
    const App = () => (
      <div data-testid="element">
        <LdFeature feature="enableTest">
          <div>
            enabled feature
          </div>
        </LdFeature>
        <LdFeature feature="enableTest" deprecation>
          <div>
            disabled feature
          </div>
        </LdFeature>
      </div>
    );

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    jest.advanceTimersByTime(1000);

    expect(getByTestId('element').textContent).toBe('disabled feature');
  });

  it('does not render the feature when feature is true and deprecation is true', () => {
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
    const App = () => (
      <div data-testid="element">
        <LdFeature feature="enableTest" deprecation>
          <div>
            enabled feature
          </div>
        </LdFeature>
      </div>
    );

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    expect(getByTestId('element').textContent).toBe('');
  });

  it('accepts not passing child', () => {
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
    const App = () => (
      <div data-testid="element">
        <LdFeature feature="enableTest" />
      </div>
    );

    const { getByTestId } = render(
      <LdProvider
        client={fakeClient}
        async
      >
        <App />
      </LdProvider>,
    );

    expect(getByTestId('element').textContent).toBe('');
  });
});
