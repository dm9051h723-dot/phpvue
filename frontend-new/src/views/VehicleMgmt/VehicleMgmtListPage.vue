<template>
  <div>
    <section class="content-header clearfix">
      <h1>車輛管理</h1>
      <div class="pull-right">
        <button class="btn btn-success" @click="editMode = !editMode">
           <i class="fas" :class="editMode ? 'fa-times' : 'fa-edit'"></i> {{ editMode ? '結束編輯' : '編輯模式' }}
        </button>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="車輛列表"
             :columns="columns"
             :data="vehicles"
             :loading="loading"
             @page-change="fetchData"
          >
             <template #actions="{ item }">
                <button v-if="editMode" class="btn btn-primary btn-sm me-1" @click="edit(item)">
                   修改
                </button>
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

const vehicles = ref([])
const loading = ref(false)
const editMode = ref(false)

const columns = [
  { label: '車輛ID', key: 'vehicle_id' },
  { label: '名稱', key: 'name' },
  { label: 'IP位址', key: 'ip' },
  { label: '狀態', key: 'status_text' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/vehicleMgmts')
     if (res.data.status === 0) {
        vehicles.value = res.data.data.vehicleMgmts
     }
  } catch (err) {
     console.error(err)
     vehicles.value = [
        { id: 1, vehicle_id: 'V001', name: 'AMDR-01', ip: '192.168.1.101', status_text: 'Idle' },
        { id: 2, vehicle_id: 'V002', name: 'AMDR-02', ip: '192.168.1.102', status_text: 'Running' }
     ]
  } finally {
     loading.value = false
  }
}

const edit = (item) => {
   alert(`Edit vehicle ${item.name}`)
}

onMounted(() => fetchData())
</script>
