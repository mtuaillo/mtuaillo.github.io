<script setup lang="ts">
// Add Twenty theme body class
useBodyClass('contact')

const obfuscatedEmail = ref('bXR1YWlsbG9AZ21haWwuY29t')
const emailUrl = computed(() => {
  const decoded = atob(obfuscatedEmail.value)
  return `mailto:${decoded}`
})

const handleEmailClick = (event: Event) => {
  event.preventDefault()
  const decoded = atob(obfuscatedEmail.value)
  window.location.href = `mailto:${decoded}`
}

definePageMeta({ documentDriven: { page: false, surround: false, }, });
</script>

<template>
  <PageWrapper current-page="contact">

    <!-- Main -->
    <article id="main">
      <header class="container contact-header">
        <h2><strong>Contact</strong></h2>
        <!-- <p>Discutons de vos projets techniques et de vos besoins en formation</p> -->
      </header>

      <!-- Contact CTAs -->
      <section class="wrapper style1 container special">
        <div class="row">
          <div class="col-6 col-12-narrower">
            <section class="contact-cta">
              <span class="icon solid featured fab fa-envelope"></span>
              <p>
                Envoyez-moi un email directement pour discuter de vos besoins en développement ou formation.
              </p>
              <footer>
                <ul class="buttons">
                  <li><a href="#" @click="handleEmailClick" class="button primary">Envoyer un email</a></li>
                </ul>
              </footer>
            </section>
          </div>
          <div class="col-6 col-12-narrower">
            <section class="contact-cta">
              <span class="icon brands solid featured fab fa-linkedin"></span>
              <p>
                Connectons-nous sur LinkedIn pour échanger sur vos projets et opportunités de collaboration.
              </p>
              <footer>
                <ul class="buttons">
                  <li><a href="https://www.linkedin.com/in/mathieutuaillon/" target="_blank" rel="noopener noreferrer" class="button primary">Voir mon profil LinkedIn</a></li>
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

.contact-header {
  text-align: center;
  padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
}

.contact-header h2 {
  margin-bottom: var(--spacing-sm);
}

.contact-cta {
  text-align: center;
  padding: var(--spacing-lg) var(--spacing-sm);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-cta .icon.featured {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.contact-cta h3 {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.contact-cta p {
  margin-bottom: var(--spacing-lg);
  line-height: var(--line-height-normal);
  flex-grow: 1;
}

.contact-cta footer {
  margin-top: auto;
}

@media screen and (max-width: 980px) {
  .contact-cta {
    margin-bottom: var(--spacing-lg);
    height: auto;
  }
}
</style>