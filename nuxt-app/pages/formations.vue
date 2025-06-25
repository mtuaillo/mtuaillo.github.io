<script setup lang="ts">
// Add Twenty theme body class
useBodyClass('no-sidebar')

definePageMeta({ documentDriven: { page: false, surround: false, }, });
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
@import '~/assets/css/variables.css';

.wip-header {
  text-align: center;
  padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
}

.wip-header h2 {
  margin-bottom: var(--spacing-sm);
}

.wip-content {
  text-align: center;
  padding: var(--spacing-xl) var(--spacing-lg);
}

.wip-content .icon.featured {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.wip-content h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.wip-content p {
  margin-bottom: var(--spacing-lg);
  line-height: var(--line-height-normal);
}

.wip-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-lg) 0;
  text-align: left;
  display: inline-block;
}

.wip-list li {
  padding: var(--spacing-xs) 0;
  position: relative;
  padding-left: var(--spacing-lg);
}

.wip-list li:before {
  content: "→";
  color: var(--color-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media screen and (max-width: 980px) {
  .wip-content {
    padding: var(--spacing-lg) var(--spacing-sm);
  }
  
  .wip-list {
    text-align: center;
  }
}
</style>