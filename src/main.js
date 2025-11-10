// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 确保路径正确
//element-plus样式引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建Vue应用实例
const app = createApp(App)



// 使用路由
app.use(router)
app.use(ElementPlus);

// 挂载到DOM
app.mount('#app')