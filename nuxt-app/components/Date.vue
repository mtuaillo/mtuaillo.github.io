<template>
  <span>{{ format(dateString) }}</span>
</template>

<script setup>
const props = defineProps({
  dateString: {
    type: String,
    required: true
  }
})

function format(string) {
	return Intl.DateTimeFormat("fr-FR").format(new Date(string));
}
</script>
