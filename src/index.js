import ErrorBoundary from './ErrorBoundary.vue'

export {
  ErrorBoundary
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(ErrorBoundary.name, ErrorBoundary)
}

