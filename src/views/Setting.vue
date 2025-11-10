<template>
  <div class="settings-container">
    <div class="settings-header">
      <div class="header-content">
        <h1>系统设置</h1>
        <p>管理您的银行账户和系统模块配置</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="refreshData">
          <i class="fas fa-sync-alt"></i>
          刷新数据
        </button>
        <button class="btn btn-light">
          <i class="fas fa-question-circle"></i>
          使用帮助
        </button>
      </div>
    </div>
    
    <div class="settings-content">
      <!-- 银行账号设置 -->
      <div class="settings-section">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-university"></i>
          </div>
          <div>
            <div class="section-title">银行账号设定</div>
            <div class="section-description">添加和管理您的银行账户信息</div>
          </div>
        </div>
        
        <div class="account-list">
          <div 
            class="account-item" 
            v-for="account in accounts" 
            :key="account.id"
          >
            <div class="account-info">
              <div class="bank-logo" :style="{background: account.color}">
                <i class="fas fa-landmark"></i>
              </div>
              <div class="account-details">
                <h3>{{ account.bankName }}</h3>
                <p>{{ account.accountNumber }} | {{ account.accountType }} | {{ account.currency }}</p>
              </div>
            </div>
            <div class="account-actions">
              <button class="action-btn" @click="editAccount(account.id)" title="编辑">
                <i class="fas fa-edit">編輯</i>
              </button>
              <button class="action-btn" @click="deleteAccount(account.id)" title="删除">
                <i class="fas fa-trash-alt">刪除</i>
              </button>
            </div>
          </div>
          
          <div v-if="accounts.length === 0" class="empty-state">
            <i class="fas fa-piggy-bank"></i>
            <h3>暂无银行账户</h3>
            <p>添加您的第一个银行账户以开始使用</p>
          </div>
        </div>
        
        <button class="btn-add-account" @click="accountDialog = true">
          <i class="fas fa-plus-circle"></i>
          添加银行账户
        </button>
        <el-dialog
          v-model="accountDialog"
          title="Tips"
          width="500"
          :before-close="handleClose"
        >
          <span>銀行賬戶</span>
          <el-input v-model="input" style="width: 240px" placeholder="Please input" />
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="accountDialog = false">Cancel</el-button>
              <el-button type="primary" @click="accountDialog = false">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      
      <!-- 模块设置 -->
      <div class="settings-section">
        <div class="section-header">
          <div class="section-icon">
            <i class="fas fa-cogs"></i>
          </div>
          <div>
            <div class="section-title">模組設定</div>
            <div class="section-description">启用或禁用系统功能模块</div>
          </div>
        </div>
        <div class="module-grid">
          <div 
            class="module-card" 
            v-for="module in modules" 
            :key="module.id"
            :class="{active: module.active}"
          >
            <div class="module-icon" :style="{background: module.color}">
              <i :class="module.icon"></i>
            </div>
            <div class="module-name">{{ module.name }}</div>
            <div class="module-description">{{ module.description }}</div>
            <div class="module-status" :class="module.active ? 'status-active' : 'status-inactive'">
              <i :class="module.active ? 'fas fa-check-circle' : 'fas fa-check-circle'"></i>
              {{ module.active ? '已启用' : '已禁用' }}
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="module.active" @change="toggleModule(module.id)">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div>
       <div>每月錢包</div>
       <div>新增錢包</div>
       <el-button @click="expensesTypeDialog = true">添加</el-button>
       <el-dialog
          v-model="expensesTypeDialog"
          title="Tips"
          width="500"
          :before-close="handleClose"
        >
          <span>錢包</span>
          <el-input v-model="input" style="width: 240px" placeholder="Please input" />
          <span>金錢</span>
          <el-input v-model="money" style="width: 240px" placeholder="Please input" />
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="expensesTypeDialog = false">Cancel</el-button>
              <el-button type="primary" @click="expensesTypeDialog = false">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
    </div>
    <div class="settings-footer">
      <p>系统设置 &copy; 2023 版权所有 | 最后更新: {{ lastUpdated }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SettingsPanel',
  data() {
    return {
      accounts: [
        {
          id: 1,
          bankName: '中国工商银行',
          accountNumber: '**** **** **** 5678',
          accountType: '储蓄账户',
          currency: '人民幣',
          color: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
        },
        {
          id: 2,
          bankName: '招商银行',
          accountNumber: '**** **** **** 1234',
          accountType: '信用卡',
          currency: '人民幣',
          color: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
        },
        {
          id: 3,
          bankName: '中国建设银行',
          accountNumber: '**** **** **** 9012',
          accountType: '储蓄账户',
          currency: '人民幣',
          color: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)'
        }
      ],
      accountDialog: false,
      modules: [
        {
          id: 1,
          name: '支付模块',
          icon: 'fas fa-credit-card',
          description: '处理在线支付交易',
          money: 1234.32,
          active: true,
          color: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
        },
        {
          id: 2,
          name: '通知模块',
          icon: 'fas fa-credit-card',
          description: '系统消息和提醒',
          active: true,
          color: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
        },
        {
          id: 3,
          name: '安全模块',
          icon: 'fas fa-shield-alt',
          description: '账户安全保护',
          active: false,
          color: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
        },
        {
          id: 4,
          name: '报表模块',
          icon: 'fas fa-chart-bar',
          description: '数据统计和分析',
          active: true,
          color: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)'
        },
        {
          id: 5,
          name: '备份模块',
          icon: 'fas fa-database',
          description: '数据备份和恢复',
          active: false,
          color: 'linear-gradient(135deg, #f39c12 0%, #d35400 100%)'
        },
        {
          id: 6,
          name: 'API模块',
          icon: 'fas fa-code',
          description: '第三方接口集成',
          active: true,
          color: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)'
        }
      ],
      lastUpdated: '2023-10-15',
      expensesTypeDialog: false,
    }
  },
  methods: {
    

    addAccount() {
      const newId = this.accounts.length > 0 ? Math.max(...this.accounts.map(a => a.id)) + 1 : 1;
      this.accounts.push({
        id: newId,
        bankName: '新银行账户',
        accountNumber: '**** **** **** 0000',
        accountType: '储蓄账户',
        color: 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)'
      });
    },


    editAccount(id) {
      alert(`编辑账户 ID: ${id}`);
    },
    deleteAccount(id) {
      if(confirm('确定要删除这个账户吗？此操作不可撤销。')) {
        this.accounts = this.accounts.filter(account => account.id !== id);
      }
    },
    toggleModule(id) {
      const module = this.modules.find(m => m.id === id);
      if (module) {
        console.log(`模块 ${module.name} 已${module.active ? '启用' : '禁用'}`);
      }
    },
    refreshData() {
      alert('数据已刷新');
    }
  }
}
</script>

