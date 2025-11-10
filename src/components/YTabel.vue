<template>
  <div class="simple-table-container">
    <!-- 表格主体 -->
    <div class="table-wrapper" :style="{ height: height }">
      <table class="simple-table">
        <!-- 表头 -->
        <thead>
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.prop"
              :class="[
                'table-header',
                { 
                  'sortable': column.sortable,
                  'ascending': sortProp === column.prop && sortOrder === 'ascending',
                  'descending': sortProp === column.prop && sortOrder === 'descending'
                }
              ]"
              :style="getColumnStyle(column)"
              @click="handleSort(column)"
            >
              <div class="header-content">
                <span class="header-label">{{ column.label }}</span>
                <span v-if="column.sortable" class="sort-icons">
                  <i class="sort-asc-icon"></i>
                  <i class="sort-desc-icon"></i>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        
        <!-- 表格内容 -->
        <tbody>
          <tr 
            v-for="(row, index) in paginatedData" 
            :key="getRowKey(row, index)"
            :class="getRowClass(row, index)"
            @click="handleRowClick(row, index)"
          >
            <td 
              v-for="column in columns" 
              :key="column.prop"
              :style="getColumnStyle(column)"
            >
              <!-- 自定义渲染 -->
              <template v-if="column.scopedSlots">
                <slot :name="column.scopedSlots" :row="row" :column="column" :index="index"></slot>
              </template>
              <!-- 格式化内容 -->
              <template v-else-if="column.formatter">
                {{ column.formatter(row[column.prop], row, column, index) }}
              </template>
              <!-- 默认内容 -->
              <template v-else>
                {{ row[column.prop] }}
              </template>
            </td>
          </tr>
          
          <!-- 空数据状态 -->
          <tr v-if="paginatedData.length === 0">
            <td :colspan="columns.length" class="empty-cell">
              <div class="empty-content">
                <slot name="empty">
                  <div class="default-empty">
                    <i class="empty-icon">📊</i>
                    <p>{{ emptyText }}</p>
                  </div>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 分页器 -->
    <div v-if="showPagination" class="table-pagination">
      <div class="pagination-info">
        显示第 {{ pageStart }} 到 {{ pageEnd }} 条，共 {{ total }} 条记录
      </div>
      <div class="pagination-controls">
        <button 
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="currentPage = 1"
        >
          首页
        </button>
        <button 
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          上一页
        </button>
        
        <span 
          v-for="page in visiblePages" 
          :key="page"
          class="page-number"
          :class="{ active: currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </span>
        
        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          下一页
        </button>
        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage = totalPages"
        >
          末页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YTabel',
  
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    // 列配置
    columns: {
      type: Array,
      required: true
    },
    // 是否显示分页
    showPagination: {
      type: Boolean,
      default: true
    },
    // 每页大小
    pageSize: {
      type: Number,
      default: 10
    },
    // 当前页码
    value: {
      type: Number,
      default: 1
    },
    // 表格高度
    height: {
      type: String,
      default: 'auto'
    },
    // 空数据提示文本
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 行键名
    rowKey: {
      type: String,
      default: 'id'
    },
    // 高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      currentPage: this.value,
      sortProp: '',
      sortOrder: '', // 'ascending' or 'descending'
      currentRow: null
    }
  },
  
  computed: {
    // 排序后的数据
    sortedData() {
      if (!this.sortProp || !this.sortOrder) return this.data;
      
      return [...this.data].sort((a, b) => {
        const aVal = a[this.sortProp];
        const bVal = b[this.sortProp];
        
        if (this.sortOrder === 'ascending') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    },
    
    // 分页后的数据
    paginatedData() {
      if (!this.showPagination) return this.sortedData;
      
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.sortedData.slice(start, end);
    },
    
    // 总页数
    totalPages() {
      return Math.ceil(this.sortedData.length / this.pageSize);
    },
    
    // 总数据量
    total() {
      return this.sortedData.length;
    },
    
    // 当前页起始位置
    pageStart() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },
    
    // 当前页结束位置
    pageEnd() {
      const end = this.currentPage * this.pageSize;
      return end > this.total ? this.total : end;
    },
    
    // 可见页码
    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },
  
  watch: {
    value(newVal) {
      this.currentPage = newVal;
    },
    
    currentPage(newVal) {
      this.$emit('input', newVal);
      this.$emit('page-change', newVal);
    },
    
    totalPages(newVal) {
      if (this.currentPage > newVal) {
        this.currentPage = Math.max(1, newVal);
      }
    }
  },
  
  methods: {
    // 处理排序
    handleSort(column) {
      if (!column.sortable) return;
      
      if (this.sortProp === column.prop) {
        // 切换排序方向
        this.sortOrder = this.sortOrder === 'ascending' ? 'descending' : 'ascending';
      } else {
        // 新列排序
        this.sortProp = column.prop;
        this.sortOrder = 'ascending';
      }
      
      this.$emit('sort-change', { prop: this.sortProp, order: this.sortOrder });
    },
    
    // 获取行键值
    getRowKey(row, index) {
      return row[this.rowKey] || index;
    },
    
    // 获取行样式
    getRowClass(row, index) {
      const classes = ['table-row'];
      
      if (this.highlightCurrentRow && this.currentRow === row) {
        classes.push('current-row');
      }
      
      if (index % 2 === 1) {
        classes.push('striped-row');
      }
      
      return classes;
    },
    
    // 处理行点击
    handleRowClick(row, index) {
      this.currentRow = row;
      this.$emit('row-click', row, index);
    },
    
    // 获取列样式
    getColumnStyle(column) {
      const style = {};
      if (column.width) {
        style.width = typeof column.width === 'number' ? `${column.width}px` : column.width;
      }
      if (column.align) {
        style.textAlign = column.align;
      }
      return style;
    },
    
    // 清空排序
    clearSort() {
      this.sortProp = '';
      this.sortOrder = '';
    },
    
    // 设置当前页
    setCurrentPage(page) {
      this.currentPage = page;
    }
  }
}
</script>

