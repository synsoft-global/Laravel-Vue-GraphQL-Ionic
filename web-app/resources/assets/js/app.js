//Imports
import Vue from "vue";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import routes from "@/routes.js";
import { apolloProvider } from "@/config/apollo.js";
import "./plugins/bootstrap-vue";

//Load Plugins
Vue.use(VueRouter);
Vue.use(VeeValidate, { inject: false });
Vue.use(VueApollo);

Vue.component("app", App);

//Router configuration
const router = new VueRouter({
    mode: "history",
    routes
});

export const vm = new Vue({
    el: "#app",
    render: h => h(App),
    apolloProvider,
    router
});
