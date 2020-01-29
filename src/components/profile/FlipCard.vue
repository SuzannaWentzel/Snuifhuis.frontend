<template>
	<div class="flip-card">
		<div class="flip-card-inner">
			<div class="flip-card-front" :style="'background-image: url(\'' + photo.picture + '\');'">
			</div>
			<div class="flip-card-back">
				<b-form-group class="custom-label" label-cols="12" label-cols-lg="12" label-cols-sm="12" label="Beschrijving:" label-for="photo-input-description">
					<b-form-textarea no-resize id="photo-input-description" type="text" v-model="photoInput.description" placeholder="Beschrijving"></b-form-textarea>
				</b-form-group>
				<b-form-checkbox v-model="photoInput.fwos" name="fwos" switch class="left">
					<i class="fas fa-utensils px-2"></i>
					FWoS foto
				</b-form-checkbox>
				<b-form-checkbox v-model="photoInput.private" name="private" switch class="left">
					<i class="fas fa-lock px-2"></i>
					alleen (oud-)huisgenoten
				</b-form-checkbox>
				<div class="footer">
					<b-button variant="primary" @click="savePhoto()">Opslaan</b-button>
					<b-button variant="outline-danger" @click="deletePhoto()">Verwijderen</b-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import editPhoto from '../../graphql/EditPhoto.graphql';

    export default {
        name: "FlipCard",
	     props: ["photo"],
	     data () {
            return {
                photoInput: this.photo,
            }
	     },
	     methods: {
            async savePhoto() {
                await this.$apollo.mutate({
	                 mutation: editPhoto,
	                 variables: {
	                     photoInput: {
	                         picture: this.photoInput.picture,
		                      description: this.photoInput.description,
		                      _id: this.photoInput._id,
		                      fwos: this.photoInput.fwos,
		                      private: this.photoInput.private
                        }
                    }
                }).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.error(error);
                })
            }
	     }
    }
</script>

<style lang="scss" scoped>
	.flip-card {
		background-color: transparent;
		width: 320px;
		min-width: 320px;
		height: 240px;
		margin-bottom: 1rem;
		margin-right: 1rem;
		// perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip when you move the mouse over the flip box container */
	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	/* Position the front and back side */
	.flip-card-front, .flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: 3px;

	}

	/* Style the front side (fallback if image is missing) */
	.flip-card-front {
		background-color: #bbb;
		background-repeat: no-repeat;
		background-position: center;
		-webkit-background-size: cover;
		background-size: cover;
		color: black;
	}

	/* Style the back side */
	.flip-card-back {
		background-color: var(--gray-700);
		color: white;
		transform: rotateY(180deg);
		padding: 0.3rem 1rem 1rem 1rem;
	}

	.custom-label {
		text-align: left;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		padding-top: 1rem;
		width: 100%;
	}

	.left {
		margin-left: 0;
		float: left;
		display: block;
	}
</style>
