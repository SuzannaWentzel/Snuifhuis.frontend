<template>
    <div class="bewoner_tab">{{ bewoner }}</div>
</template>
<script>
    export default {
        name: 'BewonerTab',
        props: ["bewoner"]
    }
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 600px) {
    }

    @media screen and (min-width: 601px) {
    }

    .bewoner_tab {
        padding: 1.3em;
        color: var(--my-yellow);
        background-image: linear-gradient(60deg, #333, #000);
        width: 100%;
        font-weight: 600;
    }
</style>