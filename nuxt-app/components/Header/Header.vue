<template>
    <div>
        <header id="header" :class="{ alt: isHomepage }">
            <h1 id="logo"><NuxtLink to="/">mtuaillo</NuxtLink></h1>

            <button
                class="mobile-menu-toggle"
                @click="toggleMobileMenu"
                aria-label="Toggle mobile menu"
            >
                <i v-if="!isMobileMenuOpen" class="fas fa-bars"></i>
                <i v-else class="fas fa-times"></i>
            </button>

            <nav id="nav" :class="{ 'mobile-open': isMobileMenuOpen }">
                <ul>
                    <li :class="{ current: currentPage === 'home' }">
                        <NuxtLink to="/" @click="closeMobileMenu">Accueil</NuxtLink>
                    </li>
                    <li :class="{ current: currentPage === 'formations' }">
                        <NuxtLink to="/formations" @click="closeMobileMenu">Formations</NuxtLink>
                    </li>
                    <li :class="{ current: currentPage === 'blog' }">
                        <NuxtLink to="/blog" @click="closeMobileMenu">Blog</NuxtLink>
                    </li>
                    <li :class="{ current: currentPage === 'contact' }">
                        <NuxtLink to="/contact" @click="closeMobileMenu">Contact</NuxtLink>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
</template>

<script setup>
const isMobileMenuOpen = ref(false)

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

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}
</script>

<style scoped>

.mobile-menu-toggle {
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.5em;
	font-size: 1.2em;
	color: inherit;
}

.mobile-menu-toggle i {
	transition: all 0.2s ease;
}

.mobile-menu-toggle .fa-times {
	        color: #7c8081;
}

@media screen and (max-width: 840px) {
    #header.alt {
        padding: 1em 1.5em;
    }

    #header.alt nav {
        top: 48px;
    }

    button.mobile-menu-toggle {
        position: fixed;
        display: inline;
        padding-left: 15px;
        padding-right: 15px;
        top: 0;
        right: 10px;
        line-height: 2;
        min-width: unset;
        width: 20px;
    }

    #nav {
        position: absolute;
        top: 46px;
        left: 0;
        width: 100%;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.3s ease-out;
        z-index: 1000;
    }

    #nav.mobile-open {
        max-height: 300px;
    }

    #nav ul {
        flex-direction: column;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    #nav ul li {
        display: block;
        margin: 0;
        border-bottom: 1px solid #f5f5f5;
    }

    #nav ul li:last-child {
        border-bottom: none;
    }

    #nav ul li a {
        display: block;
        padding: 1rem 1.5rem;
        color: #7c8081;
        text-decoration: none;
        font-weight: 600;
        border: none;
        background: none;
        transition: all 0.2s ease;
    }

    #nav ul li.current a {
        background: rgba(63, 177, 163, 0.1);
        color: #3fb1a3;
    }
}

:deep(#header.alt) .mobile-menu-toggle .fa-bars {
    color: white;
}

:deep(#header.alt) .mobile-menu-toggle .fa-times {
    color: #fff;
}
</style>
