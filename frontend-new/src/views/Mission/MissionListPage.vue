<template>
  <div>
    <section class="content-header clearfix">
      <h1>發送任務</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-md-6">
           <div class="box box-primary">
              <div class="box-header with-border">
                 <h3 class="box-title">選擇任務</h3>
              </div>
              <div class="box-body">
                 <div class="form-group mb-3">
                    <label>機器人</label>
                    <select class="form-control" v-model="form.robot_id">
                       <option v-for="r in robots" :key="r.id" :value="r.id">{{ r.name }}</option>
                    </select>
                 </div>
                 <div class="form-group mb-3">
                    <label>任務類型</label>
                    <select class="form-control" v-model="form.mission_group_id">
                       <option v-for="g in missionGroups" :key="g.id" :value="g.id">{{ g.name }}</option>
                    </select>
                 </div>
                 <button class="btn btn-primary" @click="sendMission" :disabled="sending">
                    <i v-if="sending" class="fas fa-spinner fa-spin"></i> 發送任務
                 </button>
              </div>
           </div>
        </div>
        <div class="col-md-6">
           <div class="box box-info">
              <div class="box-header with-border">
                 <h3 class="box-title">任務列表</h3>
              </div>
              <div class="box-body">
                 <ul>
                    <li v-for="m in missions" :key="m.guid">{{ m.name }}</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const robots = ref([])
const missionGroups = ref([])
const missions = ref([])
const sending = ref(false)
const form = ref({ robot_id: null, mission_group_id: null })

const fetchData = async () => {
   // Mock data for dropdowns
   robots.value = [{id: 1, name: 'Robot 1'}, {id: 2, name: 'Robot 2'}]
   missionGroups.value = [{id: 1, name: 'Cleaning'}, {id: 2, name: 'Delivery'}]
   missions.value = [{guid: 'abc', name: 'Go to Station A'}, {guid: 'def', name: 'Go to Station B'}]
}

const sendMission = async () => {
   if (!form.value.robot_id) return alert('Please select a robot')
   sending.value = true
   try {
      await axios.post('/api/missions', form.value)
      alert('Mission Sent!')
   } catch (e) {
      alert('Failed to send mission (Backend offline)')
   } finally {
      sending.value = false
   }
}

onMounted(() => fetchData())
</script>
