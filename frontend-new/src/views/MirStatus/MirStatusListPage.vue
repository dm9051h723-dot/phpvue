<template>
  <div>
    <section class="content-header clearfix">
      <h1>MIR 狀態列表</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="機器人即時狀態"
             :columns="columns"
             :data="statuses"
             :loading="loading"
          >
             <template #row="{ item }">
                <td>{{ item.robot_name }}</td>
                <td>{{ item.battery_percentage }}%</td>
                <td>{{ item.state_text }}</td>
                <td>{{ item.mission_text }}</td>
                <td>{{ item.updated_at }}</td>
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

const statuses = ref([])
const loading = ref(false)

const columns = [
  { label: '機器人', key: 'robot_name' },
  { label: '電量', key: 'battery_percentage' },
  { label: '狀態', key: 'state_text' },
  { label: '當前任務', key: 'mission_text' },
  { label: '更新時間', key: 'updated_at' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/mirStatuses')
     if (res.data.status === 0) {
        statuses.value = res.data.data.mirStatuses
     }
  } catch (err) {
     statuses.value = [
        { id: 1, robot_name: 'MiR100_1', battery_percentage: 85, state_text: 'Ready', mission_text: 'None', updated_at: '2023-01-01 12:00:00' }
     ]
  } finally {
     loading.value = false
  }
}

onMounted(() => fetchData())
</script>
