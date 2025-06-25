<template>
  <div id="page-wrapper">
    <Header :current-page="currentPage" :is-homepage="isHomepage" />
    
    <slot />
    
    <Footer />
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: String,
    required: true
  },
  isHomepage: {
    type: Boolean,
    default: false
  }
})
</script>