<template>
  <nav class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between max-w-7xl">
      <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        <ul class="flex flex-col lg:flex-row list-none mr-auto">
          <li class="flex items-center">
            <NuxtLink to="/" class="text-blueGray-700 hover:text-blueGray-500 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
              Blog
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="lg:flex flex-grow items-center hidden">
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <a href="https://www.linkedin.com/in/mathieutuaillon/" target="_blank" class="text-blueGray-700 hover:text-blueGray-500 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
