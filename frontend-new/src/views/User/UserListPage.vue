<template>
  <CrudList title="帳號權限管理">
    <template #header-actions>
      <button class="btn btn-success" @click="create">
        <i class="fas fa-plus"></i> 新增使用者
      </button>
    </template>
    <template #content>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>Email</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-sm btn-primary me-1">編輯</button>
              <button class="btn btn-sm btn-danger">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </CrudList>
</template>

<script setup>
import { ref } from 'vue'
import CrudList from '../Common/CrudList.vue'

const users = ref([
  { id: 1, name: 'Admin', email: 'admin@example.com', role: 'Admin' },
  { id: 2, name: 'User A', email: 'usera@example.com', role: 'User' }
])

const create = () => {
  alert('Create User Modal would open here')
}
</script>
