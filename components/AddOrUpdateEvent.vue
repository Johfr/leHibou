<script setup lang="ts">
import type { Event } from '~/types/Events.js'

const props = defineProps({
  isEditing: { type: Boolean, default: false }, // True si c'est un update
  currentEvent: { type: Object as PropType<Event>, default: null }, // si création
})

const emit = defineEmits<{
  (e: 'addItem', value: Event): void
  (e: 'updateItem', value: Event): void
}>()

const showForm = defineModel()

const name = ref<string>(props.currentEvent?.name || '')
const date = ref<string>(props.currentEvent?.date || '')
const intervenant = ref<string>(props.currentEvent?.intervenant || '')
const description = ref<string>(props.currentEvent?.description || '')
const type = ref<string>(props.currentEvent?.type || 'conférence')

const closeForm = () => (showForm.value = false)

const handleSubmit = (): void => {
  const event: Event = {
    id: props.currentEvent?.id || '',
    name: name.value,
    date: date.value,
    intervenant: intervenant.value,
    description: description.value,
    type: type.value,
  }

  if (props.isEditing) {
    emit('updateItem', event)
  } else {
    emit('addItem', event)
  }

  closeForm()
}

// Validation des champs de type string
const validateField = (field: string): boolean => field.trim() !== ''

// Validation du champ date
const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date) && !isNaN(new Date(date).getTime())
}

// Validation du formulaire complet
const isFormValid = computed(() => {
  return (
    validateField(name.value) &&
    validateDate(date.value) &&
    validateField(intervenant.value) &&
    validateField(description.value) &&
    validateField(type.value)
  )
})
</script>

<template>
  <div class="form-wrapper">
    <div class="form-overlay" @click="closeForm"></div>

    <form class="form">
      <h1>
        <span v-if="isEditing">Mettre à jour l'évènement</span>
        <span v-else>Ajouter un nouvel event</span>
      </h1>

      <!-- Message d'erreur -->
      <p class="error" v-if="!isFormValid">
        Tous les champs sont obligatoires. La date doit être au format YYYY-MM-DD.
      </p>

      <label for="Name" class="mb-5">
        Name :
        <input id="Name" type="text" v-model="name" placeholder="Event Name" />
      </label>

      <label for="Date" class="mb-5">
        Date :
        <input id="Date" type="text" v-model="date" placeholder="YYYY-MM-DD" />
      </label>

      <label for="Intervenant" class="mb-5">
        Intervenant :
        <input id="Intervenant" type="text" v-model="intervenant" placeholder="Intervenant" />
      </label>

      <label for="Description" class="mb-5">
        Description :
        <input id="Description" type="text" v-model="description" placeholder="Description" />
      </label>

      <label for="Type" class="mb-5">
        Type :
        <select id="Type" v-model="type">
          <option value="conférence">conférence</option>
          <option value="concert">concert</option>
          <option value="meeting">meeting</option>
          <option value="atelier">atelier</option>
          <option value="séminaire">séminaire</option>
          <option value="hackathon">hackathon</option>
          <option value="webinaire">webinaire</option>
          <option value="exposition">exposition</option>
        </select>
      </label>

      <!-- Boutons d'action -->
      <div class="actions">
        <button
          type="button"
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="bg-indigo-500 text-white"
        >
          {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
        </button>
        <button type="button" @click="closeForm">Annuler</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.form-overlay {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  z-index: 3;
  
  label {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 720px) {
    max-width: 520px;
  }
}
.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.error {
  color: red;
  margin-bottom: 1rem;
}
</style>
