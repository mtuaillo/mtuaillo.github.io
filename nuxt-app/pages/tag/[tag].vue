<script setup lang="ts">
// see https://github.com/nuxt/content/issues/2644#issuecomment-2176751585
definePageMeta({ documentDriven: { page: false, surround: false, }, });

let route = useRoute();
let tag = decodeURIComponent(route.params.tag)

let { data } = await useAsyncData('posts', () =>  queryContent('blog')
    .where({ tags: { $contains: tag } })
    .sort({ createdAt: -1 })
    .find());

const articles = data.value;

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
        <h2>Articles avec le tag "<span class="tag-highlight">{{ tag }}</span>"</h2>
        <p>{{ articles?.length || 0 }} article(s) trouvé(s)</p>
      </header>

      <!-- Articles -->
      <section class="wrapper style1 container">
        <div v-if="articles && articles.length > 0">
          <ArticleList :articles="articles" :current-tag="tag" />
        </div>
        
        <div v-else class="row">
          <div class="col-12">
            <section>
              <p>Aucun article trouvé avec ce tag.</p>
              <ul class="buttons">
                <li><NuxtLink to="/blog" class="button">← Retour au blog</NuxtLink></li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <!-- Navigation -->
      <section class="wrapper style3 container special">
        <footer>
          <ul class="buttons">
            <li><NuxtLink to="/blog" class="button">← Retour au blog</NuxtLink></li>
            <li><NuxtLink to="/tags" class="button">Voir tous les tags</NuxtLink></li>
          </ul>
        </footer>
      </section>
    </article>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.tag-highlight {
  color: #3fb1a3;
  font-weight: 400;
}
</style>
