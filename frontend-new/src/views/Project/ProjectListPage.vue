<template>
  <div>
    <section class="content-header clearfix">
      <h1>專案管理</h1>
      <div class="pull-right">
        <button class="btn btn-success" @click="openModal(null)">
          <i class="fas fa-plus"></i> 創建專案
        </button>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <CrudTable
             title="專案列表"
             :columns="columns"
             :data="projects"
             :loading="loading"
             :pagination="pagination"
             @page-change="fetchData"
          >
             <template #tools>
                 <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" v-model="search" @keyup.enter="fetchData(1)" class="form-control pull-right" placeholder="搜尋專案名稱">
                    <div class="input-group-btn">
                      <button type="submit" class="btn btn-default" @click="fetchData(1)"><i class="fa fa-search"></i></button>
                    </div>
                  </div>
             </template>
             <template #actions="{ item }">
                <button class="btn btn-primary btn-sm me-1" @click="openModal(item)">
                   <i class="fas fa-pencil-alt"></i> 修改
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteRow(item)">
                   <i class="fas fa-trash"></i> 刪除
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

const projects = ref([])
const loading = ref(false)
const search = ref('')
const pagination = ref({ current_page: 1, last_page: 1 })

const columns = [
  { label: '專案名稱', key: 'name' }
]

const fetchData = async (page = 1) => {
  loading.value = true
  try {
     const res = await axios.get('/api/projects', {
        params: { page, name: search.value }
     })
     if (res.data.status === 0) {
        projects.value = res.data.data.projects
        pagination.value = res.data.data.pagination
     }
  } catch (err) {
     console.error("Backend not connected or error", err)
     // Fallback for demo if no backend
     if (projects.value.length === 0) {
         projects.value = [
             { id: 1, name: 'Demo Project A' },
             { id: 2, name: 'Demo Project B' }
         ]
     }
  } finally {
     loading.value = false
  }
}

const openModal = (item) => {
  alert(item ? `Edit Project: ${item.name}` : 'Create New Project')
}

const deleteRow = async (item) => {
  if (confirm(`確定要刪除 ${item.name}?`)) {
     try {
        await axios.delete(`/api/projects/${item.id}`)
        fetchData(pagination.value.current_page)
     } catch (err) {
        alert('Delete failed (Backend likely not connected)')
     }
  }
}

onMounted(() => fetchData())
</script>
