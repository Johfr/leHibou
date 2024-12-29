import { defineStore } from 'pinia'

export const useToasterStore = defineStore('toaster', {
  state: () => ({
    message: '' as string,
    type: '' as string, // 'success' | 'error' | 'info'
    visible: false,
  }),
  actions: {
    showMessage(message: string, type: string) {
      this.message = message
      this.type = type
      this.visible = true

      // Masque le toaster après 3 secondes
      setTimeout(() => {
        this.visible = false
      }, 3000)
    },
    hideMessage() {
      this.visible = false
    },
  },
})
