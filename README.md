# react-ld
Pass Launch Darkly feature flags through your React application.

Takes a Launch Darkly instantiated client in a provider and enables easy access to feature flags throughout your React application.

Most Launch Darkly React libraries instantiate the client inside the React component. This gives an application less flexibility and control, which can impose constraints given the API provided by the library and you can't pass the client around your application if you have that need in a scaled application.

> This library handles just the React part so you don't have to.

## Install

Install with yarn
```
yarn add react-ld
```
or with npm
```
npm i react-ld
```

## Usage

```js
// Main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { initialize } from 'launchdarkly-js-client-sdk';
import { LdProvider } from 'react-ld';

const LdClient = initialize('my-key', ...otherArgs);

ReactDOM.render(
  <LdProvider client={LdClient}>
    <App />
  </LdProvider>
);

// SomeComponent.js
import React from 'react';
import { useLdFlag } from 'react-ld';

const SomeComponent = () => {
  const myFeature = useLdFlag('myFeature');

  return (
    <div>
      {myFeature ? 'true' : 'false'}
    </div>
  );
};

// AnotherComponent.js
import React from 'react';
import { LdFeature } from 'react-ld';

const SomeComponent = () => (
  <>
    <LdFeature>
      <VariationA>
    </LdFeature>
    <LdFeature deprecation>
      <VariationB>
    </LdFeature>
  </>
);
```

## API

### LdProvider

Top level provider component that will cascade feature flags through your React application.

| Props  | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| children | React.Node | null | The react tree that will read flag values  |
| client*  | instaceof LD client | undefined | The LD client instantiated with settings of your choice |
| async  | boolean | false | By default `LDProvider` will wait for the client to be ready before rendering the React tree. Enabling async mode will ignore the client status and render the tree immediately |

### LdFeature

This is the simplest way to render a feature flagged component when you don't need any extra logic.

| Props  | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| children | React.Node | null | The component to render if the condition is true  |
| name*  | string | undefined | The name of the feature flag |
| deprecation  | boolean | false | By default if the flag evaluates to true, the child component will render. But you may want to do the reverse and enable an older version of a feature if the flag is false, which can be done by setting this prop to true |
| fallback | React.Node | null | If async mode is enabled, fallback will be rendered when the flags have not yet been defined

### useLdFlag

Alternatively to `LdFeature`, you may want to use hooks instead which can be helpful when you want to decide if you want to render a feature programmatically or you want to evaluate multiple flags together instead of nesting a large tree of components.

| Props  | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| name*  | string | undefined | The name of the feature flag |
| fallback | boolean | false | If async mode is enabled, fallback will be passed back when the flags have not yet been defined

### Context

For advanced usage or building your own functionality, `react-ld` exposes it's underlying context so you can build your own utilities if necessary.

```js
// Context structure
{
  async: boolean,
  flags: {
    [string]: boolean,
  },
}
```
