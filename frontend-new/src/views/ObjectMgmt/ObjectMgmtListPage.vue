<template>
  <div>
    <section class="content-header clearfix">
      <h1>物件管理 (虛擬牆)</h1>
      <div class="pull-right">
        <button class="btn btn-success" @click="create">
          <i class="fas fa-plus"></i> 新增物件
        </button>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="物件列表"
             :columns="columns"
             :data="objects"
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

const objects = ref([])
const loading = ref(false)

const columns = [
  { label: '名稱', key: 'name' },
  { label: '類型', key: 'type' },
  { label: '區域', key: 'region_name' },
  { label: '座標', key: 'coordinates' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/objectMgmts')
     if (res.data.status === 0) {
        objects.value = res.data.data.objectMgmts.map(o => ({
            ...o,
            region_name: o.region ? o.region.name : 'Unknown',
            coordinates: `(${o.x}, ${o.y})`
        }))
     }
  } catch (err) {
     objects.value = [
        { id: 1, name: 'Wall A', type: 'Virtual Wall', region_name: '1F', coordinates: '(10, 50)' },
        { id: 2, name: 'Charger 1', type: 'Charger', region_name: '1F', coordinates: '(100, 50)' }
     ]
  } finally {
     loading.value = false
  }
}

const create = () => alert('Create Object')
const edit = (item) => alert(`Edit ${item.name}`)
const remove = (item) => alert(`Delete ${item.name}`)

onMounted(() => fetchData())
</script>
