<template>
    <div class="login-view">
        <div class="login-card">
            <!--<h4>{{login ? 'Login' : 'Sign Up'}}</h4>-->
            <h4>Het Snuifhuis</h4>
            <b-alert variant="danger" :show="!!message"><i class="fas fa-exclamation"></i>{{ message }}</b-alert>
            <input
               v-model="email"
               type="text"
               placeholder="Email adres" />
            <input
               v-model="password"
               type="password"
               placeholder="Wachtwoord" />
            <button
               @click="confirm()">
                {{login ? 'log in' : 'maak account aan'}}
            </button>
            <p
               @click="login = !login">
                {{login ? 'Wil je een account aanmaken?' : 'Heb je al een account?'}}
                 <i class="fas fa-long-arrow-alt-right"></i>
            </p>
        </div>
    </div>
</template>

<script>
    import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings';
    import login from '../graphql/Login.graphql';
    import createUser from '../graphql/CreateUser.graphql';
    import { mapMutations } from 'vuex';
    import store from "../store";
    import {onLogin} from "../vue-apollo";

    export default {
        name: 'AppLogin',
        data () {
            return {
                email: '',
                login: true,
                name: '',
                password: '',
                message: null,
            }
        },
        methods: {
            async confirm () {
                if (this.login && !!this.email.trim() && !!this.password.trim()) {
                    // send login request
                    await this.$apollo.query({
                        query: login,
                        variables: {
                            email: this.email.trim(),
                            password: this.password.trim()
                        }
                    }).then(async (response) => {
                        let token = response.data.login.token;
                        let userId = response.data.login.user._id;
                        let bewoner = response.data.login.user.bewoner;

                        await onLogin(this.$apollo.getClient(), token);
                        localStorage.setItem('userId', userId);

                        // this.setToken({
                        //     token: token
                        // });

                        if (!bewoner) {
                            this.$router.push({name: 'new bewoner'});
                        } else {
                            this.setBewoner({
                                bewoner: bewoner
                            });
                            localStorage.setItem('bewonerId', bewoner._id);
                            this.$router.push({name: 'home'});
                        }
                    }).catch((err) => {
                        if (err.message.search(/Invalid credentials/)) {
                            this.message = "Inloggegevens ongeldig";
                        } else {
                            this.message = "Iets gaat fout, neem contact op met de site admin"
                        }
                    });
                } else if (!this.login && !!this.email.trim() && !!this.password.trim()) {
                    // send createUser request
                    await this.$apollo.mutate({
                        mutation: createUser,
                        variables: {
                            userInput: {
                                email: this.email.trim(),
                                password: this.password.trim()
                            }
                        }
                    }).then(async (response) => {
                        this.$apolloProvider
                        let token = response.data.createUser.token;
                        let userId = response.data.createUser.user._id;
                        let bewoner = response.data.createUser.user.bewoner;
                        localStorage.setItem('userId', userId);

                        // this.setToken({
                        //     token: token
                        // });

                        await onLogin(this.$apollo.getClient(), token);

                        if (!bewoner) {
                            this.$router.push({name: 'new bewoner'});
                        } else {
                            this.setBewoner({
                                bewoner: bewoner
                            });

                            localStorage.setItem('bewonerId', bewoner._id);
                            this.$router.push({name: 'home'});
                        }
                    }).catch((err) => {
                        if (err.message.search(/User/)) {
                            this.message = "Email al in gebruik";
                        } else {
                            this.message = "Iets gaat fout, neem contact op met de site admin"
                        }
                    });
                } else {
                    this.message = "Vul alle velden in."
                }
            },

            ...mapMutations(['setToken', 'setBewoner'])
        }
    }
</script>

<style lang="scss" scoped>
    @media only screen and (max-width: 600px) {
        .login-card {
            width: 100%;
        }

        .login-view {
            background: var(--gray-900);
        }
    }

    @media only screen and (min-width: 601px) {
        .login-view {
            background-image: url('../../public/images/gang2.jpg');
        }

        .login-card {
            width: 50%;
            -webkit-box-shadow: 0px 4px 25px black;
            -moz-box-shadow: 0px 4px 25px black;
            box-shadow: 0px 4px 25px black;
        }
    }

    @media only screen and (min-width: 1200px) {
        .login-view {
            background-image: url('../../public/images/gang2.jpg');
        }

        .login-card {
            width: 30%;
            -webkit-box-shadow: 0px 4px 25px black;
            -moz-box-shadow: 0px 4px 25px black;
            box-shadow: 0px 4px 25px black;
        }
    }

    .login-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
    }

    .login-card {
        min-height: 50%;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: var(--gray-900);
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 3px;
        padding: 1.5rem;
    }

    h4 {
        color: white;
        font-size: 2rem;
        margin-bottom: 2rem;
        margin-top: 2rem;
    }

    input {
        width: 80%;
        padding: 12px 20px;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 3px #ddd;
        border-radius: 3px;
        margin-bottom: 1rem;
    }

    input:focus {
        border-color: var(--my-yellow) !important;
        box-shadow: 0 0 10px var(--my-yellow) !important;
        outline-color: var(--my-yellow);
    }

    p {
        color: var(--gray-200);
        margin-bottom: 1.5rem;

        &:hover {
            cursor: pointer;
        }
    }

    button {
        width: 80%;
        padding: 12px 20px;
        background-image: linear-gradient(to right, var(--my-blue) 0%, var(--my-yellow) 51%, var(--my-blue) 100%);
        -webkit-background-size: 200% auto;
        transition: 0.5s;
        background-size: 200% auto;
        border-radius: 3px;
        border: none;
        margin-bottom: 1rem;
        color: white;
    }

    button:hover {
        background-position: right center;
    }

    .alert {
        text-align: left;
        width: 80%;
        margin: auto;
        margin-bottom: 1rem;
        padding: 10px 20px;

        & i {
            font-size: 1.2rem;
            margin-right: 1rem;
        }
    }
</style>
