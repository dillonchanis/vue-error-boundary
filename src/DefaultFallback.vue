<script>
export default {
  functional: true,
  render (h) {
    return h('div', [
      h('h1', 'Something went wrong!'),
      h('p', 'Please try again.')
    ])
  }
}
</script>
