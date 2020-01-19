<template>
    <div class="bewoner_card_display wrapper">
        <div v-for="(bewoner, index) of bewoners" :key="bewoner.name" :class="'bewoner-card ' + determineClass(index)" @click="slide(index)">
            <BewonerCard :name="bewoner.name" :description="bewoner.description" />
        <!--<BewonerCard @click="showPrevious" class="left-card left" v-if="currentBewoner > 0" :name="bewoners[currentBewoner-1].name" :description="bewoners[currentBewoner-1].description" :descriptionNotShown="true"/>-->
        <!--<BewonerCard class="middle-card" :name="bewoners[currentBewoner].name" :description="bewoners[currentBewoner].description"/>-->
        <!--<BewonerCard @click="showNext" class="right-card right" v-if="currentBewoner < bewoners.length -1" :name="bewoners[currentBewoner + 1].name" :description="bewoners[currentBewoner + 1].description" :descriptionNotShown="true"/>-->
        </div>
    </div>
</template>
<script>
    import BewonerCard from "./BewonerCard";

    export default {
        name: 'BewonerDisplay',
        props: ["bewoners"],
        components: {BewonerCard},
        data(){
            return {
                currentBewoner: 0,
            }
        },
        methods: {
            slide(index) {
                this.currentBewoner = index;
                this.updateClasses();
            },
            removeClasses(element) {
                element.classList.remove('right-card');
                element.classList.remove('middle-card');
                element.classList.remove('hidden');
                element.classList.remove('left-card');
            },
            determineClass(index) {
              if (index === this.currentBewoner-1) {
                  return 'left-card';
              } else if (index === this.currentBewoner) {
                  return 'middle-card';
              } else if (index === this.currentBewoner + 1) {
                  return 'right-card';
              } else if (index < this.currentBewoner) {
                  return 'hidden-left';
              } else {
                  return 'hidden-right';
              }
            },
            updateClasses() {
                // let cards = document.getElementsByClassName('bewoner-card');
                // for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
                //     if (this.currentBewoner > 0 && cardIndex === this.currentBewoner - 1){
                //         this.removeClasses(cards[cardIndex]);
                //         cards[cardIndex].classList.add('left-card');
                //     } else if (cardIndex === this.currentBewoner) {
                //         this.removeClasses(cards[cardIndex]);
                //         cards[cardIndex].classList.add('middle-card');
                //     } else if (this.currentBewoner < this.bewoners.length - 1 && cardIndex === this.currentBewoner + 1) {
                //         this.removeClasses(cards[cardIndex]);
                //         cards[cardIndex].classList.add('right-card');
                //     } else {
                //         this.removeClasses(cards[cardIndex]);
                //         cards[cardIndex].classList.add('hidden');
                //     }
                // }
            },
        },
        mounted() {
            this.updateClasses();
        }
    }
</script>
<style lang="scss" scoped>

    @media screen and (max-width: 600px) {
        .bewoner_card_display {
            display: flex;
            width: 100%;
        }

        .wrapper {
            height: 100%;
            position: relative;
            perspective: 1000px;
            overflow: hidden;
        }

        .left-card {
           opacity: 0;
            -webkit-transform: rotateY(-40deg);
            -moz-transform: rotateY(-40deg);
            -ms-transform: rotateY(-40deg);
            -o-transform: rotateY(-40deg);
            transform: rotateY(-40deg) scale(0.8);

            padding: 2rem;

            width: 80%;
            height: 100%;
            position: absolute;
            left: -80%;
        }

        .middle-card {
            -webkit-transform: rotateY(0deg);
            -moz-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            -o-transform: rotateY(0deg);
            transform: rotateY(0deg);

            padding: 2rem;

            width: 100%;
            height: 100%;
            position: absolute;
            left: 0%;
        }

        .right-card {
            opacity: 0;
            -webkit-transform: rotateY(40deg);
            -moz-transform: rotateY(40deg);
            -ms-transform: rotateY(40deg);
            -o-transform: rotateY(40deg);
            transform: rotateY(40deg) scale(0.8);

            padding: 2rem;


            width: 80%;
            height: 100%;
            position: absolute;
            left: 100%;
        }

        .hidden-right {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .hidden-left {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .bewoner-card {
            transition: transform 2s ease, left 2s ease, opacity 1s ease;
            height: 100%;
        }
    }

    @media screen and (min-width: 601px) {
        .bewoner_card_display{
            display: flex;
            height: 100%;
            width: 100%;
        }

        .left-card {
            -webkit-transform: rotateY(-40deg);
            -moz-transform: rotateY(-40deg);
            -ms-transform: rotateY(-40deg);
            -o-transform: rotateY(-40deg);
            transform: rotateY(-40deg) scale(0.8);

            width: 33%;
            position: absolute;
            left: 0%;

            &:hover {
                cursor: pointer;
            }
        }

        .middle-card {
            -webkit-transform: rotateY(0deg);
            -moz-transform: rotateY(0deg);
            -ms-transform: rotateY(0deg);
            -o-transform: rotateY(0deg);
            transform: rotateY(0deg);

            width: 33%;
            position: absolute;
            left: 33%;
        }

        .right-card {
            -webkit-transform: rotateY(40deg);
            -moz-transform: rotateY(40deg);
            -ms-transform: rotateY(40deg);
            -o-transform: rotateY(40deg);
            transform: rotateY(40deg) scale(0.8);

            width: 33%;
            position: absolute;
            left: 66%;

            &:hover {
                cursor: pointer;
            }
        }

        .hidden-right {
            opacity: 0;
            transform: rotateY(72deg) scale(0.6);
            position: absolute;
            left: 80%;
            width: 33%;
        }

        .hidden-left {
            opacity: 0;
            transform: rotateY(-72deg) scale(0.6);
            position: absolute;
            left: -10%;
            width: 33%;
        }

        .wrapper {
            perspective: 1000px;
            position: relative;
        }

        .bewoner-card {
            transition: transform 2s ease, left 2s ease, opacity 1s ease;
            height: 100%;
        }
    }

</style>
