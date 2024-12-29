<script setup lang="ts">
import { useToasterStore } from '~/stores/toaster'

const toasterStore = useToasterStore()
</script>

<template>
  <div
    class="toaster-wrapper"
    v-if="toasterStore.visible"
    :class="`toaster ${toasterStore.type}`"
  >
    {{ toasterStore.message }}
  </div>
</template>

<style scoped lang="scss">
.toaster-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #333;
  color: white;
  z-index: 1000;
}
.toaster.success {
  background-color: green;
}
.toaster.error {
  background-color: red;
}
.toaster.info {
  background-color: blue;
}
</style>