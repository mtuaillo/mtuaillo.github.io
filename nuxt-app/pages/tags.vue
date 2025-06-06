<script setup lang="ts">
// see https://github.com/nuxt/content/issues/2644#issuecomment-2176751585
definePageMeta({ documentDriven: { page: false, surround: false, }, });

const tags = {}

let { data } = await useAsyncData('posts', () => queryContent('blog').find())
data.value?.forEach((post) => {
    post.tags?.forEach((tag) => {
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

// Convert to array and sort by count (descending)
const sortedTags = Object.values(tags).sort((a, b) => b.count - a.count)

// Function to determine tag size based on count
const getTagSize = (count) => {
  if (count >= 5) return 'size-xl'
  if (count >= 3) return 'size-large'
  if (count >= 2) return 'size-medium'
  return 'size-small'
}

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
        <h2>Tous les tags</h2>
        <p>Explorez les articles par thématique</p>
      </header>

      <!-- Tags Cloud -->
      <section class="wrapper style1 container special">
        <div class="tags-cloud">
          <NuxtLink 
            v-for="tag in sortedTags" 
            :key="tag.slug"
            :to="`/tag/${tag.slug}`"
            class="tag-item"
            :class="getTagSize(tag.count)"
          >
            {{ tag.name }} <span class="tag-count">({{ tag.count }})</span>
          </NuxtLink>
        </div>
      </section>

      <!-- Navigation -->
      <section class="wrapper style3 container special">
        <footer>
          <ul class="buttons">
            <li><NuxtLink to="/blog" class="button">← Retour au blog</NuxtLink></li>
          </ul>
        </footer>
      </section>
    </article>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
  align-items: center;
  padding: 2em 0;
}

.tag-item {
  background: #3fb1a3;
  border-radius: 0.35em;
  color: #ffffff;
  display: inline-block;
  font-weight: 400;
  letter-spacing: 0.025em;
  padding: 0.5em 1em;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  transition: all 0.2s ease-in-out;
}

.tag-item:hover {
  background: #359388;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tag-item.size-small {
  font-size: 0.8em;
}

.tag-item.size-medium {
  font-size: 1em;
}

.tag-item.size-large {
  font-size: 1.2em;
}

.tag-item.size-xl {
  font-size: 1.4em;
}

.tag-count {
  opacity: 0.8;
  font-weight: 300;
}
</style>
