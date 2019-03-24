<script>
import DefaultFallback from './DefaultFallback.vue'

const isObjectEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object
const warn = msg => console.warn(msg)

// https://github.com/posva/vue-promised/blob/master/src/index.js
const convertVNodeArray = (h, wrapperTag, nodes) => {
  // for arrays and single text nodes
  if (nodes.length > 1 || !nodes[0].tag) return h(wrapperTag, {}, nodes)
  return nodes[0]
}

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
    params: {
      type: Object,
      default: () => {}
    },
    stopPropagation: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'span'
    }
  },
  data() {
    return {
      err: '',
      info: '',
      hasError: null
    };
  },
  errorCaptured(err, vm, info = '') {
    this.hasError = true
    this.err = err
    this.info = info
    this.$emit('errorCaptured', { err, vm, info })

    if (this.onError) this.onError(err, vm, info)

    if (this.stopPropagation) return false
  },
  render(h) {
    const content = this.$slots.default
    const isScoped = this.$scopedSlots.boundary
    let scopedSlot

    if (isScoped) {
      scopedSlot = this.$scopedSlots.boundary({
        hasError: this.hasError,
        err: this.err,
        info: this.info
      })
    }

    const fallbackOrScoped = isScoped
      ? scopedSlot
      : h(this.fallBack, {
        props: {...this.params}
      })
    
    if (this.hasError) {
      return Array.isArray(fallbackOrScoped) 
        ? convertVNodeArray(h, this.tag, fallbackOrScoped) 
        : fallbackOrScoped
    } 

    if (isScoped) {
      if (!this.$scopedSlots.boundary()) {
        warn('ErrorBoundary component must have child components.')
        return null
      }
      return Array.isArray(scopedSlot)
        ? convertVNodeArray(h, this.tag, scopedSlot)
        : scopedSlot
    }
      
    if (isObjectEmpty(this.$slots)) {
      warn('ErrorBoundary component must have child components.')
      return null;
    }

    return Array.isArray(content) 
      ? convertVNodeArray(h, this.tag, content) 
      : content
  }
}
</script>
