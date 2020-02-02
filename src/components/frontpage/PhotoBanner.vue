<template>
	<div :id="fwos? 'fwos-photo-banner' : 'photo-banner'" v-if="photos">
		<div class="slide first" :class="determineClass(-1)">
			<h1 v-if="fwos"><span class="highlighted">Food</span> Wall of Shame</h1>
			<h1 v-else>Algemene <span class="highlighted">Foto's</span></h1>
		</div>
		<div v-for="(photo, index) of photos" :key="index" :class="'slide ' + determineClass(index)" :style="'background-image: url(\'' + photo.picture + '\');'"></div>

		<i class="fas fa-angle-left left" @click="currentPhoto > -1 && currentPhoto--"></i>
		<i class="fas fa-angle-right right" @click="currentPhoto < photos.length -1 && currentPhoto++"></i>
	</div>
</template>

<script>
	 import getPhotos from '../../graphql/GetPhotos.graphql';
	 import getFwosPhotos from '../../graphql/GetFwosPhotos.graphql';

    export default {
        name: "PhotoBanner",
	     props: ["fwos"],
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
	             query: this.fwos? getFwosPhotos : getPhotos
            }).then(response => {
                if (this.fwos) {
                    this.photos = response.data.fwosPhotos;
                } else {
                    this.photos = response.data.photos;
                }
            }).catch(error => {
                console.error(error);
            })
        }
    }
</script>

<style lang="scss" scoped>
	#photo-banner, #fwos-photo-banner {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		padding: 0;
		position: relative;
	}

	#photo-banner {
		& .slide {
			&.first {
				background-image: url('../../../public/images/woonkamerTafel1.jpg');
				text-align: right;

				& h1 {
					right: 0;
					margin-right: 20%;
					top: 70%;
				}
			}
		}
	}

	#fwos-photo-banner {
		& .slide {
			&.first {
				background-image: url('../../../public/images/borden3.jpg');
				text-align: center;
				width: 100%;
				height: 100%;

				& h1 {
					position: absolute;
					top: 50%;
					left: 50%;
					-webkit-transform: translate(-50%, -50%);
					-moz-transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					-o-transform: translate(-50%, -50%);
					transform: translate(-50%, -50%);
				}
			}
		}
	}

	.slide {
		width: 100%;
		height: 100%;
		margin: 0;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		position: absolute;
		transition: left 1s ease;

		&.first {
			& h1 {
				color: white;
				position: absolute;
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
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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
		left: -100%;
	}

	.middle-photo {
		left: 0;
	}

	.right-photo {
		left: 100%;
	}

	.hidden-left {
		left: -200%;
	}

	.hidden-right {
		left: 200%;
	}
</style>
