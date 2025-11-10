import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export default {
  // 获取所有交易记录
  async getTransactions() {
    try {
      const response = await api.get('/transactions')
      return response.data
    } catch (error) {
      console.error('获取交易记录失败:', error)
      // 如果后端不可用，使用本地存储作为备用方案
      return this.getLocalTransactions()
    }
  },
  
  // 添加交易记录
  async addTransaction(transaction) {
    try {
      const response = await api.post('/transactions', transaction)
      this.saveLocalTransaction(response.data)
      return response.data
    } catch (error) {
      console.error('添加交易记录失败:', error)
      // 如果后端不可用，使用本地存储作为备用方案
      return this.addLocalTransaction(transaction)
    }
  },
  
  // 删除交易记录
  async deleteTransaction(id) {
    try {
      await api.delete(`/transactions/${id}`)
      this.deleteLocalTransaction(id)
      return { success: true }
    } catch (error) {
      console.error('删除交易记录失败:', error)
      // 如果后端不可用，使用本地存储作为备用方案
      return this.deleteLocalTransaction(id)
    }
  },
  
  // 本地存储方法（备用方案）
  getLocalTransactions() {
    const saved = localStorage.getItem('transactions')
    return saved ? JSON.parse(saved) : []
  },
  
  saveLocalTransaction(transaction) {
    const transactions = this.getLocalTransactions()
    transactions.push(transaction)
    localStorage.setItem('transactions', JSON.stringify(transactions))
  },
  
  addLocalTransaction(transaction) {
    const transactions = this.getLocalTransactions()
    transaction.id = Date.now().toString()
    transactions.push(transaction)
    localStorage.setItem('transactions', JSON.stringify(transactions))
    return transaction
  },
  
  deleteLocalTransaction(id) {
    const transactions = this.getLocalTransactions()
    const filtered = transactions.filter(t => t.id !== id)
    localStorage.setItem('transactions', JSON.stringify(filtered))
    return { success: true }
  }
}