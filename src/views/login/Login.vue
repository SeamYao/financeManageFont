<template>
    <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
        <div class="form-group">
            <label for="username">用户名</label>
            <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">登录</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            // 处理登录逻辑
            console.log('登录信息:', this.username, this.password);
        }
    }
}
</script>
<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.form-group {
    margin-bottom: 15px;
}
.form-group label {
    display: block;
    margin-bottom: 5px;
}
.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #6a11cb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #2575fc;
}
.main-content {
  flex: 1;
  padding: 20px;
}

.app-footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 10px 0;
  position: relative;
}

@media (max-width: 768px) {
    .login-container {
        width: 90%;
        padding: 15px;
    }
    .form-group input {
        font-size: 14px;
    }
}

</style>