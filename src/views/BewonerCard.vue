<template>
    <div class="card">
        <img src="../../public/images/me.jpeg" alt="foto van Suzanna" class="card_image">
        <b-container fluid class="bewoner_info">
            <b-row>
                <b-col cols="5" class="label">
                    <p>Naam:</p>
                </b-col>
                <b-col cols="7" class="name">
                    <p>{{name}}</p>
                </b-col>
            </b-row>
            <b-row v-if="!descriptionNotShown">
                <b-col cols="5" class="label">
                    <p>Beschrijving:</p>
                </b-col>
                <b-col cols="7">
                    <p>{{ description }}</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    export default {
        name: 'BewonerCard',
        props: ['name', 'description', 'descriptionNotShown'],
    }
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 600px) {
        .card_image {
            width: 100%;
        }

        .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            height: 100%;
            overflow: hidden;
        }
    }

    @media screen and (min-width: 601px) {
        .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            height: 100%;
            overflow: hidden;
        }

        .card_image {
            width: 100%;
        }
    }

    .bewoner_info {
        text-align: left;
        padding: 1.5em;
    }

    .label {
        font-weight: 600;
    }

    .name {
        font-weight: 600;
        color: var(--my-blue);
    }

</style>
