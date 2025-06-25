<template>
  <p class="article-meta">
    <ul v-if="tags && tags.length > 0 && showTags" class="article-tags">
      <li v-for="tag in tags" :key="tag">
        <Tag :tag="tag" :is-current="tag === currentTag" />
      </li>
    </ul>
    publié le <Date :date-string="createdAt" />
    <span v-if="updatedAt">
      - mis à jour le <Date :date-string="updatedAt" />
    </span>
    <span v-if="readingTime">
      - <ReadingTime :reading-time="readingTime" />
    </span>
  </p>
</template>

<script setup>
defineProps({
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    default: null
  },
  readingTime: {
    type: Object,
    default: null
  },
  tags: {
    type: Array,
    default: () => []
  },
  currentTag: {
    type: String,
    default: null
  },
  showTags: {
    type: Boolean,
    default: true
  }
})
</script>

<style>
@import '~/assets/css/variables.css';

.article-meta {
  font-size: var(--font-size-meta);
  color: var(--color-text-primary);
  text-transform: uppercase;
  font-weight: var(--font-weight-normal);
  margin-bottom: 0.75em;
  letter-spacing: var(--letter-spacing-wide);
}

.article-tags {
  list-style: none;
  margin: 0 0 var(--spacing-xs) 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}
</style>