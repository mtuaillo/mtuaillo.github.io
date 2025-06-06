<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Mathieu Tuaillon - formateur et développeur senior PHP & Symfony',
  meta: [
    {
      name: 'author',
      content: "TUAILLON Mathieu"
    },
    {
      name: 'robots',
      content: "index, follow"
    },
    {
      name: 'description',
      content: "Formateur et développeur senior PHP & Symfony. Expert en architecture backend et APIs. Accompagnement technique et formations personnalisées."
    },
    {
      name: 'google-site-verification',
      content: "GI7jdi0qTKSicCxuqE2jaObNWgEf6-eS9FdEYu95AyA"
    },
  ],
  script: [
    { src: '~/assets/js/twenty/jquery.min.js' },
    { src: '~/assets/js/twenty/jquery.dropotron.min.js' },
    { src: '~/assets/js/twenty/jquery.scrolly.min.js' },
    { src: '~/assets/js/twenty/jquery.scrollex.min.js' },
    { src: '~/assets/js/twenty/browser.min.js' },
    { src: '~/assets/js/twenty/breakpoints.min.js' },
    { src: '~/assets/js/twenty/util.js' },
    { src: '~/assets/js/twenty/main.js' }
  ]
})
</script>
