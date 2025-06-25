<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'

// Get latest 3 blog posts for homepage preview
const query: QueryBuilderParams = { path: '/blog', sort: { createdAt: -1 }, limit: 3 }

definePageMeta({ documentDriven: { page: false, surround: false, }, });

// Add Twenty theme body class
useBodyClass('index')
</script>

<template>
  <PageWrapper current-page="home" :is-homepage="true">

    <!-- Banner -->
    <section id="banner">
      <div class="inner">
        <div class="author-image">
          <img src="/images/personal/me-circle.png" alt="Mathieu Tuaillon" />
        </div>
        <header>
          <h2>MATHIEU TUAILLON</h2>
        </header>
        <p>Formateur &amp; développeur senior
        <br />
        PHP - Symfony
        <br />
        </p>
        <!--<footer>
          <ul class="buttons stacked">
            <li><NuxtLink to="/formations" class="button fit scrolly">Découvrir mes formations</NuxtLink></li>
          </ul>
        </footer>
        -->
      </div>
    </section>

    <!-- Main -->
    <article id="main">
      <!-- Services Section -->
      <section class="wrapper style2 container special-alt">
        <div class="row gtr-50">
          <div class="col-8 col-12-narrower">
            <header>
              <h2>Mes <strong>services</strong> pour accompagner vos projets techniques</h2>
            </header>
            <p>
             Je développe des applications métier pour répondre aux besoins des entreprises depuis plus de 10 ans.
              La qualité, la maintenabilité et la satisfaction client sont au centre de mes préoccupations.
            </p>
            <footer>
              <ul class="buttons">
                <li><NuxtLink to="/contact" class="button">Me contacter</NuxtLink></li>
              </ul>
            </footer>
          </div>
          <div class="col-4 col-12-narrower imp-narrower">
            <ul class="featured-icons">
              <li><span class="icon solid fa-code"></span></li>
              <li><span class="icon solid fa-server"></span></li>
              <li><span class="icon solid fa-cogs"></span></li>
              <li><span class="icon solid fa-graduation-cap"></span></li>
              <!--<li><span class="icon solid fa-search"></span></li>
              <li><span class="icon solid fa-rocket"></span></li>-->
            </ul>
          </div>
        </div>
      </section>

      <!-- Services Details -->
      <section class="wrapper style1 container special">
        <div class="row">
          <div class="col-4 col-12-narrower">
            <section>
              <span class="icon solid featured fa-laptop-code"></span>
              <header>
                <h3>Développement</h3>
              </header>
              <p>
                Conception et développement d'applications web adaptées aux processus métier spécifiques.
                Une approche centrée sur la compréhension des enjeux opérationnels pour livrer des applications maintenables et évolutives.
              </p>
            </section>
          </div>
          <div class="col-4 col-12-narrower">
            <section>
              <span class="icon solid featured fa-chalkboard-teacher"></span>
              <header>
                <h3>Formation</h3>
              </header>
              <p>
                Formation professionnelle pour les équipes de développement.
                <!-- Montée en compétences, bonnes pratiques de développement et accompagnement technique adapté aux besoins spécifiques de chaque organisation. -->
                Formats flexibles : sessions en entreprise, formations sur mesure ou accompagnement individuel pour optimiser l'efficacité des équipes.
              </p>
            </section>
          </div>
          <div class="col-4 col-12-narrower">
            <section>
              <span class="icon solid featured fa-tools"></span>
              <header>
                <h3>Conseil & Audit</h3>
              </header>
              <p>Audit de code et performance. Choix technologiques et modernisation de vos applications existantes.</p>
            </section>
          </div>
        </div>
      </section>

      <!-- Blog Preview Section -->
      <section class="wrapper style3 container special">
        <header class="major">
          <h2>Derniers <strong>articles</strong> du blog</h2>
        </header>

        <ContentList :query="query">
          <template v-slot="{ list }">
            <div class="row">
              <div v-for="article in list" :key="article._path" class="col-4 col-12-narrower">
                <section>
                  <header>
                    <h3>{{ article.title }}</h3>
                  </header>
                  <p>{{ article.description }}</p>
                  <footer>
                    <ul class="buttons">
                      <li><NuxtLink :to="article._path" class="button">Lire l'article</NuxtLink></li>
                    </ul>
                  </footer>
                </section>
              </div>
            </div>
          </template>
        </ContentList>

        <!--
        <footer class="major">
          <ul class="buttons">
            <li><NuxtLink to="/blog" class="button">Voir tous les articles</NuxtLink></li>
          </ul>
        </footer>
        -->
      </section>
    </article>

    <!-- CTA -->
    <section id="cta">
      <header>
        <h2>Prêt à démarrer votre <strong>projet</strong>?</h2>
        <p>Discutons ensemble de vos besoins techniques et de vos objectifs.</p>
      </header>
      <footer>
        <ul class="buttons">
          <li><NuxtLink to="/contact" class="button primary">Contactez-moi</NuxtLink></li>
        </ul>
      </footer>
    </section>

  </PageWrapper>
</template>

<style scoped>
#banner .author-image {
  text-align: center;
  margin-bottom: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

#banner .author-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
  transition: transform 0.2s ease-in-out;
  object-fit: cover;
}

#banner .author-image img:hover {
  transform: scale(1.05);
}

@media screen and (max-width: 980px) {
  #banner .author-image img {
    width: 120px;
    height: 120px;
  }
}

@media screen and (max-width: 480px) {
  #banner .author-image img {
    width: 100px;
    height: 100px;
  }
}
</style>
