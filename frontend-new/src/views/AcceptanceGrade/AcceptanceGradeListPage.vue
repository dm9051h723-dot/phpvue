<template>
  <div>
    <section class="content-header clearfix">
      <h1>參數設定 (驗收標準)</h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="標準列表"
             :columns="columns"
             :data="grades"
             :loading="loading"
          >
             <template #actions="{ item }">
                <button class="btn btn-primary btn-sm" @click="edit(item)">設定</button>
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

const grades = ref([])
const loading = ref(false)

const columns = [
  { label: '級別', key: 'grade_name' },
  { label: '懸浮微粒標準', key: 'suspended_limit' },
  { label: '落下菌標準', key: 'falling_limit' }
]

const fetchData = async () => {
  loading.value = true
  try {
     const res = await axios.get('/api/acceptanceGrades')
     if (res.data.status === 0) {
        grades.value = res.data.data.acceptanceGrades
     }
  } catch (err) {
     grades.value = [
        { id: 1, grade_name: 'Grade A', suspended_limit: 100, falling_limit: 10 }
     ]
  } finally {
     loading.value = false
  }
}

const edit = (item) => alert(`Setting ${item.grade_name}`)

onMounted(() => fetchData())
</script>
