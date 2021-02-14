require('./bootstrap');
import 'es6-promise/auto'


import axios from 'axios'
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import VueRouter from 'vue-router'

import * as filters from '@/js/filters'; // global filters
import store from '@/js/store/store'
import auth from './auth'
import router from './routes/web/'
import api from './routes/api/'
import Index from './pages/index'

Vue.config.productionTip = false;

// Set Vue globally
window.Vue = Vue

// Set Vue router
Vue.router = router
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter)

// Set vue cookies
Vue.use(VueCookies)
$cookies.config('7d') // cookies exp

// Set Vue authentication
Vue.use(VueAxios, axios)
var baseurl = window.location.protocol + "//" + window.location.host;
axios.defaults.baseURL = baseurl+`/api`
Vue.use(VueAuth, auth)

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// Prototype
Vue.prototype.$api = api // ** can call globally "this.$api"

// Load Index
Vue.component('index', Index)

const app = new Vue({
    router,
    store
}).$mount('#app')