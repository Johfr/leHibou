<script setup lang="ts">
import { useGetData } from '~/composables/getData'

// initialise les données
useGetData()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
