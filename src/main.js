import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router/index'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
 
const auth = useAuthStore()
auth.fetchUser().finally(() => app.mount('#app'))
