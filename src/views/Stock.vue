<template>
 <div class="container">
            <header>
                <h1><i class="fas fa-chart-line"></i> 我的投資買賣記錄</h1>
                <button class="btn btn-primary" @click="showForm = !showForm">
                    <i class="fas fa-plus"></i> {{ showForm ? '取消' : '新增交易' }}
                </button>
            </header>
            
            <!-- 統計卡片 -->
            <div class="stats-container">
                <div class="stat-card total">
                    <h3>總投資金額</h3>
                    <div class="value">NT$ {{ formatCurrency(totalInvestment) }}</div>
                </div>
                <div class="stat-card profit">
                    <h3>總收益</h3>
                    <div class="value" :class="{ 'positive': totalProfit >= 0, 'negative': totalProfit < 0 }">
                        NT$ {{ formatCurrency(totalProfit) }}
                    </div>
                </div>
                <div class="stat-card loss">
                    <h3>投資報酬率</h3>
                    <div class="value" :class="{ 'positive': roi >= 0, 'negative': roi < 0 }">
                        {{ roi.toFixed(2) }}%
                    </div>
                </div>
            </div>
            
            <!-- 交易表單 -->
            <div class="form-container" v-if="showForm">
                <h2>{{ editingTransaction ? '編輯交易' : '新增交易' }}</h2>
                <form @submit.prevent="saveTransaction">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="stock">股票代碼/名稱</label>
                            <input type="text" id="stock" v-model="form.stock" required>
                        </div>
                        <div class="form-group">
                            <label for="type">交易類型</label>
                            <select id="type" v-model="form.type" required>
                                <option value="buy">買入</option>
                                <option value="sell">賣出</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="date">交易日期</label>
                            <input type="date" id="date" v-model="form.date" required>
                        </div>
                        <div class="form-group">
                            <label for="quantity">數量</label>
                            <input type="number" id="quantity" v-model="form.quantity" min="1" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="price">價格 (NT$)</label>
                            <input type="number" id="price" v-model="form.price" min="0.01" step="0.01" required>
                        </div>
                        <div class="form-group">
                            <label for="fee">手續費 (NT$)</label>
                            <input type="number" id="fee" v-model="form.fee" min="0" step="0.01">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="notes">備註</label>
                        <input type="text" id="notes" v-model="form.notes">
                    </div>
                    
                    <div class="form-group">
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> {{ editingTransaction ? '更新' : '儲存' }}
                        </button>
                        <button type="button" class="btn btn-danger" @click="cancelEdit" v-if="editingTransaction">
                            <i class="fas fa-times"></i> 取消
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- 交易記錄表格 -->
            <div class="card">
                <h2>交易記錄</h2>
                <table>
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th>股票</th>
                            <th>類型</th>
                            <th>數量</th>
                            <th>價格</th>
                            <th>總金額</th>
                            <th>手續費</th>
                            <th>備註</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="transaction in transactions" :key="transaction.id">
                            <td>{{ transaction.date }}</td>
                            <td>{{ transaction.stock }}</td>
                            <td>
                                <span :class="{ 'positive': transaction.type === 'sell', 'negative': transaction.type === 'buy' }">
                                    {{ transaction.type === 'buy' ? '買入' : '賣出' }}
                                </span>
                            </td>
                            <td>{{ transaction.quantity }}</td>
                            <td>NT$ {{ formatCurrency(transaction.price) }}</td>
                            <td>NT$ {{ formatCurrency(transaction.quantity * transaction.price) }}</td>
                            <td>NT$ {{ formatCurrency(transaction.fee) }}</td>
                            <td>{{ transaction.notes }}</td>
                            <td>
                                <div class="action-buttons">
                                    <button class="action-btn btn-primary" @click="editTransaction(transaction)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="action-btn btn-danger" @click="deleteTransaction(transaction.id)">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- 收益圖表 -->
            <div class="card">
                <h2>投資收益趨勢</h2>
                <div class="chart-container">
                    <canvas id="profitChart"></canvas>
                </div>
            </div>
        </div>
  
    
