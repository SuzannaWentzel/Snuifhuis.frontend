<template>
    <div class="front-banner" id="front-banner">
        <div class="black">
            <h1>Welkom!</h1>
            <h2>Op de <span class="highlighted">Snuifhuis</span> website</h2>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'FrontBanner'
    }
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 600px) {
        .black {
            padding-top: 40vh;
            height: 100vh;
        }
    }

    @media screen and (min-width: 601px) {
        .black {
            padding: 30vh 0 0 0;
            height: 100vh;
        }
    }

    .front-banner {
        background-image: url('../../../public/images/woonkamer.jpg');
        height: 100vh;
        width: 100%;
        padding: 0;
        margin: 0;
        position: relative;
        background-position: center;
        background-size: cover;
        display: block;
        color: white;

        h1 {
            font-size: 4.75rem;
        }

        h2 {
            font-size: 1.625rem;

            .highlighted {
                color: var(--my-yellow);
            }
        }
    }

    .black {
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>
