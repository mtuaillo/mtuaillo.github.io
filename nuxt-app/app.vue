<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
let { url } = useSiteConfig()
const route = useRoute()

// Remove trailing slash
url = url.substring(0, url.length - 1);

useHead({
  title: 'Mathieu Tuaillon - formateur & développeur senior - PHP Symfony',
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
      content: "Formateur & développeur senior - PHP Symfony. Expert en architecture backend. Accompagnement technique et formations personnalisées."
    },
  ],
  script: [
  ],
  link: [
    {
      rel: 'canonical',
      href: `${url}${route.path}`
    }
  ]
})
</script>
