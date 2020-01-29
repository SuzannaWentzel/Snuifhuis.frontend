<template>
	<div class="content">
		<div v-if="tab === 'overview'" class="overview">
			<div class="settings-container mt-4">
				<h3>"Normale" foto's</h3>
				<b-button class="btn-right" variant="outline-primary" @click="openPhotoModal(false)">Voeg foto's toe</b-button>
			</div>
			<hr>
			<div class="photo-container">
				<div class="uploaded-photo" v-for="(photo, index) of photos" :key="index" :style="'background-image: url(\'' + photo.picture + '\');'"></div>
				<i class="fas fa-angle-right" @click="showTab('photos')"></i>
			</div>
			<div class="settings-container mt-5">
				<h3>Food Wall of Shame</h3>
				<b-button class="btn-right" variant="outline-primary" @click="openPhotoModal(true)">Voeg fwos's toe</b-button>
			</div>
			<hr>
			<div class="photo-container">
				<div class="uploaded-photo" v-for="(photo, index) of fwosPhotos" :key="index" :style="'background-image: url(\'' + photo.picture + '\');'"></div>
				<i class="fas fa-angle-right" @click="showTab('fwosPhotos')"></i>
			</div>
		</div>

		<div v-if="tab === 'photos'" class="tab">
			<p class="hover link text-left" @click="showTab('overview')"><i class="fas fa-angle-left mr-2"></i> terug naar overzicht</p>
			<div class="settings-container">
				<h3>"Normale" foto's</h3>
				<b-button class="btn-right" variant="outline-primary" @click="openPhotoModal(false)">Voeg foto's toe</b-button>
			</div>
			<hr>
			<div class="gallery-container">
				<div class="gallery">
					<FlipCard v-for="photo of photos" :photo="photo" :key="photo._id"/>
				</div>
			</div>
		</div>

		<div v-if="tab === 'fwosPhotos'" class="tab">
			<p class="hover link text-left" @click="showTab('overview')"><i class="fas fa-angle-left mr-2"></i>terug naar overzicht</p>
			<div class="settings-container">
				<h3>Food Wall of Shame</h3>
				<b-button class="btn-right" variant="outline-primary" @click="openPhotoModal(true)">Voeg fwos's toe</b-button>
			</div>
			<hr>
			<div class="gallery-container">
				<div class="gallery">
					<FlipCard v-for="photo of fwosPhotos" :photo="photo" :key="photo._id"/>
				</div>
			</div>
		</div>


		<b-modal ref="add-photo-modal" size="lg" hide-footer centered okOnly>
			<template v-slot:modal-header>
				<div class="modal-header">
					<h5>Voeg foto's toe</h5>
					<i class="fas fa-times" @click="closeModal()"></i>
				</div>

			</template>
			<div class="modal-body">
				<b-alert variant="success" :show="photosAddedOk"><i class="fas fa-thumbs-up"></i>toegevoegd</b-alert>
				<b-alert variant="danger" :show="photosAddedNotOk"><i class="fas fa-sad-cry"></i>Mislukt!</b-alert>
				<div v-if="!loading" class="uploaded-photos-container">
					<div class="uploaded-photo"
					     v-for="(photo, index) of computedPhotos"
					     :key="index"
					     :style="'background-image: url(\'' + photo + '\');'">
					</div>
				</div>
				<b-form-group>
					<b-form-file
						v-model="inputPhotos"
						placeholder="Kies of sleep hier een foto"
						drop-placeholder="Plaats je foto hier"
						accept="image/jpeg, image/png"
						:state="photoValidation"
						multiple>
					</b-form-file>
					<b-form-invalid-feedback :state="photoValidation">
						Een van de bestanden is te groot... Kies je bestanden < 1mB
					</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group v-if="inputPhotos.length <= 1">
					<b-input type="text" placeholder="Beschrijving" v-model="photoDescription"/>
				</b-form-group>
				<b-alert :show="inputPhotos.length > 1" variant="warning">Je kan alleen een beschrijving toevoegen als je één foto per keer toevoegt</b-alert>
				<b-form-group>
					<b-form-checkbox v-model="areFwos" name="fwos" switch>
						<i class="fas fa-utensils px-2"></i>
						Dit is/zijn <b>Food Wall of Shame</b> foto's
					</b-form-checkbox>
				</b-form-group>
				<b-form-group>
					<b-form-checkbox v-model="arePrivate" name="private" switch>
						<i class="fas fa-lock px-2"></i>
						Deze foto('s) mogen <b>alleen (oud-)huisgenoten</b> zien
					</b-form-checkbox>
				</b-form-group>
				<div class="footer">
					<b-button variant="outline-secondary" @click="closeModal()">Annuleren</b-button>
					<b-button variant="primary" @click="addPhotos()">Toevoegen</b-button>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
    import addPhoto from '../../graphql/CreatePhoto.graphql';
    import addPhotos from '../../graphql/CreatePhotos.graphql';
	import getPhotos from '../../graphql/GetPhotos.graphql';
	import getFwosPhotos from '../../graphql/GetFwosPhotos.graphql'
    import FlipCard from "./FlipCard";

    export default {
        name: "PhotosOverview",
	     props: ["bewoner"],
	     components: {FlipCard},
	     data () {
            return {
                photosAddedNotOk: false,
	             photosAddedOk: false,
                inputPhotos: [],
	             loading: false,
	             computedPhotos: [],
	             areFwos: false,
	             arePrivate: false,
	             photoDescription: null,
	             tab: "overview",
				 photos: null,
				 fwosPhotos: null
            }
	     },
        watch: {
            'inputPhotos': async function (val) {
                this.loading = true;
                this.computedPhotos = [];
                await val.forEach(async photo => {
                    const computedPhoto = await this.readFileAsDataURL(photo);
                    this.computedPhotos.push(computedPhoto);
                });
                this.loading = false;
            }
        },
	     methods: {
            async readFileAsDataURL(file) {
                let result_base64 = await new Promise((resolve) => {
                    let fileReader = new FileReader();
                    fileReader.onload = (e) => resolve(fileReader.result);
                    fileReader.readAsDataURL(file);
                });

                return result_base64;
            },
            openPhotoModal(evt) {
                this.areFwos = evt;
                this.$refs['add-photo-modal'].show();
            },
            closeModal() {
				this.$refs['add-photo-modal'].hide();
				this.photosAddedNotOk = false;
				this.photosAddedOk = false;
            },
            async addPhotos(){
                this.photosAddedOk = false;
                this.photosAddedNotOk = false;
                if (this.inputPhotos.length === 1) {
                    let photoInput = {
                        picture: this.computedPhotos[0],
                        private: this.arePrivate,
                        fwos: this.areFwos,
                        description: this.photoDescription
                    }

                    await this.$apollo.mutate({
                        mutation: addPhoto,
                        variables: {
                            photoInput: photoInput
                        }
                    }).then(response => {
                        console.log(response);
                        this.photosAddedOk = true;
						this.inputPhotos = [];
						this.photoDescription = null;
						if(this.areFwos) {
							this.fwosPhotos.push(response.data.createPhoto);
						} else {
							this.photos.push(response.data.createPhoto);
						}
                    }).catch(error => {
                        this.photosAddedNotOk = true;
                        console.error(error);
                    });
                } else if (this.inputPhotos.length > 1) {
					let photoInputs = [];
                    this.computedPhotos.forEach(photo => {
                        let photoInput = {
                            picture: photo,
                            private: this.arePrivate,
                            fwos: this.areFwos
                        }
                        photoInputs.push(photoInput);
                    });

                    await this.$apollo.mutate({
                        mutation: addPhotos,
                        variables: {
                            photoInputs: photoInputs
                        }
                    }).then(response => {
						this.photosAddedOk = true;
						if (this.areFwos) {
							this.fwosPhotos = response.data.createPhotos;
						} else {
							this.photos = response.data.createPhotos;
						}
						this.inputPhotos = [];
                        console.log(response);
                    }).catch(error => {
                        this.photosAddedNotOk = true;
                        console.error(error);
                    });
                }
            },
		      showTab(tab) {
                console.log(tab);
                this.tab = tab;
		      }
	     },
	     computed: {
            photoValidation() {
                let result;
                let totalSize = 0;
                this.inputPhotos.forEach(photo => {
                    if (photo.size > 1000 * 1000) {
                        result = false;
                    }
                    totalSize += photo.size;
                });
                return (!result && totalSize < 1000*1000);
            }
        },
	     async mounted() {
            await this.$apollo.query({
				 query: getPhotos,
				 variables: {
					 bewonerId: localStorage.getItem('bewonerId')
				 }
            }).then(response => {
                this.photos = response.data.photos;
            }).catch(error => {
                console.error(error);
			});
			
			await this.$apollo.query({
				query: getFwosPhotos, 
				variables: {
					bewonerId: localStorage.getItem('bewonerId')
				}
			}).then(response => {
				this.fwosPhotos = response.data.fwosPhotos;
				console.log(response);
			}).catch(error => {
				console.error(error);
			})
        }
    }
</script>

<style lang="scss" scoped>
	.content {
		/*background: var(--gray-50);*/
		/*border-radius: 3px;*/
		padding: 1.5rem 0;
		width: 100%;
		max-height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.custom-label {
		text-align: left;
		width: 100%;
	}

	.settings-title {
		text-align: left;
	}

	.settings-container {
		display: flex;
		justify-content: space-between;
		text-align: left;

		& h3 {
			display: inline;
			font-size: 1.5rem;
		}
	}

	.btn-long {
		width: 98%;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		margin-top: 4rem;
	}

	.btn-right {
		float: right;

		& i {
			margin-left: 0.5rem;
		}
	}

	.uploaded-photos-container {
		min-width: 100%;
		overflow-x: auto;
		height: 225px;
		padding-top: 25px;
		margin-bottom: 1rem;
		white-space: nowrap;
	}

	.uploaded-photo {
		width: 200px;
		height: 150px;
		background-size: cover;
		background-position: center;
		display: inline-block;
		margin-right: 1.5rem;
	}

	.photo-container {
		min-width: 100%;
		overflow-x: hidden;
		white-space: nowrap;
		position: relative;

		& i {
			z-index: 50;
			color: var(--my-yellow);
			font-size: 5rem;
			position: absolute;
			top: 50%;
			right: 1rem;
			text-align: center;
			-webkit-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-o-transform: translateY(-50%);
			transform: translateY(-50%);

			&:hover {
				cursor: pointer;
				color: var(--my-yellow-darkened);
			}
		}
	}

	.alert {
		margin-bottom: 0;

		& i {
			margin-right: 0.5rem;
		}
	}

	.modal-header {
		padding: 0 1rem;
		width: 100%;
		border-bottom: none;
		margin-bottom: 0;

		& i {
			color: var(--gray-200);
			font-size: 1.25rem;

			&:hover {
				cursor: pointer;
				color: var(--my-blue);
			}
		}

		& h5 {
			margin-bottom: 0;
		}
	}

	.right {
		float: right;
	}

	.gallery {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.gallery-container {
		overflow-y: auto;
		max-height: 55vh;
	}

	.hover {
		cursor: pointer;
	}

	.link {
		&:hover {
			color: var(--my-blue-darkened);
		}
	}
</style>
