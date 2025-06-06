<template>
  <div class="row">
    <div v-for="article in articles" :key="article._path" class="col-12">
      <section class="article-block">
        <header>
          <h3><NuxtLink :to="article._path">{{ article.title }}</NuxtLink></h3>
          <p class="article-meta">
            <ul class="article-tags">
              <li v-for="(tag, n) in article.tags" :key="n" class="tag" :class="{ 'tag-current': tag === currentTag }">
                <NuxtLink :to="`/tag/${tag}`">{{ tag }}</NuxtLink>
              </li>
            </ul>
            publié le <Date :dateString="article.createdAt" />
            <span v-if="article.updatedAt">
              - mis à jour le <Date :dateString="article.updatedAt" />
            </span>
          </p>
        </header>
        <p class="article-description">{{ article.description }}</p>
        <footer>
          <ul class="buttons">
            <li><NuxtLink :to="article._path" class="button">Lire l'article</NuxtLink></li>
          </ul>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  },
  currentTag: {
    type: String,
    default: null
  }
})
</script>

<style>
@import '~/assets/css/blog.css';
</style>