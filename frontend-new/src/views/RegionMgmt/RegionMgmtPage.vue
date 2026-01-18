<template>
  <div class="region-page" style="position: relative; height: calc(100vh - 60px); overflow: hidden;">

    <!-- Header/Nav -->
    <div class="room-name-block shadow-sm">
        <router-link to="/floorRegionMgmts/1" class="back-btn text-decoration-none me-2">&lt; 返回</router-link>
        <span class="room-name-title">現在位置：</span>
        <span class="room-name fw-bold">{{ regionMgmt?.room_environment?.room_name || '尚無房間名稱' }}</span>

        <div class="btn-group ms-3" role="group">
            <button class="btn btn-outline-secondary btn-sm" :disabled="scale >= 3" @click="scale += 0.1">+</button>
            <button class="btn btn-outline-secondary btn-sm" @click="scale = 1">{{ Math.round(scale * 100) }}%</button>
            <button class="btn btn-outline-secondary btn-sm" :disabled="scale <= 0.5" @click="scale -= 0.1">-</button>
        </div>
    </div>

    <!-- Map Legend -->
    <div class="micro-organism-legend shadow-sm">
        <div class="mb-1">
            <span class="me-2"><i class="fas fa-play fa-rotate-270"></i> 懸浮微生物</span>
            <span class="me-2"><i class="fas fa-square"></i> 落下微生物</span>
            <span class="me-2"><i class="fas fa-circle"></i> 接觸微生物</span>
            <span class="me-2"><i class="fas fa-star"></i> 微粒子(5µm)</span>
            <span><i class="fas fa-square fa-rotate-45"></i> 微粒子(0.5µm)</span>
        </div>
        <div>
            <template v-for="pc in pollutionConditions" :key="pc.id">
                <span class="me-2"><i class="fas fa-square" :style="{ color: pc.color }"></i> {{ pc.display_name }}</span>
            </template>
        </div>
    </div>

    <!-- Base Map Container -->
    <div id="baseMap" class="base-map"
         :style="{ transform: `scale(${scale})`, transformOrigin: 'top left' }"
         @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag"
    >
        <div class="map-content" :style="{ transform: `translate(${pan.x}px, ${pan.y}px)` }">
            <img v-if="regionMgmt"
                 :src="`/images/${regionMgmt.project.name}/cad_${regionMgmt.region}.png`"
                 alt="Map"
                 draggable="false"
                 @error="onImgError"
            />
            <div v-else class="d-flex align-items-center justify-content-center bg-light" style="width: 1000px; height: 800px;">
                <span class="text-muted">Loading Map...</span>
            </div>

            <!-- Locations Overlay (Simplified) -->
            <template v-if="locations">
                <div v-for="loc in locations" :key="loc.id"
                     class="location-marker"
                     :style="{ left: loc.x + 'px', top: loc.y + 'px', position: 'absolute' }"
                     @dblclick="showMicroOrganism(loc)"
                >
                    <!-- Marker logic matching legend -->
                    <i class="fas fa-circle text-success" style="font-size: 10px;"></i>
                </div>
            </template>
        </div>
    </div>

    <!-- MicroOrganism Sidebar (Right) -->
    <div class="micro-organism-sidebar" :class="{ open: showSidebar }">
        <div class="sidebar-toggle" @click="showSidebar = !showSidebar">
            {{ showSidebar ? '>' : '<' }} 微生物資訊
        </div>
        <div class="p-3" v-if="selectedMicroOrganism">
             <h5 class="border-bottom pb-2">詳細資訊</h5>
             <div class="mb-2"><strong>時間:</strong> {{ selectedMicroOrganism.Time }}</div>
             <div class="mb-2"><strong>位置:</strong> {{ selectedMicroOrganism.device_name }}</div>
             <div class="mb-2"><strong>數值:</strong> {{ selectedMicroOrganism.organism_value }}</div>
             <div class="mb-2"><strong>類別:</strong> {{ selectedMicroOrganism.organism_kind }}</div>
        </div>
        <div class="p-3 text-muted" v-else>
            請雙擊地圖上的點位以查看資訊。
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const regionMgmtId = route.params.id

const regionMgmt = ref(null)
const locations = ref([])
const pollutionConditions = ref([])
const scale = ref(1.0)
const pan = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })

const showSidebar = ref(false)
const selectedMicroOrganism = ref(null)

const fetchData = async () => {
    try {
        const res = await axios.get(`/api/regionMgmts/${regionMgmtId}`)
        if(res.data.status === 0) {
            regionMgmt.value = res.data.data.regionMgmt
        }
    } catch (err) {
        console.error(err)
        // Mock
        regionMgmt.value = {
            id: regionMgmtId,
            region: '1F',
            project: { name: 'DemoProject' },
            room_environment: { room_name: 'Clean Room A' }
        }
    }

    try {
        const res = await axios.get('/api/pollutionConditions')
        if(res.data.status === 0) {
            pollutionConditions.value = res.data.data.pollutionConditions
        }
    } catch (err) {
        pollutionConditions.value = [
            { name: 'action', display_name: '行動', color: '#dc3545' },
            { name: 'normal', display_name: '正常', color: '#28a745' }
        ]
    }
}

const startDrag = (e) => {
    isDragging.value = true
    dragStart.value = { x: e.clientX - pan.value.x, y: e.clientY - pan.value.y }
}

const onDrag = (e) => {
    if (!isDragging.value) return
    pan.value = { x: e.clientX - dragStart.value.x, y: e.clientY - dragStart.value.y }
}

const stopDrag = () => {
    isDragging.value = false
}

const onImgError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x600?text=Map+Image+Not+Found'
}

const showMicroOrganism = (loc) => {
    selectedMicroOrganism.value = {
        Time: '2023-01-01 12:00',
        device_name: `Device-${loc.id}`,
        organism_value: 50,
        organism_kind: 'suspended'
    }
    showSidebar.value = true
}

onMounted(() => fetchData())
</script>

<style scoped>
.room-name-block {
    position: absolute;
    top: 15px;
    right: 15px;
    background: white;
    padding: 10px;
    border-top: 5px solid #bfc2e3;
    z-index: 10;
}
.micro-organism-legend {
    position: absolute;
    top: 15px;
    left: 15px;
    background: white;
    padding: 10px;
    border-top: 5px solid #bfc2e3;
    z-index: 10;
    font-size: 0.9rem;
}
.base-map {
    width: 100%;
    height: 100%;
    cursor: grab;
}
.base-map:active {
    cursor: grabbing;
}
.micro-organism-sidebar {
    position: fixed;
    right: -300px;
    top: 60px; /* Header height approx */
    width: 300px;
    height: calc(100vh - 60px);
    background: white;
    box-shadow: -2px 0 5px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    z-index: 20;
}
.micro-organism-sidebar.open {
    right: 0;
}
.sidebar-toggle {
    position: absolute;
    left: -40px;
    top: 50%;
    width: 40px;
    height: 60px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px 0 0 5px;
    box-shadow: -2px 0 5px rgba(0,0,0,0.1);
    writing-mode: vertical-rl;
    font-weight: bold;
    color: #5c9b6c;
}
</style>
