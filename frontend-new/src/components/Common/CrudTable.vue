<template>
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">{{ title }}</h3>
      <div class="box-tools pull-right">
        <slot name="tools"></slot>
      </div>
    </div>
    <div class="box-body">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th v-for="col in columns" :key="col.key" :class="col.class">
                  {{ col.label }}
                </th>
                <th v-if="$slots.actions" class="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.length === 0">
                 <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="text-center">尚無資料</td>
              </tr>
              <tr v-for="(item, index) in data" :key="item.id || index">
                <slot name="row" :item="item" :index="index">
                   <td v-for="col in columns" :key="col.key" :class="col.class">
                      {{ item[col.key] }}
                   </td>
                </slot>
                <td v-if="$slots.actions" class="text-center">
                   <slot name="actions" :item="item" :index="index"></slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <nav v-if="pagination && pagination.last_page > 1" aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
              <a class="page-link" href="#" @click.prevent="$emit('page-change', pagination.current_page - 1)">Previous</a>
            </li>
            <li class="page-item" :class="{ active: page === pagination.current_page }" v-for="page in pagination.last_page" :key="page">
              <a class="page-link" href="#" @click.prevent="$emit('page-change', page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
              <a class="page-link" href="#" @click.prevent="$emit('page-change', pagination.current_page + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  columns: {
    type: Array,
    required: true,
    // [{ label: 'Name', key: 'name', class: 'text-center' }]
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  pagination: Object
})

defineEmits(['page-change'])
</script>
