<template>
  <div>
    <section class="content-header clearfix">
      <h1>地圖列表</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="AMDR 地圖管理"
             :columns="columns"
             :data="maps"
             :loading="loading"
          >
             <template #actions="{ item }">
                <button class="btn btn-info btn-sm" @click="sync(item)">同步</button>
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

const maps = ref([])
const loading = ref(false)

const columns = [
  { label: '地圖GUID', key: 'guid' },
  { label: '名稱', key: 'name' },
  { label: '建立時間', key: 'created_at' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/maps')
     if (res.data.status === 0) {
        maps.value = res.data.data.maps
     }
  } catch (err) {
     maps.value = [
        { guid: 'uuid-1', name: 'Map Floor 1', created_at: '2023-01-01' }
     ]
  } finally {
     loading.value = false
  }
}

const sync = (item) => alert(`Syncing map ${item.name}`)

onMounted(() => fetchData())
</script>
