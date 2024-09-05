<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/blog', sort: { createdAt: -1 } }

// see https://github.com/nuxt/content/issues/2644#issuecomment-2176751585
definePageMeta({ documentDriven: { page: false, surround: false, }, });
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
                <p class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  Publié le <Date :dateString="article.createdAt" />
                  <span v-if="article.updatedAt">
                    - mis à jour le <Date :dateString="article.updatedAt" />
                  </span>
                </p>
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
