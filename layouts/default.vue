<template>
  <div class="default-layout">
    <Toaster />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  max-width: 1160px;
  margin: 0 auto;
  padding: calc(var(--spacing) * 2);
}
</style>