<template>
	<div class="content">
		<h2 class="settings-title">Profiel aanpassen</h2>
		<hr>
		<b-form-group class="custom-label" label-cols="3" label-cols-sm="12" label-cols-lg="4">
			<div v-if="profilePictureInput" ref="profile-picture" class="profile-picture" :style="'background-image: url(\'' + computedProfilePicture + '\');'"></div>
			<div v-if="!profilePictureInput" class="profile-picture">
				<i class="fas fa-user-circle"></i>
			</div>
		</b-form-group>
		<b-form-group class="custom-label" label-cols="3" label-cols-sm="12" label-cols-lg="4" label="Profielfoto: " label-for="input-picture">
			<b-form-file
				id="input-picture"
				placeholder="Kies of sleep hier jouw profielfoto..."
				drop-placeholder="Plaats je profielfoto hier..."
				v-model="profilePictureInput"
				accept="image/jpeg, image/png"
				:state="fileValidation"
			></b-form-file>
			<b-form-invalid-feedback :state="fileValidation">
				Dit bestand is te groot... Kies een bestand < 1mB
			</b-form-invalid-feedback>
		</b-form-group>
		<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Naam: " label-for="input-name">
			<b-form-input id="input-name" type="text" v-model="inputBewoner.name"></b-form-input>
		</b-form-group>
		<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Beschrijving: " label-for="input-description">
			<b-form-textarea no-resize id="input-description" type="text" v-model="inputBewoner.description"></b-form-textarea>
		</b-form-group>
		<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12">
			<template v-if="saveBewonerOk" slot="label" label-for="btn-save-profile"><span class="text-success"><i class="far fa-thumbs-up"></i> Opgeslagen!</span></template>
			<template v-if="saveBewonerNotOk" slot="label" label-for="btn-save-profile"><span class="text-danger"><i class="far fa-sad-cry"></i> Mislukt!</span></template>
			<b-button id="btn-save-profile" variant="outline-primary" class="btn-long" @click="saveBewoner()">Profiel bijwerken</b-button>
		</b-form-group>
	</div>
</template>

<script>
    import editBewoner from '../../graphql/EditBewoner.graphql';

    export default {
        name: "ProfileSettings",
	     props: ["bewoner"],
	     data () {
            return {
                profilePictureInput: null,
	             saveBewonerOk: false,
	             saveBewonerNotOk: false,
	             inputBewoner: this.bewoner,
	             computedProfilePicture: null,
            }
	     },
        watch: {
            'profilePictureInput': async function (val) {
                if (!!val) {
                    this.computedProfilePicture = val? await this.readFileAsDataURL(val) : null;
                }
            }
        },
	     computed: {
            fileValidation() {
                return (!this.profilePictureInput || this.profilePictureInput.size < 1000*1000);
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
            async saveBewoner() {
                this.saveBewonerOk = false;
                this.saveBewonerNotOk = false;

                let base64Picture = null;
                if (!!this.profilePictureInput) {
                    if (this.profilePictureInput.size > 1000 * 1000) {
                        console.log('File too big!');
                        return;
                    }
                    base64Picture = await this.readFileAsDataURL(this.profilePictureInput);
                }

                let bewonerInput = {
                    _id: this.inputBewoner._id,
                    name: this.inputBewoner.name,
                    description: this.inputBewoner.description,
                    moveInDate: this.inputBewoner.moveInDate,
                    moveOutDate: this.inputBewoner.moveOutDate,
                    profilePicture: base64Picture
                };

                await this.$apollo.mutate({
                    mutation: editBewoner,
                    variables: {
                        bewonerInput: bewonerInput
                    }
                }).then(async (response) => {
                    this.$emit('updatedBewoner', response.data.editBewoner);
                    this.saveBewonerOk = true;
                }).catch(() => {
                    this.saveBewonerNotOk = true;
                });
            },
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

	.profile-picture {
		margin-top: 0.5rem;
		max-width: 300px;
		width: 98%;
		margin-right: 2%;
		height: 170px;
		background-repeat: no-repeat;
		background-position: center;
		-webkit-background-size: cover;
		background-size: cover;
		background-color: var(--gray-50);
		position: relative;

		& i {
			font-size: 7rem;
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

	.settings-title {
		text-align: left;
	}

	.btn-long {
		width: 98%;
	}
</style>
