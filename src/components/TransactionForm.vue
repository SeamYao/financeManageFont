<template>
  <div class="transaction-form">
    <h2>添加交易</h2>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="type">类型</label>
        <select id="type" v-model="formData.type" required class="form-control">
          <option value="expense">支出</option>
          <option value="income">收入</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="category">类别</label>
        <select id="category" v-model="formData.category" required class="form-control">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="amount">金额 (¥)</label>
        <input 
          type="number" 
          id="amount" 
          v-model="formData.amount" 
          min="0.01" 
          step="0.01" 
          placeholder="输入金额" 
          required 
          class="form-control"
        >
      </div>
      
      <div class="form-group">
        <label for="description">描述</label>
        <input 
          type="text" 
          id="description" 
          v-model="formData.description" 
          placeholder="交易描述" 
          required 
          class="form-control"
        >
      </div>
      
      <div class="form-group">
        <label for="date">日期</label>
        <input 
          type="date" 
          id="date" 
          v-model="formData.date" 
          required 
          class="form-control"
        >
      </div>
      
      <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? '添加中...' : '添加交易' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'TransactionForm',
  data() {
    return {
      formData: {
        type: 'expense',
        category: '餐饮',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      },
      categories: [
        '餐饮', '购物', '交通', '娱乐', '医疗', '教育', '住房', '工资', '奖金', '投资', '其他'
      ],
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) return
      
      this.loading = true
      try {
        await this.$emit('add-transaction', { ...this.formData })
        
        // 重置表单，保留类型和日期
        this.formData = {
          type: 'expense',
          category: '餐饮',
          amount: '',
          description: '',
          date: new Date().toISOString().split('T')[0]
        }
      } catch (error) {
        console.error('添加交易失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.transaction-form {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}

.transaction-form h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #2980b9;
}

.submit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .transaction-form {
    padding: 1rem;
  }
  
  .form-control {
    padding: 0.625rem;
  }
  
  .submit-btn {
    padding: 0.625rem;
  }
}

@media (max-width: 480px) {
  .transaction-form h2 {
    font-size: 1.1rem;
  }
  
  .form-control {
    font-size: 0.9rem;
  }
}
</style>