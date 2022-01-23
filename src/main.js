import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.withCredentials = true
// this url is allowed on server 
axios.defaults.baseURL = 'http://localhost:3000/api/';

createApp(App).use(router).use(store).mount('#app')