<template>
  <div>
    <section class="content-header clearfix">
      <h1>數據輸入 (微生物)</h1>
      <div class="pull-right">
         <button class="btn btn-success" @click="create">新增數據</button>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="微生物數據"
             :columns="columns"
             :data="items"
             :loading="loading"
          >
             <template #actions="{ item }">
                <button class="btn btn-primary btn-sm" @click="edit(item)">修改</button>
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

const items = ref([])
const loading = ref(false)

const columns = [
  { label: '日期', key: 'date' },
  { label: '位置', key: 'location' },
  { label: '類別', key: 'type' },
  { label: '數值', key: 'value' },
  { label: '備註', key: 'note' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/microOrganisms')
     if (res.data.status === 0) {
        items.value = res.data.data.microOrganisms
     }
  } catch (err) {
     items.value = [
        { id: 1, date: '2023-01-01', location: 'Room A', type: 'Bacteria', value: 50, note: '-' }
     ]
  } finally {
     loading.value = false
  }
}

const create = () => alert('Add Data')
const edit = (item) => alert(`Edit ${item.id}`)

onMounted(() => fetchData())
</script>