</template>
<script>
import { Chart } from 'chart.js/auto';
export default {
    name: 'Stock',
    data(){
        return {
            showForm: false,
        editingTransaction: null,
        form: {
            stock: '',
            type: 'buy',
            date: new Date().toISOString().substr(0, 10),
            quantity: 1,
            price: 0,
            fee: 0,
            notes: ''
        },
        transactions: [
            {
                id: 1,
                stock: '台積電 (2330)',
                type: 'buy',
                date: '2023-05-15',
                quantity: 10,
                price: 520,
                fee: 20,
                notes: '長期投資'
            },
            {
                id: 2,
                stock: '聯發科 (2454)',
                type: 'buy',
                date: '2023-06-20',
                quantity: 5,
                price: 780,
                fee: 15,
                notes: '看好5G發展'
            },
            {
                id: 3,
                stock: '台積電 (2330)',
                type: 'sell',
                date: '2023-07-10',
                quantity: 5,
                price: 580,
                fee: 18,
                notes: '部分獲利了結'
            }
        ],
        chart: null

        }
            
    },
    computed: {
        totalInvestment() {
            return this.transactions.reduce((total, transaction) => {
                if (transaction.type === 'buy') {
                    return total + (transaction.quantity * transaction.price) + transaction.fee;
                } else {
                    return total - (transaction.quantity * transaction.price) - transaction.fee;
                }
            }, 0);
        },
        totalProfit() {
            return this.transactions.reduce((total, transaction) => {
                if (transaction.type === 'sell') {
                    return total + (transaction.quantity * transaction.price) - transaction.fee;
                } else {
                    return total - (transaction.quantity * transaction.price) - transaction.fee;
                }
            }, 0);
        },
        roi() {
            if (this.totalInvestment === 0) return 0;
            return (this.totalProfit / Math.abs(this.totalInvestment)) * 100;
        }
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('zh-TW').format(value);
        },
        saveTransaction() {
            if (this.editingTransaction) {
                // 更新現有交易
                const index = this.transactions.findIndex(t => t.id === this.editingTransaction.id);
                this.transactions.splice(index, 1, { ...this.form, id: this.editingTransaction.id });
            } else {
                // 新增交易
                const newId = this.transactions.length > 0 
                    ? Math.max(...this.transactions.map(t => t.id)) + 1 
                    : 1;
                this.transactions.push({ ...this.form, id: newId });
            }
            
            this.resetForm();
            this.renderChart();
        },
        editTransaction(transaction) {
            this.form = { ...transaction };
            this.editingTransaction = transaction;
            this.showForm = true;
        },
        deleteTransaction(id) {
            if (confirm('確定要刪除此交易記錄嗎？')) {
                this.transactions = this.transactions.filter(t => t.id !== id);
                this.renderChart();
            }
        },
        cancelEdit() {
            this.resetForm();
        },
        resetForm() {
            this.form = {
                stock: '',
                type: 'buy',
                date: new Date().toISOString().substr(0, 10),
                quantity: 1,
                price: 0,
                fee: 0,
                notes: ''
            };
            this.editingTransaction = null;
            this.showForm = false;
        },
        renderChart() {
            if (this.chart) {
                this.chart.destroy();
            }
            
            const ctx = document.getElementById('profitChart').getContext('2d');
            
            // 模擬收益數據
            const dates = ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07'];
            const profits = [0, -5000, -3000, 2000, 5000, 8000, 12000];
            
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: '累計收益 (NT$)',
                        data: profits,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    }
                }
            });
        }
    }
}
</script>
<style scoped>
.card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
}

.stats-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    text-align: center;
    padding: 20px;
    border-radius: 8px;
    color: white;
}

.stat-card.total {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card.profit {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card.loss {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.stat-card h3 {
    font-size: 16px;
    margin-bottom: 10px;
    opacity: 0.9;
}

.stat-card .value {
    font-size: 24px;
    font-weight: bold;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-success {
    background-color: #2ecc71;
    color: white;
}

.btn-success:hover {
    background-color: #27ae60;
}

.btn-danger {
    background-color: #e74c3c;
    color: white;
}

.btn-danger:hover {
    background-color: #c0392b;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eaeaea;
}

th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
}

tr:hover {
    background-color: #f8f9fa;
}

.action-buttons {
    display: flex;
    gap: 8px;
}

.action-btn {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.form-container {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 25px;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #2c3e50;
}

input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.chart-container {
    height: 300px;
    margin-top: 20px;
}

.positive {
    color: #2ecc71;
}

.negative {
    color: #e74c3c;
}

@media (max-width: 768px) {
    .stats-container {
        grid-template-columns: 1fr;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    table {
        display: block;
        overflow-x: auto;
    }
}
</style>