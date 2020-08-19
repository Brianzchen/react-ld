// @flow
import * as React from 'react';
import { render, waitFor } from '@testing-library/react';

import {
  LdProvider,
  LdFeature,
} from '.';

describe('<LdFeature', () => {
  it('renders the feature only when true', (done) => {
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

    waitFor(() => expect(hook).toHaveBeenCalled()).then(() => {
      expect(getByTestId('element').textContent).toBe('enabled feature');
      done();
    });
  });

  it('renders the feature if false and deprecation is true', (done) => {
    const hook = jest.fn();
    const fakeClient = {
      on: (key, callback) => {
        if (key === 'ready') {
          callback();
        }
      },
      allFlags: jest.fn(() => ({
        enableTest: false,
      })),
      waitForInitialization: jest.fn(() => new Promise((resolve) => {
        resolve();
        hook();
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
      >
        <App />
      </LdProvider>,
    );

    waitFor(() => expect(hook).toHaveBeenCalled()).then(() => {
      expect(getByTestId('element').textContent).toBe('disabled feature');
      done();
    });
  });

  it('does not render the feature when feature is true and deprecation is true', (done) => {
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

    waitFor(() => expect(hook).toHaveBeenCalled()).then(() => {
      expect(getByTestId('element').textContent).toBe('');
      done();
    });
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
      waitForInitialization: jest.fn(() => Promise.resolve()),
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
