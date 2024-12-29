<script setup lang="ts">
import { useEventsStore } from '@/stores/events'
import { useGetData } from '~/composables/getData'
import { useToasterStore } from '@/stores/toaster'
import type { Event } from '~/types/Events.js'

// toaster
const toasterStore = useToasterStore()
// data store
const eventsStore = useEventsStore()

const events = computed((): Event[] => eventsStore.events)
const eventsType = ref<String[]>([])
const showConfirm = ref<Boolean>(false)
const showCreateForm = ref<Boolean>(false)
const showUpdateForm = ref<Boolean>(false)
const eventToUpdate = ref<Event>()
const selectedEvent = ref<Event>()

onMounted(() => {
  setEventTypes()
})

const refreshData = async (): Promise<void> => {
  // fetch la bdd pour mettre à jour les données
  await useGetData()
  
  setEventTypes()
}

const setEventTypes = () => {
  // redefini l'ensemble des types
  eventsType.value = []

  // regroupe uniquement les types
  events.value.forEach((event:Event) => {
    if (!eventsType.value.includes(event.type)) {
      eventsType.value.push(event.type)
    }
  })
}

const addItem = async (item: Event): Promise<void> => {
  const currentId = events.value?.at(-1)?.id ?? "0"

  item.id = (parseInt(currentId) + 1).toString()


  try {
    await $fetch('/events', {
      method: 'post',
      body: item,
    })
    
    refreshData()
    
    triggerToaster('Événement ajouté avec succès', 'success')

  } catch (error) {
    console.error("Erreur lors de l'ajout de l'événement :", error)
  }
}

const updateItem = async (item: Event): Promise<void> => {
  try {
    const response = await $fetch('/events', {
      method: 'put',
      body: item,
    })

    refreshData()

    triggerToaster('Événement mis à jour avec succès', 'success')
  } catch (error) {
    console.error("Erreur lors de la modification de l'événement :", error)
  }
}

const deleteItem = async (id: string): Promise<void> => {
  try {
    await $fetch('/events', {
      method: 'delete',
      body: id,
    })
    
    // mets à jours les données
    refreshData()
    // affiche le message de confirmation
    triggerToaster('Événement supprimé avec succès', 'success')

  } catch (error) {
    console.error("Erreur lors de la suppréssion de l'événement :", error)
  }
}

const confirmDelete = (item: Event): void => {
  eventToUpdate.value = item
  showConfirm.value = true
}

const triggerToaster = (msg: string, type: string) => {
  toasterStore.showMessage(msg, type)
}
</script>

<template>
  <section class="events-wrapper">
    <h1 class="text-pink-200">Events list</h1>

    <p v-if="!eventsType.length">Chargement...</p>

    <div v-else>
      <button @click="showCreateForm = true">Ajouter un nouvel évènement</button>
      
      <ul>
        <li v-for="(type, typeId) in eventsType" :key="typeId">
          <p class="text-2xl my-3 capitalize">
            {{ type }}
          </p>
          
          <ul>
            <li v-for="(item, itemId) in events?.filter(event => event.type === type)" :key="itemId">
              <div class="flex">
                <NuxtLink :to="`/events/${item.id}`" title="accéder à l'évènement">
                  #{{ item.id }}
                  {{ item.name }}
                </NuxtLink>
                
                <div class="flex ml-3">
                  <button @click="showUpdateForm = true; selectedEvent = item" title="Mettre à jour" class="rotate-90 bg-transparent p-0">&#9998;</button>
                  <button @click="confirmDelete(item)" title="Supprimer" class="bg-transparent p-0">&#9746;</button>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <AddOrUpdateEvent v-if="showCreateForm" v-model="showCreateForm" @addItem="addItem" :isEditing="false" />
    <AddOrUpdateEvent v-if="showUpdateForm" v-model="showUpdateForm" @updateItem="updateItem" :isEditing="true" :currentEvent="selectedEvent"/>
    <ConfirmPopin v-if="showConfirm && eventToUpdate" v-model="showConfirm" @deleteItem="deleteItem" :name="eventToUpdate?.name" :id="eventToUpdate?.id || ''" />
  </section>
</template>