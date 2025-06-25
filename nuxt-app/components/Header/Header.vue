<template>
  <header id="header" :class="{ alt: isHomepage }">
    <h1 id="logo"><NuxtLink to="/">mtuaillo</NuxtLink></h1>
    <nav id="nav">
      <ul>
        <li :class="{ current: currentPage === 'home' }">
          <NuxtLink to="/">Accueil</NuxtLink>
        </li>
        <li :class="{ current: currentPage === 'formations' }">
          <NuxtLink to="/formations">Formations</NuxtLink>
        </li>
        <li :class="{ current: currentPage === 'blog' }">
          <NuxtLink to="/blog">Blog</NuxtLink>
        </li>
        <li :class="{ current: currentPage === 'contact' }">
          <NuxtLink to="/contact">Contact</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
defineProps({
  currentPage: {
    type: String,
    required: true,
    validator: (value) => ['home', 'formations', 'blog', 'contact'].includes(value)
  },
  isHomepage: {
    type: Boolean,
    default: false
  }
})
</script>