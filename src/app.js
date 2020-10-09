import Vue from "vue"
import Axios from "axios"
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
    },
    async mounted(){
        try {

            const result = await Axios.get("/api/is-authenticated");

            if(result.data.status === "success" && result.data.authenticated){
                this.authenticated = true;
                this.$router.push({"path": "/Account"})
            }

        } catch(err){
            console.error(err)
        }
    }

});