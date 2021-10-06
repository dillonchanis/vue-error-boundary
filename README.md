# vue-error-boundary

[![NPM version](https://img.shields.io/npm/v/vue-error-boundary.svg?style=for-the-badge&colorA=BEC8BE&colorB=47B784)](https://www.npmjs.com/package/vue-error-boundary)

A reusable error boundary component for catching JavaScript errors and displaying fallback UIs.

The ErrorBoundary component is based on [React's example component](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html).

**Requires Vue3**

## Install

```bash
yarn add vue-error-boundary

npm i vue-error-boundary --save
```

## Usage

To use this component simply wrap any other component which may throw an Error. Errors thrown in child components will automatically bubble up to the `VErrorBoundary` component.

```html
<VErrorBoundary>
  <ImUnstable />
</VErrorBoundary>
```

## Props

| Attribute        | Description  | Type | Required | Default |
|------------------|--------------|------|----------|---------|
| fall-back        | Fallback component to render in case of error. | Component | `false` | DefaultFallback |
| on-error         | Callback function to perform on error. | `Function`  | `false`  | `null` |
| params           | Props to pass to your fall back component.  | `Object` | `false` | `{}` |
| stop-propagation | Stop propagation of errors to other `errorCaptured` hooks. | `boolean` | `false` | `false` |


## Scoped Slots

| Property | Description | Type    |
|----------|-------------|---------|
| error    | The error   | `Error` |
| hasError | Whether an error occurred. | `boolean` |
| info     | Information on where the error was captured | `string` |


## How to Use

### Fallback UI via fall-back

We can provide a fallback UI to display via the `fall-back` prop.  It simply takes a Vue component to render.

#### Basic Example

```html
<template>
  <VErrorBoundary :fall-back="productError">
    <ProductCard ... />
  </VErrorBoundary>
</template>

<script>
import ProductErrorCard from '...'

export default {
  // ...
  data () {
    return {
      productError: ProductErrorCard
    }
  }
}
</script>
```

#### With Props

You can pass props to your fallback component through the `params` prop.  `params` expects an object containing the data you wish to pass.

```html
<template>
  <ul class="contact-list">
    <template v-for="contact in contacts">
      <VErrorBoundary :key="contact.id" 
                      :fall-back="fallBack" 
                      :params="{ id: contact.id }">
        <app-contact :contact="contact" />
      </VErrorBoundary>
    </template>
  </ul>
</template>

<script>
import MyCustomFallbackComponent from '...'

export default {
  data: () => ({
    fallBack: MyCustomFallbackComponent,
    contacts: [...]
  })
}
</script>
```

Then in your custom fallback component:

```html
<template>
  <div>
    Could not render - {{ id }}
  </div>
</template>

<script>
export default {
  props: ['id'],
}
</script>
```

Furthermore, we can directly access the contents of the `VErrorBoundary` component's `errorCaptured` hook either through a callback or Vue's emit.

### Scoped Slots

If you do not wish to use a fallback component you can alternatively utilize scoped slots to present data in your current template.

#### Basic Example

```html
<VErrorBoundary>
  <template #boundary="{ hasError }">
    <div v-if="!hasError">No error occurred.</div>
    <div v-else>Message to appear if error occurred.</div>
  </template>
</VErrorBoundary>
```

## Events

### Callbacks via on-error

The `VErrorBoundary` can receive a callback function through the `on-error` prop.

```html
<template>
  <VErrorBoundary :on-error="handleError">...</VErrorBoundary>
<template>

<script>
// ...
methods: {
  handleError (err, vm, info) {
    // do something
  }
}
// ...
</script>
```

### @errorCaptured event

The callback function will receive the same parameters as the `errorCaptured` method.

We can also listen to a Vue event via an `errorCaptured` event.

```html
<template>
  <ErrorBoundary @error-captured="handleError">...</ErrorBoundary>
</template>

<script>
// ...
methods: {
  handleError (err, vm, info) {
    // do something
  }
}
// ...
</script>
```

### Stop Propagation

The `errorCaptured` hook will continue to propagate errors up the component tree unless it returns `false`.  Doing so will stop any additional `errorCaptured` hooks to execute **and** the global `errorHandler` from being invoked for the error.  To do this we can use the `stop-propagation` prop.

```html
<ErrorBoundary stop-propagation>
  ...
</ErrorBoundary>
```

## Contributors

[wallyjue](https://github.com/wallyjue)