<template>
    <div class="card">
        <div :style="'background-image: url(\'' + bewoner.profilePicture.picture + '\');'" alt="profielfoto" class="card-image"></div>
        <b-container fluid class="bewoner-info">
            <b-row>
                <b-col cols="5" class="label">
                    <p>Naam:</p>
                </b-col>
                <b-col cols="7" class="name">
                    <p>{{ bewoner.name }}</p>
                </b-col>
            </b-row>
            <b-row v-if="!descriptionNotShown">
                <b-col cols="5" class="label">
                    <p>Beschrijving:</p>
                </b-col>
                <b-col cols="7">
                    <p>{{ bewoner.description }}</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    export default {
        name: 'BewonerCard',
        props: ['bewoner', 'descriptionNotShown'],
        mounted() {
            console.log(this.bewoner);
        }
    }
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 600px) {
        .card-image {
            width: 100%;
            height: 60%;
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

        .card-image {
            width: 100%;
            height: 50%;
        }
    }

    .bewoner-info {
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

    .card-image {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

</style>
