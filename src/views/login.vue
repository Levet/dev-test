<template>
    <div id="login">

        <v-img src="/images/logo.png" class="ma-auto" max-width="120px"></v-img>

        <v-slide-y-transition>
            <v-alert
                    id="login-error"
                    v-show="error.show"
                    prominent
                    text
                    type="error"
            >
                {{error.message}}
            </v-alert>
        </v-slide-y-transition>

        <v-form class="loginForm" @submit.prevent="authenticate" ref="authentication" lazy-validation v-model="valid">

            <v-text-field id="username" v-model="username" label="Username" required :rules="usernameRules" :error="isUsernameError" :error-messages="usernameError" @keyup="clearUsernameError"></v-text-field>
            <v-text-field type="password" id="password" v-model="password" label="Password" required :rules="passwordRules" :error="isPasswordError" :error-messages="passwordError" @keyup="clearPasswordError"></v-text-field>
            <v-btn id="authenticate" type="submit" block large color="primary" :disabled="!valid">Login</v-btn>
        </v-form>
    </div>
</template>
<script>

    import Axios from "axios";

    export default {
        data(){
            return {
                valid: true,
                error: {
                    show: false,
                    message: ""
                },
                username: "",
                usernameRules: [
                    input => !!input || "Username is required"
                ],
                isUsernameError: false,
                usernameError: "",
                password: "",
                passwordRules: [
                    input => !!input || "Password is required"
                ],
                isPasswordError: false,
                passwordError: ""
            }
        },
        methods: {
            async authenticate(){



                try {

                    if(!this.$refs.authentication.validate()){
                        return;
                    }

                    const body = {
                        email: this.username,
                        password: this.password
                    };

                    this.error.show = false;
                    const result = await Axios.post("/api/login", body);

                    if(result.status === 202 && result.data.status === "success"){
                        this.$root.authenticated = true;
                        this.$router.push({path: "/Account"})
                    } else {
                        this.issueError("Your credentials didn't match any of our records. Please try again!");
                    }

                } catch (err) {
                    this.issueError("Your credentials didn't match any of our records. Please try again!");
                }
            },
            issueError(message){
                this.error.message = message;
                this.error.show = true;
            },
            clearUsernameError(){
                this.isUsernameError = false;
                this.usernameError = ""
            },
            clearPasswordError(){
                this.isPasswordError = false;
                this.passwordError = ""
            }
        }
    }
</script>