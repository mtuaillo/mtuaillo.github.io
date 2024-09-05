<template>
  <div>
    <h1>Tags</h1>
    <ul>
      <li v-for="(tag, index) in tags" :key="index">
        <router-link :to="`/tag/${tag.slug}`">{{ tag.name }} ({{ tag.count }})</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

// see https://github.com/nuxt/content/issues/2644#issuecomment-2176751585
definePageMeta({ documentDriven: { page: false, surround: false, }, });

const tags = {}

let { data } = await useAsyncData('posts', () => queryContent().find())
data.value.forEach((post) => {
    post.tags.forEach((tag) => {
        if (!tags[tag]) {
            tags[tag] = {
                name: tag,
                slug: encodeURIComponent(tag),
                count: 1,
            }
        } else {
            tags[tag].count++
        }
    })
})
</script>
