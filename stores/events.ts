import { defineStore } from 'pinia'
import type { Event } from '~/types/Events.js'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as Array<Event>,
  }),
  actions: {
    setEvents(data: Array<Event>) {      
      this.events = data;
    },
    addEvent(event: Event) {
      this.events.push(event);
    },
  },
})