<style scoped>
:root {
  --primary: #4361ee;
  --primary-light: #4895ef;
  --secondary: #3f37c9;
  --success: #4cc9f0;
  --danger: #f72585;
  --warning: #f8961e;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
  --border-radius: 12px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.settings-container {
  width: 100%;
  max-width: 1200px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  margin: 0 auto;
}

.settings-header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.header-content h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.header-content p {
  opacity: 0.9;
  font-size: 16px;
}

.header-actions {
  display: flex;
  gap: 12px;
  margin-top: 15px;
}

.btn {
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition);
}

.btn-primary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.btn-light {
  background: white;
  color: var(--primary);
}

.btn-light:hover {
  background: var(--light);
  transform: translateY(-2px);
}

.settings-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  padding: 30px;
}

@media (max-width: 992px) {
  .settings-content {
    grid-template-columns: 1fr;
  }
}

.settings-section {
  background: var(--light);
  border-radius: var(--border-radius);
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: var(--transition);
}

.settings-section:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.section-icon {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: var(--primary);
  font-size: 22px;
  box-shadow: 0 4px 10px rgba(67, 97, 238, 0.15);
}

.section-title {
  font-size: 20px;
  color: var(--dark);
  font-weight: 600;
}

.section-description {
  font-size: 14px;
  color: var(--gray);
  margin-top: 5px;
}

.account-list {
  margin-bottom: 25px;
}

.account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  background: white;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: var(--transition);
  border-left: 4px solid var(--primary);
}

.account-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
}

.account-info {
  display: flex;
  align-items: center;
}

.bank-logo {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 18px;
}

.account-details h3 {
  font-size: 16px;
  color: var(--dark);
  margin-bottom: 5px;
  font-weight: 600;
}

.account-details p {
  font-size: 14px;
  color: var(--gray);
}

.account-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--gray);
  cursor: pointer;
  transition: var(--transition);
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--primary);
}

.btn-add-account {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px;
  background: white;
  color: var(--primary);
  border: 2px dashed #d0d7de;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.btn-add-account:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.btn-add-account i {
  margin-right: 8px;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.module-card {
  background: white;
  border-radius: 12px;
  padding: 20px 15px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.module-card.active {
  border-color: var(--primary);
}

.module-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.module-name {
  font-size: 15px;
  color: var(--dark);
  font-weight: 500;
  margin-bottom: 5px;
}

.module-description {
  font-size: 12px;
  color: var(--gray);
  margin-bottom: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.module-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 15px;
}

.status-active {
  color: var(--danger);
}

.status-inactive {
  color: var(--danger);
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: var(--transition);
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: var(--transition);
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--success);
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.settings-footer {
  text-align: center;
  padding: 20px;
  color: var(--gray);
  font-size: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--gray);
}

.empty-state i {
  font-size: 50px;
  margin-bottom: 15px;
  opacity: 0.5;
}

.empty-state p {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .settings-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .settings-content {
    padding: 20px 15px;
    gap: 20px;
  }
  
  .settings-section {
    padding: 20px;
  }
  
  .module-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 15px;
  }
}
</style>