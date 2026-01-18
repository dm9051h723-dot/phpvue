<template>
  <div>
    <section class="content-header clearfix">
      <div class="d-flex align-items-center">
         <h1 class="me-auto" v-if="activeTab === 'users'">帳號權限管理</h1>
         <h1 class="me-auto" v-else>群組管理</h1>

         <div v-if="activeTab === 'users'">
             <button class="btn btn-success" @click="openUserModal(null)">
                 <i class="fas fa-plus"></i> 創建使用者
             </button>
         </div>
         <div v-else>
             <button v-if="roleMode === 'read'" class="btn btn-success" @click="roleMode = 'edit'">
                 <i class="fas fa-pencil-alt"></i> 編輯
             </button>
             <button v-else class="btn btn-danger" @click="roleMode = 'read'">
                 <i class="fas fa-times-circle"></i> 取消編輯
             </button>
         </div>
      </div>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="box box-primary">
            <div class="box-body">

              <!-- Custom Tabs -->
              <ul class="nav nav-tabs mb-3">
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'users' }" href="#" @click.prevent="activeTab = 'users'">帳號管理</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{ active: activeTab === 'roles' }" href="#" @click.prevent="activeTab = 'roles'">群組管理</a>
                </li>
              </ul>

              <!-- Tab Content -->
              <div v-if="activeTab === 'users'">
                  <CrudTable
                     title=""
                     :columns="userColumns"
                     :data="users"
                     :loading="loadingUsers"
                  >
                     <template #actions="{ item }">
                        <button class="btn btn-primary btn-sm me-1" @click="openUserModal(item)">編輯</button>
                        <button class="btn btn-danger btn-sm" @click="deleteUser(item)">刪除</button>
                     </template>
                  </CrudTable>
              </div>

              <div v-if="activeTab === 'roles'">
                  <div v-if="loadingRoles" class="text-center py-5">
                      <div class="spinner-border text-primary"></div>
                  </div>
                  <div v-else>
                      <table class="table table-bordered table-striped">
                          <thead>
                              <tr>
                                  <th>權限 / 群組</th>
                                  <th v-for="role in roles" :key="role.id" class="text-center">
                                      {{ role.display_name }}
                                      <div v-if="roleMode === 'edit'" class="mt-1">
                                          <!-- Edit Role Name Button Placeholder -->
                                      </div>
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="perm in permissions" :key="perm.id">
                                  <td>{{ perm.display_name }}</td>
                                  <td v-for="role in roles" :key="role.id" class="text-center">
                                      <input type="checkbox"
                                             :checked="roleHasPermission(role, perm)"
                                             :disabled="roleMode === 'read'"
                                             @change="togglePermission(role, perm)"
                                      >
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <div v-if="roleMode === 'edit'" class="text-end mt-3">
                          <button class="btn btn-primary" @click="saveRoles">儲存設定</button>
                      </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import CrudTable from '../../components/Common/CrudTable.vue'

// Tabs
const activeTab = ref('users')

// User Tab State
const users = ref([])
const loadingUsers = ref(false)
const userColumns = [
  { label: 'ID', key: 'id' },
  { label: '姓名', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: '群組', key: 'role_names' }
]

// Role Tab State
const roleMode = ref('read')
const roles = ref([])
const permissions = ref([])
const rolePermissions = ref({}) // Map role_id -> [perm_id, ...]
const loadingRoles = ref(false)

// Fetch Users
const fetchUsers = async () => {
    loadingUsers.value = true
    try {
        const res = await axios.get('/api/users')
        if(res.data.status === 0) {
            users.value = res.data.data.users.map(u => ({
                ...u,
                role_names: u.roles.map(r => r.display_name).join(', ')
            }))
        }
    } catch (err) {
        // Mock
        users.value = [
            { id: 1, name: 'Admin', email: 'admin@example.com', role_names: 'Administrator' }
        ]
    } finally {
        loadingUsers.value = false
    }
}

// Fetch Roles & Permissions
const fetchRoles = async () => {
    loadingRoles.value = true
    try {
        const [resRoles, resPerms] = await Promise.all([
            axios.get('/api/roles'),
            axios.get('/api/permissions') // Assuming endpoint
        ])
        // Since original API might differ, we mock or adapt
        if (resRoles.data.status === 0) {
             roles.value = resRoles.data.data.roles
             // We need to fetch permissions separately or extract from role
             // For simplicity in mock:
             permissions.value = [
                 { id: 1, name: 'user-role-manage', display_name: '帳號權限管理' },
                 { id: 2, name: 'pollution-map', display_name: '汙染地圖' }
             ]

             // Build map
             roles.value.forEach(r => {
                 rolePermissions.value[r.id] = r.perms ? r.perms.map(p => p.id) : []
             })
        }
    } catch (err) {
        // Mock
        roles.value = [
            { id: 1, name: 'admin', display_name: 'Administrator' },
            { id: 2, name: 'user', display_name: 'User' }
        ]
        permissions.value = [
             { id: 1, name: 'user-role-manage', display_name: '帳號權限管理' },
             { id: 2, name: 'pollution-map', display_name: '汙染地圖' }
        ]
        rolePermissions.value = {
            1: [1, 2],
            2: [2]
        }
    } finally {
        loadingRoles.value = false
    }
}

const roleHasPermission = (role, perm) => {
    return rolePermissions.value[role.id]?.includes(perm.id)
}

const togglePermission = (role, perm) => {
    const perms = rolePermissions.value[role.id] || []
    if (perms.includes(perm.id)) {
        rolePermissions.value[role.id] = perms.filter(id => id !== perm.id)
    } else {
        rolePermissions.value[role.id] = [...perms, perm.id]
    }
}

const saveRoles = async () => {
    alert('Save Roles Logic')
    roleMode.value = 'read'
}

const openUserModal = (user) => alert(user ? `Edit ${user.name}` : 'Create User')
const deleteUser = (user) => alert(`Delete ${user.name}`)

watch(activeTab, (newTab) => {
    if (newTab === 'users') fetchUsers()
    if (newTab === 'roles') fetchRoles()
})

onMounted(() => fetchUsers())
</script>

<style scoped>
.nav-tabs .nav-link {
    color: #495057;
    cursor: pointer;
}
.nav-tabs .nav-link.active {
    font-weight: bold;
    color: #007bff;
}
</style>
