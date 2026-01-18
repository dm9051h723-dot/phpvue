<template>
  <div>
    <section class="content-header clearfix">
      <h1>裝置列表 (AP/IP)</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="連線裝置"
             :columns="columns"
             :data="devices"
             :loading="loading"
          >
             <template #row="{ item }">
                <td>{{ item.name }}</td>
                <td>{{ item.ip }}</td>
                <td>{{ item.type }}</td>
                <td><a v-if="item.ip" :href="'http://' + item.ip" target="_blank" class="btn btn-xs btn-default">Open</a></td>
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

const devices = ref([])
const loading = ref(false)

const columns = [
  { label: '名稱', key: 'name' },
  { label: 'IP Address', key: 'ip' },
  { label: '類型', key: 'type' },
  { label: '操作', key: 'action' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/devices')
     if (res.data.status === 0) {
        devices.value = res.data.data.devices
     }
  } catch (err) {
     devices.value = [
        { id: 1, name: 'Robot Main', ip: '192.168.1.50', type: 'Robot' }
     ]
  } finally {
     loading.value = false
  }
}

onMounted(() => fetchData())
</script>
