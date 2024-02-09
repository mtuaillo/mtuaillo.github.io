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

<script>
import { computed } from 'vue'

export default {
  async setup({ $content }) {
    const tags = await this.$content('blog').fetch();

    const tagList = {}

    tags.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!tagList[tag]) {
          tagList[tag] = {
            name: tag,
            slug: encodeURIComponent(tag),
            count: 1,
          }
        } else {
          tagList[tag].count++
        }
      })
    })

    const tagArray = []

    for (const tag in tagList) {
      tagArray.push(tagList[tag])
    }

    return {
      tags: computed(() => tagArray),
    }
  },
}
</script>
