import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: 'Admin User',
    email: 'admin@example.com'
  })

  // Mock permissions: Grant all permissions found in the sidebar
  const permissionsList = ref([
    'user-role-manage',
    'sampling-robot',
    'pollution-map',
    'parameter-settings',
    'suspended-exceeds-read', 'falling-exceeds-read', 'contact-exceeds-read', 'microparticle-exceeds-read',
    'microbiological-data-entry',
    'job-history-read',
    'data-analysis-table',
    'cleanup-robot'
  ])

  const permissions = computed(() => {
    return {
      contains: (needed) => {
        if (Array.isArray(needed)) {
          return needed.some(p => permissionsList.value.includes(p))
        }
        return permissionsList.value.includes(needed)
      }
    }
  })

  return { user, permissions }
})
