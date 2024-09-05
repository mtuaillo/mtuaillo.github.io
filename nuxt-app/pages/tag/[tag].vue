<template>
  <div>
    <h1>Articles avec le tag "{{ tag }}"</h1>
    <ul>
      <li v-for="(article, index) in articles" :key="index">
        <NuxtLink :to="`${article._path}`">{{ article.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

// see https://github.com/nuxt/content/issues/2644#issuecomment-2176751585
definePageMeta({ documentDriven: { page: false, surround: false, }, });

let route = useRoute();
let tag = decodeURIComponent(route.params.tag)


let { data } = await useAsyncData('posts', () =>  queryContent('blog')
    .where({ tags: { $contains: tag } })
    .find());

const articles = data.value;

</script>
