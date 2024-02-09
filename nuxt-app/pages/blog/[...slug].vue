<template>
  <main>
    <article>
      <ContentDoc v-slot="{ doc }">
        <h1>{{ doc.title }}</h1>

        <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <span>Publié le <Date :dateString="doc.createdAt" /></span>
          <span v-if="doc.updatedAt"> - mis à jour le <Date :dateString="doc.updatedAt" /></span>
        </div>

        <ContentRenderer :value="doc" />
      </ContentDoc>
    </article>
  </main>
</template>
