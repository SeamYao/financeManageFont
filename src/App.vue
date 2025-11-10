<!-- src/App.vue -->
<template>
  <div id="app">
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">个人记账系统</h1>
          <nav class="nav-menu">
            <router-link v-for="(item,index) in routerLink" :key="index" :to="item.to" class="nav-link">{{item.routerName}}</router-link>
            <!-- 如果有Analytics组件就取消注释 -->
            <!-- <router-link to="/analytics" class="nav-link">分析</router-link> -->
          </nav>
        </div>
      </header>
      
      <main class="main-content">
        <router-view />
      </main>
      
      <footer class="app-footer">
        <p>&copy; 2023 个人记账系统 - 管理您的财务</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      routerLink:[
        {  to: "/", routerName: "首頁" }, //home
        {  to: "/transction", routerName: "賬單" },
        {  to: "/setting", routerName: "設定" },
        {  to: "/login", routerName: "登录" },
        {  to: "/stock", routerName: "股票" },
        {  to: "/testpage", routerName: "测试页面" },

      ]
    }
  }
}
</script>

<style>
/* 样式保持不变 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link.router-link-active {
  border-bottom: 2px solid white;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  width: 100%;
}

.app-footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .app-title {
    font-size: 1.3rem;
  }
  
  .nav-menu {
    gap: 1rem;
  }
  
  .main-content {
    padding: 1rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.2rem;
  }
  
  .nav-menu {
    gap: 0.8rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}
</style>