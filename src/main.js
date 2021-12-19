import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


import '@/assets/tailwind.css'
import '@/assets/css/fonts.css';

createApp(App).use(router).use(store).mount('#app')
