<template>
  <div>
    <Navbar />
    <main>
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('/img/header-background.avif');
          "
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0);"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-blueGray-200">
        <div class="container mx-auto px-4 max-w-7xl">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-10 py-10 border-blueGray-200">
              <NuxtPage />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Mathieu Tuaillon - formateur et développeur senior PHP & Symfony - blog',
  meta: [
    { name: 'description', content: "Développeur senior freelance, j'aborde sur ce blog technique des sujets tels que PHP et Symfony, ainsi que les technologies qui gravitent autour" },
  ],
})
</script>

<script lang="ts">
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
