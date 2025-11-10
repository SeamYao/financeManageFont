<template>
  <div class="transaction-list">
    <div class="list-header">
      <h2>交易记录</h2>
      
      <div class="filters">
        <select v-model="filterTags" class="filter-select">
          <option value="all">所有类型</option>
          <option value="living">日常開支</option>
          <option value="lifestyle">娛樂開支</option>
          <option value="goals">投資開支</option>
        </select>

        <select v-model="filterType" class="filter-select">
          <option value="all">所有类型</option>
          <option value="income">收入</option>
          <option value="expense">支出</option>
        </select>
        
        <select v-model="filterCategory" class="filter-select">
          <option value="all">所有类别</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

      </div>
    </div>
    
    <div class="transactions-container">
      <div v-if="filteredTransactions.length === 0" class="empty-state">
        <p>暂无交易记录</p>
        <p class="empty-hint">添加您的第一笔交易开始记账</p>
      </div>
      
      <div v-else class="transactions">
        <div 
          v-for="transaction in filteredTransactions" 
          :key="transaction.id" 
          class="transaction-item"
        >
          <div class="transaction-icon" :class="transaction.type">
            <span v-if="transaction.type === 'income'">+</span>
            <span v-else>-</span>
          </div>
          
          <div class="transaction-details">
            <div class="transaction-description">{{ transaction.description }}</div>
            <div class="transaction-meta">
              {{ transaction.category }} • {{ formatDate(transaction.date) }}
            </div>
          </div>
          
          <div class="transaction-amount" :class="transaction.type">
            {{ transaction.type === 'income' ? '+' : '-' }}¥{{ formatCurrency(transaction.amount) }}
          </div>
          
          <button 
            @click="$emit('delete-transaction', transaction.id)" 
            class="delete-btn"
            aria-label="删除交易"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionList',
  props: {
    transactions: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filterTags: 'all',
      filterType: 'all',
      filterCategory: 'all'
    }
  },
  computed: {
    filteredTransactions() {
      let filtered = this.transactions

      if (this.filterTags !== 'all') {
        filtered = filtered.filter(t => t.tags === this.filterTags)
      }
      
      if (this.filterType !== 'all') {
        filtered = filtered.filter(t => t.type === this.filterType)
      }
      
      if (this.filterCategory !== 'all') {
        filtered = filtered.filter(t => t.category === this.filterCategory)
      }
      
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  methods: {
    formatCurrency(amount) {
      return parseFloat(amount).toFixed(2)
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    }
  }
}
</script>

<style scoped>
.transaction-list {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.list-header h2 {
  color: #2c3e50;
  font-size: 1.25rem;
}

.filters {
  display: flex;
  gap: 0.75rem;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
}

.transactions-container {
  max-height: 500px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
}

.empty-hint {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.transactions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: background-color 0.2s;
  gap: 1rem;
}

.transaction-item:hover {
  background-color: #f8f9fa;
}

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.transaction-icon.income {
  background-color: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
}

.transaction-icon.expense {
  background-color: rgba(231, 76, 60, 0.1);
  color: #e74c3c;
}

.transaction-details {
  flex: 1;
}

.transaction-description {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.transaction-meta {
  font-size: 0.8rem;
  color: #7f8c8d;
}

.transaction-amount {
  font-weight: 600;
  font-size: 1.1rem;
}

.transaction-amount.income {
  color: #2ecc71;
}

.transaction-amount.expense {
  color: #e74c3c;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #e74c3c;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .transaction-list {
    padding: 1rem;
  }
  
  .list-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    justify-content: space-between;
  }
  
  .filter-select {
    flex: 1;
  }
  
  .transaction-item {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .transaction-icon {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  
  .transaction-amount {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .transaction-item {
    padding: 0.625rem;
    gap: 0.625rem;
  }
  
  .transaction-description {
    font-size: 0.9rem;
  }
  
  .transaction-meta {
    font-size: 0.75rem;
  }
  
  .transaction-amount {
    font-size: 0.9rem;
  }
  
  .delete-btn {
    width: 26px;
    height: 26px;
    font-size: 1.25rem;
  }
}
</style>