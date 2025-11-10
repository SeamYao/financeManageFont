// utils/moduleManager.ts
interface Module {
  id: string;
  name: string;
  component: any;
  requiredRoles?: string[]; // 可访问的角色
}

class ModuleManager {
  private modules: Map<string, Module> = new Map();
  
  // 注册模块
  register(module: Module) {
    this.modules.set(module.id, module);
  }
  
  // 根据角色获取可见模块
  getModulesByRole(role: string): Module[] {
    return Array.from(this.modules.values()).filter(module => {
      // 如果没有设置角色限制，所有角色都可访问
      if (!module.requiredRoles || module.requiredRoles.length === 0) {
        return true;
      }
      // 检查角色权限
      return module.requiredRoles.includes(role);
    });
  }
  
  // 获取所有模块（用于管理界面）
  getAllModules(): Module[] {
    return Array.from(this.modules.values());
  }
}

export const moduleManager = new ModuleManager();