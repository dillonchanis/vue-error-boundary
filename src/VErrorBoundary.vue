<script setup lang="ts">
import { ref, onErrorCaptured, useSlots } from "vue";
import type { Component } from "vue";
import DefaultFallback from "./VDefaultFallback.vue";

export interface VErrorBoundaryProps {
  fallBack?: Component;
  onError?: Function;
  params?: Record<any, any>;
  stopPropagation?: boolean;
}

const props = withDefaults(defineProps<VErrorBoundaryProps>(), {
  fallBack: DefaultFallback,
  onError: () => {},
  params: () => ({}),
  stopPropagation: false,
});

const emits = defineEmits(["error-captured"]);

const hasError$ = ref(false);
const err$ = ref<Error | null>(null);
const info$ = ref("");

const slots = useSlots();

if (!slots.default && !slots.boundary) {
  console.warn("ErrorBoundary component must have child components.");
}

onErrorCaptured((error: Error, vm, info: string) => {
  hasError$.value = true;
  err$.value = error;
  info$.value = info;

  props?.onError(error, vm, info);

  emits("error-captured", { error, vm, info });

  if (props.stopPropagation) return false;
});
</script>

<template>
  <template v-if="!slots.boundary">
    <slot v-if="!hasError$"></slot>
    <component v-else :is="props.fallBack" v-bind="params" />
  </template>
  <slot
    v-else
    name="boundary"
    :hasError="hasError$"
    :error="err$"
    :info="info$"
    v-bind="params"
  ></slot>
</template>
