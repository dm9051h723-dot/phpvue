<template>
  <div class="region-page">
    <div class="map-container" style="position: relative; height: 80vh; background: #ddd; overflow: hidden;">
       <!-- Mock Map Image -->
       <div class="map-placeholder d-flex justify-content-center align-items-center h-100">
          <h3>Map Visualization (Project: {{ regionMgmt?.project?.name }}, Region: {{ regionMgmt?.region }})</h3>
          <!-- Real implementation would load image here -->
       </div>

       <!-- Zoom Controls -->
       <div class="zoom-controls position-absolute bottom-0 end-0 m-3 btn-group">
          <button class="btn btn-secondary" @click="scale += 0.1">+</button>
          <button class="btn btn-light">{{ Math.round(scale * 100) }}%</button>
          <button class="btn btn-secondary" @click="scale -= 0.1">-</button>
       </div>
    </div>

    <!-- MicroOrganism Info Sidebar (Slide-out) -->
    <div class="info-sidebar" :class="{ open: showInfo }">
       <div class="card h-100">
         <div class="card-header">
            微生物資訊
            <button class="btn-close float-end" @click="showInfo = false"></button>
         </div>
         <div class="card-body">
            <p v-if="selectedOrganism">
               類別: {{ selectedOrganism.type }}<br>
               數值: {{ selectedOrganism.value }}
            </p>
            <p v-else>請點擊地圖上的微生物</p>
         </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const regionMgmtId = route.params.id

const regionMgmt = ref(null)
const scale = ref(1.0)
const showInfo = ref(false)
const selectedOrganism = ref(null)

onMounted(async () => {
  // Mock Fetch Data
  console.log(`Fetching region data for ID: ${regionMgmtId}`)
  regionMgmt.value = {
     id: regionMgmtId,
     region: '1F',
     project: { name: 'DemoProject' }
  }
})

</script>

<style scoped>
.info-sidebar {
  position: fixed;
  right: -300px;
  top: 60px; /* Header height */
  width: 300px;
  height: calc(100vh - 60px);
  transition: right 0.3s ease;
  z-index: 1000;
}
.info-sidebar.open {
  right: 0;
}
</style>
