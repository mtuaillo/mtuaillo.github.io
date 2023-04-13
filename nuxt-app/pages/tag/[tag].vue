<template>
  <div>
    <h1>Articles avec le tag "{{ tag }}"</h1>
    <ul>
      <li v-for="(article, index) in articles" :key="index">
        <nuxt-link :to="`${article._path}`">{{ article.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  async setup({ $content, params }) {
    const route = useRoute();
    const tag = decodeURIComponent(route.params.tag)

    const articles = await queryContent('blog')
      .where({ tags: { $contains: tag } })
      .find();

    return {
      tag,
      articles: computed(() => articles),
    }
  },
}
</script>
