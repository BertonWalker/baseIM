import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as icons from '@element-plus/icons-vue';
import { store, key} from './store'

const app = createApp(App).use(store, key);
Object.keys(icons).forEach((key: string) => {
    // @ts-ignore
    app.component(key, icons[key]);
})

app.use(router).use(ElementPlus).mount('#app')
