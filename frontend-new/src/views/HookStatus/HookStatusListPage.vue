<template>
  <div>
    <section class="content-header clearfix">
      <h1>手臂資訊</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="機械手臂狀態"
             :columns="columns"
             :data="hooks"
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

const hooks = ref([])
const loading = ref(false)

const columns = [
  { label: 'ID', key: 'id' },
  { label: '手臂名稱', key: 'name' },
  { label: '狀態', key: 'status' },
  { label: '高度', key: 'height' },
  { label: '角度', key: 'angle' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/hookStatuses')
     if (res.data.status === 0) {
        hooks.value = res.data.data.hookStatuses
     }
  } catch (err) {
     hooks.value = [
        { id: 1, name: 'Hook-Left', status: 'Idle', height: '10cm', angle: '0' }
     ]
  } finally {
     loading.value = false
  }
}

onMounted(() => fetchData())
</script>
