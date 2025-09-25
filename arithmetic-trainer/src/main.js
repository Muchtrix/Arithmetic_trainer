import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

if ( "serviceWorker" in navigator ) {
     navigator.serviceWorker.register( "/serviceworker.js" );
}