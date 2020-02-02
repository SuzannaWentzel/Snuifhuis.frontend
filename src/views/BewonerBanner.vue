<template>
    <div class="bewoner_banner" id="bewoner_banner">
        <div :class="determineClass('currentBewoners')" class="bewoner-view">
            <div class="bewoner-container current" >
                <div class="bewoner-card-container current" v-if="isReady">
                    <BewonerDisplay :bewoners="bewoners" />
                </div>
                <i class="fas fa-angle-left btn-bewoners to-old" @click="tab = 'oldBewoners'"></i>
                <div class="title-blue current">Huidige</div>
                <div class="title current">Bewoners</div>
            </div>
        </div>

        <div :class="determineClass('oldBewoners')" class="bewoner-view">
            <div class="bewoner-container old">
                <div class="bewoner-card-container old" v-if="isReady">
                    <BewonerDisplay :bewoners="oldBewoners" />
                </div>
                <i class="fas fa-angle-right btn-bewoners to-current" @click="tab = 'currentBewoners'"></i>
                <div class="title-blue old">Oude</div>
                <div class="title old">Bewoners</div>
            </div>
        </div>
    </div>
</template>
<script>
    import BewonerDisplay from "./BewonerDisplay";
    import getBewoners from "../graphql/GetBewoners.graphql";

    export default {
        name: 'BewonerBanner',
        components: {BewonerDisplay},
        data () {
            return {
                bewoners: [],
                oldBewoners: [],
                isReady: false,
                tab: 'currentBewoners'
            }
        },
        methods: {
            determineClass(tabname) {
                if (tabname === this.tab) {
                    return 'showing';
                } else if (tabname === 'oldBewoners') {
                    return 'hiding-left';
                } else {
                    return 'hiding-right';
                }
            },
        },
        async mounted() {
            await this.$apollo.query({
                query: getBewoners
            }).then(response => {
                console.log('Bewoner', response.data.bewoners);
                response.data.bewoners.forEach(bewoner => {
                    let movedOutDate;
                    if (bewoner.movedOutDate) {
                        movedOutDate = new Date(bewoner.moveOutDate);
                    }
                    if (movedOutDate && movedOutDate < new Date()) {
                        this.oldBewoners.push(bewoner);
                    } else {
                        this.bewoners.push(bewoner);
                    }
                });
                this.isReady = true;
            }).catch(error => {
                console.error(error);
            });
        }
    }
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 600px) {
        .bewoner_banner {
            width: 100%;
        }

        .bewoner-container {
            display: grid;
            grid-template-rows: 10vh 60vh 5vh 7vh 8vh 10vh;

            &.current {
                grid-template-columns: 60% 30% 10%;
            }

            &.old {
                grid-template-columns: 10% 30% 60%;
            }
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

        .title-blue {
            grid-row-start: 4;
            grid-row-end: 4;
            grid-column-start: 2;
            grid-column-end: 2;
            font-size: 2rem;
            color: var(--my-blue);
            font-weight: bolder;
            text-align: left;
        }

        .bewoner-card-container {
            grid-row-start: 2;
            grid-row-end: 2;
            grid-column-start: 1;
            grid-column-end: 4;
        }
        
        .btn-bewoners {
            font-size: 3rem;
            color: var(--gray-200);
            grid-row-start: 4;
            grid-row-end: 6;
            margin: auto;

            &.to-old {
                grid-column-start: 1;
                grid-column-end: 2;
            }

            &.to-current {
                grid-column-start: 3;
                grid-column-end: 4;
            }
        }
    }

    @media screen and (min-width: 601px) {
        .bewoner_banner {
            width: 100%;
            height: 100vh;
        }

        .bewoner-container {
            display: grid;
            grid-template-rows: 30vh 35vh 12vh 13vh 10vh;

            &.old {
                grid-template-columns: 5% 65% 20% 10%;
            }

            &.current {
                grid-template-columns: 10% 20% 65% 5%;
            }
        }

        .bewoner-card-container {
            grid-row-start: 2;
            grid-row-end: 4;

            &.old {
                grid-column-start: 2;
                grid-column-end: 3;
            }

            &.current {
                grid-column-start: 3;
                grid-column-end: 4;
            }
        }

        .title {
            grid-row-start: 4;
            grid-row-end: 5;
            font-size: 60px;
            align-self: end;

            &.old {
                grid-column-start: 3;
                grid-column-end: 4;
                justify-self: end;
            }

            &.current {
                grid-column-start: 2;
                grid-column-end: 3;
                justify-self: start;
            }
        }

        .title-blue {
            grid-row-start: 3;
            grid-row-end: 4;
            align-self: end;
            font-size: 60px;

            &.current {
                grid-column-start: 2;
                grid-column-end: 3;
                justify-self: start;
            }

            &.old {
                grid-column-start: 3;
                grid-column-end: 4;
                justify-self: end;
            }
        }

        .title {
            padding-bottom: 0;
            padding-right: 0;
            font-weight: 300;
        }

        .title-blue {
            color: var(--my-blue);
            font-weight: bold !important;
        }

        .btn-bewoners {
            font-size: 6rem;
            color: var(--gray-200);
            margin: auto;
            grid-row-start: 2;
            grid-row-end: 2;
            cursor: pointer;

            &:hover{
                color: var(--my-yellow);
            }

            &.to-old {
                margin-left: 0;
                grid-column-start: 2;
                grid-column-end: 3;
            }

            &.to-current {
                margin-right: 0;
                grid-column-start: 3;
                grid-column-end: 4;
            }
        }
    }

    .showing {
        left: 0;
    }

    .hiding-left {
        left: -100%;
    }

    .hiding-right {
        left: 100%;
    }

    .bewoner-view {
        position: absolute;
        width: 100%;
        height: 100%;
        transition: 1s left ease;
    }
</style>
