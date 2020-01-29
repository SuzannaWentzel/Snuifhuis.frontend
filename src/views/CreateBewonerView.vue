<template>
	<div class="background">
		<div class="container">
			<b-button class="button step left" v-if="step>0" @click="previousStep()" title="vorige stap"><i class="fas fa-chevron-left"></i></b-button>
			<div class="inner-container">
				<h1>Nieuwe bewoner</h1>
				<b-progress height="3px" :value="step/totalSteps * 100" variant="secondary"></b-progress>
				<b-alert variant="danger" :show="!!message"><i class="fas fa-exclamation"></i>{{ message }}</b-alert>

				<div v-if="step === 0" class="content">
					<h3 class="step-description"><b>Stap 1:</b> Vul wat informatie over jezelf in</h3>
					<b-form-group label-cols="4" label-cols-lg="4" label="Naam:" label-for="input-default">
						<b-form-input required id="name" type="text" v-model="name" placeholder="John Doe"></b-form-input>
					</b-form-group>
					<b-form-group label-cols="4" label-cols-lg="4" label="Beschrijving:" label-for="input-default">
						<b-form-textarea no-resize id="description" type="text" v-model="description" placeholder="Likes cake?"></b-form-textarea>
					</b-form-group>
				</div>
				<div v-if="step === 1" class="content">
					<h3 class="step-description"><b>Stap 2:</b> Upload een mooie profielfoto</h3>
					<div v-if="!profilePicture" class="image">
						<i class="fas fa-user-circle"></i>
					</div>
					<div v-if="!!profilePicture" class="image" :style="'background-image: url(\'' + computedPicture + '\');'"></div>
					<b-form-file
						v-model="profilePicture"
						placeholder="Kies of sleep hier jouw profielfoto..."
						drop-placeholder="Plaats je profielfoto hier..."
						accept="image/jpeg, image/png"
						:state="fileValidation"
					></b-form-file>
					<b-form-invalid-feedback :state="fileValidation">
						Dit bestand is te groot... Kies een bestand < 1mB
					</b-form-invalid-feedback>
				</div>
				<div v-if="step === 2" class="content content-container">
					<h3 class="step-description"><b>Stap 3:</b> Geef aan wanneer je ingetrokken bent</h3>
					<b-form-group label-cols="4" label-cols-lg="4" label="Intrek datum: ">
						<!--<date-pick v-model="moveInDate" :displayFormat="'DD-MM-YYYY'"></date-pick>-->
						<v-date-picker v-model="moveInDate" color="gray"></v-date-picker>
					</b-form-group>
					<b-form-group>
						<b-form-checkbox
							id="checkbox-1"
							v-model="movedOut"
							name="checkbox-1"
							:value="true"
							:unchecked-value="false"
						>
							Ik ben alweer verhuisd
						</b-form-checkbox>
					</b-form-group>
				</div>
				<div v-if="step === 3 && movedOut" class="content content-container">
					<h3 class="step-description"><b>Stap 3.5:</b> Geef aan wanneer je verhuisd bent</h3>
					<b-form-group label-cols="4" label-cols-lg="4" label="Verhuis datum: ">
						<!--<date-pick v-model="movedOutDate" :displayFormat="'DD-MM-YYYY'"></date-pick>-->
						<v-date-picker v-model="movedOutDate" color="gray"></v-date-picker>
					</b-form-group>
				</div>
				<div v-if="step === 4" class="content content-container">
					<h3 class="step-description"><b>Stap 4:</b> Sla je profiel op</h3>
					<p>Alles goed ingevuld?</p>
					<p v-if="!name" class="text-danger less-padding-bottom">Nee, je mist nog een <span @click="step = 0" class="clickable">naam</span>.</p>
					<p v-if="!moveInDate" class="text-danger less-padding-bottom">Nee, je hebt nog geen <span @click="step = 2" class="clickable">intrek datum</span> opgegeven.</p>
					<p v-if="movedOut && !movedOutDate" class="text-danger less-padding-bottom">Nee, je zegt al verhuisd te zijn maar hebt geen <span @click="step = 3" class="clickable">verhuisdatum</span> opgegeven.</p>
					<p v-if="!description" class="text-warning less-padding-bottom">Misschien, je hebt nog geen <span @click="step = 0" class="clickable">beschrijving</span> ingevuld?</p>
					<p v-if="!!name && !!moveInDate && ((movedOut && !!movedOutDate) || !movedOut) && !!description">Ja!</p>
					<b-button id="btn-save" class="colour-button save" @click="saveBewoner()">opslaan</b-button>
				</div>
			</div>
			<b-button class="button step right" v-if="step < totalSteps" @click="nextStep()" title="volgende stap"><i class="fas fa-chevron-right"></i></b-button>
		</div>
		<b-modal ref="welcome-modal" hide-header hide-footer centered okOnly>
			<h2 class="my-4">Welkom op de <span class="highlighted">Snuifhuis</span> website!</h2>
			<p class="my-3">Er volgen nu een aantal stappen om jouw profiel af te maken. De informatie die je opgeeft is leuk voor de andere (oud)huisgenoten!</p>
			<p class="my-3">Ik wil je er wel graag op wijzen dat dit een hobby-website is, je data die je opgeeft zou niet veilig kunnen zijn. Je kan je account en alle foto's die je plaatst verwijderen. Als je iets vindt wat kapot is, laat het me weten en ik probeer het te fixen (dit is geen uitnodiging om opzettelijk te gaan slopen, doe maar niet)!</p>
			<p clas="my-3">Xx de site-admin</p>
			<b-button class="colour-button ok" @click="ok()">OK</b-button>
		</b-modal>
		<b-modal ref="logged-out-modal" hide-header hide-footer centered okOnly>
			<p>Je bent uitgelogd! Log opnieuw in!</p>
			<b-button class="colour-button ok" @click="toLogin()">OK</b-button>
		</b-modal>
	</div>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import createBewoner from '../graphql/CreateBewoner.graphql';
    import getUser from '../graphql/GetUser.graphql';
    import { mapMutations } from 'vuex';

    export default {
        name: "CreateBewonerView",
	     components: {DatePick},
	     data() {
            return {
                value: 25,
	             step: 0,
	             profilePicture: null,
	             name: '',
	             description: '',
	             totalSteps: 4,
	             moveInDate: null,
	             movedOut: false,
	             movedOutDate: null,
				 message: '',
				 computedPicture: null
            }
		 },
		 watch: {
			 'profilePicture': async function (val, preVal) {
				 if (!!val) {
					this.computedPicture = val? await this.readFileAsDataURL(val) : null;
				 }
			 }
		 },
	     computed: {
				token() {
					 return localStorage.getItem('Authorization');
				},
		      userId() {
				    return localStorage.getItem('userId');
			  },
			  fileValidation() {
				  return (!this.profilePicture || this.profilePicture.size < 1000*1000);
			  }
	     },
        async mounted() {
			this.$refs['welcome-modal'].show();
        },
	     async created() {
            await this.$apollo.query({
                query: getUser,
                variables: {
                    userId: this.userId
                }
            }).then(response => {
                console.log(response.data.user.bewoner);
                if (!!response.data.user.bewoner){
                    this.$router.push('/profile');
                }
            }).catch(error => {
                console.error(error);
            });
	     },
	     methods: {
            ok() {
                this.$refs['welcome-modal'].hide()
            },
		      nextStep() {
                if (this.step === 2 && !this.movedOut) {
                    this.step += 2;
                } else if (this.step < this.totalSteps) {
                    this.step++;
                }
		      },
		      previousStep() {
                if (this.step === 4 && !this.movedOut) {
                    this.step -= 2;
                } else if (this.step > 0) {
                    this.step--;
                }
		      },
		      async saveBewoner() {
                if (!!this.name && !!this.moveInDate && ((this.movedOut && !!this.movedOutDate) || (!this.movedOut))) {
					let base64Picture = null;
					if (!!this.profilePicture) {
						if (this.profilePicture.size > 1000*1000) {
							console.error('File too big!');
							return;
						}
						base64Picture = this.computedPicture;
					}
                    await this.$apollo.mutate({
                        mutation: createBewoner,
                        variables: {
                            bewonerInput: {
                                name: this.name,
                                description: this.description,
                                moveInDate: this.moveInDate,
								moveOutDate: this.movedOutDate,
								profilePicture: base64Picture
                            }
                        }
                    }).then((response) => {
                        this.setBewoner({
	                         bewoner: response.data.createBewoner
                        });
                        this.$router.push('/profile');
                    }).catch((err) => {
                        console.error(err);
                    });
                } else {
                    console.log('not enough data given.');
                }
		      },
		      toLogin() {
                this.$router.push('/login');
			  },
			  async readFileAsDataURL(file) {
                let result_base64 = await new Promise((resolve) => {
                    let fileReader = new FileReader();
                    fileReader.onload = (e) => resolve(fileReader.result);
                    fileReader.readAsDataURL(file);
                });

                return result_base64;
			},
		      ...mapMutations(['setBewoner'])
	     }
    }
