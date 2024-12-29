import { useEventsStore } from '@/stores/events'
import type { Event } from '~/types/Events.js'

// Récupère les données depuis le JSON server
export const useGetData = async (): Promise<void> => {
  try {
    // initialise le store
    const eventsStore = useEventsStore()
    
    // Fetch les données
    const data = await $fetch('/events')
    
    // push les données dans le store
    if (data) {
      const events: Event[] = data as Event[]
      eventsStore.setEvents(events)
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error)
  }
}
