<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/blog', sort: { createdAt: -1 } }

useHead({
  title: "Blog",
  meta: [{
    name: "description",
    content: ""
  }],
});
</script>

<template>
  <ContentList :query="query">
    <template v-slot="{ list }">
      <ul class="article-list">
        <li v-for="article in list" class="article">
          <div class="wrapper">
            <header>
              <NuxtLink :to="article._path">
                <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
                <p><Date :dateString="article.createdAt" /></p>
                <p>{{ article.description }}</p>
              </NuxtLink>
              <ul class="article-tags">
                <li class="tag !py-0.5" v-for="(tag, n) in article.tags" :key="n">
                  <NuxtLink :to="`/tag/${tag}`">{{ tag }}</NuxtLink>
                </li>
              </ul>
            </header>
          </div>
        </li>
      </ul>
    </template>
	</ContentList>
</template>
