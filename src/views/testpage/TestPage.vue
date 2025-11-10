<template>
    <YTabel
      :data="tableData"
      :columns="columns"
      :show-pagination="true"
      :page-size="5"
      v-model="currentPage"
      :highlight-current-row="true"
      @row-click="handleRowClick"
      @sort-change="handleSortChange"
      @page-change="handlePageChange"
    >
    <!-- 自定义操作列 -->
      <template #actions="{ row }">
        <div class="action-buttons">
          <button class="btn btn-edit" @click="handleEdit(row)">编辑</button>
          <button class="btn btn-delete" @click="handleDelete(row)">删除</button>
        </div>
      </template>
      
      <!-- 自定义空状态 -->
      <template #empty>
        <div class="custom-empty">
          <i class="empty-icon">😔</i>
          <p>没有找到相关数据</p>
          <button class="btn btn-primary" @click="handleRefresh">刷新</button>
        </div>
      </template>
    </YTabel>
    <YDialogVue>
      sad
    </YDialogVue>


</template>
<script>
import YTabel from '@/components/YTabel.vue'
import YPhoneTabel from '@/components/YPhoneTabel.vue'


export default {
    name: "TestPage",
    components:{
        YTabel,
        YPhoneTabel,
       
    },
    data(){
        return{
            currentPage:1,
            tableData:[
                { id: 1, name: '张三', age: 25, address: '北京市朝阳区', status: 'active' },
                { id: 2, name: '李四', age: 30, address: '上海市浦东新区', status: 'inactive' },
                { id: 3, name: '王五', age: 28, address: '广州市天河区', status: 'active' },
                { id: 4, name: '赵六', age: 35, address: '深圳市南山区', status: 'active' },
                { id: 5, name: '钱七', age: 22, address: '杭州市西湖区', status: 'inactive' },
                { id: 6, name: '孙八', age: 29, address: '成都市武侯区', status: 'active' },
                { id: 7, name: '周九', age: 32, address: '武汉市江汉区', status: 'inactive' },
                { id: 8, name: '吴十', age: 27, address: '南京市鼓楼区', status: 'active' }
            ],
          
            columns: [
                { 
                prop: 'name', 
                label: '姓名', 
                sortable: true,
                width: 120
                },
                { 
                prop: 'age', 
                label: '年龄', 
                sortable: true,
                width: 80,
                align: 'center'
                },
                { 
                prop: 'address', 
                label: '地址',
                width: 200
                },
                { 
                prop: 'status', 
                label: '状态',
                width: 100,
                align: 'center',
                formatter: (value) => {
                    return value === 'active' ? '活跃' : '非活跃';
                }
                },
                { 
                prop: 'actions',
                label: '操作',
                width: 150,
                align: 'center',
                scopedSlots: 'actions'
                }
            ],
            phoneData: [
                { transactionData: "2025/11/04", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/04", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信2", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/05", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣2", descriptoin: "大家樂"},
                { transactionData: "2025/11/06", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/06", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/07", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/08", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
           
            ]        
        
        }
    },
    methods: {
    handleRowClick(row, index) {
      console.log('点击行:', row, '索引:', index);
    },
    
    handleSortChange({ prop, order }) {
      console.log('排序变化:', prop, order);
    },
    
    handlePageChange(page) {
      console.log('页码变化:', page);
    },
    
    handleEdit(row) {
      console.log('编辑:', row);
      // 这里可以打开编辑对话框或跳转到编辑页面
    },
    
    handleDelete(row) {
      console.log('删除:', row);
      if (confirm(`确定要删除用户 ${row.name} 吗？`)) {
        // 这里调用删除API
        const index = this.tableData.findIndex(item => item.id === row.id);
        if (index > -1) {
          this.tableData.splice(index, 1);
        }
      }
    },
    
    handleRefresh() {
      // 重新加载数据
      console.log('刷新数据');
    }
  }
}
</script>