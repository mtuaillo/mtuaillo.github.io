<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/blog', sort: { createdAt: -1 } }

// see https://github.com/nuxt/content/issues/2644#issuecomment-2176751585
definePageMeta({ documentDriven: { page: false, surround: false, }, });

// Add Twenty theme body class
useHead({
  bodyAttrs: {
    class: 'no-sidebar'
  }
})
</script>

<template>
  <div id="page-wrapper">
    <!-- Header -->
    <header id="header">
      <h1 id="logo"><NuxtLink to="/">mtuaillo</NuxtLink></h1>
      <nav id="nav">
        <ul>
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/formations">Formations</NuxtLink></li>
          <li class="current"><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
    </header>

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

    <!-- Footer -->
    <Footer />
  </div>
</template>

