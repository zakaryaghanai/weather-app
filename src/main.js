/* eslint-disable */
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios';

import '@/assets/tailwind.css'
import '@/assets/css/fonts.css';

var geoapify = axios.create({
    baseURL: 'https://api.geoapify.com/v1/geocode/autocomplete',
    params: {
        apiKey : process.env.VUE_APP_GEOAPIFY_API_KEY
    }

});

var openWeatherMap = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
        appId : process.env.VUE_APP_OPEN_WEATHER_MAP_API_KEY,
        units: 'metric'
    }
});

let Vue = createApp(App);

Vue.config.globalProperties.$geoapify = geoapify;
Vue.config.globalProperties.$openWeatherMap = openWeatherMap;

Vue.use(router).use(store).mount('#app')
