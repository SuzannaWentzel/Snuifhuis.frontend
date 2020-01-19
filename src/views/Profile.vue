<template>
	<div class="profile-view">
		<div class="profile-card container-fluid px-0">
			<div class="tab-container">
				<div id="personal" class="active tab" @click="selectTab('personal')">
					<i class="fas fa-user-edit"></i>
				</div>
				<div id="security" class="tab" @click="selectTab('security')">
					<i class="fas fa-user-shield"></i>
				</div>
				<div id="remove" class="tab" @click="selectTab('remove')">
					<i class="fas fa-user-times"></i>
				</div>
				<div id="photos" class="tab" @click="selectTab('photos')">
					<i class="fas fa-camera-retro"></i>
				</div>
			</div>
			<div class="content-container">
				<div v-if="tab === 'personal' && !!bewoner" class="content">
					<h2 class="settings-title">Profiel aanpassen</h2>
					<hr>
					<b-form-group class="custom-label" label-cols="3" label-cols-sm="12" label-cols-lg="4">
						<div ref="profile-picture" class="profile-picture" :style="'background-image: url(\'' + bewoner.profilePicture + '\');'"></div>
					</b-form-group>

					<b-form-group class="custom-label" label-cols="3" label-cols-sm="12" label-cols-lg="4" label="Profielfoto: " label-for="input-picture">
						<b-form-file
							id="input-picture"
							placeholder="Kies of sleep hier jouw profielfoto..."
							drop-placeholder="Plaats je profielfoto hier..."
							v-model="profilePicture"
							accept="image/jpeg, image/png"
							:state="fileValidation"
						></b-form-file>
						<b-form-invalid-feedback :state="fileValidation">
							Dit bestand is te groot... Kies een bestand < 1mB
						</b-form-invalid-feedback>
					</b-form-group>
					<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Naam: " label-for="input-name">
						<b-form-input id="input-name" type="text" v-model="bewoner.name"></b-form-input>
					</b-form-group>
					<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Beschrijving: " label-for="input-description">
						<b-form-textarea no-resize id="input-description" type="text" v-model="bewoner.description"></b-form-textarea>
					</b-form-group>
					<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12">
						<template v-if="saveBewonerOk" slot="label" label-for="btn-save-profile"><span class="text-success"><i class="far fa-thumbs-up"></i> Opgeslagen!</span></template>
						<template v-if="saveBewonerNotOk" slot="label" label-for="btn-save-profile"><span class="text-danger"><i class="far fa-sad-cry"></i> Mislukt!</span></template>
						<b-button id="btn-save-profile" variant="outline-success" class="btn-long" @click="saveBewoner()">Profiel bijwerken</b-button>
					</b-form-group>
				</div>
				<div v-if="tab === 'security'" class="content">
					<h2 class="settings-title">Verander inloggegevens</h2>
					<hr>
					<b-form-group class="first-form">
						<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Email: " label-for="input-email">
							<b-form-input id="input-email" type="text" v-model="user.email"></b-form-input>
						</b-form-group>
						<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12">
							<template v-if="saveEmailOk" slot="label" label-for="btn-save-email"><span class="text-success"><i class="far fa-thumbs-up"></i> Opgeslagen!</span></template>
							<template v-if="saveEmailNotOk" slot="label" label-for="btn-save-email"><span class="text-danger"><i class="far fa-sad-cry"></i> Mislukt!</span></template>
							<b-button id="btn-save-email" variant="outline-success" class="btn-long" @click="saveEmail()">Sla emailadres op</b-button>
						</b-form-group>
					</b-form-group>
					<b-form-group>
						<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Oud wachtwoord: " label-for="input-oldPass">
							<b-form-input id="input-oldPass" type="password" v-model="oldPass"></b-form-input>
						</b-form-group>
						<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Nieuw wachtwoord: " label-for="input-newPass1">
							<b-form-input id="input-newPass1" type="password" v-model="newPass1"></b-form-input>
						</b-form-group>
						<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12" label="Herhaal wachtwoord: " label-for="input-newPass2">
							<b-form-input id="input-newPass2" type="password" v-model="newPass2"></b-form-input>
						</b-form-group>
						<b-form-group class="custom-label" label-cols="3" label-cols-lg="4" label-cols-sm="12">
							<template v-if="savePassOk" slot="label" label-for="btn-save-pass"><span class="text-success"><i class="far fa-thumbs-up"></i> Opgeslagen!</span></template>
							<template v-if="savePassNotOk" slot="label" label-for="btn-save-pass"><span class="text-danger"><i class="far fa-sad-cry"></i> Mislukt!</span></template>
							<b-button id="btn-save-pass" variant="outline-success" class="btn-long" @click="savePassword()">Sla wachtwoord op</b-button>
						</b-form-group>
					</b-form-group>
				</div>
				<div v-if="tab === 'remove'" class="content">
					<h2>Verwijder account</h2>
					<p>Weet je zeker dat je je account permanent wilt verwijderen? Daarmee worden ook alle foto's die jij geplaatst hebt van de site en database verwijderd.</p>
					<b-form-group>
						<b-button class="btn-danger" cols="9" @click="openModal()">Verwijder account <i class="fas fa-trash"></i></b-button>
					</b-form-group>

					<b-modal ref="remove-modal" title="Verwijder account" hide-footer centered okOnly>
						<b-alert :show="removeNotOk" variant="danger">Mislukt..</b-alert>
						<p>Weet je zeker dat je je account echt permanent wilt verwijderen?</p>
						<div class="footer">
							<b-button variant="outline-secondary" @click="closeModal()">Niet verwijderen!</b-button>
							<b-button class="btn-danger" @click="deleteAccount()">Verwijderen <i class="fas fa-trash"></i></b-button>
						</div>
					</b-modal>
				</div>
				<div v-if="tab === 'photos'">
					PHOTOS
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import editBewoner from '../graphql/EditBewoner.graphql';
    import getBewoner from '../graphql/GetBewoner.graphql';
    import getUser from '../graphql/GetUser.graphql';
    import editEmail from '../graphql/EditEmail.graphql';
    import editPassword from '../graphql/EditPassword.graphql';
    import removeUser from '../graphql/RemoveUser.graphql';
    import {onLogin, onLogout} from "../vue-apollo";

    export default {
        name: "Profile",
	     data () {
            return {
                tab: 'personal',
	             bewoner: this.$store.state.bewoner? this.$store.state.bewoner.bewoner : null,
	             saveBewonerOk: false,
	             saveBewonerNotOk: false,
	             saveEmailOk: false,
	             saveEmailNotOk: false,
	             user: {
                    email: ""
	             },
	             oldPass: null,
	             newPass1: null,
	             newPass2: null,
	             allFieldsFilledIn: true,
	             passwordsTheSame: true,
	             savePassOk: false,
	             savePassNotOk: false,
	             removeNotOk: false,
	             profilePicture: null,
	         }
	     },
	     methods: {
            selectTab(tab) {
					this.tab = tab;
					this.resetClasses();
					let activeElement = document.getElementById(tab);
					activeElement.classList.add('active');
            },

            resetClasses() {
                let elements = document.getElementsByClassName('tab');
                for (let element of elements) {
                    element.className = 'tab';
                }
            },
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

                console.log(this.profilePicture);
                let base64Picture = null;
                if (!!this.profilePicture) {
                    console.log(this.profilePicture.size);
                    if (this.profilePicture.size > 1000 * 1000) {
                        console.log('File too big!');
                        return;
                    }
                    base64Picture = await this.readFileAsDataURL(this.profilePicture);


                    // const reader = new FileReaderSync();
                    // console.log(reader.readAsDataURL(this.profilePicture));
                    // console.log('Result', reader.result);
                    // reader.onload = function () {
                    //     const readerResult = reader.result;
                    //     base64Picture = readerResult.replace(/^data:image.+;base64,/, '');
                    //     console.log(base64Picture);
                    // };
                    // reader.onerror = function (err) {
                    //     console.err(err);
                    // };

                    // console.log(base64Picture)
                }

                // console.log(base64Picture);

                let bewonerInput = {
                    _id: this.bewoner._id,
                    name: this.bewoner.name,
	                 description: this.bewoner.description,
	                 moveInDate: this.bewoner.moveInDate,
	                 moveOutDate: this.bewoner.moveOutDate,
	                 profilePicture: base64Picture
			       };


                await this.$apollo.mutate({
                    mutation: editBewoner,
                    variables: {
                        bewonerInput: bewonerInput
                    }
                }).then(async (response) => {
                    console.log(response.data.editBewoner);
                    this.bewoner = response.data.editBewoner;
                    this.saveBewonerOk = true;
                }).catch((error) => {
							this.saveBewonerNotOk = true;
                });
		      },
		      async saveEmail() {
                this.saveEmailNotOk = false;
                this.saveEmailOk = false;
					if (!!this.user.email) {
					    await this.$apollo.mutate({
						     mutation: editEmail,
						     variables: {
						         email: this.user.email
						     }
					    }).then(async response => {
					        this.saveEmailOk = true;
					        this.user = response.data.editEmail.user;
					        onLogin(this.$apollo.getClient(), response.data.editEmail.token);
					    }).catch(error => {
					        console.error(error);
					        this.saveEmailNotOk = true;
					    })
					}
		      },
		      async savePassword() {
             this.savePassOk = false;
		       this.savePassNotOk = false;
					if (!this.oldPass || !this.newPass1 || !this.newPass2) {
					    this.allFieldsFilledIn = false;
					} else if (this.newPass1 !== this.newPass2) {
					    this.passwordsTheSame = false;
					} else {
					    await this.$apollo.mutate({
						     mutation: editPassword,
						     variables: {
						         oldPassword: this.oldPass,
							      newPassword: this.newPass2
						     }
					    }).then(response => {
					        console.log(response.data.editPassword);
					        this.savePassOk= true;
					    }).catch(error => {
					        console.error(error);
					        this.savePassNotOk = true;
					    })
					}
		      },
		      deleteAccount() {
			       this.$apollo.mutate({
				        mutation: removeUser,
				        variables: {
				            userId: this.user._id
				        }
			       }).then(async response => {
			           console.log(response);
			           await onLogout(this.$apollo.getClient());
			           this.$router.push('/');
			       }).catch(error => {
			           console.error(error);
			       });
		      },
		      openModal() {
                this.$refs['remove-modal'].show()
		      },
		      closeModal() {
                this.$refs['remove-modal'].hide()
		      }
	     },
	     async created() {
            if (!!localStorage.getItem('userId')) {
                await this.$apollo.query({
                    query: getUser,
                    variables: {
                        userId: localStorage.getItem('userId')
                    }
                }).then(async response => {
                    this.user = response.data.user;
                    if (!this.bewoner && !response.data.user.bewoner) {
                        this.$router.push('/bewoner');
                    }
                    if (!this.bewoner) {
                        this.bewoner = response.data.user.bewoner;
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
	     },
	     computed: {
            fileValidation() {
                return (!this.profilePicture || this.profilePicture.size < 1000*1000);
            }
	     }
    }
</script>

<style lang="scss" scoped>
	.profile-view {
		background-image: url('../../public/images/lampjes.jpg');
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.profile-card {
		width: 70%;
		height: 80%;
		background: white;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 3px;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		-webkit-box-shadow: 0px 4px 25px black;
		-moz-box-shadow: 0px 4px 25px black;
		box-shadow: 0px 4px 25px black;
	}

	.tab-container {
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
		float: left;
		width: 25%;
		height: 100%;
		padding-left: 2.5rem;
	}

	.tab {
		padding: 1.5rem 2rem;
		background-color: var(--my-yellow);
		border-radius: 3px;
		opacity: 0.6;
		transition: opacity 1s ease, margin 1s ease;

		&:hover {
			opacity: 0.8;
			margin: 0.5rem 0;
			font-size: 4rem;
			-webkit-box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.3);
			-moz-box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.3);
			box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.3);
			transition: opacity 1s ease, margin 1s ease, box-shadow 1s ease;
			cursor: pointer;
		}

		& i {
			font-size: 3.5rem;
			color: var(--gray-700);
		}
	}

	.active {
		opacity: 1;
		margin: 1rem 0;
		font-size: 4.2rem;
		transition: opacity 1s ease, margin 1s ease, box-shadow 1s ease;
		-webkit-box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.4);
		-moz-box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.4);
		box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.4);

		&:hover {
			opacity: 1;
		}
	}

	.content-container {
		width: 75%;
		height: 100%;
		float: right;
		display: flex;
		padding: 0 3rem 0 6rem;
		/*justify-content: center;*/
		/*flex-direction: column;*/
		align-items: center;
	}

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
	}

	.colour-button {
		padding: 0.75rem 4rem;
		background-image: linear-gradient(to right, var(--my-blue) 0%, var(--my-yellow) 51%, var(--my-blue) 100%);
		-webkit-background-size: 200% auto;
		transition: 0.5s;
		background-size: 200% auto;
		border-radius: 3px;
		border: none;
		color: white;
		margin-right: 5px;

		&:hover {
			background-position: right center;
		}
	}

	.message {
		margin-left: 1.5rem;
		margin-top: 0.75rem;
	}

	.settings-title {
		text-align: left;
	}

	.btn-long {
		width: 98%;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		margin-top: 4rem;
	}

</style>
