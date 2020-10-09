import Vue from "vue"
import VueRouter from "vue-router"

import Login from "../views/login.vue";
import Account from "../views/account.vue";

Vue.use(VueRouter);

const routes = [
    { name: "Login", path: "/Login", component: Login, meta: { auth: false } },
    { name: "Account", path: "/Account", component: Account, meta: { auth: true } },
    { path: "*", component: Login }
];

export default new VueRouter({ routes });