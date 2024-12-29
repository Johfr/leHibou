<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useEventsStore } from '@/stores/events'
import type { Event } from '~/types/Events.js'

const eventsStore = useEventsStore()

const events = computed((): Event[] => eventsStore.events)

const route = useRoute()
const router = useRouter()
const eventId = route.params.id

const data = computed((): Event | undefined => events.value.find(item => item.id === eventId))
</script>

<template>
  <section>
    <div v-if="data">
      <h1>{{ data.name }}</h1>
      <p>{{ data.description }}</p>
      <p>Date de l'évènement: {{ data.date }}</p>
      <p>Intervenant: {{ data.intervenant }}</p>
      <p>Type: {{ data.type }}</p>
    </div>

    <div v-else>
      <h1>Événement non trouvé</h1>
    </div>

    <button @click="router.back()">Retour à l'accueil</button>
  </section>
</template>