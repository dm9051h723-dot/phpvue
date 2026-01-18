<template>
  <div>
    <section class="content-header clearfix">
      <h1>{{ viewMode === 0 ? '目前任務列' : '歷史任務列' }}</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             :title="viewMode === 0 ? '執行中任務' : '已完成任務'"
             :columns="columns"
             :data="queues"
             :loading="loading"
             :pagination="pagination"
             @page-change="fetchData"
          >
             <template #row="{ item }">
                <td>{{ item.id }}</td>
                <td>{{ item.robot_name }}</td>
                <td>{{ item.mission_name }}</td>
                <td><span class="badge" :class="getStatusClass(item.state)">{{ item.state }}</span></td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.finished_at || '-' }}</td>
             </template>
          </CrudTable>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import CrudTable from '../../components/Common/CrudTable.vue'

const route = useRoute()
const viewMode = ref(route.path.includes('current') ? 0 : 1)
const queues = ref([])
const loading = ref(false)
const pagination = ref({ current_page: 1, last_page: 1 })

const columns = [
  { label: 'ID', key: 'id' },
  { label: '機器人', key: 'robot_name' },
  { label: '任務名稱', key: 'mission_name' },
  { label: '狀態', key: 'state' },
  { label: '建立時間', key: 'created_at' },
  { label: '完成時間', key: 'finished_at' }
]

const getStatusClass = (state) => {
   if (state === 'Done') return 'bg-success'
   if (state === 'Pending') return 'bg-warning'
   if (state === 'Error') return 'bg-danger'
   return 'bg-info'
}

const fetchData = async (page = 1) => {
  loading.value = true
  try {
     // viewMode 0 = current, 1 = history
     const res = await axios.get('/api/missionQueues', { params: { page, view_mode: viewMode.value } })
     if (res.data.status === 0) {
        queues.value = res.data.data.missionQueues
        pagination.value = res.data.data.pagination
     }
  } catch (err) {
     queues.value = [
        { id: 10, robot_name: 'Robot1', mission_name: 'Task A', state: 'Done', created_at: '2023-01-01', finished_at: '2023-01-01' }
     ]
  } finally {
     loading.value = false
  }
}

watch(() => route.path, (newPath) => {
   viewMode.value = newPath.includes('current') ? 0 : 1
   fetchData()
})

onMounted(() => fetchData())
</script>
