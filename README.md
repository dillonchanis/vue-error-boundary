# vue-error-boundary
A reusable error boundary component for catching JavaScript errors and displaying fallback UIs.

The ErrorBoundary component is based on [React's example component](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) featuring a new component method in React 16 called `componentDidCatch`.

Fortunately, in Vue 2.5.0+ we have access to something similar with `errorCaptured`.  For more information on this method refer to the API [here](https://vuejs.org/v2/api/#errorCaptured).

## Usage

To use this component simply wrap any other component which may throw an Error.

```html
<ErrorBoundary>
  <ImUnstable />
</ErrorBoundary>
```

Errors thrown in child components will automatically bubble up to the `ErrorBoundary` component.

We can provide a fallback UI to display via the `fall-back` prop.  It simply takes a Vue component to render.

```html
<template>
  <ErrorBoundary :fall-back="productError">
    <ProductCard ... />
  </ErrorBoundary>
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

Furthermore, we can directly access the contents of the `ErrorBoundary` component's `errorCaptured` method either throw a callback or Vue's emit.

The `ErrorBoundary` can receive a callback function through the `on-error` prop.

```html
<template>
  <ErrorBoundary :on-error="handleError">...</ErrorBoundary>
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

The callback function will receive the same parameters as the `errorCaptured` method.

We can also listen to a Vue event via an `errorCaptured` event.  This will send the same parameters as above as the event payload.

```html
<ErrorBoundary @errorCaptured="...">
```
