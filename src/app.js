import Vue from "vue"
import vuetify from "./plugins/vuetify"
import router from "./plugins/router"

new Vue({
    el: "#app",
    vuetify,
    router,
    data(){
        return {
            authenticated: false,
            test: true
        }
    }
});