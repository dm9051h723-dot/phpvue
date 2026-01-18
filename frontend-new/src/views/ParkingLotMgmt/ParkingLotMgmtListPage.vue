<template>
  <div>
    <section class="content-header clearfix">
      <h1>停車位管理</h1>
      <div class="pull-right">
         <button class="btn btn-success" @click="create"><i class="fas fa-plus"></i> 新增車位</button>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="車位列表"
             :columns="columns"
             :data="parkingLots"
             :loading="loading"
          >
             <template #actions="{ item }">
                <button class="btn btn-primary btn-sm me-1" @click="edit(item)">修改</button>
                <button class="btn btn-danger btn-sm" @click="remove(item)">刪除</button>
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

const parkingLots = ref([])
const loading = ref(false)

const columns = [
  { label: '名稱', key: 'name' },
  { label: '區域', key: 'region_name' },
  { label: '座標 (X,Y)', key: 'coordinates' },
  { label: '狀態', key: 'status' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/parkingLotMgmts')
     if (res.data.status === 0) {
        parkingLots.value = res.data.data.parkingLotMgmts.map(p => ({
            ...p,
            coordinates: `${p.x}, ${p.y}`,
            region_name: p.region ? p.region.name : 'Unknown'
        }))
     }
  } catch (err) {
     parkingLots.value = [
        { id: 1, name: 'P-01', region_name: '1F', coordinates: '100, 200', status: 'Available' }
     ]
  } finally {
     loading.value = false
  }
}

const create = () => alert('Create Parking Lot')
const edit = (item) => alert(`Edit ${item.name}`)
const remove = (item) => alert(`Delete ${item.name}`)

onMounted(() => fetchData())
</script>
