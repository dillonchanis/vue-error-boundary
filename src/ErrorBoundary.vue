<script>
import DefaultFallback from './DefaultFallback.vue'

export default {
  name: 'ErrorBoundary',
  props: {
    fallBack: {
      type: Object,
      default: () => DefaultFallback
    },
    onError: {
      type: Function,
      default: null
    },
    stopPropagation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      error: null
    }
  },
  errorCaptured (err, vm, info = '') {
    this.error = true
    this.$emit('errorCaptured', { err, vm, info })

    if (this.onError) this.onError(err, vm, info)

    if (this.stopPropagation) return false
  },
  render (h) {
    if (!this.$slots.default.length) {
      console.warn('ErrorBoundary component must have child components.')
      return null
    }

    return this.error ? h(this.fallBack) : this.$slots.default[0]
  }
}
</script>
