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
useBodyClass('no-sidebar')
</script>

<template>
  <PageWrapper current-page="blog">

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

  </PageWrapper>
</template>

<style scoped>
@import '~/assets/css/variables.css';

.tag-highlight {
  color: var(--color-primary);
  font-weight: var(--font-weight-normal);
}
</style>
