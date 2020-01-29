<template>
	<div id="photo-banner">
		<div class="slide first" :class="determineClass(-1)">
			<h1>Algemene <span class="highlighted">Foto's</span></h1>
		</div>
		<div v-for="(photo, index) of photos" :key="index" :class="'slide ' + determineClass(index)" :style="'background-image: url(\'' + photo.picture + '\');'"></div>

		<i class="fas fa-angle-left left" @click="currentPhoto > -1 && currentPhoto--"></i>
		<i class="fas fa-angle-right right" @click="currentPhoto < photos.length -1 && currentPhoto++"></i>
	</div>
</template>

<script>
	 import getPhotos from '../../graphql/GetPhotos.graphql';
    export default {
        name: "PhotoBanner",
	     data() {
            return {
                photos: [],
	             currentPhoto: -1,
            }
	     },
	     methods: {
            determineClass(index) {
                if (index === this.currentPhoto-1) {
                    return 'left-photo';
                } else if (index === this.currentPhoto) {
                    return 'middle-photo';
                } else if (index === this.currentPhoto + 1) {
                    return 'right-photo';
                } else if (index < this.currentPhoto) {
                    return 'hidden-left';
                } else {
                    return 'hidden-right';
                }
            },
	     },
	     async mounted() {
            await this.$apollo.query({
	             query: getPhotos
            }).then(response => {
                this.photos = response.data.photos;
            }).catch(error => {
                console.error(error);
            })
        }
    }
</script>

<style lang="scss" scoped>
	#photo-banner {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		padding: 0;
		position: relative;
	}

	.slide {
		width: 100%;
		height: 100%;
		margin: 0;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		position: absolute;

		&.first {
			background-image: url('../../../public/images/woonkamerTafel1.jpg');
			text-align: right;

			& h1 {
				right: 0;
				margin-right: 20%;
				color: white;
				position: absolute;
				top: 70%;
				/*-webkit-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				transform: translateY(-50%); */
				
				
				& .highlighted {
					color: var(--my-yellow);
				}
			}
		}
	}

	.left {
		position: absolute;
		left: 0;
		margin-left: 2rem;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
	}

	.right {
		position: absolute;
		right: 0;
		margin-right: 2rem;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	i {
		font-size: 6rem;
		color: white;

		&:hover {
			cursor: pointer;
			color: var(--my-blue);
		}
	}

	.left-photo {
		right: 101%;
	}

	.middle-photo {
		left: 0;
	}

	.right-photo {
		left: 101%;
	}

	.hidden-left {
		left: -200%;
		visibility: hidden;
	}

	.hidden-right {
		right: 200%;
		visibility: hidden;
	}
</style>