<style scoped>
.simple-table-container {
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
  font-size: 14px;
  color: #606266;
}

.table-wrapper {
  overflow: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

/* 表头样式 */
.table-header {
  background-color: #f5f7fa;
  color: #909399;
  font-weight: 500;
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  user-select: none;
}

.table-header.sortable {
  cursor: pointer;
  transition: background-color 0.3s;
}

.table-header.sortable:hover {
  background-color: #f0f2f5;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sort-icons {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.sort-asc-icon,
.sort-desc-icon {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.sort-asc-icon {
  border-bottom: 4px solid #c0c4cc;
  margin-bottom: 2px;
}

.sort-desc-icon {
  border-top: 4px solid #c0c4cc;
}

.table-header.ascending .sort-asc-icon {
  border-bottom-color: #409eff;
}

.table-header.descending .sort-desc-icon {
  border-top-color: #409eff;
}

/* 表格行样式 */
.table-row {
  transition: background-color 0.3s;
}

.table-row:hover {
  background-color: #f5f7fa;
}

.table-row.current-row {
  background-color: #ecf5ff;
}

.table-row.striped-row {
  background-color: #fafafa;
}

.simple-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #ebeef5;
}

/* 空数据样式 */
.empty-cell {
  text-align: center;
  padding: 40px 0;
}

.empty-content {
  color: #909399;
}

.default-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.empty-icon {
  font-size: 48px;
}

/* 分页样式 */
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding: 0 10px;
}

.pagination-info {
  color: #606266;
  font-size: 13px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 5px;
}

.pagination-btn {
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 13px;
}

.pagination-btn:hover:not(:disabled) {
  color: #409eff;
  border-color: #409eff;
}

.pagination-btn:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: #f5f7fa;
}

.page-number {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 13px;
}

.page-number:hover {
  color: #409eff;
  border-color: #409eff;
}

.page-number.active {
  background: #409eff;
  color: white;
  border-color: #409eff;
}
</style>