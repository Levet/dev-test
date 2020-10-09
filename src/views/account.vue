<template>
    <div>
        <v-app-bar color="blue darken-4" absolute dark>
            <v-toolbar-title>Smart Pump</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-app-bar>
        <v-img :src="profilePicture" class="ma-auto" max-width="150px"></v-img>
        <v-row>
            <v-col cols="6">

                <v-btn block depressed color="secondary" @click="showBalance = true">
                    <v-icon left small>
                        mdi-currency-usd
                    </v-icon>
                    BALANCE
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn block depressed color="blue-grey" dark @click="showEditAccount = true">
                    <v-icon left small>
                        mdi-pencil
                    </v-icon>
                    EDIT
                </v-btn>
            </v-col>
        </v-row>


        <v-dialog v-model="showBalance" max-width="300px">
            <v-card>
                <v-card-title>Balance</v-card-title>
                <v-card-text>
                    <h2 class="text-center">{{user.balance}}</h2>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="red"
                            text
                            @click="showBalance = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showEditAccount" max-width="300px">
            <v-card>
                <v-card-title>Edit</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="Age" v-model="user.age"></v-text-field>
                        <v-text-field label="First Name" v-model="user.name.first"></v-text-field>
                        <v-text-field label="Last Name" v-model="user.name.last"></v-text-field>
                        <v-text-field label="Company" v-model="user.company"></v-text-field>
                        <v-text-field label="Email" v-model="user.email"></v-text-field>
                        <v-text-field label="Phone" v-model="user.phone"></v-text-field>
                        <v-text-field label="Address" v-model="user.address"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="green"
                            text
                            @click="updateUser"
                    >
                        Update User
                    </v-btn>
                    <v-btn
                            color="red"
                            text
                            @click="showEditAccount = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
                v-model="showStatusSnackbar"
        >
            {{ snackbarMessage }}

            <template v-slot:action="{ attrs }">
                <v-btn
                        color="green"
                        text
                        v-bind="attrs"
                        @click="showStatusSnackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>

    import Axios from "axios";

    export default {
        data(){
            return {
                user: {
                    name: {}
                },
                showBalance: false,
                showEditAccount: false,
                showStatusSnackbar: false,
                snackbarMessage: ""

            }
        },
        methods: {
            async fetchUser(){
                try {

                    const result = await Axios.get("/api/user");

                    if(result.status === 200 && result.data.status === "success"){
                        this.user = result.data.user;
                    }

                } catch(err){
                    this.snackbarMessage = "Error! We were unable to load your account, please try refreshing..."
                    this.showStatusSnackbar = true;
                }
            },
            async updateUser(){
                try {

                    const user = {
                        age: this.user.age,
                        name: this.user.name,
                        company: this.user.company,
                        email: this.user.email,
                        phone: this.user.phone.replace(/[^0-9]/g, ""),
                        address: this.user.address
                    };

                    const result = await Axios.put("/api/user", user);

                    if(result.status === 202 && result.data.status === "success"){
                        this.snackbarMessage = "Success! Your account has been updated!";
                        this.showStatusSnackbar = true;
                    }

                } catch(err){
                    this.snackbarMessage = "Error! We were unable to update your account.";
                    this.showStatusSnackbar = true;
                }
            }
        },
        computed: {
            profilePicture(){
                return this.user.picture || "http://placehold.it/150x150"
            }
        },
        mounted(){
            this.fetchUser();
        }
    }
</script>