<template>
  <span>{{ format(readingTime) }} minutes de lecture</span>
</template>

<script setup>
const props = defineProps(['readingTime'])

function format(readingTime) {
	return Math.ceil(props.readingTime.minutes);
}
</script>
