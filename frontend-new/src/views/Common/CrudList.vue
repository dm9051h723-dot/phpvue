<template>
  <div>
    <section class="content-header clearfix">
      <h1>{{ title }}</h1>
      <div class="pull-right">
        <slot name="header-actions"></slot>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">列表</h3>
            </div>
            <div class="box-body">
              <div v-if="loading" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div v-else>
                <slot name="content">
                   <p>尚無資料 (這是預設內容)</p>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Page Title'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
