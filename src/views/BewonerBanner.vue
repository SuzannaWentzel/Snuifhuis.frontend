<template>
    <div class="bewoner_banner" id="bewoner_banner">
        <ApolloQuery :query="require('@/graphql/GetBewoners.graphql')">
            <template
               slot-scope="{ result: { error, data }, query, isLoading }"
            >
                <!-- loading -->
                <template v-if="isLoading">Loading...</template>

                <!-- error -->
                <template v-else-if="error">
                    An error occurred: {{ error.message }}
                </template>

                <template v-else-if="data">
                    <div class="bewoner_container">
                        <div class="bewoner_card_container">
                            <BewonerDisplay :bewoners="data.bewoners" />
                            <!--<BewonerDisplay :bewoners="bewoners"/>-->
                        </div>
                        <div class="title_blue">Huidige</div>
                        <div class="title">Bewoners</div>
                     </div>
                </template>
            </template>
        </ApolloQuery>
    </div>
</template>
<script>
    import BewonerDisplay from "./BewonerDisplay";

    export default {
        name: 'BewonerBanner',
        components: {BewonerDisplay},
        data(){
            return {
                bewoners: [ {
                    name: "Vincent",
                    description: "Werkt al",
                }, {
                    name: "Suzanna",
                    description: "Houdt van koekjes en doet TCS. "
                }, {
                    name: "Justus",
                    description: "Doet AM",
                }, {
                    name: "Tom",
                    description: "Doet TCS",
                }, {
                    name: "Meng",
                    description: "Doet IO",
                }]
            };
        }
    }
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 600px) {
        .bewoner_banner {
            width: 100%;
        }

        .bewoner_container {
            display: grid;
            grid-template-rows: 10vh 60vh 5vh 7vh 8vh 10vh;
            grid-template-columns: 60% 30% 10%;
        }

        .title{
            grid-row-start: 5;
            grid-row-end: 5;
            grid-column-start: 2;
            grid-column-end: 2;
            z-index: 2;
            font-size: 2rem;
            text-align: left;
        }

        .title_blue {
            grid-row-start: 4;
            grid-row-end: 4;
            grid-column-start: 2;
            grid-column-end: 2;
            z-index: 2;
            font-size: 2rem;
            color: var(--my-blue);
            font-weight: bolder;
            text-align: left;
        }

        .bewoner_card_container {
            grid-row-start: 2;
            grid-row-end: 2;
            grid-column-start: 1;
            grid-column-end: 4;
        }
    }

    @media screen and (min-width: 601px) {
        .bewoner_banner {
            width: 100%;
            height: 100vh;
        }

        .bewoner_container {
            display: grid;
            grid-template-columns: 5% 65% 5% 20% 5%;
            grid-template-rows: 30vh 35vh 12vh 13vh 10vh;
        }

        .bewoner_card_container {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 4;
        }

        .title {
            grid-column-start: 4;
            grid-column-end: 5;
            grid-row-start: 4;
            grid-row-end: 5;
            justify-self: start;
            align-self: end;
            font-size: 60px;
        }

        .title_blue {
            grid-column-start: 4;
            grid-column-end: 5;
            grid-row-start: 3;
            grid-row-end: 4;
            justify-self: start;
            align-self: end;
            font-size: 60px;
        }

        .title {
            padding-bottom: 0;
            padding-right: 0;
            font-weight: 300;
        }

        .title_blue {
            color: var(--my-blue);
            font-weight: bold !important;
        }
    }


</style>
