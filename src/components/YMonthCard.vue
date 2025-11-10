<template>
    <div class="container">
        <header>
            <h1>個人交易記錄</h1>
            <p class="subtitle">按月份查看您的收入和支出</p>
        </header>
        <BalanceCard 
            :total-income="totalIncome" 
            :total-expense="totalExpense" 
        />
        <div class="list-column">
        <TransactionList 
          :transactions="transactions" 
          :categories="categories"
          @delete-transaction="deleteTransaction"
        />
      </div>
        
        <div class="filters">
            <div class="search-box">
                <input type="text" placeholder="搜尋交易記錄...">
            </div>
            <div class="type-filter">
                <button class="filter-btn active">全部</button>
                <button class="filter-btn">支出</button>
                <button class="filter-btn">收入</button>
            </div>
        </div>
        
        <!-- 2023年11月 -->
        <div class="month-section">
            <div class="month-header">
                <div class="month-title">2023年11月</div>
                <div class="month-total">
                    <span class="expense-total">總支出: ¥8,642.50</span>
                    <span style="margin: 0 10px">|</span>
                    <span class="income-total">總收入: ¥15,000.00</span>
                </div>
            </div>
            
            <div class="transactions-container">
                <div class="transaction-item">
                    <div class="transaction-icon icon-food">
                        <i>🍽️</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">大家樂 - 吃飯</div>
                            <div class="transaction-amount expense">-¥1234.23</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                日常開支
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                微信
                                <span class="account-badge">微信支付</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="transaction-item">
                    <div class="transaction-icon icon-shopping">
                        <i>🛍️</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">優衣庫 - 購物</div>
                            <div class="transaction-amount expense">-¥586.00</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                購物
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                支付寶
                                <span class="account-badge">支付寶</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="transaction-item">
                    <div class="transaction-icon icon-transport">
                        <i>🚗</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">滴滴打車</div>
                            <div class="transaction-amount expense">-¥42.50</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                交通
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                微信
                                <span class="account-badge">微信支付</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="transaction-item">
                    <div class="transaction-icon icon-entertainment">
                        <i>🎬</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">電影票</div>
                            <div class="transaction-amount expense">-¥120.00</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                娛樂
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                支付寶
                                <span class="account-badge">支付寶</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 2023年10月 -->
        <div class="month-section">
            <div class="month-header">
                <div class="month-title">2023年10月</div>
                <div class="month-total">
                    <span class="expense-total">總支出: ¥7,230.80</span>
                    <span style="margin: 0 10px">|</span>
                    <span class="income-total">總收入: ¥15,000.00</span>
                </div>
            </div>
            
            <div class="transactions-container">
                <div class="transaction-item">
                    <div class="transaction-icon icon-food">
                        <i>🍽️</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">星巴克</div>
                            <div class="transaction-amount expense">-¥38.00</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                餐飲
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                微信
                                <span class="account-badge">微信支付</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="transaction-item">
                    <div class="transaction-icon icon-shopping">
                        <i>🛍️</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">網購 - 淘寶</div>
                            <div class="transaction-amount expense">-¥256.00</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                購物
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                支付寶
                                <span class="account-badge">支付寶</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="transaction-item">
                    <div class="transaction-icon icon-transport">
                        <i>🚆</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">地鐵卡充值</div>
                            <div class="transaction-amount expense">-¥100.00</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                交通
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                微信
                                <span class="account-badge">微信支付</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 2023年9月 -->
        <div class="month-section">
            <div class="month-header">
                <div class="month-title">2023年9月</div>
                <div class="month-total">
                    <span class="expense-total">總支出: ¥6,542.30</span>
                    <span style="margin: 0 10px">|</span>
                    <span class="income-total">總收入: ¥15,000.00</span>
                </div>
            </div>
            
            <div class="transactions-container">
                <div class="transaction-item">
                    <div class="transaction-icon icon-food">
                        <i>🍽️</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">海底撈火鍋</div>
                            <div class="transaction-amount expense">-¥320.00</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                餐飲
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                支付寶
                                <span class="account-badge">支付寶</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="transaction-item">
                    <div class="transaction-icon icon-entertainment">
                        <i>🎳</i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-main">
                            <div class="transaction-name">保齡球</div>
                            <div class="transaction-amount expense">-¥85.00</div>
                        </div>
                        <div class="transaction-meta">
                            <div class="transaction-type">
                                娛樂
                                <span class="type-badge badge-expense">支出</span>
                            </div>
                            <div class="transaction-account">
                                微信
                                <span class="account-badge">微信支付</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

 <script>
import BalanceCard from '@/components/BalanceCard.vue'
import TransactionList from '@/components/TransactionList.vue'
export default {
  name: 'Home',
  components: {
    BalanceCard,
    TransactionList,

  },
}       
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'Microsoft JhengHei', sans-serif;
}

body {
    background-color: #f5f7fa;
    color: #333;
    line-height: 1.6;
    padding: 20px;
}

.container {
    
    margin: 0 auto;
}

header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 28px;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 16px;
    opacity: 0.9;
}

.month-section {
    margin-bottom: 30px;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.month-header {
    background-color: #4a6ee0;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.month-title {
    font-size: 20px;
    font-weight: 600;
}

.month-total {
    font-size: 18px;
    font-weight: 600;
}

.income-total {
    color: #2ecc71;
}

.expense-total {
    color: #e74c3c;
}

.transactions-container {
    padding: 0;
}

.transaction-item {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s;
}

.transaction-item:hover {
    background-color: #f9fafb;
}

.transaction-item:last-child {
    border-bottom: none;
}

.transaction-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
}

.icon-food {
    background-color: #ffeaea;
    color: #e74c3c;
}

.icon-shopping {
    background-color: #e8f4ff;
    color: #3498db;
}

.icon-transport {
    background-color: #e8f7ef;
    color: #2ecc71;
}

.icon-entertainment {
    background-color: #f4ecff;
    color: #9b59b6;
}

.transaction-details {
    flex-grow: 1;
}

.transaction-main {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.transaction-name {
    font-weight: 600;
    font-size: 16px;
}

.transaction-amount {
    font-weight: 700;
    font-size: 16px;
}

.expense {
    color: #e74c3c;
}

.income {
    color: #2ecc71;
}

.transaction-meta {
    display: flex;
    font-size: 13px;
    color: #8a8a8a;
}

.transaction-type {
    margin-right: 15px;
    display: flex;
    align-items: center;
}

.transaction-account {
    display: flex;
    align-items: center;
}

.type-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    margin-left: 5px;
}

.badge-expense {
    background-color: #ffeaea;
    color: #e74c3c;
}

.badge-income {
    background-color: #e8f7ef;
    color: #27ae60;
}

.account-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    margin-left: 5px;
    background-color: #e8f4ff;
    color: #3498db;
}

.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #8a8a8a;
}

.empty-state i {
    font-size: 48px;
    margin-bottom: 15px;
    display: block;
    color: #d0d0d0;
}

.filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
}

.search-box {
    flex-grow: 1;
    max-width: 300px;
}

.search-box input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
}

.type-filter {
    display: flex;
    gap: 10px;
}

.filter-btn {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
}

.filter-btn.active {
    background: #4a6ee0;
    color: white;
    border-color: #4a6ee0;
}

@media (max-width: 600px) {
    .transaction-main {
        flex-direction: column;
    }
    
    .transaction-amount {
        margin-top: 5px;
    }
    
    .filters {
        flex-direction: column;
    }
    
    .search-box {
        max-width: 100%;
    }
}
</style>