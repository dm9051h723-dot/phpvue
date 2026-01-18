<template>
  <div>
    <section class="content-header clearfix">
      <h1>事件列表</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="系統事件"
             :columns="columns"
             :data="events"
             :loading="loading"
             :pagination="pagination"
             @page-change="fetchData"
          >
             <template #row="{ item }">
                <td>{{ item.id }}</td>
                <td>{{ item.event_type }}</td>
                <td><span :class="getLevelClass(item.level)">{{ item.level }}</span></td>
                <td>{{ item.message }}</td>
                <td>{{ item.created_at }}</td>
             </template>
          </CrudTable>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CrudTable from '../../components/Common/CrudTable.vue'

const events = ref([])
const loading = ref(false)
const pagination = ref({ current_page: 1, last_page: 1 })

const columns = [
  { label: 'ID', key: 'id' },
  { label: '類型', key: 'event_type' },
  { label: '等級', key: 'level' },
  { label: '訊息', key: 'message' },
  { label: '時間', key: 'created_at' }
]

const getLevelClass = (level) => {
   if (level === 'Error') return 'badge bg-danger'
   if (level === 'Warning') return 'badge bg-warning'
   return 'badge bg-info'
}

const fetchData = async (page = 1) => {
  loading.value = true
  try {
     const res = await axios.get('/api/events', { params: { page } })
     if (res.data.status === 0) {
        events.value = res.data.data.events
        pagination.value = res.data.data.pagination
     }
  } catch (err) {
     events.value = [
        { id: 101, event_type: 'System', level: 'Info', message: 'System Started', created_at: '2023-01-01 10:00:00' },
        { id: 102, event_type: 'Robot', level: 'Error', message: 'Connection Lost', created_at: '2023-01-01 10:05:00' }
     ]
  } finally {
     loading.value = false
  }
}

onMounted(() => fetchData())
</script>
