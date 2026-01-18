import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDeviceStore = defineStore('device', () => {
  const device = ref({
    ip: '192.168.1.100',
    ap: null
  })

  return { device }
})
