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
    }
  },
  data () {
    return {
      error: null
    }
  },
  errorCaptured (err, vm, info = '') {
    if (this.onError) {
      this.onError(err, vm, info)
    }

    this.error = true
    this.$emit('errorCaptured', { err, vm, info })
  },
  render (h) {
    if (this.error) {
      return h(this.fallBack)
    }

    return this.$slots.default[0]
  }
}
</script>
