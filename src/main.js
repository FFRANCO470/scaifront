import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes/routes.js'
import vuetify from './plugins/vuetify'
import {store} from './store/store.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import JsonExcel from "vue-json-excel";
import XLSX from "xlsx";

export const eventBus = new Vue();
 
Vue.component("downloadExcel", JsonExcel);

Vue.use(VueRouter);
Vue.config.productionTip = false


axios.defaults.baseURL="https://scai-alma-rop.herokuapp.com/api"
// axios.defaults.baseURL="http://localhost:8080/api"
// axios.defaults.baseURL="/api"

const router = new VueRouter({
  // en este bloque escribimos las rutas
  routes,                     
  mode:"history"
})

new Vue({
  render: h => h(App),
  axios,
  vuetify,
  router,
  store,
  Swal,
  XLSX
  //excel
}).$mount('#app')