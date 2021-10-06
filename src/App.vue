<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Custom from './components/Custom.vue'
import ErrorBoundary from './VErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <template #boundary="{ hasError, info }">
      <HelloWorld v-if="!hasError" msg="Hello Vue 3 + TypeScript + Vite" />
      <div v-else>
        info: {{ info }}
      </div>
    </template>
  </ErrorBoundary>

  <hr />

  <ErrorBoundary>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </ErrorBoundary>

  <hr />

  <ErrorBoundary :fall-back="Custom" :params="{ id: 123 }">
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </ErrorBoundary>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
