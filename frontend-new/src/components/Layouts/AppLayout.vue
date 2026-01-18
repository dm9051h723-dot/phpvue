<template>
  <div class="wrapper">
    <HeaderView />
    <SidebarView />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import HeaderView from '../Common/HeaderView.vue'
import SidebarView from '../Common/SidebarView.vue'
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
</style>
