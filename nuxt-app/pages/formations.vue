<script setup lang="ts">
// Add Twenty theme body class
useHead({
  bodyAttrs: {
    class: 'no-sidebar'
  }
})
</script>

<template>
  <PageWrapper current-page="formations">

    <!-- Main -->
    <article id="main">
      <header class="container wip-header">
        <h2><strong>Formations</strong></h2>
      </header>

      <!-- Work in Progress Content -->
      <section class="wrapper style1 container special">
        <div class="row">
          <div class="col-12">
            <section class="wip-content">
              <p>
                Je prépare actuellement le contenu de cette section qui présentera mes formations professionnelles 
                en développement PHP/Symfony. Vous y trouverez bientôt des informations détaillées sur :
              </p>
              <ul class="wip-list">
                <li>Formations PHP avancé et Symfony</li>
                <li>Bonnes pratiques de développement</li>
                <li>Qualité du code et tests automatisés</li>
                <li>Architecture et design patterns</li>
              </ul>
              <footer>
                <ul class="buttons">
                  <li><NuxtLink to="/contact" class="button primary">Me contacter pour plus d'informations</NuxtLink></li>
                </ul>
              </footer>
            </section>
          </div>
        </div>
      </section>
    </article>

  </PageWrapper>
</template>

<style scoped>
.wip-header {
  text-align: center;
  padding: 3em 0 2em 0;
}

.wip-header h2 {
  margin-bottom: 1em;
}

.wip-content {
  text-align: center;
  padding: 3em 2em;
}

.wip-content .icon.featured {
  color: #3fb1a3;
  margin-bottom: 1.5em;
}

.wip-content h3 {
  color: #3fb1a3;
  margin-bottom: 1.5em;
}

.wip-content p {
  margin-bottom: 2em;
  line-height: 1.6em;
}

.wip-list {
  list-style: none;
  padding: 0;
  margin: 2em 0;
  text-align: left;
  display: inline-block;
}

.wip-list li {
  padding: 0.5em 0;
  position: relative;
  padding-left: 2em;
}

.wip-list li:before {
  content: "→";
  color: #3fb1a3;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media screen and (max-width: 980px) {
  .wip-content {
    padding: 2em 1em;
  }
  
  .wip-list {
    text-align: center;
  }
}
</style>