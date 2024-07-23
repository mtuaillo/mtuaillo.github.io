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
