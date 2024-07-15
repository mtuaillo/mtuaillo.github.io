<template>
  <footer class="relative bg-blueGray-200 pt-8 pb-6">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="flex flex-wrap text-center lg:text-left">
        <div class="w-full lg:w-6/12 px-4">
          <div class="mt-6 lg:mb-0 mb-6">
            <a
              href="https://www.linkedin.com/in/mathieutuaillon/"
              class="block float-left pt-2.5 pl-3 bg-white text-blue-700 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full mr-2"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/mtuaillo"
              class="block float-left pt-2.5 pl-3 bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full mr-2"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://twitter.com/mtuaillo"
              class="block float-left pt-2.5 pl-3 bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full mr-2"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <!--
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto">
              <span
                class="block uppercase text-blueGray-500 text-sm font-semibold mb-2"
              >
                Useful Links
              </span>
              <ul class="list-unstyled">
                <li>
                  <a
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="#"
                  >
                    About me
                  </a>
                </li>
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span
                class="block uppercase text-blueGray-500 text-sm font-semibold mb-2"
              >
                Other Resources
              </span>
              <ul class="list-unstyled">
                <li>
                  <a
                    class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
