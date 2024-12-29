<script setup lang="ts">
const showPopin = defineModel()

const props = defineProps({
  name: { type: String, required: true },
  id: { type: String, required: true },
})

const emit = defineEmits<{
  (e: 'deleteItem', id: string): void
}>()

const closePopin = () => showPopin.value = false

const confirmDelete = () => {
  emit('deleteItem', props.id)
  closePopin()
}

</script>

<template>
  <div class="popin-wrapper">
    <div class="popin-overlay" @click="closePopin"></div>
    <section class="popin-content" v-if="showPopin">
      <h1>Confirmation</h1>

      <p>Confirmer la suppresion de "{{ name }}"</p>

      <div class="mt-5">
        <button @click="confirmDelete" class="bg-indigo-500 text-white">Confirmer</button>
        <button @click="closePopin" class="ml-3">Fermer</button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.popin-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.popin-overlay {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(var(--themeColor) / .4);
  cursor: pointer;
}
.popin-content {
  max-width: 300px;
  padding: var(--spacing);
  background-color: #fff;
  border-radius: var(--spacing);
  position: relative;
  z-index: 3;

  @media screen and (min-width: 720px) {
    max-width: 480px;
  }
}
</style>