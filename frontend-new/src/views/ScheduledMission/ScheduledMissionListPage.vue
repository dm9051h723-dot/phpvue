<template>
  <div>
    <section class="content-header clearfix">
      <h1>排程任務</h1>
      <div class="pull-right">
        <button class="btn btn-success" @click="create">
          <i class="fas fa-plus"></i> 新增排程
        </button>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="排程列表"
             :columns="columns"
             :data="schedules"
             :loading="loading"
          >
             <template #row="{ item }">
                <td>{{ item.name }}</td>
                <td>{{ item.cron_expression }}</td>
                <td>{{ item.mission_name }}</td>
                <td>
                    <span class="badge" :class="item.is_active ? 'bg-success' : 'bg-secondary'">
                        {{ item.is_active ? '啟用' : '停用' }}
                    </span>
                </td>
                <td>
                   <button class="btn btn-primary btn-sm me-1" @click="edit(item)">修改</button>
                   <button class="btn btn-danger btn-sm" @click="remove(item)">刪除</button>
                </td>
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

const schedules = ref([])
const loading = ref(false)

const columns = [
  { label: '排程名稱', key: 'name' },
  { label: '執行時間 (Cron)', key: 'cron_expression' },
  { label: '任務', key: 'mission_name' },
  { label: '狀態', key: 'status' },
  { label: '操作', key: 'actions' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/scheduledMissions')
     if (res.data.status === 0) {
        schedules.value = res.data.data.scheduledMissions
     }
  } catch (err) {
     schedules.value = [
        { id: 1, name: 'Morning Patrol', cron_expression: '0 8 * * *', mission_name: 'Patrol 1F', is_active: true },
        { id: 2, name: 'Night Cleaning', cron_expression: '0 22 * * *', mission_name: 'Clean Lobby', is_active: false }
     ]
  } finally {
     loading.value = false
  }
}

const create = () => alert('Create Schedule')
const edit = (item) => alert(`Edit ${item.name}`)
const remove = (item) => alert(`Delete ${item.name}`)

onMounted(() => fetchData())
</script>
