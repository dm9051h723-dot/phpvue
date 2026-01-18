<template>
  <CrudList :title="pageTitle">
    <template #content>
      <div class="alert alert-info">
        <h4><i class="icon fa fa-info"></i> Page Under Construction</h4>
        This page ({{ pageTitle }}) is being ported to Vue 3.
      </div>
    </template>
  </CrudList>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CrudList from './CrudList.vue'

const route = useRoute()
const pageTitle = computed(() => {
  return route.path.split('/').pop() || 'Page'
})
</script>
