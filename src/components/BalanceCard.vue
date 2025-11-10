<template>
  <div class="balance-card">
    <div class="balance-header">
      <h2>当前余额
        
      </h2>
      <div class="current-date">{{ currentDate }}<div>
        <select v-model="filterTags" class="filter-select">
          <option value="all">所有月份</option>
          <option value="living">一月</option>
          <option value="lifestyle">一月</option>
          <option value="goals">二月</option>
        </select>
      </div></div>
      
    </div>    
    <div class="income-expense-summary">
      <div class="summary-item income">
        <div class="summary-label">总收入</div>
        <div class="summary-amount">¥{{ formatCurrency(totalIncome) }}</div>
      </div>
      
      <div class="summary-item expense">
        <div class="summary-label">总支出</div>
        <div class="summary-amount">¥{{ formatCurrency(totalExpense) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BalanceCard',
  props: {
    totalIncome: {
      type: Number,
      default: 0
    },
    totalExpense: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      totaldata:[
        { totalIncome : 10,totalExpense :20}
      ],
      filterTags: "all"

    }
  },
  computed: {
    totalBalance() {
      return this.totalIncome - this.totalExpense
    },
    balanceClass() {
      return {
        'positive': this.totalBalance >= 0,
        'negative': this.totalBalance < 0
      }
    },
    currentDate() {
      const now = new Date()
      return now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      })
    }
  },
  methods: {
    formatCurrency(amount) {
      return parseFloat(amount).toFixed(2)
    }
  }
}
</script>

<style scoped>
.balance-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}

.balance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.balance-header h2 {
  color: #2c3e50;
  font-size: 1.25rem;
}

.current-date {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.balance-amount {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 8px;
}

.balance-amount.positive {
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.1);
}

.balance-amount.negative {
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
}

.income-expense-summary {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  gap: 1rem;
}

.summary-item {
  flex: 1;
  text-align: center;
  padding: 1rem 0.5rem;
  border-radius: 8px;
}

.summary-item.income {
  background-color: rgba(46, 204, 113, 0.1);
}

.summary-item.expense {
  background-color: rgba(231, 76, 60, 0.1);
}

.summary-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.summary-amount {
  font-size: 1.25rem;
  font-weight: 600;
}

.summary-item.income .summary-amount {
  color: #2ecc71;
}

.summary-item.expense .summary-amount {
  color: #e74c3c;
}
.filter-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .balance-card {
    padding: 1rem;
  }
  
  .balance-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .balance-amount {
    font-size: 2rem;
  }
  
  .income-expense-summary {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .summary-item {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .balance-amount {
    font-size: 1.75rem;
  }
  
  .summary-amount {
    font-size: 1.1rem;
  }
}

</style>