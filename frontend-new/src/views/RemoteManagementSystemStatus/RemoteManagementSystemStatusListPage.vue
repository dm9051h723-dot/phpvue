<template>
  <div>
    <section class="content-header clearfix">
      <h1>採樣任務進度</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="遠端系統狀態"
             :columns="columns"
             :data="statuses"
             :loading="loading"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CrudTable from '../../components/Common/CrudTable.vue'

const statuses = ref([])
const loading = ref(false)

const columns = [
  { label: '任務ID', key: 'mission_id' },
  { label: '當前步驟', key: 'step' },
  { label: '進度', key: 'progress' },
  { label: '狀態', key: 'status' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/remoteManagementSystemStatuses')
     if (res.data.status === 0) {
        statuses.value = res.data.data.remoteManagementSystemStatuses
     }
  } catch (err) {
     statuses.value = [
        { id: 1, mission_id: 'M-001', step: 'Sampling', progress: '50%', status: 'Running' }
     ]
  } finally {
     loading.value = false
  }
}

onMounted(() => fetchData())
</script>
