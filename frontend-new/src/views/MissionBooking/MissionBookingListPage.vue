<template>
  <div>
    <section class="content-header clearfix">
      <h1>預約任務</h1>
      <div class="pull-right">
         <button class="btn btn-success" @click="create">新增預約</button>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="預約列表"
             :columns="columns"
             :data="bookings"
             :loading="loading"
          >
             <template #actions="{ item }">
                <button class="btn btn-danger btn-sm" @click="cancel(item)">取消</button>
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

const bookings = ref([])
const loading = ref(false)

const columns = [
  { label: '預約時間', key: 'scheduled_at' },
  { label: '任務名稱', key: 'mission_name' },
  { label: '重複模式', key: 'repeat_mode' },
  { label: '狀態', key: 'status' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/missionBookings')
     if (res.data.status === 0) {
        bookings.value = res.data.data.missionBookings
     }
  } catch (err) {
     bookings.value = [
        { id: 1, scheduled_at: '2023-02-01 10:00:00', mission_name: 'Daily Check', repeat_mode: 'Daily', status: 'Active' }
     ]
  } finally {
     loading.value = false
  }
}

const create = () => alert('Create Booking')
const cancel = (item) => alert(`Cancel ${item.id}`)

onMounted(() => fetchData())
</script>
