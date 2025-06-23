<script setup lang="ts">
// Add Twenty theme body class
useHead({
  bodyAttrs: {
    class: 'contact'
  }
})

// Email obfuscation
const obfuscatedEmail = ref('bXR1YWlsbG9AZ21haWwuY29t') // Base64 encoded email
const emailUrl = computed(() => {
  const decoded = atob(obfuscatedEmail.value)
  return `mailto:${decoded}`
})

const handleEmailClick = (event: Event) => {
  event.preventDefault()
  const decoded = atob(obfuscatedEmail.value)
  window.location.href = `mailto:${decoded}`
}
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
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li class="current"><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
    </header>

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
              <span class="icon solid featured fa-envelope"></span>
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
              <span class="icon brands solid featured fa-linkedin"></span>
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

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.contact-header {
  text-align: center;
  padding: 3em 0 2em 0;
}

.contact-header h2 {
  margin-bottom: 1em;
}

.contact-cta {
  text-align: center;
  padding: 2em 1em;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-cta .icon.featured {
  color: #3fb1a3;
  margin-bottom: 1em;
}

.contact-cta h3 {
  color: #3fb1a3;
  margin-bottom: 1em;
}

.contact-cta p {
  margin-bottom: 2em;
  line-height: 1.6em;
  flex-grow: 1;
}

.contact-cta footer {
  margin-top: auto;
}

@media screen and (max-width: 980px) {
  .contact-cta {
    margin-bottom: 2em;
    height: auto;
  }
}
</style>