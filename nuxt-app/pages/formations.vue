<script setup lang="ts">
// Add Twenty theme body class
useBodyClass('no-sidebar')

definePageMeta({ documentDriven: { page: false, surround: false, }, });
</script>

<template>
    <PageWrapper current-page="formations">

        <!-- Main -->
        <article id="main">
            <header class="container wip-header">
                <h2><strong>Formations</strong></h2>
            </header>

            <section class="wrapper style1 container special">
                <div class="row">
                    <div class="col-4 col-12-narrower">
                        <section class="wip-content">
                            <h3>Symfony, développer des sites web back end</h3>
                            <p>
                                Découvrez le framework Symfony et apprenez à utiliser ses composants pour créer des sites et des applications backend
                            </p>

                            <h4>Déroulement</h4>
                            <ul class="wip-list">
                                <li>Parties théoriques appuyées par des exemples, avant des mises en pratique par des ateliers.</li>
                                <li>Basé sur les versions les plus récentes des librairies</li>
                                <li>En présentiel ou à distance</li>
                            </ul>

                            <h4>Programme</h4>
                            <ul class="wip-list">
                                <li>Introduction à Symfony</li>
                                <li>Base de données avec Doctrine</li>
                                <li>Console</li>
                                <li>Formulaires & validation</li>
                                <li>Sécurité: uthentification & autorisation</li>
                                <li>Injection de dépendances & conteneur de services</li>
                                <li>Frontend</li>
                                <li>Tests automatisés</li>
                                <li>API</li>
                                <li>Déploiement en production</li>
                            </ul>
                        </section>
                    </div>

                    <!--
                    <div class="col-4 col-12-narrower">
                        <section class="wip-content">
                            <h3>TODO</h3>
                            <p>
                                TODO
                            </p>
                        </section>
                    </div>
                    -->
                </div>

                <footer>
                    <ul class="buttons">
                        <li><NuxtLink to="/contact" class="button primary">Me contacter pour plus d'informations</NuxtLink></li>
                    </ul>
                </footer>
            </section>
        </article>

    </PageWrapper>
</template>

<style scoped>
@import '~/assets/css/variables.css';

.wip-header {
    text-align: center;
    padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
}

.wip-header h2 {
    margin-bottom: var(--spacing-sm);
}

.wip-content {
    text-align: center;
    padding: var(--spacing-xl) var(--spacing-lg);
    background-color: #fff;
}

.wip-content .icon.featured {
    color: var(--color-primary);
    margin-bottom: var(--spacing-md);
}

.wip-content h3 {
    color: var(--color-primary);
    margin-bottom: var(--spacing-sm);
}

.wip-content h4 {
    margin-bottom: 0;
}

.wip-content p {
    margin-bottom: var(--spacing-lg);
    line-height: var(--line-height-normal);
}

.wip-list {
    list-style: none;
    padding: 0;
    margin: var(--spacing-md) 0;
    text-align: left;
    display: inline-block;
}

.wip-list li {
    padding: var(--spacing-xs) 0;
    position: relative;
    padding-left: var(--spacing-lg);
}

.wip-list li:before {
    content: "→";
    color: var(--color-primary);
    font-weight: bold;
    position: absolute;
    left: 0;
}

footer {
    margin-top: var(--spacing-lg);
}

@media screen and (max-width: 980px) {
    .wip-content {
        padding: var(--spacing-lg) var(--spacing-sm);
    }

    .wip-list {
        text-align: center;
    }
}
</style>