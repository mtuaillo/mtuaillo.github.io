<script setup lang="ts">
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
      <ContentDoc v-slot="{ doc }">
        <header class="container article-header">
          <h2>{{ doc.title }}</h2>
          <p class="article-meta">
            Publié le <Date :dateString="doc.createdAt" />
            <span v-if="doc.updatedAt"> - mis à jour le <Date :dateString="doc.updatedAt" /></span>
            - <ReadingTime :readingTime="doc.readingTime" />
          </p>
          <div v-if="doc.tags" class="article-tags-header">
            <span v-for="(tag, n) in doc.tags" :key="n" class="tag">
              <NuxtLink :to="`/tag/${tag}`">{{ tag }}</NuxtLink>
            </span>
          </div>
        </header>

        <!-- Blog Post Content -->
        <section class="wrapper style1 container special-alt">
          <div class="row gtr-50">
            <div class="col-8 col-12-narrower">
              <div class="blog-content">
                <ContentRenderer :value="doc" />
              </div>
              
              <!-- Navigation -->
              <footer class="blog-navigation">
                <ul class="buttons">
                  <li><NuxtLink to="/blog" class="button">← Retour au blog</NuxtLink></li>
                </ul>
              </footer>
            </div>
            <div class="col-4 col-12-narrower imp-narrower">
              <!-- Sidebar content could go here -->
              <section class="sidebar">
                <h3>À propos</h3>
                <p>Développeur et formateur PHP/Symfony passionné par la qualité du code et les bonnes pratiques de développement.</p>
                <ul class="buttons">
                  <li><NuxtLink to="/contact" class="button small">Me contacter</NuxtLink></li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </ContentDoc>
    </article>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.article-header {
  text-align: center;
  padding: 3em 0 5em 0;
}

.article-header h2 {
  margin-bottom: 1em;
}

.article-meta {
  font-size: 0.85em;
  color: #7c8081;
  text-transform: uppercase;
  font-weight: 400;
  margin-bottom: 1.5em;
}

.article-tags-header {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  justify-content: center;
}

.article-tags-header .tag {
  background: #3fb1a3;
  border-radius: 0.35em;
  color: #ffffff;
  display: inline-block;
  font-size: 0.75em;
  font-weight: 400;
  letter-spacing: 0.025em;
  padding: 0.35em 0.75em;
  text-transform: uppercase;
}

.article-tags-header .tag a {
  color: inherit;
  border: none;
  text-decoration: none;
}

.article-tags-header .tag:hover {
  background: #359388;
}

.blog-content {
  text-align: justify;
  line-height: 1.75em;
}

.blog-content :deep(h1),
.blog-content :deep(h2),
.blog-content :deep(h3),
.blog-content :deep(h4),
.blog-content :deep(h5),
.blog-content :deep(h6) {
  color: #3fb1a3;
  font-weight: 400;
  text-transform: uppercase;
  margin-top: 2em;
  margin-bottom: 1em;
}

.blog-content :deep(pre) {
  background: #f8f8f8;
  border-left: solid 4px #3fb1a3;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  margin: 2em 0;
  overflow-x: auto;
  padding: 1em;
  border-radius: 0.35em;
}

.blog-content :deep(code) {
  background: #f8f8f8;
  border-radius: 0.35em;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  padding: 0.25em 0.5em;
}

.blog-content :deep(blockquote) {
  border-left: solid 0.5em #3fb1a3;
  font-style: italic;
  padding: 1em 0 1em 2em;
  background: rgba(63, 177, 163, 0.05);
  margin: 2em 0;
}

.blog-navigation {
  margin-top: 3em;
  padding-top: 2em;
  border-top: solid 1px rgba(124, 128, 129, 0.2);
}

.sidebar {
  background: rgba(63, 177, 163, 0.05);
  padding: 2em;
  border-radius: 0.35em;
}

.sidebar h3 {
  color: #3fb1a3;
  margin-bottom: 1em;
}
</style>