</script>

<style module>
	.vdpComponent.vdpWithInput > input {
		padding-right: 30px;
		display: block !important;
		padding: 0.375rem 0.75rem !important;
		font-size: 1rem !important;
		font-weight: 400 !important;
		color: #495057 !important;
		border: 1px solid #ced4da !important;
		border-radius: 0.25rem !important;
		background-clip: padding-box !important;
	}
</style>

<style lang="scss" scoped>

	.background {
		/*background-image: linear-gradient();*/
		background-image: url('../../public/images/kamer.jpeg'); // TODO: CHANGE IMAGE!
		background-position: center;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.container {
		margin: auto;
		padding: 0;
		width: 60%;
		height: 75%;
		background: white;
		-webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
		-moz-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3);
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		border-radius: 3px;
		text-align: left;
	}

	.inner-container {
		margin: 10% 20%;
		width: 60%;
		height: 70%;
		position: relative;
	}

	h1 {
		margin-top: 2rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	h3 {
		margin-bottom: 2rem;
		color: var(--my-blue);
		font-size: 1.25rem;
	}

	p {
		margin-bottom: 0.25rem;
	}

	.button {
		position: absolute;
		font-size: 2rem;

		& i {
			color: var(--my-yellow);
		}
	}

	.left {
		margin-left: 5%;
		float: left;
	}

	.right {
		float: right;
		margin-right: 5%;
		right: 0;
	}

	.step {
		background: none;
		color: var(--gray-900);
		border: none;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	/*
	.content {
		position: absolute;
		top: 60%;
		width: 100%;
		-webkit-transform: translateY(-40%);
		-moz-transform: translateY(-40%);
		-ms-transform: translateY(-40%);
		-o-transform: translateY(-40%);
		transform: translateY(-40%);
	}*/

	.content {
		padding: 1.5rem 0;

		& p {
			margin-bottom: 1rem;
		}
	}

	.image {
		margin: auto;
		width: 250px;
		height: 175px;
		background-color: var(--gray-50);
		margin-bottom: 2rem;
		font-size: 7rem;
		position: relative;
		background-position: center;
		background-size: cover;

		& i {
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

	.colour-button {
		padding: 12px 20px;
		background-image: linear-gradient(to right, var(--my-blue) 0%, var(--my-yellow) 51%, var(--my-blue) 100%);
		-webkit-background-size: 200% auto;
		transition: 0.5s;
		background-size: 200% auto;
		border-radius: 3px;
		border: none;
		color: white;
	}

	.colour-button:hover {
		background-position: right center;
	}

	.ok {
		width: 15%;
		float: right;
	}

	.save {
		display: inline-block;
		margin-top: 1.5rem;
	}

	.highlighted {
		color: var(--my-yellow);
	}

	.less-padding-bottom {
		margin-bottom: 0.1rem !important;
	}

	.clickable {
		font-weight: bolder;

		&:hover {
			cursor: pointer;
			text-decoration: underline;
		}
	}

	/*This is for the date-picker, for changing the colors ------------------------------------------------------------*/
	.vdpArrowPrev:after {
		border-right-color: #DEB841;
	}

	.vdpArrowNext:after {
		border-left-color: #DEB841;
	}

	.vdpCell.selectable:hover .vdpCellContent,
	.vdpCell.selected .vdpCellContent {
		background: #DEB841;
	}

	.vdpCell.today {
		color: #DEB841;
	}

	.vdpTimeUnit > input:hover,
	.vdpTimeUnit > input:focus {
		border-bottom-color: #DEB841;
	}
</style>
