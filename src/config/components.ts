// config/components.ts
import UserManagement from '@/components/UserManagement.vue'
import OrderManagement from '@/components/OrderManagement.vue'
import ReportDashboard from '@/components/ReportDashboard.vue'

// 统一配置所有组件及其权限
export const componentsConfig = [
  {
    id: 'user-management',
    name: '用户管理',
    component: UserManagement,
    roles: ['admin'],
    icon: '👥',
    description: '管理系统用户'
  },
  {
    id: 'order-management', 
    name: '订单管理',
    component: OrderManagement,
    roles: ['admin', 'operator'],
    icon: '📦',
    description: '处理客户订单'
  },
  {
    id: 'report-dashboard',
    name: '数据报表',
    component: ReportDashboard,
    roles: ['admin', 'operator', 'user'],
    icon: '📊',
    description: '查看业务数据'
  }
]

// 根据角色获取组件
export const getComponentsByRole = (role: string) => {
  return componentsConfig.filter(comp => comp.roles.includes(role))
}

// 获取所有组件（用于管理界面）
export const getAllComponents = () => {
  return componentsConfig
}