<script setup lang="ts">
// Add Twenty theme body class
useBodyClass('no-sidebar')
</script>

<template>
  <PageWrapper current-page="blog">

    <!-- Main -->
    <article id="main">
      <ContentDoc v-slot="{ doc }">
        <header class="container article-header">
          <h2>{{ doc.title }}</h2>
          <ArticleMeta 
            :created-at="doc.createdAt"
            :updated-at="doc.updatedAt"
            :reading-time="doc.readingTime"
            :show-tags="false"
            class="centered-meta"
          />
          <div v-if="doc.tags" class="article-tags-header">
            <Tag v-for="tag in doc.tags" :key="tag" :tag="tag" />
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
              <!-- CTA Block - responsive positioning -->
              <section class="cta-block">
                <h3>Besoin d'accompagnement ?</h3>
                <p>
                  Développeur senior PHP/Symfony et formateur professionnel,
                  j'accompagne les entreprises dans la conception d'applications sur mesure et la formation de leurs équipes.
                </p>
                <ul class="buttons">
                  <li><NuxtLink to="/contact" class="button">Discutons de votre projet</NuxtLink></li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </ContentDoc>
    </article>

  </PageWrapper>
</template>

<style scoped>
@import '~/assets/css/variables.css';

.article-header {
  text-align: center;
  padding: var(--spacing-xl) 0 var(--spacing-xxl) 0;
}

.article-header h2 {
  margin-bottom: var(--spacing-sm);
}

.centered-meta {
  text-align: center;
}

.article-tags-header {
  margin-top: var(--spacing-sm);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  justify-content: center;
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
  color: var(--color-primary);
  font-weight: var(--font-weight-normal);
  text-transform: uppercase;
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
}

.blog-content :deep(pre) {
  background: #f8f8f8;
  border-left: solid 4px var(--color-primary);
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  margin: var(--spacing-lg) 0;
  overflow-x: auto;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-small);
}

.blog-content :deep(code) {
  background: #f8f8f8;
  border-radius: var(--border-radius-small);
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  padding: 0.25em var(--spacing-xs);
}

.blog-content :deep(blockquote) {
  border-left: solid var(--spacing-xs) var(--color-primary);
  font-style: italic;
  padding: var(--spacing-sm) 0 var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary-light);
  margin: var(--spacing-lg) 0;
}

.blog-navigation {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: var(--border-light);
}

.cta-block {
  background: var(--color-primary-light);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-small);
}

.cta-block h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

/* Responsive positioning: move CTA after content on small screens */
@media screen and (max-width: 980px) {
  .row.gtr-50 {
    display: flex;
    flex-direction: column;
  }
  
  .col-8.col-12-narrower {
    order: 1;
  }
  
  .col-4.col-12-narrower {
    order: 2;
    margin-top: var(--spacing-lg);
  }
}
</style>
