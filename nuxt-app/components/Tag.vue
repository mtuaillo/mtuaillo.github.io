<template>
  <span class="tag" :class="{ 'tag-current': isCurrent }">
    <NuxtLink :to="`/tag/${tag}`">{{ tag }}</NuxtLink>
  </span>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    required: true
  },
  isCurrent: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
@import '~/assets/css/variables.css';

.tag {
  background: var(--color-primary);
  border-radius: var(--border-radius-small);
  color: var(--color-white);
  display: inline-block;
  font-size: var(--font-size-tag);
  font-weight: var(--font-weight-normal);
  letter-spacing: 0.025em;
  padding: var(--border-radius-small) 0.75em;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;
}

.tag a {
  color: inherit;
  border: none;
  text-decoration: none;
}

.tag:hover {
  background: var(--color-primary-hover);
}

.tag.tag-current {
  background: var(--color-primary-hover);
  box-shadow: 0 0 0 2px var(--color-primary-shadow);
}
</style>