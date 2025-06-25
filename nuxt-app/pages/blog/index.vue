<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/blog', sort: { createdAt: -1 } }

// see https://github.com/nuxt/content/issues/2644#issuecomment-2176751585
definePageMeta({ documentDriven: { page: false, surround: false, }, });

// Add Twenty theme body class
useBodyClass('no-sidebar')
</script>

<template>
  <PageWrapper current-page="blog">

    <!-- Main -->
    <article id="main">
      <header class="container">
        <h2><strong>Blog</strong> technique</h2>
        <p>Articles sur PHP, Symfony et le développement web</p>
      </header>

      <!-- Articles -->
      <section class="wrapper style1 container">
        <ContentList :query="query">
          <template v-slot="{ list }">
            <ArticleList :articles="list" />
          </template>
        </ContentList>
      </section>
    </article>

  </PageWrapper>
</template>

